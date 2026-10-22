<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-filter label="类型">
				<cl-select prop="type" :options="types" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="昵称 / 手机号 / 备注" />
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
	name: 'member-log'
});

import { useCrud, useTable } from '@cool-vue/crud';
import { useCool } from '/@/cool';

const { service } = useCool();

const types = [
	{ label: '购买', value: 0, type: 'success' },
	{ label: '后台发放', value: 1, type: 'primary' },
	{ label: '退款回收', value: 2, type: 'warning' },
	{ label: '后台撤销', value: 3, type: 'danger' }
];

const Table = useTable({
	columns: [
		{ label: '昵称', prop: 'nickName', minWidth: 120 },
		{ label: '手机号', prop: 'phone', minWidth: 120 },
		{ label: '类型', prop: 'type', width: 100, dict: types },
		{
			label: '天数',
			prop: 'days',
			width: 90,
			formatter: (row: any) => (row.days === -1 ? '终身' : row.days ?? '—')
		},
		{
			label: '变更后到期',
			prop: 'expireTime',
			minWidth: 170,
			formatter: (row: any) => (row.isLifetime ? '终身' : row.expireTime || '—')
		},
		{ label: '订单ID', prop: 'orderId', width: 90 },
		{ label: '操作人', prop: 'operatorId', width: 90 },
		{ label: '备注', prop: 'remark', minWidth: 180, showOverflowTooltip: true },
		{ label: '时间', prop: 'createTime', minWidth: 170, sortable: 'desc' }
	]
});

const Crud = useCrud({ service: service.member.log }, app => {
	app.refresh();
});
</script>
