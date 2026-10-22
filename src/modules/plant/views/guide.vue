<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<el-button type="warning" @click="ai.visible = true">AI 生成攻略</el-button>
			<el-button type="success" plain @click="batchReview(2)">批量发布</el-button>
			<cl-multi-delete-btn />
			<cl-filter label="品种">
				<cl-select prop="speciesId" :options="speciesOptions" filterable />
			</cl-filter>
			<cl-filter label="分区">
				<cl-select prop="section" :options="sectionOptions" />
			</cl-filter>
			<cl-filter label="状态">
				<cl-select prop="status" :options="guideStatusOptions" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="要点 / 品种名" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert" />

		<el-dialog v-model="ai.visible" title="AI 生成养护攻略" width="480px" destroy-on-close>
			<el-select v-model="ai.speciesId" filterable placeholder="选择品种" style="width: 100%">
				<el-option v-for="s in speciesOptions" :key="s.value" :label="s.label" :value="s.value" />
			</el-select>
			<p class="tip">会按 光照/浇水/施肥/换盆/繁殖/病害 六个分区各生成一条，并替换该品种未发布的草稿。</p>
			<template #footer>
				<el-button @click="ai.visible = false">取消</el-button>
				<el-button type="primary" :loading="ai.loading" @click="submitAi">生成</el-button>
			</template>
		</el-dialog>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'plant-guide'
});

import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { sectionOptions, guideStatusOptions, guideSourceOptions, isCancel } from '../utils/options';

const { service } = useCool();
const api = service.plant.guide as any;

const speciesOptions = ref<{ label: string; value: number }[]>([]);

onMounted(async () => {
	try {
		const list = await (service.plant.species as any).list({});
		speciesOptions.value = list.map((e: any) => ({ label: e.name, value: e.id }));
	} catch {
		speciesOptions.value = [];
	}
});

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: 'ID', prop: 'id', width: 70 },
		{
			label: '品种',
			prop: 'speciesName',
			minWidth: 110,
			formatter: (row: any) => row.speciesName || '通用'
		},
		{ label: '分区', prop: 'section', width: 80, dict: sectionOptions },
		{ label: '要点', prop: 'title', minWidth: 140, showOverflowTooltip: true },
		{ label: '正文', prop: 'content', minWidth: 260, showOverflowTooltip: true },
		{ label: '排序', prop: 'sort', width: 70 },
		{ label: '状态', prop: 'status', width: 90, dict: guideStatusOptions },
		{ label: '来源', prop: 'source', width: 70, dict: guideSourceOptions },
		{ label: '更新时间', prop: 'updateTime', width: 170, sortable: 'desc' },
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
	dialog: { width: '640px' },
	items: [
		{
			prop: 'speciesId',
			label: '品种',
			component: {
				name: 'el-select',
				props: { filterable: true, clearable: true, placeholder: '留空表示通用攻略' },
				options: speciesOptions
			}
		},
		{
			prop: 'section',
			label: '分区',
			value: 0,
			required: true,
			component: { name: 'el-radio-group', options: sectionOptions }
		},
		{ prop: 'title', label: '要点', required: true, component: { name: 'el-input', props: { maxlength: 50 } } },
		{
			prop: 'content',
			label: '正文',
			required: true,
			component: { name: 'el-input', props: { type: 'textarea', rows: 6, maxlength: 2000 } }
		},
		{ prop: 'sort', label: '排序', value: 0, component: { name: 'el-input-number', props: { min: 0 } } },
		{
			prop: 'status',
			label: '状态',
			value: 2,
			component: { name: 'el-radio-group', options: guideStatusOptions }
		}
	],
	onSubmit(data: any, { next }: any) {
		const species = speciesOptions.value.find(e => e.value === data.speciesId);
		next({
			...data,
			speciesId: species ? species.value : null,
			speciesName: species ? species.label : null,
			source: data.id ? data.source : 0
		});
	}
});

const Crud = useCrud({ service: service.plant.guide }, app => {
	app.refresh();
});

const ai = reactive({ visible: false, loading: false, speciesId: undefined as number | undefined });

async function submitAi() {
	if (!ai.speciesId) return ElMessage.warning('请选择品种');
	ai.loading = true;
	try {
		const count = await api.aiDraft({ speciesId: ai.speciesId });
		ElMessage.success(`已生成 ${count} 条待审核攻略`);
		ai.visible = false;
		Crud.value?.refresh({ speciesId: ai.speciesId, status: 1 });
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
	if (!ids.length) return ElMessage.warning('请先勾选攻略');
	try {
		await ElMessageBox.confirm(`确认发布选中的 ${ids.length} 条攻略吗？`, '批量发布', { type: 'warning' });
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
