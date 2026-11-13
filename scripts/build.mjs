import {mkdir, copyFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const result=spawnSync(process.execPath,['--check','dist/app.js'],{stdio:'inherit'});
if(result.status!==0)process.exit(result.status??1);
await mkdir('dist/data',{recursive:true});
await copyFile('data/redewendungen-sprichwoerter.jsonl','dist/data/redewendungen-sprichwoerter.jsonl');
console.log('GitHub Pages build ready in dist/.');
