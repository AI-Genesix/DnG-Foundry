# 🔧 Guide de Débogage - Système d'Effets DnG

## 🚨 Problèmes courants et solutions

### ❌ **Erreur "Cannot read properties of undefined"**

Si vous obtenez des erreurs lors de l'édition/suppression d'effets :

#### **Cause probable :**

- L'item n'est pas correctement initialisé
- Le `data-item-id` n'est pas présent sur l'élément HTML
- L'item n'est pas trouvé dans la collection d'items de l'acteur

#### **Solutions :**

1. **Rechargez Foundry VTT** après les modifications
2. **Vérifiez la console F12** pour voir les erreurs détaillées
3. **Testez avec un nouvel acteur** pour éviter les corruptions de données

### 🔍 **Débogage étape par étape :**

#### **1. Vérifiez que les données sont chargées :**

Ouvrez la console F12 et tapez :

```javascript
console.log("CONFIG.DNG:", CONFIG.DNG);
console.log("Traits:", CONFIG.DNG.traitsEspece);
console.log("Talents:", CONFIG.DNG.talentsExplorateur);
```

#### **2. Vérifiez qu'un item a un ID valide :**

Inspectez un élément d'effet dans l'onglet et vérifiez :

```html
<li class="item" data-item-id="QUELQUE_CHOSE"></li>
```

#### **3. Testez la récupération d'item :**

Dans la console, avec un acteur sélectionné :

```javascript
// Remplacez 'ID_ITEM' par l'ID réel
const item = game.actors.getName("NOM_ACTEUR").items.get("ID_ITEM");
console.log("Item trouvé:", item);
console.log("Item sheet disponible:", !!item?.sheet);
```

### 🛠 **Actions correctives :**

#### **Si l'auto-completion ne fonctionne pas :**

1. Vérifiez que `CONFIG.DNG` est bien défini
2. Assurez-vous que les templates accèdent à `config.traitsEspece` et `config.talentsExplorateur`
3. Rechargez le système

#### **Si les items ne se créent pas :**

1. Vérifiez le `template.json` pour la structure des nouveaux types
2. Assurez-vous que les types sont bien dans la liste `types`
3. Redémarrez Foundry VTT

#### **Si les boutons ne fonctionnent pas :**

1. Vérifiez que les classes CSS sont correctes (`item-edit`, `item-delete`, `item-create`)
2. Assurez-vous que les `data-item-id` sont présents
3. Rechargez la feuille de personnage

### 📝 **Fichiers modifiés :**

- ✅ `module/helpers/config.mjs` - Données des effets
- ✅ `module/sheets/item-sheet.mjs` - Auto-completion
- ✅ `module/sheets/actor-sheet.mjs` - Gestion des erreurs
- ✅ `template.json` - Structure des nouveaux items
- ✅ `lang/en.json` - Traductions
- ✅ `templates/item/*.hbs` - Templates des effets
- ✅ `templates/actor/parts/actor-effects.hbs` - Onglet effets

### 🎯 **Test final :**

1. **Redémarrez Foundry VTT complètement**
2. **Créez un nouvel acteur de test**
3. **Allez dans l'onglet "Effets"**
4. **Cliquez sur "+" pour un trait d'espèce**
5. **Sélectionnez "Acrobate" dans la liste**
6. **Vérifiez que le nom et l'effet s'auto-remplissent**
7. **Sauvegardez et testez l'édition**

### 📞 **Si le problème persiste :**

Ouvrez la console F12 et copiez-collez l'erreur exacte pour un diagnostic plus précis.

---

_Système d'effets DnG v1.0 - Diagnostic et réparation_
