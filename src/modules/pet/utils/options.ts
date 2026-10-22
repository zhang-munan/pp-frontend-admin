export const speciesOptions = ['猫', '狗', '兔', '仓鼠', '鸟', '鱼', '爬宠', '其他'].map((label, value) => ({
	label,
	value
}));

export const genderOptions = [
	{ label: '未知', value: 0, type: 'info' },
	{ label: '公', value: 1, type: 'primary' },
	{ label: '母', value: 2, type: 'danger' }
];

export const petStatusOptions = [
	{ label: '正常', value: 0, type: 'success' },
	{ label: '已离世', value: 1, type: 'info' },
	{ label: '已送养', value: 2, type: 'warning' }
];

export const healthTypeOptions = [
	{ label: '疫苗', value: 0, type: 'success' },
	{ label: '驱虫', value: 1, type: 'primary' },
	{ label: '体重', value: 2, type: 'info' },
	{ label: '用药', value: 3, type: 'warning' },
	{ label: '就医', value: 4, type: 'danger' },
	{ label: '日常', value: 5, type: 'info' }
];

export const sourceTypeOptions = [
	{ label: '用户录入', value: 0, type: 'info' },
	{ label: 'AI识别', value: 1, type: 'primary' },
	{ label: '商城订单', value: 2, type: 'warning' },
	{ label: '商家服务', value: 3, type: 'success' }
];

export const yesNoOptions = [
	{ label: '是', value: 1, type: 'success' },
	{ label: '否', value: 0, type: 'info' }
];

export function parseList(value: any): string[] {
	if (Array.isArray(value)) return value.filter(Boolean);
	if (typeof value !== 'string' || !value) return [];
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed.filter(Boolean) : [value];
	} catch {
		return value.split(',').filter(Boolean);
	}
}

export function healthValue(row: any) {
	if (row.value === null || row.value === undefined || row.value === '') return row.dosage || '';
	return `${row.value}${row.unit || ''}`;
}
