# Wortspiel — Le pendu des Redensarten

Un jeu du pendu en français pour découvrir les expressions allemandes du Wiktionary. Clavier AZERTY, six erreurs possibles et progression conservée dans le navigateur.

## Jouer en local

```sh
npm start
```

Puis ouvrir http://localhost:5173. Node.js 18 ou plus récent suffit.

## Dictionnaire

Le jeu utilise le fichier filtré Kaikki/Wiktionary `data/redewendungen-sprichwoerter.jsonl` : 2 729 Redewendungen et 193 Sprichwörter. Le jeu affiche chaque indice en allemand et en français (`hint_fr`). Le français est également utilisé pour expliquer son sens après la manche. Les indices allemands proviennent des définitions d’origine, ou du champ `hint_de` pour les entrées sans définition. Les indices ont été traduits automatiquement puis corrigés ponctuellement ; les entrées sans définition ont reçu un indice rédigé en français. Les définitions d’origine et les exemples restent en allemand. Chaque entrée contient un lien vers sa source. La compilation vérifie la présence de tous les indices allemands et français et copie le dictionnaire dans `dist/data/` pour son chargement sur un hébergement statique.

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

Les dictionnaires JSON importés peuvent fournir un indice allemand facultatif dans `indiceAllemand` (format objet) ou en septième position (format tableau). Les anciens fichiers à six champs restent acceptés.

Après chaque manche, le résultat et le carnet affichent une traduction littérale française (`literal_fr`), séparée du sens figuré. Ces traductions ont été générées automatiquement et corrigées ponctuellement, notamment pour conserver les images des expressions courantes ; elles ne constituent pas une révision linguistique exhaustive. La compilation vérifie leur présence pour les 2 922 expressions.
