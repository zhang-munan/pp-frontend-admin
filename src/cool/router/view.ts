// 与动态路由注册共用同一份页面映射，避免首页选中尚未实现的菜单。
const files = import.meta.glob(['/src/modules/*/{views,pages}/**/*', '!**/components']);

export function resolveView(viewPath?: string) {
	if (!viewPath) {
		return undefined;
	}

	if (viewPath.startsWith('http')) {
		return () => import('/$/base/views/frame.vue');
	}

	return files['/src/' + viewPath.replace('cool/', '')];
}
