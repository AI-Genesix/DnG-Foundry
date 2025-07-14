/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class DnGActor extends Actor {
  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the actor source data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.dng || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Calculer les dés de statistiques pour les stats de terrain
    if (systemData.stats?.terrain) {
      for (let [key, stat] of Object.entries(systemData.stats.terrain)) {
        stat.die = CONFIG.DNG.getStatDie(stat.value);
      }
    }

    // Calculer les dés de statistiques pour les stats de combat
    if (systemData.stats?.combat) {
      for (let [key, stat] of Object.entries(systemData.stats.combat)) {
        stat.die = CONFIG.DNG.getStatDie(stat.value);
      }
    }

    // Calculer le maximum d'améliorations Baroudeur selon le niveau
    if (systemData.pokemon?.classe?.value === 'baroudeur' && systemData.baroudeur?.ameliorations) {
      const level = systemData.attributes?.level?.value || 1;
      systemData.baroudeur.ameliorations.max = CONFIG.DNG.getBaroudeurMax(level);
    }
  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
    systemData.xp = systemData.cr * systemData.cr * 100;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    // Starts off by populating the roll data with a shallow copy of `this.system`
    const data = { ...this.system };

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getNpcRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.type !== 'character') return;

    // Copy the stats to the top level, so that rolls can use
    // formulas like `@force.value + 4`.
    if (data.stats?.terrain) {
      for (let [k, v] of Object.entries(data.stats.terrain)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }
    
    if (data.stats?.combat) {
      for (let [k, v] of Object.entries(data.stats.combat)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Add level for easier access, or fall back to 0.
    if (data.attributes.level) {
      data.lvl = data.attributes.level.value ?? 0;
    }
  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.type !== 'npc') return;

    // Process additional NPC data here.
  }

  /**
   * Effectue un jet de dés selon le système DnG
   * @param {string} statType - Type de statistique ('terrain' ou 'combat')
   * @param {string} statName - Nom de la statistique
   * @param {Object} options - Options du jet
   */
  async rollStat(statType, statName, options = {}) {
    const stat = this.system.stats?.[statType]?.[statName];
    if (!stat) {
      ui.notifications.error(`Statistique ${statName} non trouvée dans ${statType}`);
      return;
    }

    // Calculer le dé de statistique
    const statDieSize = CONFIG.DNG.getStatDie(stat.value);
    
    // Créer les formules de dés
    const statRoll = new Roll(`1d${statDieSize}`, this.getRollData());
    const critRoll = new Roll('1d20', this.getRollData());
    
    // Effectuer les jets
    await statRoll.evaluate();
    await critRoll.evaluate();
    
    // Vérifier si c'est critique
    const isCritical = CONFIG.DNG.isCritical(critRoll.total);
    
    // Calculer le total
    const total = statRoll.total + critRoll.total;
    
    // Préparer les données pour le template de chat
    const rollData = {
      actor: this,
      statName: game.i18n.localize(CONFIG.DNG[statType === 'terrain' ? 'terrainStats' : 'combatStats'][statName]),
      statValue: stat.value,
      statDie: statDieSize,
      statRoll: statRoll,
      critRoll: critRoll,
      isCritical: isCritical,
      total: total
    };

    // Créer le message de chat
    const template = 'systems/dng/templates/chat/stat-roll.hbs';
    const content = await renderTemplate(template, rollData);
    
    const chatData = {
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: content,
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      rolls: [statRoll, critRoll]
    };

    // Appliquer les options
    ChatMessage.applyRollMode(chatData, options.rollMode || game.settings.get('core', 'rollMode'));
    
    return ChatMessage.create(chatData);
  }
}
