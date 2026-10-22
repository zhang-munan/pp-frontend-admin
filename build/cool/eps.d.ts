declare namespace Eps {
	interface AiConversationEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface AiMessageEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface AiUsageEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysDepartmentEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysLogEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysMenuEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysParamEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysRoleEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysUserEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictTypeEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface FamilyMemberEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface FeedbackInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface MemberInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface MemberLogEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface MessageInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface MessageSubscribeEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface OrderInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ProductInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PetHealthEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PetInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PlantCareEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PlantDiseaseEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PlantGuideEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PlantInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PlantSpeciesEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PluginInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface RecycleDataEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceTypeEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface TaskInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserAddressEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	type json = any;

	interface PagePagination {
		size: number;
		page: number;
		total: number;
		[key: string]: any;
	}

	interface PageResponse<T> {
		pagination: PagePagination;
		list: T[];
		[key: string]: any;
	}

	interface AiConversationPageResponse {
		pagination: PagePagination;
		list: AiConversationEntity[];
	}

	interface AiMessagePageResponse {
		pagination: PagePagination;
		list: AiMessageEntity[];
	}

	interface AiUsagePageResponse {
		pagination: PagePagination;
		list: AiUsageEntity[];
	}

	interface BaseSysLogPageResponse {
		pagination: PagePagination;
		list: BaseSysLogEntity[];
	}

	interface BaseSysMenuPageResponse {
		pagination: PagePagination;
		list: BaseSysMenuEntity[];
	}

	interface BaseSysParamPageResponse {
		pagination: PagePagination;
		list: BaseSysParamEntity[];
	}

	interface BaseSysRolePageResponse {
		pagination: PagePagination;
		list: BaseSysRoleEntity[];
	}

	interface BaseSysUserPageResponse {
		pagination: PagePagination;
		list: BaseSysUserEntity[];
	}

	interface DictInfoPageResponse {
		pagination: PagePagination;
		list: DictInfoEntity[];
	}

	interface DictTypePageResponse {
		pagination: PagePagination;
		list: DictTypeEntity[];
	}

	interface FamilyMemberPageResponse {
		pagination: PagePagination;
		list: FamilyMemberEntity[];
	}

	interface FeedbackInfoPageResponse {
		pagination: PagePagination;
		list: FeedbackInfoEntity[];
	}

	interface MemberInfoPageResponse {
		pagination: PagePagination;
		list: MemberInfoEntity[];
	}

	interface MemberLogPageResponse {
		pagination: PagePagination;
		list: MemberLogEntity[];
	}

	interface MessageInfoPageResponse {
		pagination: PagePagination;
		list: MessageInfoEntity[];
	}

	interface MessageSubscribePageResponse {
		pagination: PagePagination;
		list: MessageSubscribeEntity[];
	}

	interface OrderInfoPageResponse {
		pagination: PagePagination;
		list: OrderInfoEntity[];
	}

	interface OrderProductPageResponse {
		pagination: PagePagination;
		list: ProductInfoEntity[];
	}

	interface PetHealthPageResponse {
		pagination: PagePagination;
		list: PetHealthEntity[];
	}

	interface PetInfoPageResponse {
		pagination: PagePagination;
		list: PetInfoEntity[];
	}

	interface PlantCarePageResponse {
		pagination: PagePagination;
		list: PlantCareEntity[];
	}

	interface PlantDiseasePageResponse {
		pagination: PagePagination;
		list: PlantDiseaseEntity[];
	}

	interface PlantGuidePageResponse {
		pagination: PagePagination;
		list: PlantGuideEntity[];
	}

	interface PlantInfoPageResponse {
		pagination: PagePagination;
		list: PlantInfoEntity[];
	}

	interface PlantSpeciesPageResponse {
		pagination: PagePagination;
		list: PlantSpeciesEntity[];
	}

	interface PluginInfoPageResponse {
		pagination: PagePagination;
		list: PluginInfoEntity[];
	}

	interface RecycleDataPageResponse {
		pagination: PagePagination;
		list: RecycleDataEntity[];
	}

	interface SpaceInfoPageResponse {
		pagination: PagePagination;
		list: SpaceInfoEntity[];
	}

	interface SpaceTypePageResponse {
		pagination: PagePagination;
		list: SpaceTypeEntity[];
	}

	interface TaskInfoPageResponse {
		pagination: PagePagination;
		list: TaskInfoEntity[];
	}

	interface UserAddressPageResponse {
		pagination: PagePagination;
		list: UserAddressEntity[];
	}

	interface UserInfoPageResponse {
		pagination: PagePagination;
		list: UserInfoEntity[];
	}

	interface AiConversation {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<AiConversationEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<AiConversationEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<AiConversationPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { delete: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { delete: boolean; info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface AiMessage {
		/**
		 * info
		 */
		info(data?: any): Promise<AiMessageEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<AiMessageEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<AiMessagePageResponse>;

		/**
		 * 权限标识
		 */
		permission: { info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface AiUsage {
		/**
		 * list
		 */
		list(data?: any): Promise<AiUsageEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<AiUsagePageResponse>;

		/**
		 * 权限标识
		 */
		permission: { list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { list: boolean; page: boolean };

		request: Request;
	}

	interface BaseCoding {
		/**
		 * getModuleTree
		 */
		getModuleTree(data?: any): Promise<any>;

		/**
		 * createCode
		 */
		createCode(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { getModuleTree: string; createCode: string };

		/**
		 * 权限状态
		 */
		_permission: { getModuleTree: boolean; createCode: boolean };

		request: Request;
	}

	interface BaseComm {
		/**
		 * person
		 */
		person(data?: any): Promise<any>;

		/**
		 * personUpdate
		 */
		personUpdate(data?: any): Promise<any>;

		/**
		 * permmenu
		 */
		permmenu(data?: any): Promise<any>;

		/**
		 * upload
		 */
		upload(data?: any): Promise<any>;

		/**
		 * uploadMode
		 */
		uploadMode(data?: any): Promise<any>;

		/**
		 * logout
		 */
		logout(data?: any): Promise<any>;

		/**
		 * program
		 */
		program(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			person: string;
			personUpdate: string;
			permmenu: string;
			upload: string;
			uploadMode: string;
			logout: string;
			program: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			person: boolean;
			personUpdate: boolean;
			permmenu: boolean;
			upload: boolean;
			uploadMode: boolean;
			logout: boolean;
			program: boolean;
		};

		request: Request;
	}

	interface BaseOpen {
		/**
		 * eps
		 */
		eps(data?: any): Promise<any>;

		/**
		 * html
		 */
		html(data?: any): Promise<any>;

		/**
		 * login
		 */
		login(data?: any): Promise<any>;

		/**
		 * captcha
		 */
		captcha(data?: any): Promise<any>;

		/**
		 * refreshToken
		 */
		refreshToken(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			eps: string;
			html: string;
			login: string;
			captcha: string;
			refreshToken: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			eps: boolean;
			html: boolean;
			login: boolean;
			captcha: boolean;
			refreshToken: boolean;
		};

		request: Request;
	}

	interface BaseSysDepartment {
		/**
		 * order
		 */
		order(data?: any): Promise<any>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysDepartmentEntity[]>;

		/**
		 * 权限标识
		 */
		permission: { order: string; add: string; delete: string; update: string; list: string };

		/**
		 * 权限状态
		 */
		_permission: {
			order: boolean;
			add: boolean;
			delete: boolean;
			update: boolean;
			list: boolean;
		};

		request: Request;
	}

	interface BaseSysLog {
		/**
		 * clear
		 */
		clear(data?: any): Promise<any>;

		/**
		 * setKeep
		 */
		setKeep(data?: any): Promise<any>;

		/**
		 * getKeep
		 */
		getKeep(data?: any): Promise<any>;

		/**
		 * page
		 */
		page(data?: any): Promise<BaseSysLogPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { clear: string; setKeep: string; getKeep: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { clear: boolean; setKeep: boolean; getKeep: boolean; page: boolean };

		request: Request;
	}

	interface BaseSysMenu {
		/**
		 * parse
		 */
		parse(data?: any): Promise<any>;

		/**
		 * create
		 */
		create(data?: any): Promise<any>;

		/**
		 * export
		 */
		export(data?: any): Promise<any>;

		/**
		 * import
		 */
		import(data?: any): Promise<any>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysMenuEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysMenuEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<BaseSysMenuPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			parse: string;
			create: string;
			export: string;
			import: string;
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			parse: boolean;
			create: boolean;
			export: boolean;
			import: boolean;
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface BaseSysParam {
		/**
		 * html
		 */
		html(data?: any): Promise<any>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysParamEntity>;

		/**
		 * page
		 */
		page(data?: any): Promise<BaseSysParamPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			html: string;
			add: string;
			delete: string;
			update: string;
			info: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			html: boolean;
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface BaseSysRole {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysRoleEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysRoleEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<BaseSysRolePageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface BaseSysUser {
		/**
		 * move
		 */
		move(data?: any): Promise<any>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysUserEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysUserEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<BaseSysUserPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			move: string;
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			move: boolean;
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface CareDashboard {
		/**
		 * overview
		 */
		overview(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { overview: string };

		/**
		 * 权限状态
		 */
		_permission: { overview: boolean };

		request: Request;
	}

	interface DictInfo {
		/**
		 * data
		 */
		data(data?: any): Promise<any>;

		/**
		 * types
		 */
		types(data?: any): Promise<any>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<DictInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<DictInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<DictInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			data: string;
			types: string;
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			data: boolean;
			types: boolean;
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface DictType {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<DictTypeEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<DictTypeEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<DictTypePageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface FamilyMember {
		/**
		 * info
		 */
		info(data?: any): Promise<FamilyMemberEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<FamilyMemberEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<FamilyMemberPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface FeedbackInfo {
		/**
		 * reply
		 */
		reply(data?: any): Promise<any>;

		/**
		 * updateStatus
		 */
		updateStatus(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<FeedbackInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<FeedbackInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<FeedbackInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			reply: string;
			updateStatus: string;
			delete: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			reply: boolean;
			updateStatus: boolean;
			delete: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface MemberInfo {
		/**
		 * grant
		 */
		grant(data?: any): Promise<any>;

		/**
		 * revoke
		 */
		revoke(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<MemberInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<MemberInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<MemberInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { grant: string; revoke: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: {
			grant: boolean;
			revoke: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface MemberLog {
		/**
		 * info
		 */
		info(data?: any): Promise<MemberLogEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<MemberLogEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<MemberLogPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface MessageInfo {
		/**
		 * send
		 */
		send(data?: any): Promise<any>;

		/**
		 * runReminder
		 */
		runReminder(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<MessageInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<MessageInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<MessageInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			send: string;
			runReminder: string;
			delete: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			send: boolean;
			runReminder: boolean;
			delete: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface MessageSubscribe {
		/**
		 * syncFollowers
		 */
		syncFollowers(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<MessageSubscribeEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<MessageSubscribeEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<MessageSubscribePageResponse>;

		/**
		 * 权限标识
		 */
		permission: { syncFollowers: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { syncFollowers: boolean; info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface OrderInfo {
		/**
		 * close
		 */
		close(data?: any): Promise<any>;

		/**
		 * refundAudit
		 */
		refundAudit(data?: any): Promise<any>;

		/**
		 * syncRefund
		 */
		syncRefund(data?: any): Promise<any>;

		/**
		 * retryRefund
		 */
		retryRefund(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<OrderInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<OrderInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<OrderInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			close: string;
			refundAudit: string;
			syncRefund: string;
			retryRefund: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			close: boolean;
			refundAudit: boolean;
			syncRefund: boolean;
			retryRefund: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface OrderProduct {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<ProductInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<ProductInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<OrderProductPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface PetHealth {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<PetHealthEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<PetHealthEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<PetHealthPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface PetInfo {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<PetInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<PetInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<PetInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface PlantCare {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<PlantCareEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<PlantCareEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<PlantCarePageResponse>;

		/**
		 * 权限标识
		 */
		permission: { delete: string; update: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface PlantDisease {
		/**
		 * aiDraft
		 */
		aiDraft(data?: any): Promise<any>;

		/**
		 * review
		 */
		review(data?: any): Promise<any>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<PlantDiseaseEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<PlantDiseaseEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<PlantDiseasePageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			aiDraft: string;
			review: string;
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			aiDraft: boolean;
			review: boolean;
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface PlantGuide {
		/**
		 * aiDraft
		 */
		aiDraft(data?: any): Promise<any>;

		/**
		 * review
		 */
		review(data?: any): Promise<any>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<PlantGuideEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<PlantGuideEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<PlantGuidePageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			aiDraft: string;
			review: string;
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			aiDraft: boolean;
			review: boolean;
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface PlantInfo {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<PlantInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<PlantInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<PlantInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface PlantSpecies {
		/**
		 * aiGenerate
		 */
		aiGenerate(data?: any): Promise<any>;

		/**
		 * review
		 */
		review(data?: any): Promise<any>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<PlantSpeciesEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<PlantSpeciesEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<PlantSpeciesPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			aiGenerate: string;
			review: string;
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			aiGenerate: boolean;
			review: boolean;
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface PluginInfo {
		/**
		 * install
		 */
		install(data?: any): Promise<any>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<PluginInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<PluginInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<PluginInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			install: string;
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			install: boolean;
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface RecycleData {
		/**
		 * restore
		 */
		restore(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<RecycleDataEntity>;

		/**
		 * page
		 */
		page(data?: any): Promise<RecycleDataPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { restore: string; info: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { restore: boolean; info: boolean; page: boolean };

		request: Request;
	}

	interface SpaceInfo {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<SpaceInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<SpaceInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<SpaceInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface SpaceType {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<SpaceTypeEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<SpaceTypeEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<SpaceTypePageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface TaskInfo {
		/**
		 * once
		 */
		once(data?: any): Promise<any>;

		/**
		 * stop
		 */
		stop(data?: any): Promise<any>;

		/**
		 * start
		 */
		start(data?: any): Promise<any>;

		/**
		 * log
		 */
		log(data?: any): Promise<any>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<TaskInfoEntity>;

		/**
		 * page
		 */
		page(data?: any): Promise<TaskInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			once: string;
			stop: string;
			start: string;
			log: string;
			add: string;
			delete: string;
			update: string;
			info: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			once: boolean;
			stop: boolean;
			start: boolean;
			log: boolean;
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface UserAddress {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<UserAddressEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<UserAddressEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<UserAddressPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface UserInfo {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<UserInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<UserInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<UserInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			add: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			add: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface RequestOptions {
		url: string;
		method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
		data?: any;
		params?: any;
		headers?: any;
		timeout?: number;
		[key: string]: any;
	}

	type Request = (options: RequestOptions) => Promise<any>;

	type Service = {
		request: Request;

		ai: { conversation: AiConversation; message: AiMessage; usage: AiUsage };
		base: {
			coding: BaseCoding;
			comm: BaseComm;
			open: BaseOpen;
			sys: {
				department: BaseSysDepartment;
				log: BaseSysLog;
				menu: BaseSysMenu;
				param: BaseSysParam;
				role: BaseSysRole;
				user: BaseSysUser;
			};
		};
		care: { dashboard: CareDashboard };
		dict: { info: DictInfo; type: DictType };
		family: { member: FamilyMember };
		feedback: { info: FeedbackInfo };
		member: { info: MemberInfo; log: MemberLog };
		message: { info: MessageInfo; subscribe: MessageSubscribe };
		order: { info: OrderInfo; product: OrderProduct };
		pet: { health: PetHealth; info: PetInfo };
		plant: {
			care: PlantCare;
			disease: PlantDisease;
			guide: PlantGuide;
			info: PlantInfo;
			species: PlantSpecies;
		};
		plugin: { info: PluginInfo };
		recycle: { data: RecycleData };
		space: { info: SpaceInfo; type: SpaceType };
		task: { info: TaskInfo };
		user: { address: UserAddress; info: UserInfo };
	};
}
