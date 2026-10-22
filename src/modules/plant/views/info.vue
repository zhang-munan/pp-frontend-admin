<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-multi-delete-btn />
			<cl-filter label="位置">
				<cl-select prop="location" :options="locationOptions" />
			</cl-filter>
			<cl-filter label="状态">
				<cl-select prop="status" :options="plantStatusOptions" />
			</cl-filter>
			<cl-filter label="家庭共享">
				<cl-select prop="shared" :options="yesNoOptions" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="昵称 / 品种 / 主人昵称 / 手机号" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert" />

		<el-drawer v-model="drawer.visible" :title="drawer.title" size="60%" destroy-on-close>
			<el-table v-loading="drawer.loading" :data="drawer.list" border size="small">
				<el-table-column label="类型" width="80">
					<template #default="{ row }">
						<el-tag :type="typeOf(row.type).type" size="small">{{ typeOf(row.type).label }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="日期" prop="occurDate" width="110" />
				<el-table-column label="照片" width="80">
					<template #default="{ row }">
						<el-image
							v-if="row.photo"
							:src="row.photo"
							:preview-src-list="[row.photo]"
							preview-teleported
							class="thumb"
						/>
					</template>
				</el-table-column>
				<el-table-column label="高度(cm)" prop="height" width="90" />
				<el-table-column label="里程碑" prop="milestone" width="100" />
				<el-table-column label="备注" prop="remark" min-width="160" show-overflow-tooltip />
			</el-table>
		</el-drawer>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'plant-info'
});

import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import {
	locationOptions,
	plantStatusOptions,
	careTypeOptions,
	yesNoOptions,
	sourceTypeOptions
} from '../utils/options';

const { service } = useCool();

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: 'ID', prop: 'id', width: 70 },
		{ label: '照片', prop: 'avatar', width: 70, component: { name: 'cl-avatar' } },
		{ label: '昵称', prop: 'name', minWidth: 100 },
		{ label: '品种', prop: 'speciesName', minWidth: 110, showOverflowTooltip: true },
		{ label: '位置', prop: 'location', width: 80, dict: locationOptions },
		{ label: '浇水周期', prop: 'waterCycleDays', width: 90 },
		{
			label: '季节调整',
			prop: 'autoSeason',
			width: 90,
			dict: [
				{ label: '开启', value: 1, type: 'success' },
				{ label: '关闭', value: 0, type: 'info' }
			]
		},
		{ label: '下次浇水', prop: 'nextWaterDate', width: 110 },
		{ label: '施肥周期', prop: 'fertilizeCycleDays', width: 90 },
		{ label: '下次施肥', prop: 'nextFertilizeDate', width: 110 },
		{ label: '状态', prop: 'status', width: 90, dict: plantStatusOptions },
		{ label: '共享', prop: 'shared', width: 70, dict: yesNoOptions },
		{ label: '来源', prop: 'sourceType', width: 90, dict: sourceTypeOptions },
		{ label: '主人', prop: 'nickName', minWidth: 100, showOverflowTooltip: true },
		{ label: '手机号', prop: 'phone', minWidth: 120 },
		{ label: '创建时间', prop: 'createTime', width: 170, sortable: 'desc' },
		{
			type: 'op',
			width: 230,
			buttons: [
				{
					label: '养护记录',
					type: 'success',
					onClick({ scope }: any) {
						openCare(scope.row);
					}
				},
				'edit',
				'delete'
			]
		}
	]
});

const Upsert = useUpsert({
	items: [
		{ prop: 'avatar', label: '照片', component: { name: 'cl-upload' } },
		{ prop: 'name', label: '昵称', required: true, component: { name: 'el-input', props: { maxlength: 50 } } },
		{ prop: 'speciesName', label: '品种', component: { name: 'el-input', props: { maxlength: 100 } } },
		{ prop: 'location', label: '位置', component: { name: 'el-select', options: locationOptions } },
		{
			prop: 'waterCycleDays',
			label: '浇水周期',
			component: { name: 'el-input-number', props: { min: 1, max: 90 } }
		},
		{
			prop: 'fertilizeCycleDays',
			label: '施肥周期',
			component: { name: 'el-input-number', props: { min: 0, max: 180 } }
		},
		{ prop: 'status', label: '状态', component: { name: 'el-radio-group', options: plantStatusOptions } },
		{
			prop: 'description',
			label: '备注',
			component: { name: 'el-input', props: { type: 'textarea', rows: 3, maxlength: 500 } }
		}
	]
});

const Crud = useCrud({ service: service.plant.info }, app => {
	app.refresh();
});

const drawer = reactive({
	visible: false,
	loading: false,
	title: '',
	list: [] as any[]
});

function typeOf(type: number): { label: string; type: any } {
	return careTypeOptions.find(e => e.value === type) || { label: '-', type: 'info' };
}

async function openCare(row: any) {
	drawer.title = `养护记录：${row.name}`;
	drawer.list = [];
	drawer.visible = true;
	drawer.loading = true;
	try {
		drawer.list = await (service.plant.care as any).list({ plantId: row.id });
	} catch (e: any) {
		ElMessage.error(e?.message || '加载失败');
	} finally {
		drawer.loading = false;
	}
}
</script>

<style lang="scss" scoped>
.thumb {
	width: 40px;
	height: 40px;
	border-radius: 4px;
}
</style>
