// Import document classes.
import { DnGActor } from './documents/actor.mjs';
import { DnGItem } from './documents/item.mjs';
// Import sheet classes.
import { DnGActorSheet } from './sheets/actor-sheet.mjs';
import { DnGItemSheet } from './sheets/item-sheet.mjs';
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from './helpers/templates.mjs';
import { DNG } from './helpers/config.mjs';

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.dng = {
    DnGActor,
    DnGItem,
    rollItemMacro,
  };

  // Add custom constants for configuration.
  CONFIG.DNG = DNG;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d20 + @abilities.dex.mod',
    decimals: 2,
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = DnGActor;
  CONFIG.Item.documentClass = DnGItem;

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('dng', DnGActorSheet, {
    makeDefault: true,
    label: 'DNG.SheetLabels.Actor',
  });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('dng', DnGItemSheet, {
    makeDefault: true,
    label: 'DNG.SheetLabels.Item',
  });

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here is a useful example:
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

// Helper pour calculer les dégâts des capacités
Handlebars.registerHelper('calculateDamage', function(rank, efficacite, critique) {
  if (typeof rank !== 'number') rank = parseInt(rank) || 1;
  if (typeof efficacite !== 'number') efficacite = parseInt(efficacite) || 0;
  if (typeof critique !== 'boolean') critique = !!critique;
  
  let baseDice = 1 + rank;
  let modifiedDice = Math.max(1, baseDice + efficacite);
  let diceType = critique ? 'd6' : 'd4';
  
  if (modifiedDice === 0 || (baseDice + efficacite) <= 0) {
    return '1 dégât fixe';
  }
  
  return `${modifiedDice}${diceType}`;
});

// Helper pour additionner deux nombres
Handlebars.registerHelper('addNumbers', function(a, b) {
  return parseInt(a) + parseInt(b);
});

// Helper pour les cibles de capacité
Handlebars.registerHelper('getCible', function(cible) {
  const cibles = {
    cible_unique: 'Cible unique',
    cone_petit: 'Cône petit',
    cone_grand: 'Cône grand', 
    cercle_petit: 'Cercle petit',
    cercle_grand: 'Cercle grand',
    zone: 'Zone'
  };
  return cibles[cible] || cible;
});

// Helper pour les portées de capacité
Handlebars.registerHelper('getPortee', function(portee) {
  const portees = {
    contact: 'Contact',
    portee_courte: 'Portée courte',
    portee_longue: 'Portée longue'
  };
  return portees[portee] || portee;
});

// Helper pour les types Pokemon
Handlebars.registerHelper('getTypePokemon', function(type) {
  const types = {
    normal: 'Normal',
    feu: 'Feu',
    eau: 'Eau',
    plante: 'Plante',
    electrik: 'Électrik',
    glace: 'Glace',
    combat: 'Combat',
    poison: 'Poison',
    sol: 'Sol',
    vol: 'Vol',
    psy: 'Psy',
    insecte: 'Insecte',
    roche: 'Roche',
    spectre: 'Spectre',
    dragon: 'Dragon',
    tenebres: 'Ténèbres',
    acier: 'Acier',
    fee: 'Fée'
  };
  return types[type] || type;
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== 'Item') return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn(
      'You can only create macro buttons for owned Items'
    );
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.dng.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      img: item.img,
      command: command,
      flags: { 'dng.itemMacro': true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then((item) => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(
        `Could not find item ${itemName}. You may need to delete and recreate this macro.`
      );
    }

    // Trigger the item roll
    item.roll();
  });
}
