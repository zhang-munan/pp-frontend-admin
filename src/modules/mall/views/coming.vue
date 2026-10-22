<template>
	<div class="coming">
		<el-result icon="info" :title="`${page.title} · 二期开放`" :sub-title="page.desc">
			<template #extra>
				<ul class="plans">
					<li v-for="item in page.plans" :key="item">{{ item }}</li>
				</ul>
			</template>
		</el-result>
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'mall-coming'
});

import { computed } from 'vue';
import { useCool } from '/@/cool';

const { route } = useCool();

const PAGES: Record<string, { title: string; desc: string; plans: string[] }> = {
	merchant: {
		title: '商家管理',
		desc: 'V3.0 引入宠物用品、宠物医疗与园艺商家，当前仅完成数据表预留。',
		plans: ['商家入驻申请与资质审核', '营业状态与平台抽佣比例', '商家服务记录同步到用户档案']
	},
	mall: {
		title: '商城管理',
		desc: 'V3.0 上线养护用品商城，当前仅完成数据表与消息商品卡片位预留。',
		plans: ['商品 SKU 上下架与库存', '提醒消息中推荐对应商品（驱虫药、肥料等）', '商城订单支付、发货与售后']
	}
};

const page = computed(() => (route.path.includes('merchant') ? PAGES.merchant : PAGES.mall));
</script>

<style lang="scss" scoped>
.coming {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background-color: var(--el-bg-color);
	border-radius: 8px;
	filter: grayscale(1);
}

.plans {
	margin: 0;
	padding-left: 18px;
	text-align: left;
	line-height: 2;
	color: var(--el-text-color-secondary);
}
</style>
