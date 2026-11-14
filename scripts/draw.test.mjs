import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {drawExpression,RECENT_LIMIT,USAGE_WEIGHTS} from '../dist/draw.mjs';

const entry=(phrase,priority)=>[phrase,'','','','','','',priority];
function seededRandom(){
 let seed=123456789;
 return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};
}

test('selection follows the usage weights and keeps rare expressions reachable',()=>{
 const expressions=[entry('courante','common'),entry('ordinaire'),entry('rare','less_common')];
 const counts=[0,0,0],random=seededRandom(),samples=50000;
 for(let i=0;i<samples;i++)counts[drawExpression(expressions,[],random)]++;
 const total=USAGE_WEIGHTS.common+USAGE_WEIGHTS.standard+USAGE_WEIGHTS.less_common;
 for(const [i,weight] of [20,1,0.2].entries()){
  assert(Math.abs(counts[i]/samples-weight/total)<0.005,JSON.stringify(counts));
 }
 assert(counts[2]>0);
});

test('the last 30 expressions are excluded across many rounds',()=>{
 const expressions=Array.from({length:60},(_,i)=>entry(`expression ${i}`,i<40?'common':'less_common'));
 const recent=[],random=seededRandom();
 for(let i=0;i<500;i++){
  const selected=expressions[drawExpression(expressions,recent,random)][0];
  assert(!recent.slice(-RECENT_LIMIT).includes(selected));
  recent.push(selected);
 }
});

test('small dictionaries and history from another dictionary remain playable',()=>{
 const single=[entry('unique')];
 assert.equal(drawExpression(single,['unique']),0);
 const pair=[entry('a'),entry('b')];
 assert.equal(drawExpression(pair,['a','b'],()=>0),0);
 assert.equal(drawExpression(pair,['b','a'],()=>0),1);
 assert.equal(drawExpression(pair,['other'],()=>0),0);
 assert.throws(()=>drawExpression([]),/vide/);
});

test('unclassified imported expressions have equal chances',()=>{
 const expressions=[entry('a'),entry('b'),entry('c')];
 assert.equal(drawExpression(expressions,[],()=>0),0);
 assert.equal(drawExpression(expressions,[],()=>0.5),1);
 assert.equal(drawExpression(expressions,[],()=>0.999),2);
});

test('the shipped dictionary favors common expressions without exhausting them',async()=>{
 const rows=(await readFile(new URL('../data/redewendungen-sprichwoerter.jsonl',import.meta.url),'utf8')).trim().split('\n').map(JSON.parse);
 const expressions=rows.map(row=>entry(row.expression_de,row.usage_priority));
 const random=seededRandom(),recent=[];
 const counts={common:0,standard:0,less_common:0};
 for(let i=0;i<6000;i++){
  const selected=expressions[drawExpression(expressions,recent,random)];
  counts[selected[7]||'standard']++;
  recent.push(selected[0]);if(recent.length>RECENT_LIMIT)recent.shift();
 }
 assert(counts.common/6000>0.5,JSON.stringify(counts));
 assert(counts.common/6000<0.7,JSON.stringify(counts));
 assert(counts.less_common/6000<0.005,JSON.stringify(counts));
 assert(counts.less_common>0,JSON.stringify(counts));
});
