# Guide de Test - Système DnG pour Foundry VTT

## 🎯 Nouvelles Fonctionnalités Implémentées

### Ressources du Personnage

- **PV** (Points de Vie) - avec maximum personnalisable
- **PP** (Points de Pouvoir) - avec maximum personnalisable
- **PC** (Puissance Cachée) - avec maximum personnalisable
- **PH** (Points Héroïques) - limités à 4 maximum automatiquement

### Statistiques

#### Stats de Terrain (valeurs 1-5)

- Force (FOR)
- Agilité (AGI)
- Instinct (INS)
- Sagesse (SAG)
- Sympathie (SYM)
- Charisme (CHA)

#### Stats de Combat (valeurs 1-5)

- Attaque (ATQ)
- Défense (DEF)
- Attaque Spéciale (ATS)
- Défense Spéciale (DFS)
- Précision (PRE)
- Esquive (ESQ)

### Système de Jets de Dés

- **Formule** : Dé de Stat + Dé de Critique (d20)
- **Dé de Stat** : Calculé avec `(valeur stat + 1) * 2`
- **Critique** : 19-20 sur le d20

## 🧪 Comment Tester

### 1. Démarrer Foundry VTT

1. Lancez Foundry VTT
2. Créez ou ouvrez un monde
3. Activez le système "Donjons et Groudon"

### 2. Créer un Personnage de Test

1. Créez un nouvel Acteur de type "Personnage"
2. La feuille s'ouvrira automatiquement sur l'onglet "Informations"

### 3. Tester l'Onglet Informations

- **Niveau** : Modifiez le niveau (1-20)
- **Classe** : Sélectionnez Baroudeur, Éclaireur, Secouriste ou Non défini
- **Espèce** : Saisissez le nom du Pokémon
- **Types** : Sélectionnez les types (primaire et secondaire)
  - Observez le changement de couleur selon le type choisi
- **Grade** : In-Training, Rookie, Champion, Ultimate
- **Style** : Offensif, Défensif, Physique, Spécial, Rapide, Complet
- **Améliorations Baroudeur** : N'apparaît que si classe = Baroudeur
  - Le maximum change selon le niveau (3/6/9)

### 4. Configurer les Ressources

- Modifiez les maximums des PV, PP, PC (dans l'en-tête)
- Essayez de mettre plus de 4 PH (devrait être limité)
- Les barres de token utilisent PV (primaire) et PP (secondaire)

### 5. Tester les Statistiques (Onglet Statistiques)

- Modifiez les valeurs des stats (entre 1 et 5)
- Observez le calcul automatique des dés affichés
- **Exemple** : Force 3 → d8 (car (3+1)\*2 = 8)

### 6. Tester les Jets de Dés

- Cliquez sur n'importe quelle statistique pour lancer un jet
- Vérifiez que le chat affiche :
  - Dé de statistique avec la bonne taille
  - Dé de critique (d20)
  - Indication "Critique !" si 19-20
  - Total des deux dés

## 🐛 Points à Vérifier

### Interface

- [ ] Les 4 ressources s'affichent correctement dans l'en-tête
- [ ] L'onglet "Informations" est l'onglet par défaut
- [ ] Les champs Pokémon sont présents et fonctionnels
- [ ] Les types changent de couleur selon la sélection
- [ ] Les améliorations Baroudeur apparaissent selon la classe
- [ ] Les statistiques sont organisées en deux colonnes
- [ ] Les dés calculés apparaissent à côté des stats

### Fonctionnalité

- [ ] Les jets de dés fonctionnent en cliquant sur les stats
- [ ] Les messages de chat s'affichent correctement
- [ ] Les critiques sont highlightés en rouge
- [ ] Les PH sont limités à 4 maximum
- [ ] Le maximum d'améliorations Baroudeur change avec le niveau

### Nouvelles Fonctionnalités Pokémon

- [ ] Sélection de classe fonctionne
- [ ] Types primaire/secondaire avec couleurs
- [ ] Grade et Style configurables
- [ ] Améliorations Baroudeur conditionnelles
- [ ] Calcul automatique du max selon le niveau

### Tokens

- [ ] Les tokens utilisent PV comme barre principale
- [ ] Les tokens utilisent PP comme barre secondaire

## 🚀 Prochaines Étapes Suggérées

1. **Compétences** - Ajouter des compétences liées aux stats
2. **Modificateurs** - Équipements qui modifient les stats
3. **Système de magie** - Utilisation des PP/PC pour les sorts
4. **Évolution** - Progression et amélioration des stats
5. **Interface PNJ** - Adapter la feuille des PNJ

## 📝 Notes de Développement

- Templates mis à jour dans `template.json`
- Nouvelles traductions dans `lang/en.json`
- Fonction de jets dans `module/documents/actor.mjs`
- Interface redessinée dans `templates/actor/actor-character-sheet.hbs`
- Styles ajoutés dans `css/dng.css`
- Template de chat dans `templates/chat/stat-roll.hbs`

---

**Système prêt pour les tests !** 🎲
