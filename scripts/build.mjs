import {mkdir, copyFile, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
const html=await readFile('dist/index.html','utf8');
if(!/<script\b[^>]*type="module"[^>]*src="app\.js(?:\?v=[a-f0-9]+)?"/.test(html)){
 throw new Error('app.js must load as a module to support dictionary initialization.');
}
const draw=await readFile('dist/draw.mjs','utf8');
const drawVersion=createHash('sha256').update(draw).digest('hex').slice(0,12);
const dictionary=await readFile('data/redewendungen-sprichwoerter.jsonl','utf8');
const dictionaryVersion=createHash('sha256').update(dictionary).digest('hex').slice(0,12);
const originalApp=await readFile('dist/app.js','utf8');
const drawImport=/from '\.\/draw\.mjs(?:\?v=[a-f0-9]+)?'/;
if(!drawImport.test(originalApp))throw new Error('The game must import the expression picker.');
const dictionaryUrl=/\.\/data\/redewendungen-sprichwoerter\.jsonl(?:\?v=[a-f0-9]+)?/;
if(!dictionaryUrl.test(originalApp))throw new Error('The game must load the expression dictionary.');
const app=originalApp.replace(drawImport,`from './draw.mjs?v=${drawVersion}'`).replace(dictionaryUrl,`./data/redewendungen-sprichwoerter.jsonl?v=${dictionaryVersion}`);
for(const source of [app,draw]){
 const result=spawnSync(process.execPath,['--input-type=module','--check'],{input:source,stdio:['pipe','inherit','inherit']});
 if(result.status!==0)process.exit(result.status??1);
}
for(const line of dictionary.trim().split('\n')){
 const entry=JSON.parse(line);
 if(entry.usage_priority!==undefined&&!['common','standard','less_common'].includes(entry.usage_priority)){
  throw new Error(`Priorité d’usage invalide : ${entry.expression_de}`);
 }
 if(typeof entry.literal_fr!=='string'||!entry.literal_fr.trim()){
  throw new Error(`Traduction littérale manquante : ${entry.expression_de}`);
 }
 if(/[\r\n]/.test(entry.literal_fr)){
  throw new Error(`La traduction mot à mot doit tenir sur une ligne : ${entry.expression_de}`);
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
// A new script URL prevents browsers from reusing code from an earlier release.
const version=createHash('sha256').update(app).digest('hex').slice(0,12);
if(app!==originalApp)await writeFile('dist/app.js',app);
await writeFile('dist/index.html',html.replace(/src="app\.js(?:\?v=[a-f0-9]+)?"/,`src="app.js?v=${version}"`));
console.log('GitHub Pages build ready in dist/.');
