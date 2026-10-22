// 从后端 admin 控制器源码生成 build/cool/eps.json，供后端未运行时打包使用。
// 用法：node scripts/sync-eps.mjs [后端 src/modules 目录]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modules = path.resolve(process.argv[2] || path.join(root, "../pp-backend-midway/src/modules"));
const epsFile = path.join(root, "build/cool/eps.json");

const STANDARD = {
	add: "post",
	delete: "post",
	update: "post",
	info: "get",
	list: "post",
	page: "post"
};

function walk(dir) {
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
		const p = path.join(dir, d.name);
		return d.isDirectory() ? walk(p) : p.endsWith(".ts") ? [p] : [];
	});
}

function defaultPrefix(file) {
	const rel = path.relative(modules, file).replace(/\\/g, "/");
	const [module, , scope, ...rest] = rel.split("/");
	return `/${scope}/${module}/${rest.join("/").replace(/\.ts$/, "")}`;
}

function parse(file) {
	const source = fs.readFileSync(file, "utf8");
	const blocks = source.split(/@CoolController\(/).slice(1);
	return blocks.map((block) => {
		const head = block.slice(0, block.indexOf("export class"));
		const body = block.slice(block.indexOf("export class"));
		const prefix = head.match(/prefix:\s*['"]([^'"]+)['"]/)?.[1] || defaultPrefix(file);
		const entity = head.match(/entity:\s*(\w+)/)?.[1] || "";
		const standard = (head.match(/api:\s*\[([^\]]*)\]/)?.[1] || "")
			.split(",")
			.map((s) => s.trim().replace(/['"]/g, ""))
			.filter((s) => STANDARD[s])
			.map((s) => ({ method: STANDARD[s], path: "/" + s }));
		const custom = [...body.matchAll(/@(Get|Post|Put|Del|All)\(\s*['"]([^'"]+)['"]/g)].map((m) => ({
			method: m[1] === "Get" ? "get" : "post",
			path: m[2]
		}));
		const api = [...custom, ...standard].filter(
			(a, i, list) => list.findIndex((b) => b.path === a.path) === i
		);
		return { prefix, name: entity, api };
	});
}

const scanned = walk(modules)
	.filter((f) => /[\\/]controller[\\/]admin[\\/]/.test(f))
	.flatMap(parse)
	.filter((e) => e.prefix.startsWith("/admin/"));

const current = fs.existsSync(epsFile) ? JSON.parse(fs.readFileSync(epsFile, "utf8")) : [];
const byPrefix = new Map(current.map((e) => [e.prefix, e]));
for (const e of scanned) {
	const old = byPrefix.get(e.prefix);
	byPrefix.set(e.prefix, {
		prefix: e.prefix,
		name: e.name || old?.name || "",
		api: e.api,
		search: old?.search || { fieldEq: [], fieldLike: [], keyWordLikeFields: [] }
	});
}
const list = [...byPrefix.values()].sort((a, b) => a.prefix.localeCompare(b.prefix));
fs.mkdirSync(path.dirname(epsFile), { recursive: true });
fs.writeFileSync(epsFile, JSON.stringify(list));
console.log(`[sync-eps] ${list.length} controllers → ${path.relative(root, epsFile)}`);
