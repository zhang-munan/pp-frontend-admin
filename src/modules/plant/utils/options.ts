function plain(labels: string[]) {
	return labels.map((label, value) => ({ label, value }));
}

export const locationOptions = plain(['客厅', '阳台', '卧室', '书房', '办公桌', '厨房', '户外', '其他']);

export const plantStatusOptions = [
	{ label: '正常', value: 0, type: 'success' },
	{ label: '已枯萎', value: 1, type: 'info' },
	{ label: '已送人', value: 2, type: 'warning' }
];

export const careTypeOptions = [
	{ label: '浇水', value: 0, type: 'primary' },
	{ label: '施肥', value: 1, type: 'success' },
	{ label: '换盆', value: 2, type: 'warning' },
	{ label: '拍照', value: 3, type: 'info' },
	{ label: '其他', value: 4, type: 'info' },
	{ label: '晒太阳', value: 5, type: 'warning' }
];

export const lightOptions = plain(['耐阴', '半阴', '散射光', '喜阳']);

export const difficultyOptions = [
	{ label: '新手友好', value: 0, type: 'success' },
	{ label: '一般', value: 1, type: 'primary' },
	{ label: '进阶', value: 2, type: 'danger' }
];

export const speciesStatusOptions = [
	{ label: '待审核', value: 0, type: 'warning' },
	{ label: '已发布', value: 1, type: 'success' },
	{ label: '已驳回', value: 2, type: 'danger' }
];

export const speciesSourceOptions = [
	{ label: '内置', value: 0, type: 'info' },
	{ label: '人工', value: 1, type: 'primary' },
	{ label: 'AI', value: 2, type: 'warning' }
];

export const guideStatusOptions = [
	{ label: '草稿', value: 0, type: 'info' },
	{ label: '待审核', value: 1, type: 'warning' },
	{ label: '已发布', value: 2, type: 'success' }
];

export const guideSourceOptions = [
	{ label: '人工', value: 0, type: 'primary' },
	{ label: 'AI', value: 1, type: 'warning' }
];

export const sectionOptions = plain(['光照', '浇水', '施肥', '换盆', '繁殖', '病害']);

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

export function isCancel(error: any) {
	return error === 'cancel' || error === 'close';
}
