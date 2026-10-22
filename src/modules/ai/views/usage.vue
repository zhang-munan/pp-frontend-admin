<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-filter label="日期">
				<el-date-picker
					v-model="date"
					type="date"
					value-format="YYYY-MM-DD"
					placeholder="全部日期"
					clearable
					@change="onDate"
				/>
			</cl-filter>
			<cl-filter label="类型">
				<cl-select prop="kind" :options="kindOptions" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="昵称 / 手机号" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'ai-usage'
});

import { ref } from 'vue';
import { useCrud, useTable } from '@cool-vue/crud';
import { useCool } from '/@/cool';

const { service } = useCool();

const kindOptions = [
	{ label: '问答', value: 0, type: 'primary' },
	{ label: '识别', value: 1, type: 'success' }
];

const date = ref<string>();

const Table = useTable({
	columns: [
		{ label: '日期', prop: 'date', width: 120 },
		{ label: '用户', prop: 'nickName', minWidth: 120, showOverflowTooltip: true },
		{ label: '手机号', prop: 'phone', minWidth: 120 },
		{ label: '类型', prop: 'kind', width: 80, dict: kindOptions },
		{ label: '已用次数', prop: 'used', width: 100, sortable: 'custom' },
		{ label: '更新时间', prop: 'updateTime', width: 170 }
	]
});

const Crud = useCrud({ service: service.ai.usage }, app => {
	app.refresh();
});

function onDate(value?: string) {
	Crud.value?.refresh({ date: value || undefined, page: 1 });
}
</script>
