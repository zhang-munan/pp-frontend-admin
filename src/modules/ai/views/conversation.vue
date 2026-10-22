<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-multi-delete-btn />
			<cl-filter label="模式">
				<cl-select prop="mode" :options="modeOptions" />
			</cl-filter>
			<cl-filter label="分类">
				<cl-select prop="kind" :options="kindOptions" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="标题 / 摘要 / 昵称 / 手机号" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<el-drawer v-model="drawer.visible" :title="drawer.title" size="55%" destroy-on-close>
			<div v-loading="drawer.loading" class="chat">
				<div
					v-for="m in drawer.list"
					:key="m.id"
					class="bubble"
					:class="{ user: m.role === 0, blocked: m.secStatus === 1 }"
				>
					<div class="meta">
						<span>{{ m.role === 0 ? '用户' : '助手' }}</span>
						<span>{{ m.createTime }}</span>
						<el-tag v-if="m.secStatus === 1" type="danger" size="small">内容安全拦截</el-tag>
						<span v-if="m.role === 1 && m.model" class="model">
							{{ m.model }} · {{ m.promptTokens || 0 }}/{{ m.completionTokens || 0 }} tokens
						</span>
					</div>
					<el-image
						v-if="m.image"
						:src="m.image"
						:preview-src-list="[m.image]"
						preview-teleported
						class="image"
					/>
					<div class="content">{{ m.content }}</div>
					<pre v-if="m.structured" class="structured">{{ pretty(m.structured) }}</pre>
				</div>
				<el-empty v-if="!drawer.loading && !drawer.list.length" description="暂无消息" />
			</div>
		</el-drawer>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'ai-conversation'
});

import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useCrud, useTable } from '@cool-vue/crud';
import { useCool } from '/@/cool';

const { service } = useCool();

const modeOptions = [
	{ label: '直接提问', value: 0, type: 'info' },
	{ label: '宠物问诊', value: 1, type: 'warning' },
	{ label: '植物诊断', value: 2, type: 'success' },
	{ label: '品种识别', value: 3, type: 'primary' }
];

const kindOptions = [
	{ label: '综合', value: 0 },
	{ label: '宠物', value: 1 },
	{ label: '植物', value: 2 }
];

const targetOptions = [
	{ label: '-', value: 0, type: 'info' },
	{ label: '宠物', value: 1, type: 'warning' },
	{ label: '植物', value: 2, type: 'success' }
];

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: 'ID', prop: 'id', width: 80 },
		{ label: '用户', prop: 'nickName', minWidth: 100, showOverflowTooltip: true },
		{ label: '手机号', prop: 'phone', minWidth: 120 },
		{ label: '模式', prop: 'mode', width: 100, dict: modeOptions },
		{ label: '分类', prop: 'kind', width: 70, dict: kindOptions },
		{ label: '关联档案', prop: 'targetType', width: 90, dict: targetOptions },
		{ label: '标题', prop: 'title', minWidth: 160, showOverflowTooltip: true },
		{ label: '最近回答', prop: 'summary', minWidth: 220, showOverflowTooltip: true },
		{ label: '消息数', prop: 'messageCount', width: 80 },
		{ label: '最近消息', prop: 'lastTime', width: 170, sortable: 'custom' },
		{
			type: 'op',
			width: 160,
			buttons: [
				{
					label: '查看对话',
					type: 'primary',
					onClick({ scope }: any) {
						openChat(scope.row);
					}
				},
				'delete'
			]
		}
	]
});

const Crud = useCrud({ service: service.ai.conversation }, app => {
	app.refresh();
});

const drawer = reactive({
	visible: false,
	loading: false,
	title: '',
	list: [] as any[]
});

function pretty(value: string) {
	try {
		return JSON.stringify(JSON.parse(value), null, 2);
	} catch {
		return value;
	}
}

async function openChat(row: any) {
	drawer.title = `${row.title || '对话'}（${row.nickName || row.userId}）`;
	drawer.list = [];
	drawer.visible = true;
	drawer.loading = true;
	try {
		drawer.list = await (service.ai.message as any).list({ conversationId: row.id });
	} catch (e: any) {
		ElMessage.error(e?.message || '加载失败');
	} finally {
		drawer.loading = false;
	}
}
</script>

<style lang="scss" scoped>
.chat {
	min-height: 200px;
}

.bubble {
	margin-bottom: 14px;
	padding: 10px 12px;
	border-radius: 8px;
	background-color: var(--el-fill-color-light);

	&.user {
		background-color: var(--el-color-primary-light-9);
	}

	&.blocked {
		border: 1px solid var(--el-color-danger-light-5);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 6px;
		font-size: 12px;
		color: var(--el-text-color-secondary);

		.model {
			margin-left: auto;
		}
	}

	.image {
		width: 120px;
		height: 120px;
		margin-bottom: 6px;
		border-radius: 6px;
	}

	.content {
		white-space: pre-wrap;
		line-height: 1.6;
	}

	.structured {
		margin: 8px 0 0;
		padding: 8px;
		max-height: 240px;
		overflow: auto;
		font-size: 12px;
		background-color: var(--el-bg-color);
		border-radius: 4px;
	}
}
</style>
