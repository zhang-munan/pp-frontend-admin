<template>
	<div v-loading="loading" class="dashboard">
		<div class="toolbar">
			<span class="range" v-if="data">统计区间 {{ data.range.start }} ~ {{ data.range.end }}</span>
			<el-radio-group v-model="days" size="small" @change="load">
				<el-radio-button :value="7">近 7 天</el-radio-button>
				<el-radio-button :value="30">近 30 天</el-radio-button>
				<el-radio-button :value="90">近 90 天</el-radio-button>
			</el-radio-group>
			<el-button size="small" @click="load">刷新</el-button>
		</div>

		<template v-if="data">
			<el-row :gutter="12">
				<el-col v-for="card in cards" :key="card.label" :xs="12" :sm="8" :lg="4">
					<div class="card">
						<div class="label">{{ card.label }}</div>
						<div class="value">{{ card.value }}</div>
						<div class="sub">{{ card.sub }}</div>
					</div>
				</el-col>
			</el-row>

			<div class="pending">
				<div class="item" @click="go('/maoyu/order')">
					<span>待审批退款</span>
					<b :class="{ warn: data.pending.refund > 0 }">{{ data.pending.refund }}</b>
				</div>
				<div class="item" @click="go('/maoyu/feedback')">
					<span>待处理反馈</span>
					<b :class="{ warn: data.pending.feedback > 0 }">{{ data.pending.feedback }}</b>
				</div>
				<div class="item" @click="go('/maoyu/species')">
					<span>待审核内容（品种/攻略/急救）</span>
					<b :class="{ warn: data.pending.review > 0 }">{{ data.pending.review }}</b>
				</div>
			</div>

			<el-row :gutter="12">
				<el-col :xs="24" :lg="14">
					<div class="panel">
						<div class="title">用户与活跃</div>
						<v-chart class="chart" :option="userChart" autoresize />
					</div>
				</el-col>
				<el-col :xs="24" :lg="10">
					<div class="panel">
						<div class="title">订单收入（元）</div>
						<v-chart class="chart" :option="revenueChart" autoresize />
					</div>
				</el-col>
			</el-row>
		</template>
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'dashboard'
});

import { computed, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useCool } from '/@/cool';
import { formatYuan } from '/$/order/utils/money';

const { service, router } = useCool();

const days = ref(7);
const loading = ref(false);
const data = ref<any>(null);

async function load() {
	loading.value = true;
	try {
		data.value = await (service as any).care.dashboard.overview({ days: days.value });
	} catch (e: any) {
		ElMessage.error(e?.message || '看板加载失败');
	} finally {
		loading.value = false;
	}
}

function go(path: string) {
	router.push(path);
}

const cards = computed(() => {
	const d = data.value;
	if (!d) return [];
	return [
		{ label: '用户总数', value: d.users.total, sub: `今日新增 ${d.users.today}` },
		{ label: '今日活跃', value: d.users.active, sub: '当日有记录或 AI 提问' },
		{
			label: '档案创建率',
			value: `${d.archive.rate}%`,
			sub: `${d.archive.users} 人建档 · ${d.archive.pets} 宠 / ${d.archive.plants} 植`
		},
		{
			label: '今日收入',
			value: `¥${formatYuan(d.revenue.today.amount)}`,
			sub: `${d.revenue.today.count} 笔 · 本月 ¥${formatYuan(d.revenue.month.amount)}`
		},
		{
			label: '累计收入',
			value: `¥${formatYuan(d.revenue.total.amount)}`,
			sub: `${d.revenue.total.count} 笔已支付订单`
		},
		{
			label: '会员转化率',
			value: `${d.member.rate}%`,
			sub: `付费 ${d.member.paidUsers} 人 · 有效会员 ${d.member.active}`
		}
	];
});

const userChart = computed(() => {
	const trend = data.value?.trend || [];
	return {
		tooltip: { trigger: 'axis' },
		legend: { data: ['新增用户', '活跃用户', '新建档案'] },
		grid: { left: 40, right: 20, top: 40, bottom: 30 },
		xAxis: { type: 'category', data: trend.map((e: any) => e.date.slice(5)) },
		yAxis: { type: 'value', minInterval: 1 },
		series: [
			{ name: '新增用户', type: 'line', smooth: true, data: trend.map((e: any) => e.newUsers) },
			{ name: '活跃用户', type: 'line', smooth: true, data: trend.map((e: any) => e.active) },
			{ name: '新建档案', type: 'bar', barMaxWidth: 16, data: trend.map((e: any) => e.archives) }
		]
	};
});

const revenueChart = computed(() => {
	const trend = data.value?.trend || [];
	return {
		tooltip: { trigger: 'axis' },
		legend: { data: ['收入', '订单数'] },
		grid: { left: 50, right: 40, top: 40, bottom: 30 },
		xAxis: { type: 'category', data: trend.map((e: any) => e.date.slice(5)) },
		yAxis: [
			{ type: 'value', name: '元' },
			{ type: 'value', name: '笔', minInterval: 1 }
		],
		series: [
			{
				name: '收入',
				type: 'bar',
				barMaxWidth: 18,
				data: trend.map((e: any) => Number(formatYuan(e.revenue)))
			},
			{ name: '订单数', type: 'line', yAxisIndex: 1, smooth: true, data: trend.map((e: any) => e.orders) }
		]
	};
});

onMounted(load);
</script>

<style lang="scss" scoped>
.dashboard {
	padding: 12px;
	min-height: 100%;
	box-sizing: border-box;
}

.toolbar {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 12px;

	.range {
		margin-right: auto;
		font-size: 13px;
		color: var(--el-text-color-secondary);
	}
}

.card,
.panel,
.pending {
	background-color: var(--el-bg-color);
	border-radius: 8px;
	margin-bottom: 12px;
}

.card {
	padding: 16px;

	.label {
		font-size: 13px;
		color: var(--el-text-color-secondary);
	}

	.value {
		margin: 8px 0 4px;
		font-size: 24px;
		font-weight: 600;
	}

	.sub {
		font-size: 12px;
		color: var(--el-text-color-secondary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}

.pending {
	display: flex;
	padding: 4px 0;

	.item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		cursor: pointer;
		font-size: 13px;

		& + .item {
			border-left: 1px solid var(--el-border-color-lighter);
		}

		b {
			font-size: 18px;

			&.warn {
				color: var(--el-color-danger);
			}
		}
	}
}

.panel {
	padding: 12px 16px;

	.title {
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 8px;
	}

	.chart {
		height: 300px;
	}
}
</style>
