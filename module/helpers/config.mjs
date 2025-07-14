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

/**
 * Traits d'espèce prédéfinis  
 * @type {Object}
 */
DNG.traitsEspece = {
  acrobate: {
    name: "Acrobate",
    effect: "Le Pokémon est agile et aérien. Lorsqu'il doit faire un test d'Agilité pour de l'escalade, pour un saut ou une acrobatie, réduisez le DD de 2."
  },
  amphibie_1: {
    name: "Amphibie I",
    effect: "Le Pokémon est adapté à une vie à la fois aérienne et aquatique. Il peut respirer à l'air libre et est capable de retenir son souffle plusieurs dizaines de minutes sans souci. Il réduit également le DD de tous ses tests de natation de 2."
  },
  amphibie_2: {
    name: "Amphibie II", 
    effect: "Le Pokémon est parfaitement capable de vivre et respirer sous l'eau comme sur la terre ferme. Il réduit également le DD de tous ses tests de natation de 2."
  },
  aquatique: {
    name: "Aquatique",
    effect: "Le Pokémon vit essentiellement en milieu aquatique. Il peut respirer sous l'eau mais pas à l'air libre. Il n'a aucun test de natation à faire mais doit réussir un test d'Agilité pour se déplacer sur la terre ferme."
  },
  arme_naturelle: {
    name: "Arme naturelle",
    effect: "Le Pokémon est doté naturellement d'une arme (corne, griffe, croc...) suffisamment imposante pour lui permettre de parfois se débrouiller sans ses Capacités. Son attaque ordinaire inflige 1d4 Dégâts physiques supplémentaires."
  },
  armure_naturelle: {
    name: "Armure naturelle",
    effect: "Le Pokémon possède naturellement certains organes assurant sa protection (carapace, coquille, écailles ...). Tous les Dégâts bruts physiques qu'il reçoit sont réduits de 1d4."
  },
  aveugle: {
    name: "Aveugle",
    effect: "Le Pokémon est aveugle. Si dans la plupart des cas un autre sens permet de compenser ce handicap dans son environnement, il y aura toujours certains éléments qu'il ne pourra jamais percevoir (les couleurs, ou les textes écrits par exemple)."
  },
  bambin: {
    name: "Bambin",
    effect: "Le Pokémon a une apparence infantile, même s'il peut être en réalité relativement âgé et mature. Il échoue systématiquement lorsqu'il tente un test de Charisme pour impressionner ou intimider quelqu'un ne possédant pas ce trait. En contrepartie, il bénéficie d'un Avantage à tous ses tests de Sympathie."
  },
  benet: {
    name: "Benêt",
    effect: "Le Pokémon fait partie d'une espèce qui n'est... pas particulièrement réputée pour sa réactivité ! Lors d'un combat, les Pokémons avec ce trait jouent toujours en dernier, peu importe leur résultat au jet d'initiative. En revanche, leur naturel calme et posé les rend difficilement perturbables : ils sont immunisés à la confusion, à la provoc' et à l'attraction."
  },
  bicephale: {
    name: "Bicéphale",
    effect: "Le Pokémon possède deux ou plusieurs têtes et peut donc théoriquement être incarné par différents joueurs. Lorsque c'est le cas, chaque « tête » est considérée comme un personnage à part entière (il y a donc bien deux fiches personnages distinctes) tandis que le « corps » agit de concert : la majorité des jets de terrain et les jets d'initiatives sont communs aux deux personnages."
  },
  chrysalide: {
    name: "Chrysalide",
    effect: "Le Pokémon est dans un stade ne lui permettant aucun mouvement ! Il ne peut pas se déplacer seul, ni utiliser de Capacité, mais reste conscient du monde qui l'entoure et capable communiquer. Au bout d'un certain temps allant selon l'espèce de 48 heures à deux semaines environ, il évolue."
  },
  cryophile: {
    name: "Cryophile",
    effect: "Le Pokémon est adapté à vivre dans un milieu froid. Tant que le personnage se trouve dans un environnement Glacial, il obtient un Avantage (cumulable avec un éventuel bonus de terrain de prédilection) pour tous ses tests non-sociaux. En revanche, s'il se trouve dans un environnement Désertique, il subit un Désavantage. De plus, il ne peut pas choisir Désertique comme terrain de prédilection."
  },
  deplacements_lents: {
    name: "Déplacements lents",
    effect: "Le Pokémon n'est pas fait pour courir vite sur de courtes distances. Sa vitesse de déplacement de base n'est que de 6m."
  },
  deplacements_rapides: {
    name: "Déplacements rapides",
    effect: "Le Pokémon est particulièrement doué pour le sprint. Sa vitesse de déplacement de base monte à 12m."
  },
  fouisseur: {
    name: "Fouisseur",
    effect: "Le Pokémon est doté de griffes ou d'autres organes lui permettant de creuser efficacement dans un sol meuble. Par une action de combat, il peut effectuer un test de Force ou Agilité pour s'enfouir dans le sol. Dans cette position, il est invisible et inciblable par ses ennemis (sauf ceux possédant une Vision Aveugle et certaines Capacités comme Séisme ou Telluriforce) mais ne peut lui-même pas attaquer."
  },
  gecko: {
    name: "Gecko",
    effect: "Les pattes du Pokémon ou certains de ses membres sont dotés de crochets ou de ventouses lui permettant d'agripper même les surfaces les plus lisses. Il n'a pas besoin de lancer de jet pour un test d'escalade standard : la réussite est automatique. Le DD de tous ses autres tests d'escalade est réduit de 2."
  },
  gracile: {
    name: "Gracile",
    effect: "Le Pokémon est particulièrement doué pour se déplacer silencieusement et se faufiler sans être repéré. Lorsqu'il effectue un test de discrétion, diminuez le DD de 2. Cependant, sa faible constitution lui inflige un malus de - 3 PV de base."
  },
  hydrophile: {
    name: "Hydrophile",
    effect: "Le Pokémon est adapté à vivre dans un milieu humide. Tant que le personnage se trouve dans un environnement Marécageux, il obtient un Avantage (cumulable avec un éventuel bonus de terrain de prédilection) pour tous ses tests non-sociaux. En revanche, s'il se trouve dans un environnement Désertique, il subit un Désavantage."
  },
  ignifuge: {
    name: "Ignifuge",
    effect: "Le Pokémon est naturellement immunisé contre les brûlures (il reste sensible aux Capacités de Type Feu)."
  },
  inorganique: {
    name: "Inorganique",
    effect: "Le Pokémon n'est pas constitué de matière organique ; ses besoins alimentaires sont différents des Pokémons organiques et il est immunisé à l'empoisonnement et grave empoisonnement."
  },
  illusion: {
    name: "Illusion",
    effect: "Le Pokémon est capable de générer des illusions simples (changer sommairement son apparence par exemple) avec un test d'Instinct standard. Un Pokémon est capable de déceler l'illusion par un test d'Instinct en opposition contre le Charisme de sa source. L'illusion se dissipe au moindre contact."
  },
  levitation: {
    name: "Lévitation",
    effect: "Le Pokémon est capable de léviter. Il ne peut cependant pas s'élever trop haut au-dessus du sol et doit rester à une hauteur maximale de deux fois sa taille environ."
  },
  liane: {
    name: "Liane",
    effect: "Le Pokémon est doté de lianes ou tentacules préhensiles et longues de plusieurs mètres. Il Possède une portée courte sur son attaque ordinaire et peut s'en servir pour saisir des objets avec un DD du test d'Agilité augmenté de 2 pour la manipulation."
  },
  luciole: {
    name: "Luciole",
    effect: "Le Pokémon peut naturellement, par une action de combat, émettre une faible lueur, équivalant à celle d'une torche et lui permettant d'éclairer l'obscurité."
  },
  manchot: {
    name: "Manchot",
    effect: "Le Pokémon ne possède pas de main ni de membre adapté pour la préhension. Augmentez de 2 le DD de tous ses tests d'Agilité liés à la manipulation d'un objet."
  },
  mascotte: {
    name: "Mascotte",
    effect: "Que ce soit en raison de leurs cousins sauvages, de rumeurs diverses ou encore d'individus célèbres et populaires, l'espèce du Pokémon profite d'une particulièrement bonne réputation au sein de la population. Celle-ci peut se traduire par un DD réduit de 2 pour un premier contact social avec un PNJ."
  },
  mastoc: {
    name: "Mastoc",
    effect: "Le Pokémon est particulièrement robuste, ce qui se traduit par un bonus de + 3 PV de base. En revanche, il lui est bien plus difficile de passer inaperçu en raison de sa corpulence : ses tests de discrétion subissent un DD augmenté de 2."
  },
  quadrupede: {
    name: "Quadrupède",
    effect: "Le Pokémon se déplace à quatre pattes et ses membres antérieurs ne sont donc pas adaptés pour attraper des choses. Augmentez de 2 le DD de tous ses tests d'Agilité liés à la manipulation d'un objet ; réduisez de 2 le DD de tous ses tests d'Agilité liés à l'équilibre."
  },
  serpent: {
    name: "Serpent",
    effect: "Le Pokémon ne possède pas de membre, ni antérieurs, ni postérieurs et se déplace par reptation. Augmentez de 4 le DD de tous ses tests d'Agilité liés à la manipulation d'un objet ; certaines topographies peuvent constituer des obstacles voir devenir infranchissables (escaliers, parois verticales, précipices ...)."
  },
  sens_affutes_ouie: {
    name: "Sens affûtés [ouïe]",
    effect: "L'ouïe du Pokémon est particulièrement aiguisée. Il est capable d'entendre des sons ou conversations à une bonne distance et réduit les DD des tests de perception de 2 si ceux-ci comprennent une composante auditive. Cependant, ces bonus sont annulés en cas de son strident ou violent."
  },
  sens_affutes_odorat: {
    name: "Sens affûtés [odorat]",
    effect: "L'odorat du Pokémon est particulièrement développé. Il est capable de mémoriser des odeurs ou de suivre une piste et réduit les DD des tests de perception de 2 si ceux-ci comprennent une composante olfactive. Cependant, ces bonus sont annulés en cas d'odeur trop forte ou pestilente."
  },
  stigmatisation_sociale: {
    name: "Stigmatisation Sociale",
    effect: "Que ce soit en raison de leurs cousins sauvages, de rumeurs diverses ou encore d'individus célèbres et peu recommandables, l'espèce du Pokémon subit une réputation particulièrement mauvaise au sein de la population. Celle-ci peut se traduire par un DD augmenté de 2 pour un premier contact social avec un PNJ."
  }
};

/**
 * Talents d'explorateur prédéfinis par rang
 * @type {Object}
 */
DNG.talentsExplorateur = {
  // Rang 1
  ami_sociable: {
    name: "Ami Sociable",
    rank: 1,
    effect: "Le personnage sait aisément gagner la confiance d'autrui. Une fois par jour, lorsque vous devez réaliser un test de Sympathie, vous pouvez lancer deux fois le dé de Caractéristique et choisir le meilleur résultat."
  },
  avide_experience: {
    name: "Avide d'Expérience",
    rank: 1,
    effect: "Le Pokémon est très curieux et passe souvent des heures à lire et accumuler des connaissances sur des sujets divers et variés. Lorsque vous effectuez un test de connaissances, vous pouvez lancer deux fois le dé de Caractéristique et conserver le meilleur résultat."
  },
  bulldozer_tout_terrain: {
    name: "Bulldozer Tout-Terrain",
    rank: 1,
    effect: "Le personnage est très puissant et sait utiliser cette force contre des cibles immobiles. Vous pouvez utiliser votre attaque ordinaire pour tenter de démolir un mur, un pilier, un objet volumineux, etc."
  },
  cartographe: {
    name: "Cartographe",
    rank: 1,
    effect: "Le personnage a un sens de l'orientation inné. Lorsque vous réalisez un test d'orientation ou un test de connaissances en géographie, considérez-vous comme étant en permanence dans votre environnement de prédilection ; si le test concerne votre environnement de prédilection lui-même, doublez votre Avantage."
  },
  capteur_escalier: {
    name: "Capteur d'Escalier",
    rank: 1,
    effect: "Le Pokémon a aiguisé son instinct pour se repérer dans des labyrinthes naturels ou non. Lorsque vous vous trouvez dans un Donjon Mystère, dans un bâtiment ou une structure dont vous ne connaissez pas l'architecture, vous pouvez demander au MD de lancer pour vous, en caché, un test d'Instinct. En cas de réussite, le MD vous donne une indication pour en trouver la sortie."
  },
  controleur_pp: {
    name: "Contrôleur de PP",
    rank: 1,
    effect: "Le Pokémon est à même d'utiliser ses ressources avec une grande versatilité. Lorsque vous n'avez plus de PP, il vous est possible de puiser dans votre jauge de PV à la place (il s'agit toujours de Dégâts non létaux)."
  },
  decouvreu_pieces: {
    name: "Découvreur de Pièces",
    rank: 1,
    effect: "Le Pokémon a l'esprit aiguisé pour découvrir des recoins cachés, passages secrets et autres portes dérobées. Lorsque vous réalisez un test d'Instinct visant à découvrir un lieu caché, vous pouvez lancer deux fois le dé de Caractéristique et conserver le meilleur résultat."
  },
  desamorceur_pieges: {
    name: "Désamorceur de Pièges",
    rank: 1,
    effect: "Le personnage a un esprit vif et rusé lorsqu'il s'agit de manier des pièges ou petits mécanismes. Lorsque vous réalisez un test d'Agilité pour manipuler de tels éléments, vous pouvez lancer deux fois le dé de Caractéristique et conserver le meilleur résultat."
  },
  economiseur_energie: {
    name: "Économiseur d'énergie",
    rank: 1,
    effect: "Le Pokémon mange peu et sait lutter contre les effets de la privation. Il peut passer 48h sans manger et sans boire, sans en subir les effets secondaires (il aura cependant besoin de se restaurer le jour suivant et ne peut utiliser ce talent qu'une fois par semaine au maximum)."
  },
  eviteur_maison: {
    name: "Éviteur de Maison",
    rank: 1,
    effect: "Le Pokémon sait d'instinct se méfier des coups fourrés. Lorsque vous devez faire un jet pour repérer une embuscade ou déterminer des rencontres aléatoires lors d'un voyage, vous pouvez lancer deux fois le dé de Caractéristique et conserver le meilleur résultat."
  },
  flaireur_objets: {
    name: "Flaireur d'Objets",
    rank: 1,
    effect: "Le Pokémon est sensible aux auras magiques émises par certains objets. Il peut du premier coup d'œil différencier un objet magique d'une imitation. Un test d'Instinct sur une action rapide lui permet également de déterminer si un personnage possède un ou plusieurs objets magiques, même il les dissimule."
  },
  fureteur: {
    name: "Fureteur",
    rank: 1,
    effect: "Le Pokémon a l'instinct vif lorsqu'il s'agit de trouver des richesses. Lorsque vous devez faire un test de fouille, vous pouvez lancer deux fois le dé de Caractéristique et conserver le meilleur résultat."
  },
  intimidateur: {
    name: "Intimidateur",
    rank: 1,
    effect: "Le personnage sait comment se montrer intimidant quand cela est nécessaire. Une fois par jour, lorsque vous devez réaliser un test de Charisme, vous pouvez lancer deux fois le dé de Caractéristique et choisir le meilleur résultat."
  },
  marchandeur: {
    name: "Marchandeur",
    rank: 1,
    effect: "Le Pokémon a appris auprès des meilleurs marchands. Vous connaissez la valeur de tous les objets courants ; lorsque vous devez faire un jet pour estimer la valeur d'un objet, vous pouvez lancer deux fois le dé de Caractéristique et conserver le meilleur résultat."
  },
  marcheur_inveteré: {
    name: "Marcheur Invétéré",
    rank: 1,
    effect: "Le Pokémon est un aventurier né, il possède tout un attirail d'objets indispensables aux longs périples. Vous débutez la partie avec un Sac d'Explorateur ainsi que les objets suivants : une carte, une boussole, une corde, un grapin, une tente de taille moyenne, une outre, une canne à pêche (pour les carnivores) ou un guide des plantes et baies comestibles (pour les herbivores), un vêtement rembourré, une torche, un silex, et des rations pour 5 jours."
  },
  non_traitre: {
    name: "Non-Traître",
    rank: 1,
    effect: "Le personnage sait épargner ses alliés même de ses pires échecs. Même si vous effectuez un échec Critique sur un test de terrain ou de combat, vous ne pouvez pas frapper ni mettre en danger un de vos alliés."
  },
  partageur_vivres: {
    name: "Partageur de Vivres",
    rank: 1,
    effect: "Ce talent doit être choisi par deux membres d'une même équipe d'exploration. Ces Pokémons sont liés d'une amitié forte et ne comptent plus que pour 1 lors de l'utilisation de vivres ou d'objets consommables. De plus, une fois par jour, chacun d'entre eux peut gagner un Avantage et doubler sa marge de réussite Critique sur un unique jet visant à aider directement son compagnon."
  },
  pro_survie: {
    name: "Pro de la Survie",
    rank: 1,
    effect: "Le personnage a des compétences particulières dans le domaine de la survie. Lorsque vous devez faire un test pour trouver de l'eau ou de la nourriture, considérez-vous comme étant en permanence dans votre environnement de prédilection ; si le test concerne votre environnement de prédilection lui-même, doublez votre Avantage."
  },
  sauveteur: {
    name: "Sauveteur",
    rank: 1,
    effect: "Le Pokémon est entraîné à prodiguer les premiers soins aux blessés. Vous débutez la partie avec du nécessaire de secours comprenant du matériel de diagnostic, des compresses et bandages, de l'alcool à 70°, un antidouleur et un flacon d'antipoison générique. Grâce à cet attirail et à vos connaissances, vos tests de premier secours et de stabilisation réussissent automatiquement."
  },
  signaleur_piege: {
    name: "Signaleur de Piège",
    rank: 1,
    effect: "Le personnage a un esprit vif et rusé lorsqu'il s'agit de détecter des pièges ou petits mécanismes et d'en comprendre le fonctionnement. Lorsque vous réalisez un test d'Instinct ou de Sagesse lié à de tels éléments, vous pouvez lancer deux fois le dé de Caractéristique et conserver le meilleur résultat."
  },
  veilleur: {
    name: "Veilleur",
    rank: 1,
    effect: "Le Pokémon sait lutter contre la fatigue ou les effets de sommeil. Il peut veiller une nuit entière sans être fatigué le lendemain (il aura cependant besoin d'un repos complet la nuit suivante). Lorsqu'une Capacité, un piège ou un objet doit vous provoquer un effet de sommeil, vous pouvez immédiatement faire un test d'Instinct ou de Sagesse ; en cas de réussite, vous résistez à l'effet."
  },
  
  // Rang 2
  attaquant_coup_sur: {
    name: "Attaquant Coup Sûr",
    rank: 2,
    effect: "Le personnage est capable faire fi de toute distraction pour lancer une Capacité de grande précision. Durant un combat, vous pouvez utiliser une action longue pour préparer une Capacité sur un adversaire. Si d'ici votre prochain tour vous n'êtes pas distrait, vous pouvez lancer cette Capacité par une action de combat : considérez que vous faites le jet maximal sur votre dé de Caractéristique lors du test de combat."
  },
  attaquant_fuyard: {
    name: "Attaquant Fuyard",
    rank: 2,
    effect: "Le personnage est agile lorsqu'il s'agit de se déplacer au corps à corps d'un ennemi. A chaque fois que vous utilisez votre attaque ordinaire lors de votre tour de jeu, vous pouvez effectuer un Bond gratuit avant ou après votre action."
  },
  attaquant_seconde_ligne: {
    name: "Attaquant Seconde Ligne",
    rank: 2,
    effect: "Le personnage sait tirer parti de la présence d'alliés au corps à corps pour attaquer un ennemi à distance. Si vous effectuez une attaque à distance contre un ennemi qui a été attaqué au corps à corps par un allié ce tour-ci, vous profitez d'un Avantage à votre test de combat."
  },
  auto_guerisseur: {
    name: "Auto-Guérisseur",
    rank: 2,
    effect: "Le personnage est moins sensible que la moyenne aux changements de Statuts et peut plus facilement en guérir. Lorsque vous effectuez un test pour guérir d'un Statut négatif, vous pouvez lancer deux fois le dé de Caractéristique et conserver le meilleur résultat."
  },
  attrapeur_objets: {
    name: "Attrapeur d'objets",
    rank: 2,
    effect: "Le Pokémon a une affinité particulière avec les objets magiques, ce qui lui facilite leur utilisation. Une fois par jour, vous pouvez vous synchroniser avec un unique objet magique en une action longue et commencer à l'utiliser de suite (au lieu d'avoir à attendre les 24h de la règle générale)."
  },
  combattant_prudent: {
    name: "Combattant Prudent",
    rank: 2,
    effect: "Le personnage est alerte et toujours attentif aux positionnements de ses adversaires. Il n'est pas considéré comme pris au dépourvu lorsqu'il se situe en tenaille entre deux ennemis."
  },
  dur_cuire: {
    name: "Dur à Cuire",
    rank: 2,
    effect: "Le personnage est robuste et animé d'une volonté de fer. Il n'a besoin que d'une seule réussite pour se stabiliser lorsqu'il est mourant. De plus, une fois par semaine, lorsque vous tombez à 0 Points de Vie ou en dessous, vous restez debout et pouvez continuer à bouger sans avoir à effectuer de test de Force."
  },
  economiseur_pp: {
    name: "Économiseur de PP",
    rank: 2,
    effect: "Le Pokémon maîtrise ses flux d'énergie et peut plus aisément utiliser ses Capacités. Lorsque vous utilisez n'importe quelle Capacité, réduisez son coût en PP de 1."
  },
  eviteur_coup_critique: {
    name: "Éviteur de Coup Critique",
    rank: 2,
    effect: "Le personnage est particulièrement chanceux, ou habile pour couvrir ses points sensibles. Une fois par jour, si vous deviez être victime d'une réussite Critique sur un test de combat, vous pouvez la changer en réussite simple."
  },
  eviteur_pieges: {
    name: "Éviteur de Pièges",
    rank: 2,
    effect: "Le Pokémon est en permanence alerte à l'environnement et aux dangers pouvant l'entourer. Lorsqu'un ennemi embusqué ou invisible vous attaque par surprise, vous n'êtes pas considéré comme pris au dépourvu."
  },
  eviteur_lave: {
    name: "Éviteur de Lave",
    rank: 2,
    effect: "Le Pokémon sait faire fi de la douleur provoquée par une brûlure au point que celles-ci n'affectent plus ses capacités de combat. Lorsque le personnage est brûlé, il ne subit aucun malus spécifique (il reste cependant affecté par cet état spécial qui doit donc être soigné comme toute blessure au risque de voir l'état s'aggraver)."
  },
  friand_capacites: {
    name: "Friand de Capacités",
    rank: 2,
    effect: "Le Pokémon est particulièrement à l'aise lorsqu'il utilise ses Capacités. Jusqu'à deux fois par jour, vous pouvez améliorer une de vos Capacités à la manière d'une amélioration de Baroudeur. Si vous possédez déjà cette faculté, gagnez en deux utilisations supplémentaires à la place."
  },
  mini_riposteur: {
    name: "Mini-Riposteur",
    rank: 2,
    effect: "le Pokémon connait les bases du repositionnement et de la contre-attaque. Lorsqu'un adversaire au corps à corps rate un test de combat contre vous, vous bénéficiez d'un Avantage à tous vos tests de combat contre cet adversaire jusqu'à la fin de votre prochain tour de jeu."
  },
  multitalent: {
    name: "Multitalent",
    rank: 2,
    effect: "Le personnage a un talent caché. Vous obtenez un domaine supplémentaire. Il est possible de choisir un domaine que vous possédez déjà (les Avantages se cumulent alors)."
  },
  pokemon_tout_terrain: {
    name: "Pokémon Tout-Terrain",
    rank: 2,
    effect: "Le personnage a un esprit particulièrement adaptable et sait composer avec son environnement. Vous obtenez un terrain de prédilection supplémentaire. Il est possible de choisir un terrain que vous possédez déjà (les Avantages se cumulent alors) mais vous ne pouvez pas choisir de terrain « alternatif »."
  },
  pro_echauffement: {
    name: "Pro de l'Échauffement",
    rank: 2,
    effect: "Le personnage est toujours prêt à combattre dans n'importe quelle circonstance. Lorsque vous faites un jet d'initiative, lancez deux dés et choisissez le meilleur résultat."
  },
  pro_efficacite: {
    name: "Pro de l'Efficacité",
    rank: 2,
    effect: "Le Pokémon est passé maître dans l'art de combattre sans utiliser de Capacité. Lorsque vous lancez des dés pour déterminer les Dégâts de l'attaque ordinaire, utilisez des d6 à la place de d4 (en cas de réussite Critique, ils deviennent alors des d8)."
  },
  recuperateur_rapide: {
    name: "Récupérateur Rapide",
    rank: 2,
    effect: "L'aura du Pokémon se régénère incroyablement vite. Divisez par deux le temps nécessaire pour guérir de vos dégâts non létaux ou récupérer vos PP."
  },
  supporter: {
    name: "Supporter",
    rank: 2,
    effect: "Le personnage a la faculté d'inspirer ses alliés par ses représentations, ses discours forts ... Une fois par jour, par une action longue, le personnage peut tenter un test de social pour donner un unique bonus d'inspiration à tous ses alliés pouvant le voir et l'entendre. Ce bonus d'inspiration se présente sous la forme d'1d4 à ajouter à n'importe quel test avant d'en connaître le résultat."
  },
  tireur_elite: {
    name: "Tireur d'Elite",
    rank: 2,
    effect: "Le Pokémon a appris à porter toute sa concentration sur une unique cible pour augmenter ses chances de porter une attaque décisive. Lorsque vous utilisez une Capacité de zone ou à cible multiple, vous pouvez choisir de l'utiliser en tant que Capacité à cible unique ; doublez alors votre marge de réussite Critique."
  },
  tireur_vedette: {
    name: "Tireur Vedette",
    rank: 2,
    effect: "Le Pokémon a appris à porter toute sa concentration sur une unique cible pour être certain de la toucher. Lorsque vous utilisez une Capacité de zone ou à cible multiple, vous pouvez choisir de l'utiliser en tant que Capacité à cible unique ; vous gagnez alors un Avantage à votre test de combat."
  },
  
  // Rang 3
  accelerateur: {
    name: "Accélérateur",
    rank: 3,
    effect: "Le personnage sait changer de rythme en combat pour surprendre ses adversaires. Une fois par combat, par une action rapide y compris hors de votre tour d'initiative, pouvez utiliser ce talent pour effectuer un Bond gratuit."
  },
  agresseur: {
    name: "Agresseur",
    rank: 3,
    effect: "Le personnage sait tirer parti d'une posture plus agressive. Une fois par combat, par une action rapide y compris hors de votre tour d'initiative, vous pouvez utiliser ce talent pour gagner un bonus Atk ++ ou AtS ++ jusqu'au début de votre prochain tour."
  },
  attaquant_multi: {
    name: "Attaquant Multi",
    rank: 3,
    effect: "Le personnage maîtrise l'usage des attaques d'opportunité et peut les enchaîner sur une durée très courte. Vous pouvez effectuer jusqu'à trois attaques d'opportunités par tour."
  },
  chasseur_faibles: {
    name: "Chasseur de faibles",
    rank: 3,
    effect: "Le personnage sait tirer profit des failles et erreurs de positionnement chez les adversaires plus faibles. Vous bénéficiez d'un Avantage à tous vos tests de combat contre des adversaires ayant un niveau inférieur au votre."
  },
  controleur_statut: {
    name: "Contrôleur Statut",
    rank: 3,
    effect: "Le personnage est capable de tirer au mieux profit de ses Capacités pouvant infliger un changement de Statut. Vous pouvez activer cet effet une fois par jour, lorsque vous décidez d'utiliser une Capacité pouvant infliger un changement de Statut en tant qu'effet secondaire. Si votre test de combat réussit, vous infligez automatiquement le changement de Statut à votre adversaire."
  },
  controleur_trajectoire: {
    name: "Contrôleur de trajectoire",
    rank: 3,
    effect: "Le Pokémon a appris à maîtriser l'impact de ses Capacités de zone. Jusqu'à trois fois par jour, lorsque vous utilisez une Capacité de zone, vous pouvez choisir un personnage et l'exclure de l'effet de cette Capacité."
  },
  defenseur: {
    name: "Défenseur",
    rank: 3,
    effect: "Le personnage sait tirer parti d'une posture plus défensive. Une fois par combat, par une action rapide y compris hors de votre tour d'initiative, vous pouvez utiliser ce talent pour gagner un bonus Def ++ ou DeS ++ jusqu'au début de votre prochain tour."
  },
  esquiveur_ko: {
    name: "Esquiveur de KO",
    rank: 3,
    effect: "La volonté du personnage lui permet d'esquiver plus facilement les coups qui auraient dû être décisif. Lorsque vous avez subi un montant de Dégâts non létaux supérieur ou égal à la moitié de vos PV max, tous les tests de combat lancés contre vous subissent un Désavantage et tous vos tests défensifs profitent d'un Avantage."
  },
  expert_concentration: {
    name: "Expert en Concentration",
    rank: 3,
    effect: "Le personnage sait prendre son temps pour observer les mouvements de ses adversaires pour frapper les points les plus vulnérables. Durant un combat, vous pouvez utiliser une action longue pour préparer une Capacité sur un adversaire. Si d'ici votre prochain tour vous n'êtes pas distrait, vous pouvez changer le résultat de votre dé de Critique par un 20. Ce trait est utilisable simultanément à Attaquant Coup Sûr."
  },
  expert_respiration: {
    name: "Expert en Respiration",
    rank: 3,
    effect: "Le personnage maîtrise une forme de méditation particulière lui permettant d'aller au-delà de ses limites en ce qui concerne l'usage de ses Capacités. Une fois par jour, vous pouvez utiliser une action longue pour récupérer 25% de vos PP max."
  },
  garde_corps: {
    name: "Garde du Corps",
    rank: 3,
    effect: "Le personnage sait s'interposer entre ses adversaires pour protéger ses alliés en combat. Lors d'un combat, par une action rapide, vous pouvez choisir un allié à votre corps à corps. Jusqu'au début de votre prochain tour, et tant que cet allié reste à votre contact, vous pouvez rediriger sur vous toute attaque ou Capacité lui étant destinée."
  },
  maitre_avantage_type: {
    name: "Maître Avantage-Type",
    rank: 3,
    effect: "Le personnage est devenu expert dans la maîtrise des avantages-Types. Lorsque vous utilisez une attaque bénéficiant d'un bonus grâce à son Type, gagnez un Avantage et doublez la marge de réussite Critique de celle-ci."
  },
  maitre_riposte: {
    name: "Maître de la Riposte",
    rank: 3,
    effect: "Le Pokémon maîtrise si bien les techniques de parade qu'il peut en profiter pour se mettre en position de contre-attaque. Lorsqu'un adversaire au corps à corps rate un test de combat contre vous, vous pouvez immédiatement lui porter une attaque d'opportunité par une action rapide."
  },
  maitre_objets: {
    name: "Maître des Objets",
    rank: 3,
    effect: "Le Pokémon sait exploiter au mieux les objets portés et peut donc en tirer avantage de plusieurs en même temps. Vous pouvez porter et utiliser jusqu'à trois équipements et/ou reliques au lieu de deux."
  },
  non_chargeur: {
    name: "Non-Chargeur",
    rank: 3,
    effect: "Le Pokémon sait faire fi des contrecoups en utilisant les Capacités les plus puissantes. Une fois par semaine, vous pouvez utiliser une Capacité de niveau 4 en ignorant ses effets négatifs."
  },
  recuperateur_avise: {
    name: "Récupérateur Avisé",
    rank: 3,
    effect: "Le Pokémon profite au mieux des Capacités ou objets lui rendant des Points de Vie. Augmentez l'efficacité de telles effets lancés ou reçus de 50%."
  },
  risque_tout: {
    name: "Risque Tout",
    rank: 3,
    effect: "Le Pokémon applique à la lettre la notion de « gros risques, gros gains ». Jusqu'à trois fois par jour, vous pouvez, avant votre jet, choisir de réduire de 1 le résultat de votre dé de Caractéristique pour augmenter de 4 le résultat de votre dé de Critique."
  },
  roi_esquive: {
    name: "Roi de l'Esquive",
    rank: 3,
    effect: "Le Pokémon se distingue par sa faculté à esquiver grâce à sa vivacité pour analyser les situations ou bien à ... sa chance ! Lorsque vous réussissez un test de Défense, Défense Spéciale ou d'Esquive contre une attaque de zone, vous évitez totalement l'attaque et ne subissez aucun Dégât. En cas d'échec, vous subissez des Dégâts réduits de moitié."
  },
  tireur_perceuse: {
    name: "Tireur Perceuse",
    rank: 3,
    effect: "Le Pokémon a appris à augmenter la zone d'impact de ses Capacités. Lorsque vous utilisez une Capacité à distance et à cible unique sur un adversaire, vous pouvez choisir de l'utiliser comme une Capacité de zone « rayon » afin de toucher une cible située juste derrière lui."
  },
  vif_attaquant: {
    name: "Vif Attaquant",
    rank: 3,
    effect: "La précision et la rapidité d'exécution du Pokémon déstabilisent ses adversaires les plus lents. Lors de votre tour de jeu, vous pouvez lancer deux attaques ordinaires en une seule action de combat."
  }
};

/**
 * Obtient la liste des traits d'espèce
 * @returns {Object} - Liste des traits avec leurs effets
 */
DNG.getTraitsEspece = function() {
  return this.traitsEspece;
};

/**
 * Obtient la liste des talents d'explorateur par rang
 * @param {number} rank - Rang du talent (1-3)
 * @returns {Object} - Liste des talents du rang spécifié
 */
DNG.getTalentsExplorateur = function(rank = null) {
  if (rank) {
    const filteredTalents = {};
    for (const [key, talent] of Object.entries(this.talentsExplorateur)) {
      if (talent.rank === rank) {
        filteredTalents[key] = talent;
      }
    }
    return filteredTalents;
  }
  return this.talentsExplorateur;
};

/**
 * Obtient l'effet d'un trait d'espèce
 * @param {string} traitName - Nom du trait
 * @returns {string} - Description de l'effet
 */
DNG.getTraitEffect = function(traitName) {
  return this.traitsEspece[traitName]?.effect || '';
};

/**
 * Obtient l'effet d'un talent d'explorateur
 * @param {string} talentName - Nom du talent
 * @returns {string} - Description de l'effet
 */
DNG.getTalentEffect = function(talentName) {
  return this.talentsExplorateur[talentName]?.effect || '';
};
