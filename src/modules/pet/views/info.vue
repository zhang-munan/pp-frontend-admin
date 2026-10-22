<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-multi-delete-btn />
			<cl-filter label="物种">
				<cl-select prop="species" :options="speciesOptions" />
			</cl-filter>
			<cl-filter label="状态">
				<cl-select prop="status" :options="petStatusOptions" />
			</cl-filter>
			<cl-filter label="家庭共享">
				<cl-select prop="shared" :options="yesNoOptions" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="昵称 / 品种 / 主人昵称 / 手机号" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert" />

		<el-drawer v-model="drawer.visible" :title="drawer.title" size="70%" destroy-on-close>
			<div class="drawer-head">
				<el-radio-group v-model="drawer.type" size="small" @change="loadHealth">
					<el-radio-button :value="-1">全部</el-radio-button>
					<el-radio-button v-for="t in healthTypeOptions" :key="t.value" :value="t.value">
						{{ t.label }}
					</el-radio-button>
				</el-radio-group>
				<span class="count">共 {{ drawer.list.length }} 条</span>
			</div>
			<el-table v-loading="drawer.loading" :data="drawer.list" border size="small">
				<el-table-column label="类型" width="80">
					<template #default="{ row }">
						<el-tag :type="typeOf(row.type).type" size="small">{{ typeOf(row.type).label }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="项目" prop="itemName" min-width="120" show-overflow-tooltip />
				<el-table-column label="日期" prop="occurDate" width="110" />
				<el-table-column label="数值/剂量" width="110">
					<template #default="{ row }">{{ healthValue(row) }}</template>
				</el-table-column>
				<el-table-column label="下次" prop="nextDate" width="110" />
				<el-table-column label="医院" prop="hospital" min-width="110" show-overflow-tooltip />
				<el-table-column label="诊断" prop="diagnosis" min-width="120" show-overflow-tooltip />
				<el-table-column label="费用" prop="cost" width="80" />
				<el-table-column label="备注" prop="remark" min-width="140" show-overflow-tooltip />
				<el-table-column label="附件" width="120">
					<template #default="{ row }">
						<el-image
							v-for="(img, i) in parseList(row.attachments)"
							:key="img"
							:src="img"
							:preview-src-list="parseList(row.attachments)"
							:initial-index="i"
							preview-teleported
							class="thumb"
						/>
					</template>
				</el-table-column>
			</el-table>
		</el-drawer>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'pet-info'
});

import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import {
	speciesOptions,
	genderOptions,
	petStatusOptions,
	healthTypeOptions,
	yesNoOptions,
	sourceTypeOptions,
	parseList,
	healthValue
} from '../utils/options';

const { service } = useCool();

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: 'ID', prop: 'id', width: 70 },
		{ label: '头像', prop: 'avatar', width: 70, component: { name: 'cl-avatar' } },
		{ label: '昵称', prop: 'name', minWidth: 100 },
		{ label: '物种', prop: 'species', width: 80, dict: speciesOptions },
		{ label: '品种', prop: 'breed', minWidth: 110, showOverflowTooltip: true },
		{ label: '性别', prop: 'gender', width: 70, dict: genderOptions },
		{ label: '生日', prop: 'birthday', width: 110 },
		{ label: '到家日', prop: 'arriveDate', width: 110 },
		{ label: '状态', prop: 'status', width: 90, dict: petStatusOptions },
		{ label: '共享', prop: 'shared', width: 70, dict: yesNoOptions },
		{ label: '来源', prop: 'sourceType', width: 90, dict: sourceTypeOptions },
		{ label: '主人', prop: 'nickName', minWidth: 100, showOverflowTooltip: true },
		{ label: '手机号', prop: 'phone', minWidth: 120 },
		{ label: '创建时间', prop: 'createTime', width: 170, sortable: 'desc' },
		{
			type: 'op',
			width: 230,
			buttons: [
				{
					label: '健康记录',
					type: 'success',
					onClick({ scope }: any) {
						openHealth(scope.row);
					}
				},
				'edit',
				'delete'
			]
		}
	]
});

const Upsert = useUpsert({
	items: [
		{ prop: 'avatar', label: '头像', component: { name: 'cl-upload' } },
		{ prop: 'name', label: '昵称', required: true, component: { name: 'el-input', props: { maxlength: 50 } } },
		{ prop: 'species', label: '物种', component: { name: 'el-select', options: speciesOptions } },
		{ prop: 'breed', label: '品种', component: { name: 'el-input', props: { maxlength: 100 } } },
		{ prop: 'gender', label: '性别', component: { name: 'el-radio-group', options: genderOptions } },
		{
			prop: 'birthday',
			label: '生日',
			component: { name: 'el-date-picker', props: { type: 'date', valueFormat: 'YYYY-MM-DD' } }
		},
		{
			prop: 'arriveDate',
			label: '到家日',
			component: { name: 'el-date-picker', props: { type: 'date', valueFormat: 'YYYY-MM-DD' } }
		},
		{
			prop: 'neutered',
			label: '绝育',
			component: {
				name: 'el-radio-group',
				options: [
					{ label: '未绝育', value: 0 },
					{ label: '已绝育', value: 1 }
				]
			}
		},
		{ prop: 'status', label: '状态', component: { name: 'el-radio-group', options: petStatusOptions } },
		{
			prop: 'description',
			label: '简介',
			component: { name: 'el-input', props: { type: 'textarea', rows: 3, maxlength: 500 } }
		}
	]
});

const Crud = useCrud({ service: service.pet.info }, app => {
	app.refresh();
});

const drawer = reactive({
	visible: false,
	loading: false,
	title: '',
	petId: 0,
	type: -1,
	list: [] as any[]
});

function typeOf(type: number): { label: string; type: any } {
	return healthTypeOptions.find(e => e.value === type) || { label: '-', type: 'info' };
}

function openHealth(row: any) {
	drawer.title = `健康记录：${row.name}`;
	drawer.petId = row.id;
	drawer.type = -1;
	drawer.list = [];
	drawer.visible = true;
	loadHealth();
}

async function loadHealth() {
	drawer.loading = true;
	try {
		const params: any = { petId: drawer.petId };
		if (drawer.type >= 0) params.type = drawer.type;
		drawer.list = await (service.pet.health as any).list(params);
	} catch (e: any) {
		ElMessage.error(e?.message || '加载失败');
	} finally {
		drawer.loading = false;
	}
}
</script>

<style lang="scss" scoped>
.drawer-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 12px;

	.count {
		color: var(--el-text-color-secondary);
		font-size: 13px;
	}
}

.thumb {
	width: 32px;
	height: 32px;
	margin-right: 4px;
	border-radius: 4px;
}
</style>
