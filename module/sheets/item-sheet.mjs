import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';
import { DNG } from '../helpers/config.mjs';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class DnGItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['dng', 'sheet', 'item'],
      width: 520,
      height: 480,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'description',
        },
      ],
    });
  }

  /** @override */
  get template() {
    const path = 'systems/dng/templates/item';
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.hbs`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.hbs`.
    // Convert underscores to hyphens for template filename
    const templateType = this.item.type.replace(/_/g, '-');
    console.log(`Looking for template: ${path}/item-${templateType}-sheet.hbs`);
    return `${path}/item-${templateType}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = this.document.toObject(false);

    // Enrich description info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedDescription = await TextEditor.enrichHTML(
      this.item.system.description,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.item.getRollData(),
        // Relative UUID resolution
        relativeTo: this.item,
      }
    );

    // Add the item's data to context.data for easier access, as well as flags.
    context.system = itemData.system;
    context.flags = itemData.flags;

    // Adding a pointer to CONFIG.DNG
    context.config = CONFIG.DNG;

    // Prepare type-specific data
    if (this.item.type === 'trait_espece') {
      context.traitsEspece = DNG.traitsEspece;
    }

    if (this.item.type === 'talent_explorateur') {
      context.talentsExplorateur = DNG.talentsExplorateur;
    }

    // Prepare active effects for easier access
    context.effects = prepareActiveEffectCategories(this.item.effects);

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Auto-completion for trait d'espèce
    html.find('.trait-predefined-select').change(this._onTraitSelectionChange.bind(this));

    // Auto-completion for talent d'explorateur
    html.find('.talent-predefined-select').change(this._onTalentSelectionChange.bind(this));

    // Active Effect management
    html.on('click', '.effect-control', (ev) =>
      onManageActiveEffect(ev, this.item)
    );
  }

  /* -------------------------------------------- */

  /**
   * Handle selection of a predefined trait d'espèce
   * @param {Event} event   The originating click event
   * @private
   */
  async _onTraitSelectionChange(event) {
    event.preventDefault();
    const select = event.currentTarget;
    const selectedOption = select.options[select.selectedIndex];
    
    if (selectedOption.value) {
      const traitName = selectedOption.dataset.name;
      const traitEffect = selectedOption.dataset.effect;
      
      // Update the item's name and description
      await this.item.update({
        name: traitName,
        'system.description': traitEffect,
        'system.predefined_trait': selectedOption.value
      });
    } else {
      // Clear predefined selection
      await this.item.update({
        'system.predefined_trait': ''
      });
    }
  }

  /**
   * Handle selection of a predefined talent d'explorateur
   * @param {Event} event   The originating click event
   * @private
   */
  async _onTalentSelectionChange(event) {
    event.preventDefault();
    const select = event.currentTarget;
    const selectedOption = select.options[select.selectedIndex];
    
    if (selectedOption.value) {
      const talentName = selectedOption.dataset.name;
      const talentRank = parseInt(selectedOption.dataset.rank);
      const talentEffect = selectedOption.dataset.effect;
      
      // Update the item's name, rank, and description
      await this.item.update({
        name: talentName,
        'system.rank': talentRank,
        'system.description': talentEffect,
        'system.predefined_talent': selectedOption.value
      });
    } else {
      // Clear predefined selection
      await this.item.update({
        'system.predefined_talent': ''
      });
    }
  }
}
