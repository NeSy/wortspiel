import {mkdir, copyFile, readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const html=await readFile('dist/index.html','utf8');
if(!/<script\b[^>]*type="module"[^>]*src="app\.js"/.test(html)){
 throw new Error('app.js must load as a module to support dictionary initialization.');
}
const result=spawnSync(process.execPath,['--input-type=module','--check'],{input:await readFile('dist/app.js','utf8'),stdio:['pipe','inherit','inherit']});
if(result.status!==0)process.exit(result.status??1);
const dictionary=await readFile('data/redewendungen-sprichwoerter.jsonl','utf8');
for(const line of dictionary.trim().split('\n')){
 const entry=JSON.parse(line);
 if(typeof entry.literal_fr!=='string'||!entry.literal_fr.trim()){
  throw new Error(`Traduction littérale manquante : ${entry.expression_de}`);
 }
 if(!entry.senses?.some(sense=>sense.glosses_de?.some(gloss=>gloss.trim()))&&!entry.hint_de?.trim()){
  throw new Error(`Indice allemand manquant : ${entry.expression_de}`);
 }
 if(typeof entry.hint_fr!=='string'||!entry.hint_fr.trim()){
  throw new Error(`Indice français manquant : ${entry.expression_de}`);
 }
}
await mkdir('dist/data',{recursive:true});
await copyFile('data/redewendungen-sprichwoerter.jsonl','dist/data/redewendungen-sprichwoerter.jsonl');
console.log('GitHub Pages build ready in dist/.');
