<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-filter label="订单状态">
				<cl-select prop="status" :options="options.status" />
			</cl-filter>
			<cl-filter label="退款状态">
				<cl-select prop="refundStatus" :options="options.refundStatus" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="订单号 / 套餐 / 昵称 / 手机号" />
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
	name: 'order-info'
});

import { useCrud, useTable } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { ElMessage, ElMessageBox } from 'element-plus';
import { formatYuan } from '../utils/money';

const { service } = useCool();
const api = service.order.info as any;

const options = {
	payMethod: [
		{ label: '微信支付', value: 1, type: 'success' },
		{ label: '模拟支付', value: 2, type: 'info' }
	],
	status: [
		{ label: '待支付', value: 0, type: 'warning' },
		{ label: '已支付', value: 1, type: 'success' },
		{ label: '已退款', value: 2, type: 'info' },
		{ label: '已关闭', value: 3, type: 'info' }
	],
	refundStatus: [
		{ label: '未申请', value: 0, type: 'info' },
		{ label: '待审批', value: 1, type: 'warning' },
		{ label: '已退款', value: 2, type: 'success' },
		{ label: '已拒绝', value: 3, type: 'danger' },
		{ label: '退款处理中', value: 4, type: 'warning' },
		{ label: '退款失败', value: 5, type: 'danger' }
	]
};

const Table = useTable({
	columns: [
		{ label: '订单编号', prop: 'orderNo', minWidth: 200 },
		{ label: '用户', prop: 'userNickName', minWidth: 120, showOverflowTooltip: true },
		{ label: '手机号', prop: 'userPhone', minWidth: 120 },
		{ label: '套餐', prop: 'productName', minWidth: 120 },
		{
			label: '实付(元)',
			prop: 'payAmount',
			minWidth: 100,
			align: 'right',
			formatter: (row: any) => formatYuan(row.payAmount)
		},
		{
			label: '优惠(元)',
			prop: 'discountAmount',
			minWidth: 100,
			align: 'right',
			formatter: (row: any) => formatYuan(row.discountAmount)
		},
		{ label: '支付方式', prop: 'payMethod', minWidth: 100, dict: options.payMethod },
		{ label: '订单状态', prop: 'status', minWidth: 100, dict: options.status },
		{ label: '下单平台', prop: 'platform', minWidth: 90 },
		{ label: '支付时间', prop: 'payTime', minWidth: 170, sortable: 'custom' },
		{ label: '微信流水号', prop: 'tradeNo', minWidth: 200, showOverflowTooltip: true },
		{ label: '退款状态', prop: 'refundStatus', minWidth: 110, dict: options.refundStatus },
		{ label: '退款原因', prop: 'refundReason', minWidth: 160, showOverflowTooltip: true },
		{ label: '处理说明', prop: 'refundRejectReason', minWidth: 160, showOverflowTooltip: true },
		{ label: '退款时间', prop: 'refundTime', minWidth: 170 },
		{ label: '备注', prop: 'remark', minWidth: 140, showOverflowTooltip: true },
		{ label: '创建时间', prop: 'createTime', minWidth: 170, sortable: 'desc' },
		{
			type: 'op',
			width: 220,
			buttons({ scope }: any) {
				const row = scope.row;
				const buttons: any[] = [];
				if (row.status === 0) {
					buttons.push({ label: '关闭订单', type: 'warning', onClick: () => closeOrder(row) });
				}
				if (row.refundStatus === 1) {
					buttons.push(
						{ label: '通过退款', type: 'success', onClick: () => auditRefund(row, true) },
						{ label: '拒绝', type: 'danger', onClick: () => auditRefund(row, false) }
					);
				}
				if (row.payMethod === 1 && row.refundStatus === 4) {
					buttons.push({ label: '同步状态', type: 'primary', onClick: () => syncRefund(row) });
				}
				if (row.payMethod === 1 && row.refundStatus === 5) {
					buttons.push({ label: '重试退款', type: 'warning', onClick: () => retryRefund(row) });
				}
				return buttons;
			}
		}
	]
});

const Crud = useCrud({ service: service.order.info }, app => {
	app.refresh();
});

function isCancel(error: any) {
	return error === 'cancel' || error === 'close';
}

async function closeOrder(row: any) {
	try {
		await ElMessageBox.confirm(`确认关闭订单 ${row.orderNo} 吗？关闭前会先向微信查单。`, '关闭订单', {
			type: 'warning'
		});
		await api.close({ id: row.id });
		ElMessage.success('订单已关闭');
		Crud.value?.refresh();
	} catch (error: any) {
		if (isCancel(error)) return;
		ElMessage.error(error?.message || '操作失败');
	}
}

async function auditRefund(row: any, approved: boolean) {
	try {
		let remark = '';
		if (approved) {
			await ElMessageBox.confirm(
				`确认通过订单 ${row.orderNo} 的全额退款吗？退款成功后将收回对应的会员时长。`,
				'退款审批',
				{ type: 'warning', confirmButtonText: '确认退款' }
			);
		} else {
			const result = await ElMessageBox.prompt('请输入拒绝原因（用户可见）', '拒绝退款', {
				confirmButtonText: '确认拒绝',
				inputPattern: /\S+/,
				inputErrorMessage: '拒绝原因不能为空'
			});
			remark = result.value;
		}
		await api.refundAudit({ id: row.id, approved, remark });
		ElMessage.success(approved ? '退款已受理' : '已拒绝退款申请');
		Crud.value?.refresh();
	} catch (error: any) {
		if (isCancel(error)) return;
		ElMessage.error(error?.message || '操作失败');
	}
}

async function syncRefund(row: any) {
	try {
		await api.syncRefund({ id: row.id });
		ElMessage.success('退款状态已同步');
		Crud.value?.refresh();
	} catch (error: any) {
		ElMessage.error(error?.message || '同步失败');
	}
}

async function retryRefund(row: any) {
	try {
		await ElMessageBox.confirm('确认重试该笔微信退款吗？', '重试退款', { type: 'warning' });
		await api.retryRefund({ id: row.id });
		ElMessage.success('退款已重新受理');
		Crud.value?.refresh();
	} catch (error: any) {
		if (isCancel(error)) return;
		ElMessage.error(error?.message || '重试失败');
	}
}
</script>
