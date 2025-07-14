export const DNG = {};

/**
 * Ressources du système DnG
 * @type {Object}
 */
DNG.resources = {
  pv: 'DNG.Resource.PV.long',
  pp: 'DNG.Resource.PP.long', 
  pc: 'DNG.Resource.PC.long',
  ph: 'DNG.Resource.PH.long'
};

/**
 * Statistiques de terrain
 * @type {Object}
 */
DNG.terrainStats = {
  force: 'DNG.Terrain.Force.long',
  agilite: 'DNG.Terrain.Agilite.long',
  instinct: 'DNG.Terrain.Instinct.long',
  sagesse: 'DNG.Terrain.Sagesse.long',
  sympathie: 'DNG.Terrain.Sympathie.long',
  charisme: 'DNG.Terrain.Charisme.long'
};

DNG.terrainStatsAbbr = {
  force: 'DNG.Terrain.Force.abbr',
  agilite: 'DNG.Terrain.Agilite.abbr',
  instinct: 'DNG.Terrain.Instinct.abbr',
  sagesse: 'DNG.Terrain.Sagesse.abbr',
  sympathie: 'DNG.Terrain.Sympathie.abbr',
  charisme: 'DNG.Terrain.Charisme.abbr'
};

/**
 * Statistiques de combat
 * @type {Object}
 */
DNG.combatStats = {
  attaque: 'DNG.Combat.Attaque.long',
  defense: 'DNG.Combat.Defense.long',
  atk_spe: 'DNG.Combat.AtkSpe.long',
  def_spe: 'DNG.Combat.DefSpe.long',
  precision: 'DNG.Combat.Precision.long',
  esquive: 'DNG.Combat.Esquive.long'
};

DNG.combatStatsAbbr = {
  attaque: 'DNG.Combat.Attaque.abbr',
  defense: 'DNG.Combat.Defense.abbr',
  atk_spe: 'DNG.Combat.AtkSpe.abbr',
  def_spe: 'DNG.Combat.DefSpe.abbr',
  precision: 'DNG.Combat.Precision.abbr',
  esquive: 'DNG.Combat.Esquive.abbr'
};

/**
 * Classes de Pokémon
 * @type {Object}
 */
DNG.pokemonClasses = {
  baroudeur: 'DNG.Pokemon.Classe.Baroudeur',
  eclaireur: 'DNG.Pokemon.Classe.Eclaireur',
  secouriste: 'DNG.Pokemon.Classe.Secouriste',
  non_defini: 'DNG.Pokemon.Classe.NonDefini'
};

/**
 * Types de Pokémon
 * @type {Object}
 */
DNG.pokemonTypes = {
  normal: 'DNG.Pokemon.Type.Normal',
  feu: 'DNG.Pokemon.Type.Feu',
  eau: 'DNG.Pokemon.Type.Eau',
  electrik: 'DNG.Pokemon.Type.Electrik',
  plante: 'DNG.Pokemon.Type.Plante',
  glace: 'DNG.Pokemon.Type.Glace',
  combat: 'DNG.Pokemon.Type.Combat',
  poison: 'DNG.Pokemon.Type.Poison',
  sol: 'DNG.Pokemon.Type.Sol',
  vol: 'DNG.Pokemon.Type.Vol',
  psy: 'DNG.Pokemon.Type.Psy',
  insecte: 'DNG.Pokemon.Type.Insecte',
  roche: 'DNG.Pokemon.Type.Roche',
  spectre: 'DNG.Pokemon.Type.Spectre',
  dragon: 'DNG.Pokemon.Type.Dragon',
  tenebres: 'DNG.Pokemon.Type.Tenebres',
  acier: 'DNG.Pokemon.Type.Acier',
  fee: 'DNG.Pokemon.Type.Fee'
};

/**
 * Couleurs des types de Pokémon
 * @type {Object}
 */
DNG.typeColors = {
  normal: '#A8A878',
  feu: '#F08030',
  eau: '#6890F0',
  electrik: '#F8D030',
  plante: '#78C850',
  glace: '#98D8D8',
  combat: '#C03028',
  poison: '#A040A0',
  sol: '#E0C068',
  vol: '#A890F0',
  psy: '#F85888',
  insecte: '#A8B820',
  roche: '#B8A038',
  spectre: '#705898',
  dragon: '#7038F8',
  tenebres: '#705848',
  acier: '#B8B8D0',
  fee: '#EE99AC'
};

/**
 * Grades de Pokémon
 * @type {Object}
 */
DNG.pokemonGrades = {
  in_training: 'DNG.Pokemon.Grade.InTraining',
  rookie: 'DNG.Pokemon.Grade.Rookie',
  champion: 'DNG.Pokemon.Grade.Champion',
  ultimate: 'DNG.Pokemon.Grade.Ultimate'
};

/**
 * Styles de Pokémon
 * @type {Object}
 */
DNG.pokemonStyles = {
  offensif: 'DNG.Pokemon.Style.Offensif',
  defensif: 'DNG.Pokemon.Style.Defensif',
  physique: 'DNG.Pokemon.Style.Physique',
  special: 'DNG.Pokemon.Style.Special',
  rapide: 'DNG.Pokemon.Style.Rapide',
  complet: 'DNG.Pokemon.Style.Complet'
};

/**
 * Calcule le maximum d'améliorations pour un Baroudeur selon le niveau
 * @param {number} level - Niveau du personnage
 * @returns {number} - Maximum d'améliorations
 */
DNG.getBaroudeurMax = function(level) {
  if (level >= 16) return 9;
  if (level >= 10) return 6;
  return 3;
};

/**
 * Calcule le dé de statistique basé sur la valeur
 * @param {number} statValue - Valeur de la statistique (1-5)
 * @returns {number} - Taille du dé
 */
DNG.getStatDie = function(statValue) {
  return (statValue + 1) * 2;
};

/**
 * Vérifie si un jet de d20 est critique
 * @param {number} roll - Résultat du d20
 * @returns {boolean} - True si critique (19-20)
 */
DNG.isCritical = function(roll) {
  return roll >= 19;
};
