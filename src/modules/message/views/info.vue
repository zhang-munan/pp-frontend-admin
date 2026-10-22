<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<el-button type="primary" @click="send">发送系统消息</el-button>
			<el-button type="warning" plain :loading="running" @click="runReminder">立即执行提醒</el-button>
			<cl-multi-delete-btn />
			<cl-filter label="类型">
				<cl-select prop="type" :options="typeOptions" />
			</cl-filter>
			<cl-filter label="分类">
				<cl-select prop="category" :options="categoryOptions" />
			</cl-filter>
			<cl-filter label="推送">
				<cl-select prop="pushStatus" :options="pushStatusOptions" />
			</cl-filter>
			<cl-filter label="已读">
				<cl-select prop="readFlag" :options="readOptions" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="标题 / 昵称 / 手机号" />
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
	name: 'message-info'
});

import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCrud, useForm, useTable } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import UserSelect from '/$/user/components/user-select.vue';

const { service } = useCool();
const api = service.message.info as any;

const typeOptions = [
	{ label: '提醒', value: 0, type: 'warning' },
	{ label: '系统', value: 1, type: 'primary' }
];

const categoryOptions = [
	['water', '浇水'],
	['fertilize', '施肥'],
	['vaccine', '疫苗'],
	['deworm', '驱虫'],
	['medication', '用药'],
	['member', '会员'],
	['order', '订单'],
	['family', '家庭'],
	['feedback', '反馈'],
	['system', '系统']
].map(([value, label]) => ({ label, value }));

const pushStatusOptions = [
	{ label: '无需推送', value: 0, type: 'info' },
	{ label: '已推送', value: 1, type: 'success' },
	{ label: '推送失败', value: 2, type: 'danger' },
	{ label: '未授权', value: 3, type: 'warning' },
	{ label: '已关闭通知', value: 4, type: 'info' }
];

const pushChannelOptions = [
	{ label: '-', value: 0, type: 'info' },
	{ label: '小程序订阅', value: 1, type: 'success' },
	{ label: '服务号', value: 2, type: 'primary' }
];

const readOptions = [
	{ label: '未读', value: 0, type: 'warning' },
	{ label: '已读', value: 1, type: 'info' }
];

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: 'ID', prop: 'id', width: 80 },
		{ label: '用户', prop: 'nickName', minWidth: 100, showOverflowTooltip: true },
		{ label: '手机号', prop: 'phone', minWidth: 120 },
		{ label: '类型', prop: 'type', width: 70, dict: typeOptions },
		{ label: '分类', prop: 'category', width: 80, dict: categoryOptions },
		{ label: '标题', prop: 'title', minWidth: 150, showOverflowTooltip: true },
		{ label: '内容', prop: 'content', minWidth: 220, showOverflowTooltip: true },
		{ label: '跳转页面', prop: 'page', minWidth: 160, showOverflowTooltip: true },
		{ label: '已读', prop: 'readFlag', width: 70, dict: readOptions },
		{ label: '推送状态', prop: 'pushStatus', width: 100, dict: pushStatusOptions },
		{ label: '推送渠道', prop: 'pushChannel', width: 100, dict: pushChannelOptions },
		{ label: '失败原因', prop: 'pushError', minWidth: 160, showOverflowTooltip: true },
		{ label: '创建时间', prop: 'createTime', width: 170, sortable: 'desc' },
		{ type: 'op', buttons: ['delete'] }
	]
});

const Crud = useCrud({ service: service.message.info }, app => {
	app.refresh();
});

const Form = useForm();

function send() {
	Form.value?.open({
		title: '发送系统消息',
		width: '600px',
		form: { all: false, userIds: [] },
		items: [
			{ label: '全部用户', prop: 'all', component: { name: 'el-switch' } },
			{
				label: '接收用户',
				prop: 'userIds',
				hidden: ({ scope }: any) => scope.all,
				component: { vm: UserSelect, props: { multiple: true } }
			},
			{
				label: '标题',
				prop: 'title',
				required: true,
				component: { name: 'el-input', props: { maxlength: 50, showWordLimit: true } }
			},
			{
				label: '内容',
				prop: 'content',
				component: {
					name: 'el-input',
					props: { type: 'textarea', rows: 5, maxlength: 500, showWordLimit: true }
				}
			}
		],
		on: {
			submit: async (data: any, { close, done }: any) => {
				try {
					if (data.all) {
						await ElMessageBox.confirm('将向全部正常状态的用户发送站内消息，确认继续？', '群发确认', {
							type: 'warning'
						});
					} else if (!data.userIds?.length) {
						ElMessage.warning('请选择接收用户');
						return done();
					}
					const res = await api.send({
						all: !!data.all,
						userIds: data.all ? [] : data.userIds,
						title: data.title,
						content: data.content
					});
					ElMessage.success(`已发送 ${res.count} 条`);
					close();
					Crud.value?.refresh();
				} catch (e: any) {
					if (e !== 'cancel' && e !== 'close') ElMessage.error(e?.message || '发送失败');
					done();
				}
			}
		}
	});
}

const running = ref(false);

async function runReminder() {
	try {
		await ElMessageBox.confirm(
			'将立即按当前时间执行一次每日提醒与用药提醒，已生成过的提醒会自动去重。',
			'执行提醒任务',
			{ type: 'warning' }
		);
		running.value = true;
		const res = await api.runReminder();
		ElMessage.success(`每日提醒 ${res.daily ?? 0} 条，用药提醒 ${res.medication ?? 0} 条`);
		Crud.value?.refresh();
	} catch (e: any) {
		if (e !== 'cancel' && e !== 'close') ElMessage.error(e?.message || '执行失败');
	} finally {
		running.value = false;
	}
}
</script>
