<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-multi-delete-btn />
			<cl-filter label="类型">
				<cl-select prop="type" :options="typeOptions" />
			</cl-filter>
			<cl-filter label="状态">
				<cl-select prop="status" :options="statusOptions" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="内容 / 联系方式 / 昵称 / 手机号" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table">
				<template #column-images="{ scope }">
					<template v-if="getImages(scope.row).length">
						<el-image
							v-for="(img, index) in getImages(scope.row)"
							:key="img"
							:src="img"
							:preview-src-list="getImages(scope.row)"
							:initial-index="index"
							preview-teleported
							class="thumb"
						/>
					</template>
					<span v-else class="none">无</span>
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<el-dialog v-model="replyDialog.visible" title="回复反馈" width="600px" destroy-on-close>
			<el-form label-width="80px">
				<el-form-item label="反馈内容">
					<div class="content">{{ replyDialog.row?.content }}</div>
				</el-form-item>
				<el-form-item label="回复内容">
					<el-input
						v-model="replyDialog.reply"
						type="textarea"
						:rows="5"
						placeholder="回复会以站内消息通知用户"
						maxlength="1000"
						show-word-limit
					/>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="replyDialog.visible = false">取消</el-button>
				<el-button type="primary" :loading="replyDialog.loading" @click="submitReply">
					提交
				</el-button>
			</template>
		</el-dialog>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'feedback-list'
});

import { useCrud, useTable } from '@cool-vue/crud';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive } from 'vue';
import { useCool } from '/@/cool';

const { service } = useCool();
const api = service.feedback.info as any;

const typeOptions = [
	{ label: '功能建议', value: 0, type: 'success' },
	{ label: '遇到问题', value: 1, type: 'danger' },
	{ label: '投诉举报', value: 2, type: 'warning' },
	{ label: '其他', value: 3, type: 'info' }
];

const statusOptions = [
	{ label: '待处理', value: 0, type: 'warning' },
	{ label: '已回复', value: 1, type: 'success' },
	{ label: '已关闭', value: 2, type: 'info' }
];

function getImages(row: any): string[] {
	const images = row?.images;
	if (Array.isArray(images)) {
		return images.filter(Boolean);
	}
	if (typeof images === 'string' && images) {
		try {
			const parsed = JSON.parse(images);
			return Array.isArray(parsed) ? parsed.filter(Boolean) : [images];
		} catch {
			return [images];
		}
	}
	return [];
}

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: 'ID', prop: 'id', width: 70 },
		{ label: '用户昵称', prop: 'userNickName', minWidth: 100 },
		{ label: '手机号', prop: 'userPhone', minWidth: 120 },
		{ label: '反馈类型', prop: 'type', width: 100, dict: typeOptions },
		{ label: '反馈内容', prop: 'content', minWidth: 220, showOverflowTooltip: true },
		{ label: '截图', prop: 'images', width: 170 },
		{ label: '联系方式', prop: 'contact', minWidth: 130 },
		{ label: '状态', prop: 'status', width: 90, dict: statusOptions },
		{ label: '管理员回复', prop: 'reply', minWidth: 180, showOverflowTooltip: true },
		{ label: '回复时间', prop: 'replyTime', width: 170 },
		{ label: '提交时间', prop: 'createTime', width: 170, sortable: 'desc' },
		{
			type: 'op',
			label: '操作',
			width: 220,
			fixed: 'right',
			buttons({ scope }: any) {
				const row = scope.row;
				const buttons: any[] = [
					{ label: row.status === 1 ? '修改回复' : '回复', type: 'primary', onClick: () => openReply(row) }
				];
				if (row.status !== 2) {
					buttons.push({ label: '关闭', type: 'info', onClick: () => setStatus(row, 2) });
				} else {
					buttons.push({ label: '重新打开', type: 'warning', onClick: () => setStatus(row, 0) });
				}
				buttons.push({ label: '删除', type: 'danger', onClick: () => deleteItem(row) });
				return buttons;
			}
		}
	]
});

const Crud = useCrud({ service: service.feedback.info }, app => {
	app.refresh();
});

const replyDialog = reactive({
	visible: false,
	loading: false,
	row: null as any,
	reply: ''
});

function openReply(row: any) {
	replyDialog.row = row;
	replyDialog.reply = row.reply || '';
	replyDialog.visible = true;
}

async function submitReply() {
	if (!replyDialog.reply.trim()) {
		ElMessage.warning('回复内容不能为空');
		return;
	}
	replyDialog.loading = true;
	try {
		await api.reply({ id: replyDialog.row.id, reply: replyDialog.reply.trim() });
		ElMessage.success('回复成功');
		replyDialog.visible = false;
		Crud.value?.refresh();
	} catch (e: any) {
		ElMessage.error(e?.message || '操作失败');
	} finally {
		replyDialog.loading = false;
	}
}

async function setStatus(row: any, status: number) {
	try {
		await api.updateStatus({ id: row.id, status });
		ElMessage.success('状态已更新');
		Crud.value?.refresh();
	} catch (e: any) {
		ElMessage.error(e?.message || '操作失败');
	}
}

async function deleteItem(row: any) {
	try {
		await ElMessageBox.confirm('确认删除该条反馈吗？', '提示', { type: 'warning' });
		await api.delete({ ids: [row.id] });
		ElMessage.success('已删除');
		Crud.value?.refresh();
	} catch (e: any) {
		if (e !== 'cancel' && e !== 'close') {
			ElMessage.error(e?.message || '删除失败');
		}
	}
}
</script>

<style lang="scss" scoped>
.thumb {
	width: 48px;
	height: 48px;
	margin-right: 4px;
	border-radius: 4px;
	object-fit: cover;
}

.none {
	color: var(--el-text-color-placeholder);
}

.content {
	white-space: pre-wrap;
	line-height: 1.6;
	color: var(--el-text-color-regular);
}
</style>
