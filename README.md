# Wortspiel — Le pendu des Redensarten

Un jeu du pendu en français pour découvrir les expressions allemandes du Wiktionary. Clavier AZERTY, six erreurs possibles et progression conservée dans le navigateur.

## Jouer en local

```sh
npm start
```

Puis ouvrir http://localhost:5173. Node.js 18 ou plus récent suffit.

## Dictionnaire

Le jeu utilise le fichier filtré Kaikki/Wiktionary `data/redewendungen-sprichwoerter.jsonl` : 2 729 Redewendungen et 193 Sprichwörter. Les définitions et exemples affichés sont ceux de Wiktionary, en allemand. Chaque entrée contient un lien vers sa source. La compilation copie le dictionnaire dans `dist/data/` pour son chargement sur un hébergement statique.

Les contributions Wiktionary sont disponibles sous CC BY-SA 4.0 et GFDL. Toute redistribution du dictionnaire doit conserver l’attribution et respecter les licences applicables. Voir les [conditions de réutilisation de Wiktionary](https://de.wiktionary.org/wiki/Wiktionary:Urheberrechtsbestimmungen) et la [licence CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Construire pour GitHub Pages

```sh
npm run build
```

Publier le contenu de `dist/` avec GitHub Pages. Le fichier `.nojekyll` évite le traitement Jekyll du répertoire publié.

Le site est publié depuis la branche `gh-pages` :
https://nesy.github.io/wortspiel/

Pour publier une mise à jour après compilation et commit :

```sh
git push origin main
git subtree push --prefix dist origin gh-pages
```
