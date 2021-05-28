# **Mon template d'application web avec typescript**

___

## **Lancement du projet**

### Installation des dépendances
```shell
npm install
```
### Configuration
Entrez vos paramètres de configuration dans le gulpfile.
```ts
const GULP_CONFIG = {
    git_repository: "https://github.com/EmmanuelNativel/my-ts-template.git",
    server_port: 8080,
    build_root_file: "server.js",
    gitignore: ['!build', '!buildx', '!node_modules', '!package-lock.json']
}
```
### Structure du projet
La structure minimale ci-dessous doit être respectée.
Le `code client` doit se trouver dans `src/www/`. 
Le `code serveur` doit se trouver dans `src/`.
```
.
+-- src/
|   +-- www/
|   |   +-- lib/
|   |   |   +-- client.ts
|   |   +-- index.html
|   +-- server.ts
+-- .package.json
+-- gulpfile.js
```

### Commencer à développer
Lancer le mode développement. Cette commande va ouvrir votre navigateur par défaut à l'adresse localhost:3000. 

```shell
gulp dev
```

___

## **Liste des commandes disponibles**

### *Générale*
* Lancement du mode dévelopement :
```shell
gulp start_dev
gulp dev
```
* Supprimer le contenu des dossiers build et buildx
```shell
gulp clean
gulp cl
```
* Build du code client
```shell
gulp build_client
gulp bc
```
* Build du code serveur
```shell
gulp build_server
gulp bs
```
* Build de l'application
```shell
gulp build
gulp b
```
* Build de l'application et offuscation du code client
```shell
gulp build_prod
gulp prod
```
* Consulter la **description**, les **aliases** et les **options** des commandes
```shell
gulp help
```

### _Git_
* Initialisation du dépôt git :
```shell
gulp git_init
gulp gi
```
`--url` : Url du dépôt git distant.
* Ajouter les fichiers modifier dans le "stage" :
```shell
gulp git_add
gulp ga
```
* Initialisation du dépôt git :
```shell
gulp git_commit
gulp gc
```
`--fix` : Marque le commit en tant que "Bug fix" avec le tag **[FIX]**.

`--feat` : Marque le commit en tant que "feature" avec le tag **[FEAT]**.

`--m` : Message associé au commit.
> Par exemple la commande **`gulp --feat --m "Ajout des utilisateurs"`** génèrera le message de commit ```[FEAT] Ajout des utilisateurs```
* Afficher l'état de l'arbre de travail :
```shell
gulp git_status
gulp gs
```
* Restorer le dernier commit :
```shell
gulp git_reset
gulp gr
```
* Sauvegarder les commits sur le répertoire distant (sur la branche courrante) :
```shell
gulp git_push
gulp gph
```
* Récupérer les code du répertoire distant (sur la branche courrante) :
```shell
gulp git_pull
gulp gpl
```
* Add + commit + push des modifications
```shell
gulp git_send
gulp g
```
`--fix` : Marque le commit en tant que "Bug fix" avec le tag **[FIX]**.

`--feat` : Marque le commit en tant que "feature" avec le tag **[FEAT]**.

`--m` : Message associé au commit.



