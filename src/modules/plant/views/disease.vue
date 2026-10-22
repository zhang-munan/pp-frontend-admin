<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<el-button type="warning" @click="aiDraft">AI 生成急救</el-button>
			<el-button type="success" plain @click="batchReview(2)">批量发布</el-button>
			<cl-multi-delete-btn />
			<cl-filter label="状态">
				<cl-select prop="status" :options="guideStatusOptions" />
			</cl-filter>
			<cl-filter label="来源">
				<cl-select prop="source" :options="guideSourceOptions" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="症状名 / 症状描述" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table">
				<template #column-steps="{ scope }">
					<ol class="steps">
						<li v-for="(s, i) in parseSteps(scope.row.steps)" :key="i">
							<b>{{ s.title }}</b>：{{ s.content }}
						</li>
					</ol>
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'plant-disease'
});

import { ElMessage, ElMessageBox } from 'element-plus';
import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { guideStatusOptions, guideSourceOptions, isCancel } from '../utils/options';

const { service } = useCool();
const api = service.plant.disease as any;

function parseSteps(value: any): { title: string; content: string }[] {
	try {
		const list = typeof value === 'string' ? JSON.parse(value) : value;
		return Array.isArray(list) ? list : [];
	} catch {
		return [];
	}
}

function stepsToText(value: any) {
	return parseSteps(value)
		.map(s => `${s.title}｜${s.content}`)
		.join('\n');
}

function textToSteps(text: string) {
	return String(text || '')
		.split('\n')
		.map(line => line.trim())
		.filter(Boolean)
		.map(line => {
			const [title, ...rest] = line.split(/[|｜]/);
			return { title: title.trim(), content: rest.join('｜').trim() };
		})
		.filter(s => s.title && s.content);
}

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: 'ID', prop: 'id', width: 70 },
		{ label: '配图', prop: 'image', width: 70, component: { name: 'cl-avatar', props: { shape: 'square' } } },
		{ label: '症状名', prop: 'name', width: 110 },
		{ label: '症状描述', prop: 'symptom', minWidth: 160, showOverflowTooltip: true },
		{ label: '可能原因', prop: 'causes', minWidth: 160, showOverflowTooltip: true },
		{ label: '抢救步骤', prop: 'steps', minWidth: 320 },
		{ label: '排序', prop: 'sort', width: 70 },
		{ label: '状态', prop: 'status', width: 90, dict: guideStatusOptions },
		{ label: '来源', prop: 'source', width: 70, dict: guideSourceOptions },
		{
			type: 'op',
			width: 240,
			buttons({ scope }: any) {
				const row = scope.row;
				const buttons: any[] = [];
				if (row.status === 0) {
					buttons.push({ label: '提审', type: 'primary', onClick: () => review([row.id], 1) });
				}
				if (row.status === 1) {
					buttons.push(
						{ label: '发布', type: 'success', onClick: () => review([row.id], 2) },
						{ label: '退回', type: 'warning', onClick: () => review([row.id], 0) }
					);
				}
				if (row.status === 2) {
					buttons.push({ label: '下架', type: 'warning', onClick: () => review([row.id], 0) });
				}
				return [...buttons, 'edit', 'delete'];
			}
		}
	]
});

const Upsert = useUpsert({
	dialog: { width: '680px' },
	items: [
		{ prop: 'name', label: '症状名', required: true, component: { name: 'el-input', props: { maxlength: 30 } } },
		{
			prop: 'symptom',
			label: '症状描述',
			required: true,
			component: { name: 'el-input', props: { type: 'textarea', rows: 2, maxlength: 500 } }
		},
		{
			prop: 'causes',
			label: '可能原因',
			component: { name: 'el-input', props: { type: 'textarea', rows: 3, maxlength: 2000 } }
		},
		{
			prop: 'stepsText',
			label: '抢救步骤',
			required: true,
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 6, placeholder: '每行一步，格式：标题｜具体做法' }
			}
		},
		{ prop: 'image', label: '配图', component: { name: 'cl-upload' } },
		{ prop: 'sort', label: '排序', value: 0, component: { name: 'el-input-number', props: { min: 0 } } },
		{
			prop: 'status',
			label: '状态',
			value: 2,
			component: { name: 'el-radio-group', options: guideStatusOptions }
		}
	],
	async onInfo(data: any, { done, close }: any) {
		try {
			const info = await api.info({ id: data.id });
			done({ ...info, stepsText: stepsToText(info.steps) });
		} catch (e: any) {
			ElMessage.error(e?.message || '加载失败');
			close();
		}
	},
	onSubmit(data: any, { next, done }: any) {
		const { stepsText, ...rest } = data;
		const steps = textToSteps(stepsText);
		if (!steps.length) {
			ElMessage.warning('请按「标题｜做法」填写至少一步');
			return done();
		}
		next({ ...rest, steps: JSON.stringify(steps), source: rest.id ? rest.source : 0 });
	}
});

const Crud = useCrud({ service: service.plant.disease }, app => {
	app.refresh();
});

async function aiDraft() {
	try {
		const { value } = await ElMessageBox.prompt('输入症状名称，例如：黄叶、烂根、叶尖焦枯', 'AI 生成急救', {
			confirmButtonText: '生成',
			inputPattern: /\S+/,
			inputErrorMessage: '请填写症状名称'
		});
		const loading = ElMessage({ message: 'AI 生成中…', type: 'info', duration: 0 });
		try {
			await api.aiDraft({ name: value.trim() });
			ElMessage.success('已生成待审核草稿');
			Crud.value?.refresh({ status: 1 });
		} finally {
			loading.close();
		}
	} catch (e: any) {
		if (!isCancel(e)) ElMessage.error(e?.message || '生成失败');
	}
}

async function review(ids: number[], status: number) {
	try {
		await api.review({ ids, status });
		ElMessage.success('已更新');
		Crud.value?.refresh();
	} catch (e: any) {
		ElMessage.error(e?.message || '操作失败');
	}
}

async function batchReview(status: number) {
	const ids = (Crud.value?.selection || []).map((e: any) => e.id);
	if (!ids.length) return ElMessage.warning('请先勾选条目');
	try {
		await ElMessageBox.confirm(`确认发布选中的 ${ids.length} 条急救指南吗？`, '批量发布', { type: 'warning' });
		await review(ids, status);
	} catch (e: any) {
		if (!isCancel(e)) ElMessage.error(e?.message || '操作失败');
	}
}
</script>

<style lang="scss" scoped>
.steps {
	margin: 0;
	padding-left: 18px;
	line-height: 1.6;
	font-size: 12px;
}
</style>
