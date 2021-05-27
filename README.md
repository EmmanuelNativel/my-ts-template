# **Mon template d'application web avec typescript**

## **Lancement du projet**

### Installation des dépendances
```shell
npm install
```
### Configuration
```Entrez vos paramètres de configuration dans le gulpfile.```
___

## **Liste des commandes disponibles**

### *Générale*
* Lancement du mode dévelopement :
```shell
gulp start_dev
```
* Supprimer le contenu des dossiers build et buildx
```shell
gulp clean
```
* Build du code client
```shell
gulp build_client
```
* Build du code serveur
```shell
gulp build_server
```
* Build de l'application
```shell
gulp build
```
* Build de l'application et offuscation du code client
```shell
gulp build_prod
```
* Consulter l'aide, les **aliases** et les **options des commandes**
```shell
gulp help
```

### _Git_
* Initialisation du dépôt git :
```shell
gulp git_init
```
`--url` : Url du dépôt git distant.

* Initialisation du dépôt git :
```shell
gulp git_commit
```
`--fix` : Marque le commit en tant que "Bug fix" avec le tag **[FIX]**.

`--feat` : Marque le commit en tant que "feature" avec le tag **[FEAT]**.

`--m` : Message associé au commit.


