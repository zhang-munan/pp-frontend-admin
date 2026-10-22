<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<el-button type="warning" @click="aiGenerate">AI 批量生成</el-button>
			<el-button type="success" plain @click="batchReview(1)">批量发布</el-button>
			<el-button type="danger" plain @click="batchReview(2)">批量驳回</el-button>
			<cl-multi-delete-btn />
			<cl-filter label="状态">
				<cl-select prop="status" :options="speciesStatusOptions" />
			</cl-filter>
			<cl-filter label="来源">
				<cl-select prop="source" :options="speciesSourceOptions" />
			</cl-filter>
			<cl-filter label="难度">
				<cl-select prop="difficulty" :options="difficultyOptions" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="品种名 / 别名" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert" />

		<el-dialog v-model="ai.visible" title="AI 批量生成品种" width="560px" destroy-on-close>
			<el-input
				v-model="ai.names"
				type="textarea"
				:rows="6"
				placeholder="每行或用逗号分隔一个品种名，单次最多 20 个，例如：龟背竹，琴叶榕，虎尾兰"
			/>
			<p class="tip">已存在的品种会跳过；生成结果为「待审核」，确认参数后发布才会在小程序可见。</p>
			<template #footer>
				<el-button @click="ai.visible = false">取消</el-button>
				<el-button type="primary" :loading="ai.loading" @click="submitAi">生成</el-button>
			</template>
		</el-dialog>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'plant-species'
});

import { reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import {
	lightOptions,
	difficultyOptions,
	speciesStatusOptions,
	speciesSourceOptions,
	isCancel
} from '../utils/options';

const { service } = useCool();
const api = service.plant.species as any;

function season(row: any) {
	try {
		const s = typeof row.seasonAdjust === 'string' ? JSON.parse(row.seasonAdjust) : row.seasonAdjust;
		return s || {};
	} catch {
		return {};
	}
}

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: 'ID', prop: 'id', width: 70 },
		{ label: '品种名', prop: 'name', minWidth: 110 },
		{ label: '别名', prop: 'alias', minWidth: 120, showOverflowTooltip: true },
		{ label: '学名', prop: 'scientificName', minWidth: 140, showOverflowTooltip: true },
		{ label: '浇水(天)', prop: 'waterCycleDays', width: 85 },
		{
			label: '夏/冬(天)',
			prop: 'seasonAdjust',
			width: 95,
			formatter: (row: any) => {
				const s = season(row);
				return s.summer || s.winter ? `${s.summer || '-'} / ${s.winter || '-'}` : '-';
			}
		},
		{ label: '施肥(天)', prop: 'fertilizeCycleDays', width: 85 },
		{ label: '光照', prop: 'light', width: 80, dict: lightOptions },
		{ label: '难度', prop: 'difficulty', width: 90, dict: difficultyOptions },
		{ label: '要点', prop: 'tips', minWidth: 200, showOverflowTooltip: true },
		{ label: '状态', prop: 'status', width: 90, dict: speciesStatusOptions },
		{ label: '来源', prop: 'source', width: 70, dict: speciesSourceOptions },
		{ label: '更新时间', prop: 'updateTime', width: 170, sortable: 'desc' },
		{
			type: 'op',
			width: 240,
			buttons({ scope }: any) {
				const row = scope.row;
				const buttons: any[] = [];
				if (row.status !== 1) {
					buttons.push({ label: '发布', type: 'success', onClick: () => review([row.id], 1) });
				}
				if (row.status === 0) {
					buttons.push({ label: '驳回', type: 'danger', onClick: () => review([row.id], 2) });
				}
				if (row.status === 1) {
					buttons.push({ label: '下架', type: 'warning', onClick: () => review([row.id], 0) });
				}
				return [...buttons, 'edit', 'delete'];
			}
		}
	]
});

const Upsert = useUpsert({
	dialog: { width: '640px' },
	items: [
		{ prop: 'name', label: '品种名', required: true, component: { name: 'el-input', props: { maxlength: 100 } } },
		{ prop: 'alias', label: '别名', component: { name: 'el-input', props: { placeholder: '逗号分隔' } } },
		{ prop: 'scientificName', label: '学名', component: { name: 'el-input' } },
		{
			prop: 'waterCycleDays',
			label: '浇水周期',
			value: 7,
			required: true,
			span: 8,
			component: { name: 'el-input-number', props: { min: 1, max: 60 } }
		},
		{
			prop: 'summer',
			label: '夏季',
			span: 8,
			component: { name: 'el-input-number', props: { min: 1, max: 60 } }
		},
		{
			prop: 'winter',
			label: '冬季',
			span: 8,
			component: { name: 'el-input-number', props: { min: 1, max: 90 } }
		},
		{
			prop: 'fertilizeCycleDays',
			label: '施肥周期',
			value: 30,
			component: { name: 'el-input-number', props: { min: 0, max: 180 } }
		},
		{ prop: 'light', label: '光照', value: 2, component: { name: 'el-radio-group', options: lightOptions } },
		{
			prop: 'difficulty',
			label: '难度',
			value: 0,
			component: { name: 'el-radio-group', options: difficultyOptions }
		},
		{
			prop: 'tips',
			label: '养护要点',
			component: { name: 'el-input', props: { type: 'textarea', rows: 3, maxlength: 500 } }
		},
		{
			prop: 'status',
			label: '状态',
			value: 1,
			component: { name: 'el-radio-group', options: speciesStatusOptions }
		}
	],
	async onInfo(data: any, { done, close }: any) {
		try {
			const info = await api.info({ id: data.id });
			const s = season(info);
			done({ ...info, summer: s.summer, winter: s.winter });
		} catch (e: any) {
			ElMessage.error(e?.message || '加载失败');
			close();
		}
	},
	onSubmit(data: any, { next }: any) {
		const { summer, winter, ...rest } = data;
		next({
			...rest,
			source: rest.id ? rest.source : 1,
			seasonAdjust: summer || winter ? JSON.stringify({ summer, winter }) : null
		});
	}
});

const Crud = useCrud({ service: service.plant.species }, app => {
	app.refresh();
});

const ai = reactive({ visible: false, loading: false, names: '' });

function aiGenerate() {
	ai.names = '';
	ai.visible = true;
}

async function submitAi() {
	const names = ai.names
		.split(/[\n,，、\s]+/)
		.map(s => s.trim())
		.filter(Boolean);
	if (!names.length) return ElMessage.warning('请填写品种名称');
	if (names.length > 20) return ElMessage.warning('单次最多 20 个品种');
	ai.loading = true;
	try {
		const res = await api.aiGenerate({ names });
		ElMessage.success(`已生成 ${res.created} 个，跳过 ${res.skipped} 个，请审核后发布`);
		ai.visible = false;
		Crud.value?.refresh({ status: 0 });
	} catch (e: any) {
		ElMessage.error(e?.message || '生成失败');
	} finally {
		ai.loading = false;
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
	if (!ids.length) return ElMessage.warning('请先勾选品种');
	try {
		await ElMessageBox.confirm(
			`确认${status === 1 ? '发布' : '驳回'}选中的 ${ids.length} 个品种吗？`,
			'批量审核',
			{ type: 'warning' }
		);
		await review(ids, status);
	} catch (e: any) {
		if (!isCancel(e)) ElMessage.error(e?.message || '操作失败');
	}
}
</script>

<style lang="scss" scoped>
.tip {
	margin-top: 8px;
	font-size: 12px;
	color: var(--el-text-color-secondary);
}
</style>
