# Wortspiel — Le pendu des Redensarten

Un jeu du pendu en français pour découvrir les expressions allemandes du Wiktionary. Clavier AZERTY, six erreurs possibles et progression conservée dans le navigateur.

Le tirage favorise les expressions de l’allemand courant. Le champ facultatif `usage_priority` du dictionnaire distingue 193 expressions courantes (`common`, poids 20), 40 tournures moins prioritaires, notamment littéraires ou vieillies (`less_common`, poids 0,2), et les autres entrées (poids 1). Il s’agit d’une sélection éditoriale, pas de fréquences mesurées dans un corpus : une entrée non classée n’est pas nécessairement rare. Les choix s’appuient notamment sur les ressources pédagogiques [Deutsch – ganz echt!](https://deutsch-ganz-echt.de/redewendungen/liste/), [Rahat Lorenz](https://deutsch-coaching-berlin.de/redewendungen-deutsch) et [Sprachcaffe](https://www.sprachcaffe.de/uc/magazin-artikel/deutsche-redewendungen-im-alltag.htm), consultées le 14 novembre 2026, complétées par une appréciation éditoriale. Les expressions restent toutes accessibles ; environ la moitié des manches favorisent le groupe courant avec le dictionnaire actuel.

Chaque manche fait un nouveau tirage pondéré. Les 30 dernières expressions affichées sont exclues, y compris après rechargement grâce à l’historique conservé dans le navigateur. Pour les petits dictionnaires, cette fenêtre se réduit à leur taille moins une. Les imports conservent leur format à six ou sept champs ; les expressions reconnues reprennent leur priorité, les autres ont le même poids standard. `npm test` vérifie la distribution du tirage et l’absence de répétitions récentes. La compilation versionne les adresses du script, du module de tirage et du dictionnaire pour renouveler le cache lors des mises à jour.

## Jouer en local

```sh
npm start
```

Puis ouvrir http://localhost:5173. Node.js 18 ou plus récent suffit.

## Dictionnaire

Le jeu utilise le fichier filtré Kaikki/Wiktionary `data/redewendungen-sprichwoerter.jsonl` : 2 729 Redewendungen et 193 Sprichwörter. Le jeu affiche chaque indice en allemand et en français (`hint_fr`). Le français est également utilisé pour expliquer son sens après la manche. Les indices allemands proviennent des définitions d’origine, ou du champ `hint_de` pour les entrées sans définition. Les indices ont été traduits automatiquement puis corrigés ponctuellement ; les entrées sans définition ont reçu un indice rédigé en français. Les définitions d’origine et les exemples restent en allemand. Chaque entrée contient un lien vers sa source. La compilation vérifie la présence de tous les indices allemands et français et copie le dictionnaire dans `docs/data/` pour son chargement sur un hébergement statique.

Les contributions Wiktionary sont disponibles sous CC BY-SA 4.0 et GFDL. Toute redistribution du dictionnaire doit conserver l’attribution et respecter les licences applicables. Voir les [conditions de réutilisation de Wiktionary](https://de.wiktionary.org/wiki/Wiktionary:Urheberrechtsbestimmungen) et la [licence CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Construire pour GitHub Pages

```sh
npm run build
```

Le site est publié automatiquement depuis le dossier `docs/` de la branche `main` :
https://nesy.github.io/wortspiel/

Pour publier une mise à jour, exécuter les tests et la compilation, committer les modifications (y compris `docs/`), puis pousser sur `main` :

```sh
npm test
npm run build
# Committer les modifications, y compris docs/.
git push origin main
```

GitHub Pages publie automatiquement le contenu de `docs/` à chaque push. Les tests et la compilation sont exécutés localement avant le commit. Dans les paramètres Pages, la source est « Deploy from a branch », avec la branche `main` et le dossier `/docs`. Le fichier `docs/.nojekyll` permet de servir directement les fichiers statiques.

Les dictionnaires JSON importés peuvent fournir un indice allemand facultatif dans `indiceAllemand` (format objet) ou en septième position (format tableau). Les anciens fichiers à six champs restent acceptés.

Après chaque manche, le résultat et le carnet affichent « Mot à mot » (`literal_fr`), séparé du « Sens » figuré. La traduction mot à mot doit conserver le vocabulaire, les images et le registre de l’allemand, même lorsque le résultat paraît étrange en français. Elle ne doit pas remplacer l’expression par un équivalent idiomatique français ni atténuer les mots vulgaires. On peut adapter l’ordre des mots à la grammaire française.

Par exemple, `im Arsch sein` donne « Être dans le cul » au mot à mot et « Être baisé, foutu » pour le sens ; `einen grünen Daumen haben` donne « Avoir un pouce vert », et non « Avoir la main verte » ; `in den sauren Apfel beißen` donne « Mordre dans la pomme acide ». Les traductions initialement générées automatiquement ont fait l’objet de corrections, notamment dans les expressions courantes et dans les cas où un autre idiome avait remplacé l’image allemande. Cette révision n’est pas exhaustive. La compilation vérifie la présence d’une traduction sur une seule ligne pour les 2 922 expressions.
