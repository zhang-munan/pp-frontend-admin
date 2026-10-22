<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'order-product'
});

import { useCool } from '/@/cool';
import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { centsToYuanFields, formatYuan, yuanToCentsFields } from '../utils/money';

const { service } = useCool();

const planTypes = [
	{ label: '月卡', value: 0, type: 'info' },
	{ label: '年卡', value: 1, type: 'success' },
	{ label: '终身', value: 2, type: 'warning' }
];

const PRICE_FIELDS = ['originalPrice', 'sellPrice', 'firstPrice'];

const Crud = useCrud({ service: service.order.product }, app => {
	app.refresh();
});

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ prop: 'id', label: 'ID', width: 80 },
		{ prop: 'name', label: '套餐名称', minWidth: 120 },
		{ prop: 'planType', label: '类型', width: 90, dict: planTypes },
		{
			prop: 'durationDays',
			label: '会员天数',
			width: 100,
			align: 'center',
			formatter: (row: any) => (row.planType === 2 ? '终身' : row.durationDays)
		},
		{ prop: 'subtitle', label: '副标题', minWidth: 140, showOverflowTooltip: true },
		{ prop: 'tagContent', label: '角标', width: 100 },
		{ prop: 'originalPrice', label: '划线价(元)', width: 110, align: 'right', formatter: (row: any) => formatYuan(row.originalPrice) },
		{ prop: 'sellPrice', label: '售价(元)', width: 100, align: 'right', formatter: (row: any) => formatYuan(row.sellPrice) },
		{
			prop: 'firstPrice',
			label: '首年价(元)',
			width: 110,
			align: 'right',
			formatter: (row: any) => (Number(row.firstPrice) > 0 ? formatYuan(row.firstPrice) : '—')
		},
		{
			prop: 'status',
			label: '状态',
			width: 90,
			dict: [
				{ label: '下架', value: 0, type: 'danger' },
				{ label: '上架', value: 1, type: 'success' }
			]
		},
		{ prop: 'sortOrder', label: '排序', width: 80, align: 'center' },
		{ prop: 'createTime', label: '创建时间', width: 170, sortable: true },
		{ type: 'op', buttons: ['edit', 'delete'] }
	]
});

const Upsert = useUpsert({
	items: [
		{
			prop: 'name',
			label: '套餐名称',
			required: true,
			span: 12,
			component: { name: 'el-input', props: { placeholder: '例：Plus 年卡', clearable: true } }
		},
		{
			prop: 'planType',
			label: '套餐类型',
			required: true,
			span: 12,
			value: 0,
			component: { name: 'el-radio-group', options: planTypes }
		},
		{
			prop: 'durationDays',
			label: '会员天数',
			span: 12,
			value: 31,
			component: {
				name: 'el-input-number',
				props: { min: 0, max: 36500, placeholder: '终身卡可填 0' }
			}
		},
		{
			prop: 'subtitle',
			label: '副标题',
			span: 12,
			component: { name: 'el-input', props: { placeholder: '例：首年 15 元', clearable: true } }
		},
		{
			prop: 'tagContent',
			label: '角标内容',
			span: 12,
			component: { name: 'el-input', props: { maxlength: 30, clearable: true } }
		},
		{
			prop: 'tagBackgroundColor',
			label: '角标背景色',
			span: 12,
			component: { name: 'el-color-picker', props: { predefine: ['#F5A524', '#329E6B', '#E55252'] } }
		},
		{
			prop: 'originalPrice',
			label: '划线价(元)',
			span: 8,
			component: { name: 'el-input-number', props: { min: 0, precision: 2, step: 1 } }
		},
		{
			prop: 'sellPrice',
			label: '售价(元)',
			required: true,
			span: 8,
			component: { name: 'el-input-number', props: { min: 0.01, precision: 2, step: 1 } }
		},
		{
			prop: 'firstPrice',
			label: '首年价(元)',
			span: 8,
			value: 0,
			component: {
				name: 'el-input-number',
				props: { min: 0, precision: 2, step: 1, placeholder: '仅年卡有效，0 为不优惠' }
			}
		},
		{
			prop: 'sortOrder',
			label: '排序',
			span: 12,
			value: 0,
			component: { name: 'el-input-number', props: { min: 0, max: 9999 } }
		},
		{
			prop: 'status',
			label: '上架状态',
			span: 12,
			value: 1,
			component: {
				name: 'el-radio-group',
				options: [
					{ label: '上架', value: 1 },
					{ label: '下架', value: 0 }
				]
			}
		},
		{
			prop: 'description',
			label: '权益描述',
			component: { name: 'el-input', props: { type: 'textarea', rows: 3 } }
		}
	],
	onOpened(data) {
		centsToYuanFields(data, PRICE_FIELDS);
	},
	onSubmit(data, { next }) {
		next(yuanToCentsFields(data, PRICE_FIELDS));
	}
});

const Search = useSearch({
	items: [
		{
			label: '类型',
			prop: 'planType',
			component: { name: 'el-select', props: { clearable: true }, options: planTypes }
		},
		{
			label: '状态',
			prop: 'status',
			component: {
				name: 'el-select',
				props: { clearable: true },
				options: [
					{ label: '上架', value: 1 },
					{ label: '下架', value: 0 }
				]
			}
		}
	]
});
</script>
