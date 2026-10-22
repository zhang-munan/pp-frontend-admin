<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<el-button type="primary" @click="grant()">发放会员</el-button>
			<cl-filter label="终身">
				<cl-select prop="isLifetime" :options="yesNo" />
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

		<cl-form ref="Form" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'member-list'
});

import { useCrud, useTable, useForm } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { ElMessage, ElMessageBox } from 'element-plus';
import dayjs from 'dayjs';
import UserSelect from '/$/user/components/user-select.vue';

const { service } = useCool();
const api = service.member.info as any;

const yesNo = [
	{ label: '是', value: 1 },
	{ label: '否', value: 0 }
];

function isActive(row: any) {
	return !!row.isLifetime || (!!row.expireTime && dayjs(row.expireTime).isAfter(dayjs()));
}

const Table = useTable({
	columns: [
		{ label: '头像', prop: 'avatarUrl', width: 80, component: { name: 'cl-avatar' } },
		{ label: '昵称', prop: 'nickName', minWidth: 120 },
		{ label: '手机号', prop: 'phone', minWidth: 120 },
		{
			label: '会员状态',
			prop: 'active',
			minWidth: 100,
			formatter: (row: any) => (isActive(row) ? '生效中' : '已过期')
		},
		{
			label: '终身',
			prop: 'isLifetime',
			width: 80,
			dict: [
				{ label: '是', value: 1, type: 'warning' },
				{ label: '否', value: 0, type: 'info' }
			]
		},
		{ label: '到期时间', prop: 'expireTime', minWidth: 170 },
		{
			label: '首年优惠',
			prop: 'firstYearUsed',
			width: 100,
			dict: [
				{ label: '已使用', value: 1, type: 'info' },
				{ label: '未使用', value: 0, type: 'success' }
			]
		},
		{ label: '更新时间', prop: 'updateTime', minWidth: 170, sortable: 'desc' },
		{
			type: 'op',
			width: 200,
			buttons({ scope }: any) {
				const buttons: any[] = [
					{ label: '延期', type: 'primary', onClick: () => grant(scope.row) }
				];
				if (isActive(scope.row)) {
					buttons.push({ label: '撤销', type: 'danger', onClick: () => revoke(scope.row) });
				}
				return buttons;
			}
		}
	]
});

const Crud = useCrud({ service: service.member.info }, app => {
	app.refresh();
});

const Form = useForm();

function grant(row?: any) {
	Form.value?.open({
		title: row ? `延期会员：${row.nickName || row.phone || row.userId}` : '发放会员',
		width: '560px',
		form: { userId: row?.userId, lifetime: false, days: 31 },
		items: [
			{
				label: '用户',
				prop: 'userId',
				required: true,
				hidden: !!row,
				component: { vm: UserSelect }
			},
			{
				label: '终身会员',
				prop: 'lifetime',
				component: { name: 'el-switch' }
			},
			{
				label: '天数',
				prop: 'days',
				required: true,
				hidden: ({ scope }: any) => scope.lifetime,
				component: { name: 'el-input-number', props: { min: 1, max: 36500 } }
			},
			{
				label: '备注',
				prop: 'remark',
				component: {
					name: 'el-input',
					props: { type: 'textarea', rows: 2, placeholder: '例：活动赠送、客诉补偿' }
				}
			}
		],
		on: {
			submit: async (data: any, { close, done }: any) => {
				try {
					await api.grant({
						userId: data.userId,
						lifetime: !!data.lifetime,
						days: data.lifetime ? undefined : data.days,
						remark: data.remark
					});
					ElMessage.success('会员已发放');
					close();
					Crud.value?.refresh();
				} catch (error: any) {
					ElMessage.error(error?.message || '发放失败');
					done();
				}
			}
		}
	});
}

async function revoke(row: any) {
	try {
		const { value } = await ElMessageBox.prompt(
			'撤销后会员立即失效（含终身），请填写原因',
			`撤销会员：${row.nickName || row.phone || row.userId}`,
			{
				type: 'warning',
				confirmButtonText: '确认撤销',
				inputPattern: /\S+/,
				inputErrorMessage: '请填写撤销原因'
			}
		);
		await api.revoke({ userId: row.userId, remark: value });
		ElMessage.success('已撤销');
		Crud.value?.refresh();
	} catch (error: any) {
		if (error === 'cancel' || error === 'close') return;
		ElMessage.error(error?.message || '撤销失败');
	}
}
</script>
