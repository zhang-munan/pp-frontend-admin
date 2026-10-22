<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<el-button type="primary" plain :loading="syncing" @click="syncFollowers">同步服务号关注者</el-button>
			<cl-filter label="模板">
				<cl-select prop="templateKey" :options="templateOptions" />
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
	name: 'message-subscribe'
});

import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useCrud, useTable } from '@cool-vue/crud';
import { useCool } from '/@/cool';

const { service } = useCool();

const templateOptions = [
	{ label: '养护提醒', value: 'care', type: 'success' },
	{ label: '用药提醒', value: 'medication', type: 'warning' }
];

const Table = useTable({
	columns: [
		{ label: 'ID', prop: 'id', width: 80 },
		{ label: '用户', prop: 'nickName', minWidth: 120, showOverflowTooltip: true },
		{ label: '手机号', prop: 'phone', minWidth: 120 },
		{ label: '模板', prop: 'templateKey', width: 110, dict: templateOptions },
		{ label: '剩余可推送次数', prop: 'remainCount', width: 140 },
		{ label: '更新时间', prop: 'updateTime', width: 170, sortable: 'desc' }
	]
});

const Crud = useCrud({ service: service.message.subscribe }, app => {
	app.refresh();
});

const syncing = ref(false);

async function syncFollowers() {
	syncing.value = true;
	try {
		const res = await (service.message.subscribe as any).syncFollowers();
		ElMessage.success(`已同步 ${res.synced ?? 0} 位关注者`);
		Crud.value?.refresh();
	} catch (e: any) {
		ElMessage.error(e?.message || '同步失败，请检查服务号配置');
	} finally {
		syncing.value = false;
	}
}
</script>
