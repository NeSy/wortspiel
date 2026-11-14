import {drawExpression,RECENT_LIMIT} from './draw.mjs?v=210ebd13f3c2';

let expressions = [
['Tomaten auf den Augen haben','Ne pas voir ce qui est évident','Avoir des tomates sur les yeux','Ne pas remarquer quelque chose qui est pourtant juste devant soi.','Du hast wohl Tomaten auf den Augen! Der Schlüssel liegt hier.','Tu ne vois donc rien ! La clé est ici.'],
['Daumen drücken','Croiser les doigts','Presser les pouces','Souhaiter bonne chance à quelqu’un.','Ich drücke dir die Daumen für deine Prüfung.','Je croise les doigts pour ton examen.'],
['Nur Bahnhof verstehen','Ne rien comprendre','Comprendre seulement « gare »','Ne rien comprendre à une explication ou à une conversation.','Bei dieser Erklärung verstehe ich nur Bahnhof.','Je ne comprends rien à cette explication.'],
['Die Katze im Sack kaufen','Acheter sans savoir ce qu’on achète','Acheter le chat dans le sac','Acheter ou accepter quelque chose sans l’avoir examiné.','Ich möchte das Auto erst sehen. Ich kaufe nicht die Katze im Sack.','Je veux d’abord voir la voiture. Je n’achète pas les yeux fermés.'],
['Den Nagel auf den Kopf treffen','Mettre le doigt sur le vrai problème','Frapper le clou sur la tête','Dire exactement ce qui est juste.','Mit deiner Antwort hast du den Nagel auf den Kopf getroffen.','Avec ta réponse, tu as visé juste.'],
['Das ist nicht mein Bier','Ce n’est pas mon affaire','Ce n’est pas ma bière','Dire, familièrement, qu’une chose ne nous concerne pas.','Frag Paul. Das ist nicht mein Bier.','Demande à Paul. Ce n’est pas mon affaire.'],
['Ich verstehe nur Bahnhof','Je n’y comprends absolument rien','Je ne comprends que « gare »','Exprimer son incompréhension totale, de manière familière.','Kannst du das wiederholen? Ich verstehe nur Bahnhof.','Peux-tu répéter ? Je n’y comprends rien.'],
['Schwein haben','Avoir un sacré coup de chance','Avoir du cochon','Avoir de la chance, dans un registre familier.','Der Bus hat gewartet. Da hast du Schwein gehabt!','Le bus a attendu. Tu as eu un sacré coup de chance !'],
['Ins kalte Wasser springen','Se jeter à l’eau','Sauter dans l’eau froide','Se lancer dans une situation nouvelle sans y être préparé.','Am ersten Arbeitstag musste ich ins kalte Wasser springen.','Le premier jour de travail, j’ai dû me jeter à l’eau.'],
['Den Kopf in den Sand stecken','Faire l’autruche','Mettre la tête dans le sable','Ignorer un problème au lieu de l’affronter.','Steck den Kopf nicht in den Sand. Wir finden eine Lösung.','Ne fais pas l’autruche. Nous trouverons une solution.'],
['Auf Wolke sieben schweben','Être sur un petit nuage','Flotter sur le septième nuage','Être très heureux, souvent parce qu’on est amoureux.','Seit sie verliebt ist, schwebt sie auf Wolke sieben.','Depuis qu’elle est amoureuse, elle est sur un petit nuage.'],
['Die Nase voll haben','En avoir ras le bol','Avoir le nez plein','En avoir assez d’une situation, dans un registre familier.','Ich habe die Nase voll von diesem Lärm.','J’en ai ras le bol de ce bruit.'],
['Über den eigenen Schatten springen','Dépasser ses réticences','Sauter par-dessus sa propre ombre','Surmonter ses peurs ou ses habitudes pour agir autrement.','Er sprang über seinen eigenen Schatten und entschuldigte sich.','Il a pris sur lui et s’est excusé.'],
['Zwei Fliegen mit einer Klappe schlagen','Faire d’une pierre deux coups','Frapper deux mouches avec une tapette','Atteindre deux objectifs avec une seule action.','So schlagen wir zwei Fliegen mit einer Klappe.','Ainsi, nous faisons d’une pierre deux coups.'],
['Alles in Butter','Tout va bien','Tout dans le beurre','Indiquer familièrement que tout est en ordre.','Ist bei dir alles in Butter?','Tout va bien pour toi ?'],
['Jemandem einen Bären aufbinden','Raconter des histoires à quelqu’un','Attacher un ours à quelqu’un','Faire croire une histoire inventée à quelqu’un.','Du willst mir doch einen Bären aufbinden!','Tu essaies de me faire marcher !'],
['Um den heißen Brei herumreden','Tourner autour du pot','Parler autour de la bouillie chaude','Éviter d’aborder directement le sujet.','Rede nicht um den heißen Brei herum!','Ne tourne pas autour du pot !'],
['Aus einer Mücke einen Elefanten machen','Faire une montagne d’un rien','Faire un éléphant d’un moustique','Exagérer l’importance d’un petit problème.','Mach aus einer Mücke keinen Elefanten.','N’en fais pas toute une histoire.'],
['Die Ohren spitzen','Tendre l’oreille','Dresser les oreilles','Écouter très attentivement.','Die Kinder spitzten die Ohren, als die Geschichte begann.','Les enfants ont tendu l’oreille quand l’histoire a commencé.'],
['Am Ball bleiben','Ne pas lâcher l’affaire','Rester au ballon','Continuer ses efforts avec persévérance.','Beim Deutschlernen musst du am Ball bleiben.','Pour apprendre l’allemand, il faut persévérer.']
];
const fallbackHintsDe=["Etwas Offensichtliches nicht bemerken.", "Jemandem Glück und Erfolg wünschen.", "Eine Erklärung oder ein Gespräch überhaupt nicht verstehen.", "Etwas kaufen, ohne es vorher geprüft zu haben.", "Mit einer Aussage genau das Richtige treffen.", "Etwas geht einen nichts an.", "Überhaupt nichts verstehen.", "Großes Glück haben.", "Sich ohne Vorbereitung auf eine neue Situation einlassen.", "Ein Problem ignorieren, statt sich damit auseinanderzusetzen.", "Sehr glücklich sein, besonders wenn man verliebt ist.", "Eine Situation nicht länger ertragen wollen.", "Eigene Ängste oder Hemmungen überwinden.", "Mit einer Handlung zwei Ziele erreichen.", "Alles ist in Ordnung.", "Jemandem eine erfundene Geschichte glauben machen.", "Ein Thema nicht direkt ansprechen.", "Ein kleines Problem übermäßig wichtig nehmen.", "Sehr aufmerksam zuhören.", "Beharrlich weitermachen und nicht aufgeben."];
expressions.forEach((entry,i)=>entry.push(fallbackHintsDe[i],'common'));
const fallbackExpressions=expressions;
let usagePriorities=new Map(fallbackExpressions.map(entry=>[entry[0].toLocaleLowerCase('de'),entry[7]]));
async function loadWiktionaryPhrases(){
 try{
  const response=await fetch('./data/redewendungen-sprichwoerter.jsonl?v=a6bd06da8ca6');
  if(!response.ok)throw new Error('Dictionnaire introuvable');
  const lines=(await response.text()).trim().split('\n');
  const phrases=lines.map(line=>JSON.parse(line)).filter(item=>item.expression_de);
  if(phrases.length){
   const loaded=phrases.map(item=>{
   const sense=item.senses?.[0];
   const gloss=item.hint_fr?.trim();
   if(!gloss)throw new Error(`Indice français manquant : ${item.expression_de}`);
   const example=sense?.examples_de?.[0]||'';
   const glossDe=item.senses?.flatMap(sense=>sense.glosses_de||[]).find(text=>text.trim())||item.hint_de;
   if(!glossDe?.trim())throw new Error(`Indice allemand manquant : ${item.expression_de}`);
   const literal=item.literal_fr?.trim();
   if(!literal)throw new Error(`Traduction littérale manquante : ${item.expression_de}`);
   return [item.expression_de,gloss,literal,gloss,example,`Source : Wiktionary (${item.type})`,glossDe,item.usage_priority||'standard'];
  });
   expressions=loaded;
   usagePriorities=new Map(loaded.map(entry=>[entry[0].normalize('NFC').toLocaleLowerCase('de'),entry[7]]));
  }
 }catch(error){console.warn('Wiktionary: utilisation du dictionnaire local.',error);}
}
await loadWiktionaryPhrases();
function parseDictionary(value){
 if(!Array.isArray(value)||!value.length)throw new Error('Le fichier doit contenir une liste non vide d’expressions.');
 const fields=['expression','indice','traductionLitterale','explication','exemple','traductionExemple'];
 const seen=new Set();
 return value.map((row,i)=>{
  const data=Array.isArray(row)?row:fields.map(field=>row?.[field]);
  const hintDe=Array.isArray(row)?row[6]:row?.indiceAllemand;
  if(![6,7].includes(data.length)||data.slice(0,6).some(text=>typeof text!=='string'||!text.trim()||text.length>2000))throw new Error(`Entrée ${i+1} : six champs texte non vides sont requis.`);
  if(hintDe!==undefined&&(typeof hintDe!=='string'||hintDe.length>2000))throw new Error(`Entrée ${i+1} : indice allemand invalide.`);
  const cleaned=data.slice(0,6).map(text=>text.trim().normalize('NFC'));
  cleaned.push(hintDe?.trim().normalize('NFC')||'');
  if(!/^[a-zA-ZäöüÄÖÜßẞ]+(?: [a-zA-ZäöüÄÖÜßẞ]+)*$/.test(cleaned[0]))throw new Error(`Entrée ${i+1} : l’expression doit contenir des lettres allemandes et des espaces uniquement. Adaptez les variantes ou annotations avant l’import.`);
  const key=cleaned[0].toLocaleLowerCase('de');if(seen.has(key))throw new Error(`Entrée ${i+1} : expression en double.`);seen.add(key);return cleaned;
 });
}
function withUsagePriorities(rows){return rows.map(entry=>[...entry,usagePriorities.get(entry[0].toLocaleLowerCase('de'))||'standard']);}
try{const saved=localStorage.getItem('wortspiel-dictionary');if(saved)expressions=withUsagePriorities(parseDictionary(JSON.parse(saved)));}catch{}
const $=id=>document.getElementById(id);
const normalize=letter=>letter.toUpperCase().replaceAll('Ä','A').replaceAll('Ö','O').replaceAll('Ü','U').replaceAll('SS','S').replaceAll('ẞ','S');
let learned=[];try{const value=JSON.parse(localStorage.getItem('wortspiel-learned')||'[]');if(Array.isArray(value))learned=value.filter(i=>Number.isInteger(i)&&i>=0&&i<expressions.length);}catch{}
let recent=[];
try{
 const saved=JSON.parse(localStorage.getItem('wortspiel-recent-expressions')||'[]');
 if(Array.isArray(saved))recent=saved.filter(value=>typeof value==='string').slice(-RECENT_LIMIT);
 const last=localStorage.getItem('wortspiel-last-expression');
 if(last&&recent.at(-1)!==last)recent.push(last);
}catch{}
function drawNextExpression(){
 const selected=drawExpression(expressions,recent);
 recent.push(expressions[selected][0]);recent=recent.slice(-RECENT_LIMIT);
 try{
  localStorage.setItem('wortspiel-recent-expressions',JSON.stringify(recent));
  localStorage.setItem('wortspiel-last-expression',expressions[selected][0]);
 }catch{}
 return selected;
}
let currentIndex=drawNextExpression(),guessed=new Set(),errors=0,ended=false,helped=false,wonRound=false;
function save(){if(!learned.includes(currentIndex))learned.push(currentIndex);try{localStorage.setItem('wortspiel-learned',JSON.stringify(learned));}catch{}$('count').textContent=learned.length;}
function current(){return expressions[currentIndex];}
function render(){
 $('hint').textContent=current()[1];
 $('hintDe').textContent=current()[6]||'Indice allemand non fourni.';
 $('phrase').replaceChildren();current()[0].split(' ').forEach(word=>{const el=document.createElement('span');el.className='word';[...word].forEach(char=>{const letter=document.createElement('span');const shown=ended||guessed.has(normalize(char));letter.className='letter'+(shown?'':' empty');letter.textContent=shown?char:'_';letter.setAttribute('aria-label',shown?char:'lettre cachée');el.append(letter);});$('phrase').append(el);});
 document.querySelectorAll('.key').forEach(key=>{const used=guessed.has(key.textContent);key.className='key'+(used?(normalize(current()[0]).includes(key.textContent)?' correct':' wrong'):'');key.disabled=used||ended;});
 document.querySelectorAll('[data-part]').forEach((part,i)=>part.classList.toggle('visible',i<errors));$('lives').textContent=`${6-errors} / 6`;$('lifeDots').replaceChildren();for(let i=0;i<6;i++){const dot=document.createElement('span');dot.className=i<errors?'used':'';$('lifeDots').append(dot);}
 $('status').textContent=ended?(wonRound?'Gut gemacht ! Bien joué.':'Une expression de plus à découvrir.'):`Encore ${6-errors} erreur${6-errors>1?'s':''} possible${6-errors>1?'s':''}.`;
 $('revealHint').disabled=helped||ended;
}
function finish(won){
 ended=true;wonRound=won;save();
 const e=current(),result=$('result');result.replaceChildren();
 const heading=document.createElement('strong');
 heading.textContent=won?'Wunderbar ! Vous avez trouvé.':'Pas cette fois… mais vous avez appris !';
 result.append(heading);
 for(const text of [e[0],`Mot à mot : « ${e[2]} »`,`Sens : ${e[3]}`,`Exemple : ${e[4]}`,e[5]]){
  const p=document.createElement('p');p.textContent=text;result.append(p);
 }
 const next=document.createElement('button');next.className='next';next.textContent='L’expression suivante →';next.onclick=nextRound;
 result.append(next);result.hidden=false;$('skip').hidden=true;render();
}
function guess(letter){if(ended||guessed.has(letter)||! /^[A-Z]$/.test(letter))return;guessed.add(letter);if(!normalize(current()[0]).includes(letter))errors++;if(errors>=6){finish(false);return;}if([...current()[0]].every(c=>c===' '||guessed.has(normalize(c)))){finish(true);return;}render();}
function nextRound(){currentIndex=drawNextExpression();guessed=new Set();errors=0;ended=false;helped=false;$('hint').textContent=current()[1];$('result').hidden=true;$('skip').hidden=false;$('revealHint').textContent='✧ Un petit coup de pouce';render();}
for(const row of ['AZERTYUIOP','QSDFGHJKLM','WXCVBN']){const el=document.createElement('div');el.className='key-row';for(const char of row){const key=document.createElement('button');key.className='key';key.textContent=char;key.setAttribute('aria-label',`Proposer la lettre ${char}`);key.onclick=()=>guess(char);el.append(key);}$('keyboard').append(el);}
document.addEventListener('keydown',event=>{if($('notebook').open||event.ctrlKey||event.metaKey||event.altKey||event.target.matches('input,textarea'))return;const key=normalize(event.key.normalize('NFD').replace(/[\u0300-\u036f]/g,''));if(/^[A-Z]$/.test(key)){event.preventDefault();guess(key);}});
$('revealHint').onclick=()=>{if(helped||ended)return;helped=true;const remaining=[...new Set([...current()[0]].filter(c=>c!==' ').map(normalize))].filter(c=>!guessed.has(c));if(remaining.length){guess(remaining[0]);}$('revealHint').textContent='✧ Une lettre offerte !';render();};
$('skip').onclick=()=>finish(false);
$('collectionBtn').onclick=()=>{$('entries').replaceChildren();if(!learned.length){const p=document.createElement('p');p.textContent='Votre carnet attend sa première expression. Terminez une manche pour commencer !';$('entries').append(p);}for(const i of learned){const entry=document.createElement('article');entry.className='entry';const title=document.createElement('strong');title.textContent=expressions[i][0];entry.append(title);for(const text of [`Mot à mot : « ${expressions[i][2]} »`,expressions[i][3],expressions[i][4],expressions[i][5]]){const p=document.createElement('p');p.textContent=text;entry.append(p);}$('entries').append(entry);}$('notebook').showModal();};
$('closeNotebook').onclick=()=>$('notebook').close();$('notebook').onclick=e=>{if(e.target===$('notebook')){const r=$('notebook').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('notebook').close();}};
$('count').textContent=learned.length;$('hint').textContent=current()[1];render();

$('dictionaryFile').addEventListener('change',async event=>{
 const file=event.target.files[0];if(!file)return;
 try{
  const imported=parseDictionary(JSON.parse(await file.text()));
  // Write the dictionary first: quota errors leave the current game intact.
  localStorage.setItem('wortspiel-dictionary',JSON.stringify(imported));
  localStorage.removeItem('wortspiel-learned');
  expressions=withUsagePriorities(imported);learned=[];
  $('count').textContent='0';$('entries').replaceChildren();nextRound();
  $('importStatus').textContent=`${expressions.length} expressions importées. Votre nouvelle partie est prête.`;
 }catch(error){$('importStatus').textContent=error instanceof SyntaxError?'Fichier JSON invalide. Vérifiez le format de l’export.':`Import impossible : ${error.message}`;}
 event.target.value='';
});
