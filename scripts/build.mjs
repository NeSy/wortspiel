import {mkdir, copyFile, readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const html=await readFile('dist/index.html','utf8');
if(!/<script\b[^>]*type="module"[^>]*src="app\.js"/.test(html)){
 throw new Error('app.js must load as a module to support dictionary initialization.');
}
const result=spawnSync(process.execPath,['--input-type=module','--check'],{input:await readFile('dist/app.js','utf8'),stdio:['pipe','inherit','inherit']});
if(result.status!==0)process.exit(result.status??1);
await mkdir('dist/data',{recursive:true});
await copyFile('data/redewendungen-sprichwoerter.jsonl','dist/data/redewendungen-sprichwoerter.jsonl');
console.log('GitHub Pages build ready in dist/.');
