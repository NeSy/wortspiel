export const RECENT_LIMIT=30;
export const USAGE_WEIGHTS=Object.freeze({common:20,standard:1,less_common:0.2});

// Draw each round afresh: a weighted full-list shuffle would eventually force
// players through every rare entry once the common expressions were exhausted.
export function drawExpression(expressions,recent=[],random=Math.random){
 if(!expressions.length)throw new Error('Le dictionnaire est vide.');
 const windowSize=Math.min(RECENT_LIMIT,expressions.length-1);
 const excluded=new Set(windowSize?recent.slice(-windowSize):[]);
 const candidates=expressions.map((entry,index)=>({
  index,expression:entry[0],weight:USAGE_WEIGHTS[entry[7]]??USAGE_WEIGHTS.standard
 })).filter(entry=>!excluded.has(entry.expression));
 let remaining=random()*candidates.reduce((total,entry)=>total+entry.weight,0);
 for(const entry of candidates){
  remaining-=entry.weight;
  if(remaining<0)return entry.index;
 }
 return candidates.at(-1).index;
}
