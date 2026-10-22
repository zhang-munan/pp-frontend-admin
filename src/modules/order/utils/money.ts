type Amount = number | string | null | undefined;

/** 将数据库中的分转换为管理端展示的元。 */
export function formatYuan(amount: Amount): string {
	const cents = Number(amount);
	return Number.isFinite(cents) ? (cents / 100).toFixed(2) : '0.00';
}

/** 将管理端输入的元转换为数据库存储的分。 */
export function yuanToCents(amount: Amount): number {
	const yuan = Number(amount);
	return Number.isFinite(yuan) ? Math.round(yuan * 100) : 0;
}

/** 将指定字段从分转换为元，供编辑表单回显使用。 */
export function centsToYuanFields(data: Record<string, any>, fields: string[]): Record<string, any> {
	fields.forEach(field => {
		if (data[field] !== null && data[field] !== undefined && data[field] !== '') {
			data[field] = Number(formatYuan(data[field]));
		}
	});
	return data;
}

/** 将指定字段从元转换为分，供表单提交使用。 */
export function yuanToCentsFields(data: Record<string, any>, fields: string[]): Record<string, any> {
	return fields.reduce(
		(result, field) => ({
			...result,
			[field]:
				data[field] === null || data[field] === undefined || data[field] === ''
					? data[field]
					: yuanToCents(data[field])
		}),
		{ ...data }
	);
}
