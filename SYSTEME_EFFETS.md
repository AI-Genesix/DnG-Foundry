# 🎯 Système d'Effets DnG - Guide Complet

## 📋 Vue d'ensemble

Le système d'effets DnG remplace l'ancien système de "Sorts" par un système complet et thématique Pokemon avec 4 catégories :

### 🔹 **Traits d'Espèce**

- **Prédéfinis** : 32 traits avec auto-completion
- **Type** : `trait_espece`
- **Exemples** : Acrobate, Amphibie, Lévitation, Mastoc...

### 🔹 **Talents d'Explorateur**

- **Prédéfinis** : 70+ talents organisés par rang (1-3)
- **Type** : `talent_explorateur`
- **Rangs** : 1 (novice), 2 (expert), 3 (maître)

### 🔹 **Domaines**

- **Personnalisés** : Création libre par le joueur
- **Type** : `domaine`
- **Usage** : Spécialisations et expertises

### 🔹 **Handicaps**

- **Personnalisés** : Création libre par le joueur
- **Type** : `handicap`
- **Usage** : Limitations et défis narratifs

## 🚀 Fonctionnalités

### ✅ Auto-completion intelligente

- **Sélection trait/talent** → Auto-remplissage du nom et effet
- **Interface intuitive** avec dropdowns organisés
- **Validation** des rangs pour les talents

### ✅ Flexibilité totale

- **Prédéfinis** : Base solide avec 100+ options
- **Personnalisés** : Liberté créative complète
- **Mixte** : Modification des prédéfinis possible

### ✅ Interface utilisateur optimisée

- **Sections organisées** dans l'onglet Effets
- **Boutons d'action** pour créer/éditer/supprimer
- **Hints et guidelines** pour guider l'utilisateur

## 📊 Structure des données

### Traits d'Espèce

```javascript
DNG.traitsEspece = {
  acrobate: {
    name: "Acrobate",
    effect:
      "Le Pokémon est agile et aérien. Lorsqu'il doit faire un test d'Agilité pour de l'escalade, pour un saut ou une acrobatie, réduisez le DD de 2.",
  },
  // ... 31 autres traits
};
```

### Talents d'Explorateur

```javascript
DNG.talentsExplorateur = {
  ami_sociable: {
    name: "Ami Sociable",
    rank: 1,
    effect:
      "Le personnage sait aisément gagner la confiance d'autrui. Une fois par jour, lorsque vous devez réaliser un test de Sympathie, vous pouvez lancer deux fois le dé de Caractéristique et choisir le meilleur résultat.",
  },
  // ... 70+ autres talents
};
```

## 🎮 Utilisation

### Pour les Joueurs

1. **Aller dans l'onglet "Effets"** de la fiche de personnage
2. **Choisir la catégorie** (Traits/Talents/Domaines/Handicaps)
3. **Cliquer "Créer"** pour ouvrir la fiche d'effet
4. **Sélectionner un élément prédéfini** ou créer du contenu personnalisé
5. **Sauvegarder** - l'effet apparaît automatiquement sur la fiche

### Pour les MJ

- **Traits d'espèce** : Définissent les capacités naturelles
- **Talents d'explorateur** : Progression et spécialisation
- **Domaines** : Expertises narratives custom
- **Handicaps** : Défis et roleplay

## 🔧 Développement

### Ajout de nouveaux éléments prédéfinis

1. **Éditer** `module/helpers/config.mjs`
2. **Ajouter** dans `DNG.traitsEspece` ou `DNG.talentsExplorateur`
3. **Respecter** la structure avec `name`, `effect` et `rank` (pour talents)

### Modification des templates

- **Traits** : `templates/item/item-trait-espece-sheet.hbs`
- **Talents** : `templates/item/item-talent-explorateur-sheet.hbs`
- **Domaines** : `templates/item/item-domaine-sheet.hbs`
- **Handicaps** : `templates/item/item-handicap-sheet.hbs`

## 📈 État du projet

- ✅ **Structure complète** : 4 catégories d'effets opérationnelles
- ✅ **Base de données** : 100+ éléments prédéfinis intégrés
- ✅ **Auto-completion** : Sélection automatique fonctionnelle
- ✅ **Interface** : Templates créés et stylés
- ✅ **Validation** : Syntaxe JavaScript et JSON vérifiée

**Le système d'effets DnG est prêt pour utilisation ! 🎉**
