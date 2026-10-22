<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-multi-delete-btn />
			<cl-filter label="类型">
				<cl-select prop="type" :options="careTypeOptions" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="植物昵称 / 主人昵称 / 里程碑" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table">
				<template #column-photo="{ scope }">
					<el-image
						v-if="scope.row.photo"
						:src="scope.row.photo"
						:preview-src-list="[scope.row.photo]"
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
	name: 'plant-care'
});

import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { careTypeOptions } from '../utils/options';

const { service } = useCool();

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: 'ID', prop: 'id', width: 70 },
		{ label: '植物', prop: 'plantName', minWidth: 100 },
		{ label: '主人', prop: 'nickName', minWidth: 100, showOverflowTooltip: true },
		{ label: '类型', prop: 'type', width: 80, dict: careTypeOptions },
		{ label: '日期', prop: 'occurDate', width: 110, sortable: 'custom' },
		{ label: '照片', prop: 'photo', width: 80 },
		{ label: '高度(cm)', prop: 'height', width: 90 },
		{ label: '里程碑', prop: 'milestone', width: 100 },
		{ label: '备注', prop: 'remark', minWidth: 160, showOverflowTooltip: true },
		{ label: '创建时间', prop: 'createTime', width: 170, sortable: 'desc' },
		{ type: 'op', buttons: ['edit', 'delete'] }
	]
});

const Upsert = useUpsert({
	items: [
		{ prop: 'type', label: '类型', component: { name: 'el-select', options: careTypeOptions } },
		{
			prop: 'occurDate',
			label: '日期',
			required: true,
			component: { name: 'el-date-picker', props: { type: 'date', valueFormat: 'YYYY-MM-DD' } }
		},
		{ prop: 'photo', label: '照片', component: { name: 'cl-upload' } },
		{ prop: 'height', label: '高度(cm)', component: { name: 'el-input-number', props: { min: 0, precision: 1 } } },
		{ prop: 'milestone', label: '里程碑', component: { name: 'el-input' } },
		{ prop: 'remark', label: '备注', component: { name: 'el-input', props: { type: 'textarea', rows: 2 } } }
	]
});

const Crud = useCrud({ service: service.plant.care }, app => {
	app.refresh();
});
</script>

<style lang="scss" scoped>
.thumb {
	width: 40px;
	height: 40px;
	border-radius: 4px;
}
</style>
