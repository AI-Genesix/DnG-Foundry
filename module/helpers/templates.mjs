/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/dng/templates/actor/parts/actor-features.hbs',
    'systems/dng/templates/actor/parts/actor-items.hbs',
    'systems/dng/templates/actor/parts/actor-spells.hbs',
    'systems/dng/templates/actor/parts/actor-effects.hbs',
    'systems/dng/templates/actor/parts/actor-capacites.hbs',
    // Item sheets
    'systems/dng/templates/item/item-sheet.hbs',
    'systems/dng/templates/item/item-feature-sheet.hbs',
    'systems/dng/templates/item/item-item-sheet.hbs',
    'systems/dng/templates/item/item-spell-sheet.hbs',
    'systems/dng/templates/item/item-trait-espece-sheet.hbs',
    'systems/dng/templates/item/item-talent-explorateur-sheet.hbs',
    'systems/dng/templates/item/item-domaine-sheet.hbs',
    'systems/dng/templates/item/item-handicap-sheet.hbs',
    'systems/dng/templates/item/item-capacite-sheet.hbs',
    // Item partials
    'systems/dng/templates/item/parts/item-effects.hbs',
  ]);
};
