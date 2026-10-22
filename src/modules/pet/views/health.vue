<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-multi-delete-btn />
			<cl-filter label="类型">
				<cl-select prop="type" :options="healthTypeOptions" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="项目名称 / 宠物昵称 / 主人昵称" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table">
				<template #column-attachments="{ scope }">
					<el-image
						v-for="(img, i) in parseList(scope.row.attachments)"
						:key="img"
						:src="img"
						:preview-src-list="parseList(scope.row.attachments)"
						:initial-index="i"
						preview-teleported
						class="thumb"
					/>
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
	name: 'pet-health'
});

import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { healthTypeOptions, sourceTypeOptions, parseList, healthValue } from '../utils/options';

const { service } = useCool();

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: 'ID', prop: 'id', width: 70 },
		{ label: '宠物', prop: 'petName', minWidth: 100 },
		{ label: '主人', prop: 'nickName', minWidth: 100, showOverflowTooltip: true },
		{ label: '类型', prop: 'type', width: 80, dict: healthTypeOptions },
		{ label: '项目', prop: 'itemName', minWidth: 130, showOverflowTooltip: true },
		{ label: '日期', prop: 'occurDate', width: 110, sortable: 'custom' },
		{ label: '数值/剂量', prop: 'value', width: 110, formatter: (row: any) => healthValue(row) },
		{ label: '周期(天)', prop: 'cycleDays', width: 90 },
		{ label: '下次日期', prop: 'nextDate', width: 110 },
		{ label: '疗程结束', prop: 'endDate', width: 110 },
		{ label: '医院', prop: 'hospital', minWidth: 120, showOverflowTooltip: true },
		{ label: '诊断', prop: 'diagnosis', minWidth: 140, showOverflowTooltip: true },
		{ label: '费用', prop: 'cost', width: 80 },
		{
			label: '提醒',
			prop: 'remind',
			width: 70,
			dict: [
				{ label: '开启', value: 1, type: 'success' },
				{ label: '关闭', value: 0, type: 'info' }
			]
		},
		{ label: '备注', prop: 'remark', minWidth: 140, showOverflowTooltip: true },
		{ label: '附件', prop: 'attachments', width: 130 },
		{ label: '来源', prop: 'sourceType', width: 90, dict: sourceTypeOptions },
		{ label: '创建时间', prop: 'createTime', width: 170, sortable: 'desc' },
		{ type: 'op', buttons: ['edit', 'delete'] }
	]
});

const Upsert = useUpsert({
	items: [
		{ prop: 'itemName', label: '项目名称', required: true, component: { name: 'el-input' } },
		{
			prop: 'occurDate',
			label: '日期',
			required: true,
			component: { name: 'el-date-picker', props: { type: 'date', valueFormat: 'YYYY-MM-DD' } }
		},
		{ prop: 'value', label: '数值', component: { name: 'el-input-number', props: { min: 0, precision: 2 } } },
		{ prop: 'unit', label: '单位', component: { name: 'el-input' } },
		{ prop: 'dosage', label: '剂量', component: { name: 'el-input' } },
		{ prop: 'hospital', label: '医院', component: { name: 'el-input' } },
		{ prop: 'diagnosis', label: '诊断', component: { name: 'el-input', props: { type: 'textarea', rows: 2 } } },
		{ prop: 'cost', label: '费用', component: { name: 'el-input-number', props: { min: 0, precision: 2 } } },
		{ prop: 'remark', label: '备注', component: { name: 'el-input', props: { type: 'textarea', rows: 2 } } }
	]
});

const Crud = useCrud({ service: service.pet.health }, app => {
	app.refresh();
});
</script>

<style lang="scss" scoped>
.thumb {
	width: 32px;
	height: 32px;
	margin-right: 4px;
	border-radius: 4px;
}
</style>
