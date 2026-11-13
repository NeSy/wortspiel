import {writeFile} from 'node:fs/promises';
const pages=[
 ['Verzeichnis:Deutsch/Redewendungen','Redewendungen'],
 ['Verzeichnis:Deutsch/Sprichwörter','Sprichwörter']
];
const entries=new Map();
for(const [page,category] of pages){
 const url=`https://de.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(page)}&prop=wikitext&format=json&origin=*`;
 const response=await fetch(url,{headers:{'User-Agent':'Wortspiel (German idiom learning game; contact via Wikimedia projects)'}});
 if(!response.ok)throw new Error(`Wiktionary ${response.status}: ${page}`);
 const data=await response.json();if(data.error)throw new Error(data.error.info);
 const source=data.parse.wikitext['*'];
 for(const match of source.matchAll(/^\*\s+(.+?)\s*$/gm)){
  let phrase=match[1].replace(/\s*<!--.*?-->/g,'').replace(/\s+/g,' ').trim();
  phrase=phrase.replace(/\s*(?:,|\/|;|\bor\b)\s*(?=[a-zäöüß])/g,' / ');
  if(!/[a-zäöüß]/i.test(phrase)||phrase.length>100||/^\[\[.*\]\]$/.test(phrase))continue;
  const key=phrase.toLocaleLowerCase('de');if(!entries.has(key))entries.set(key,{expression:phrase,category,source:`https://de.wiktionary.org/wiki/${encodeURIComponent(page.replaceAll(' ','_'))}`});
 }
}
const sorted=[...entries.values()].sort((a,b)=>a.expression.localeCompare(b.expression,'de'));
await writeFile('data/wiktionary-redensarten.json',JSON.stringify({source:'Wiktionary contributors',license:'CC BY-SA 4.0; see https://creativecommons.org/licenses/by-sa/4.0/',retrievedAt:new Date().toISOString(),note:'Phrase list only. French learning clues, explanations and example sentences have not been generated.',entries:sorted},null,2)+'\n');
console.log(`Imported ${sorted.length} unique phrase entries from Wiktionary.`);
