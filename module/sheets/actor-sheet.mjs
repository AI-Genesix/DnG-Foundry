import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class DnGActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['dng', 'sheet', 'actor'],
      width: 600,
      height: 600,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'info',
        },
      ],
    });
  }

  /** @override */
  get template() {
    return `systems/dng/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = this.document.toObject(false);

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;

    // Adding a pointer to CONFIG.DNG
    context.config = CONFIG.DNG;

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Enrich biography info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedBiography = await TextEditor.enrichHTML(
      this.actor.system.biography,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.actor.getRollData(),
        // Relative UUID resolution
        relativeTo: this.actor,
      }
    );

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(
      // A generator that returns all effects stored on the actor
      // as well as any items
      this.actor.allApplicableEffects()
    );

    return context;
  }

  /**
   * Character-specific context modifications
   *
   * @param {object} context The context object to mutate
   */
  _prepareCharacterData(context) {
    // This is where you can enrich character-specific editor fields
    // or setup anything else that's specific to this type
  }

  /**
   * Organize and classify Items for Actor sheets.
   *
   * @param {object} context The context object to mutate
   */
  _prepareItems(context) {
    // Initialize containers.
    const gear = [];
    const features = [];
    const traitsEspece = [];
    const talentsExplorateur = [];
    const domaines = [];
    const handicaps = [];
    const capacites = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      // Append to features.
      else if (i.type === 'feature') {
        features.push(i);
      }
      // Append to DnG effect types.
      else if (i.type === 'trait_espece') {
        traitsEspece.push(i);
      }
      else if (i.type === 'talent_explorateur') {
        talentsExplorateur.push(i);
      }
      else if (i.type === 'domaine') {
        domaines.push(i);
      }
      else if (i.type === 'handicap') {
        handicaps.push(i);
      }
      else if (i.type === 'capacite') {
        capacites.push(i);
      }
    }

    // Assign and return
    context.gear = gear;
    context.features = features;
    context.traitsEspece = traitsEspece;
    context.talentsExplorateur = talentsExplorateur;
    context.domaines = domaines;
    context.handicaps = handicaps;
    context.capacites = capacites;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.on('click', '.item-edit', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const itemId = li.data('itemId');
      const item = this.actor.items.get(itemId);
      
      if (!item) {
        console.error('Item not found with ID:', itemId);
        return;
      }
      
      if (!item.sheet) {
        console.error('Item sheet not available for item:', item);
        return;
      }
      
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.on('click', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click', '.item-delete', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const itemId = li.data('itemId');
      const item = this.actor.items.get(itemId);
      
      if (!item) {
        console.error('Item not found with ID:', itemId);
        return;
      }
      
      if (!item.delete) {
        console.error('Item delete method not available for item:', item);
        return;
      }
      
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.on('click', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Rollable abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));

    // Damage roll buttons
    html.on('click', '.damage-roll', this._onDamageRoll.bind(this));
    
    // Manual damage roll button
    html.on('click', '.manual-damage-roll', this._onManualDamageRoll.bind(this));
    
    // Modifier increase/decrease buttons
    html.on('click', '.modifier-increase', this._onModifierIncrease.bind(this));
    html.on('click', '.modifier-decrease', this._onModifierDecrease.bind(this));
    
    // Critical checkbox change
    html.on('change', '.critical-checkbox', this._onCriticalToggle.bind(this));
    
    // Capacité collapse/expand
    html.on('click', '.capacite-header.clickable', this._onCapaciteToggle.bind(this));

    // Type selector color change
    html.on('change', '.type-select', this._onTypeChange.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
    }

    // Initialize type colors
    this._initializeTypeColors(html);
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system['type'];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle stat rolls for DnG system
    if (dataset.action === 'rollStat') {
      const statType = dataset.statType;
      const statName = dataset.statName;
      if (statType && statName) {
        return this.actor.rollStat(statType, statName);
      }
    }

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[ability] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

  /**
   * Handle damage roll buttons
   * @param {Event} event - The originating click event
   * @private
   */
  async _onDamageRoll(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const rank = parseInt(button.dataset.rank);
    const modifier = parseInt(button.dataset.modifier);
    
    // Check if critical is enabled for this capacity
    const capacityItem = button.closest('.capacite');
    const criticalCheckbox = capacityItem.querySelector('.critical-checkbox');
    const critical = criticalCheckbox ? criticalCheckbox.checked : false;
    
    // Check for damage modifier
    const damageModifierInput = capacityItem.querySelector('.damage-modifier');
    const damageModifier = damageModifierInput ? parseInt(damageModifierInput.value) || 0 : 0;
    
    // Calculate dice count
    let baseDice = 1 + rank;
    let modifiedDice = Math.max(1, baseDice + modifier);
    let diceType = critical ? 'd6' : 'd4';
    
    // Handle ineffective attacks
    if (modifiedDice === 0 || (baseDice + modifier) <= 0) {
      // Ineffective attack - 1 fixed damage
      let finalDamage = 1 + damageModifier;
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        content: `<div class="dice-roll">
          <div class="dice-result">
            <div class="dice-formula">Attaque inefficace${damageModifier !== 0 ? ` + ${damageModifier}` : ''}</div>
            <div class="dice-total">${finalDamage} dégât${finalDamage > 1 ? 's' : ''}</div>
          </div>
        </div>`,
        type: CONST.CHAT_MESSAGE_TYPES.ROLL
      });
      return;
    }
    
    // Create the roll formula
    let formula = `${modifiedDice}${diceType}`;
    if (damageModifier !== 0) {
      formula += damageModifier > 0 ? ` + ${damageModifier}` : ` - ${Math.abs(damageModifier)}`;
    }
    
    // Create flavor text
    let effectText = '';
    if (modifier === 0) effectText = 'Efficacité neutre';
    else if (modifier === 1) effectText = 'Super efficace';
    else if (modifier === 2) effectText = 'Doublement super efficace';
    else if (modifier === -1) effectText = 'Peu efficace';
    else if (modifier === -2) effectText = 'Doublement peu efficace';
    else if (modifier === -3) effectText = 'Inefficace';
    
    if (critical) effectText += ' (Critique)';
    
    // Find the capacity name
    const capacityName = capacityItem.querySelector('.capacite-name').textContent;
    
    const flavor = `${capacityName} - ${effectText}`;
    
    // Execute the roll
    const roll = new Roll(formula, this.actor.getRollData());
    await roll.evaluate();
    
    // Check if final result is 0 or less and apply minimum damage rule
    if (roll.total <= 0) {
      // Create a new roll with fixed 1 damage + modifier
      let fixedDamage = 1;
      if (damageModifier !== 0) {
        fixedDamage += damageModifier;
      }
      
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        content: `<div class="dice-roll">
          <div class="dice-result">
            <div class="dice-formula">Attaque inefficace → 1 dégât fixe${damageModifier !== 0 ? ` + ${damageModifier}` : ''}</div>
            <div class="dice-total">${Math.max(1, fixedDamage)} dégât${Math.max(1, fixedDamage) > 1 ? 's' : ''}</div>
          </div>
        </div>`,
        flavor: flavor,
        type: CONST.CHAT_MESSAGE_TYPES.ROLL
      });
    } else {
      // Normal roll with details visible
      await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: flavor,
        rollMode: game.settings.get('core', 'rollMode'),
      });
    }
  }

  /**
   * Handle manual damage roll button
   * @param {Event} event - The originating click event
   * @private
   */
  async _onManualDamageRoll(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const manualGroup = button.closest('.manual-damage-section');
    const capacityItem = button.closest('.capacite');
    
    const diceCount = parseInt(manualGroup.querySelector('.manual-dice-count').value) || 1;
    const diceType = manualGroup.querySelector('.manual-dice-type').value || 'd4';
    
    // Check for damage modifier
    const damageModifierInput = capacityItem.querySelector('.damage-modifier');
    const damageModifier = damageModifierInput ? parseInt(damageModifierInput.value) || 0 : 0;
    
    // Check if critical is enabled
    const criticalCheckbox = capacityItem.querySelector('.critical-checkbox');
    const critical = criticalCheckbox ? criticalCheckbox.checked : false;
    
    // Adjust dice type if critical
    const finalDiceType = critical && diceType === 'd4' ? 'd6' : diceType;
    
    // Find the capacity name
    const capacityName = capacityItem.querySelector('.capacite-name').textContent;
    
    // Create formula
    let formula = `${diceCount}${finalDiceType}`;
    if (damageModifier !== 0) {
      formula += damageModifier > 0 ? ` + ${damageModifier}` : ` - ${Math.abs(damageModifier)}`;
    }
    
    let flavor = `${capacityName} - Lancer manuel`;
    if (critical) flavor += ' (Critique)';
    
    // Execute the roll
    const roll = new Roll(formula, this.actor.getRollData());
    await roll.evaluate();
    
    // Check if final result is 0 or less and apply minimum damage rule
    if (roll.total <= 0) {
      // Create a new roll with fixed 1 damage + modifier
      let fixedDamage = 1;
      if (damageModifier !== 0) {
        fixedDamage += damageModifier;
      }
      
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        content: `<div class="dice-roll">
          <div class="dice-result">
            <div class="dice-formula">Lancer inefficace → 1 dégât fixe${damageModifier !== 0 ? ` + ${damageModifier}` : ''}</div>
            <div class="dice-total">${Math.max(1, fixedDamage)} dégât${Math.max(1, fixedDamage) > 1 ? 's' : ''}</div>
          </div>
        </div>`,
        flavor: flavor,
        type: CONST.CHAT_MESSAGE_TYPES.ROLL
      });
    } else {
      // Normal roll with details visible
      await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: flavor,
        rollMode: game.settings.get('core', 'rollMode'),
      });
    }
  }

  /**
   * Handle apply modifier button
   * @param {Event} event - The originating click event
   * @private
   */
  async _onApplyModifier(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const modifierGroup = button.closest('.damage-modifier-section');
    const capacityItem = button.closest('.capacite');
    
    const damageModifier = parseInt(modifierGroup.querySelector('.damage-modifier').value) || 0;
    
    if (damageModifier === 0) {
      ui.notifications.info("Aucun modificateur à appliquer.");
      return;
    }
    
    // Find the capacity name
    const capacityName = capacityItem.querySelector('.capacite-name').textContent;
    
    // Show notification
    const modText = damageModifier > 0 ? `+${damageModifier}` : `${damageModifier}`;
    ui.notifications.info(`Modificateur ${modText} prêt pour la prochaine attaque de ${capacityName}`);
    
    // Add visual feedback
    button.style.background = '#28a745';
    button.innerHTML = '<i class="fas fa-check"></i>';
    
    // Reset after 3 seconds
    setTimeout(() => {
      button.style.background = '#17a2b8';
      button.innerHTML = '<i class="fas fa-plus-minus"></i>';
    }, 3000);
  }

  /**
   * Handle type selector changes to apply colors
   * @param {Event} event   The originating change event
   * @private
   */
  _onTypeChange(event) {
    const select = event.currentTarget;
    const selectedOption = select.options[select.selectedIndex];
    const color = selectedOption.dataset.color;
    
    if (color && selectedOption.value) {
      select.style.backgroundColor = color;
      select.style.color = this._getContrastColor(color);
    } else {
      select.style.backgroundColor = '';
      select.style.color = '';
    }
  }

  /**
   * Get contrasting text color for a background color
   * @param {string} hexColor - The background color in hex format
   * @returns {string} - Either 'black' or 'white'
   * @private
   */
  _getContrastColor(hexColor) {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness > 128 ? 'black' : 'white';
  }

  /**
   * Initialize type colors on sheet render
   * @param {jQuery} html - The rendered HTML
   * @private
   */
  _initializeTypeColors(html) {
    html.find('.type-select').each((i, select) => {
      const selectedOption = select.options[select.selectedIndex];
      if (selectedOption && selectedOption.dataset.color && selectedOption.value) {
        const color = selectedOption.dataset.color;
        select.style.backgroundColor = color;
        select.style.color = this._getContrastColor(color);
      }
    });
  }

  /**
   * Handle critical checkbox toggle
   * @param {Event} event - The originating change event
   * @private
   */
  _onCriticalToggle(event) {
    const checkbox = event.currentTarget;
    const capacityItem = checkbox.closest('.capacite');
    const damageButtons = capacityItem.querySelectorAll('.damage-roll');
    
    // Update all damage displays
    damageButtons.forEach(button => {
      const rank = parseInt(button.dataset.rank);
      const modifier = parseInt(button.dataset.modifier);
      const critical = checkbox.checked;
      
      // Calculate new damage
      let baseDice = 1 + rank;
      let modifiedDice = Math.max(1, baseDice + modifier);
      let diceType = critical ? 'd6' : 'd4';
      
      let damageText;
      if (modifiedDice === 0 || (baseDice + modifier) <= 0) {
        damageText = '1 dégât fixe';
      } else {
        damageText = `${modifiedDice}${diceType}`;
      }
      
      // Update the display
      const damageDisplay = button.querySelector('.damage-display');
      if (damageDisplay) {
        damageDisplay.textContent = damageText;
      }
    });
  }

  /**
   * Handle modifier increase button click
   * @param {Event} event - The originating click event
   * @private
   */
  _onModifierIncrease(event) {
    event.preventDefault();
    const input = event.currentTarget.parentElement.querySelector('.damage-modifier');
    const currentValue = parseInt(input.value) || 0;
    input.value = Math.min(20, currentValue + 1);
  }

  /**
   * Handle modifier decrease button click
   * @param {Event} event - The originating click event
   * @private
   */
  _onModifierDecrease(event) {
    event.preventDefault();
    const input = event.currentTarget.parentElement.querySelector('.damage-modifier');
    const currentValue = parseInt(input.value) || 0;
    input.value = Math.max(-20, currentValue - 1);
  }

  /**
   * Handle capacité toggle (collapse/expand)
   * @param {Event} event - The originating click event
   * @private
   */
  _onCapaciteToggle(event) {
    event.preventDefault();
    
    // Don't trigger if clicking on controls
    if (event.target.closest('.item-controls')) {
      return;
    }
    
    const capaciteElement = event.currentTarget.closest('.capacite');
    capaciteElement.classList.toggle('collapsed');
  }
}
