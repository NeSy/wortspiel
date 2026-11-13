#!/usr/bin/env python3
"""Extract German Wiktionary phrase entries, retaining source metadata."""
import json
from pathlib import Path

source = Path('data/raw-wiktextract-data.jsonl')
target = Path('data/redewendungen-sprichwoerter.jsonl')
counts = {'Redewendung': 0, 'Sprichwort': 0}
seen = set()
with source.open(encoding='utf-8') as inp, target.open('w', encoding='utf-8') as out:
    for line in inp:
        try:
            entry = json.loads(line)
        except json.JSONDecodeError:
            continue
        if entry.get('lang_code') != 'de':
            continue
        categories = entry.get('categories') or []
        kind = next((label for label in counts if f'{label} (Deutsch)' in categories), None)
        if not kind or entry.get('pos') != 'phrase':
            continue
        word = entry.get('word', '').strip()
        if not word:
            continue
        key = word.casefold()
        if key in seen:
            continue
        seen.add(key)
        senses = []
        for sense in entry.get('senses', []):
            glosses = sense.get('glosses') or []
            examples = [ex.get('text') for ex in sense.get('examples', []) if ex.get('text')]
            if glosses or examples:
                senses.append({'glosses_de': glosses, 'examples_de': examples})
        result = {
            'expression_de': word,
            'type': kind,
            'senses': senses,
            'wiktionary_url': 'https://de.wiktionary.org/wiki/' + word.replace(' ', '_'),
            'license': 'CC BY-SA 4.0 / GFDL; see Wiktionary terms'
        }
        out.write(json.dumps(result, ensure_ascii=False) + '\n')
        counts[kind] += 1
print(f"Écrit {sum(counts.values())} entrées : {counts['Redewendung']} Redewendungen, {counts['Sprichwort']} Sprichwörter dans {target}.")
