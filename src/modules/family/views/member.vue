<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-filter label="状态">
				<cl-select prop="status" :options="statusOptions" />
			</cl-filter>
			<cl-flex1 />
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
	name: 'family-member'
});

import { useCrud, useTable } from '@cool-vue/crud';
import { useCool } from '/@/cool';

const { service } = useCool();

const statusOptions = [
	{ label: '待接受', value: 0, type: 'warning' },
	{ label: '已加入', value: 1, type: 'success' },
	{ label: '已移除', value: 2, type: 'info' },
	{ label: '已撤销', value: 3, type: 'info' }
];

const Table = useTable({
	columns: [
		{ label: 'ID', prop: 'id', width: 80 },
		{ label: '家庭主人', prop: 'ownerName', minWidth: 120, formatter: (row: any) => row.ownerName || row.ownerId },
		{
			label: '成员',
			prop: 'memberName',
			minWidth: 120,
			formatter: (row: any) => row.memberName || (row.memberUserId ? row.memberUserId : '-')
		},
		{ label: '状态', prop: 'status', width: 90, dict: statusOptions },
		{ label: '邀请有效期', prop: 'expireTime', width: 170 },
		{ label: '加入时间', prop: 'joinTime', width: 170 },
		{ label: '创建时间', prop: 'createTime', width: 170, sortable: 'desc' }
	]
});

const Crud = useCrud({ service: service.family.member }, app => {
	app.refresh();
});
</script>
