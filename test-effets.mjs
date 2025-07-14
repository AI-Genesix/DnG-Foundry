// Script de test pour vérifier les données d'effets
console.log('=== Test des données DnG ===');

// Simuler l'import de CONFIG.DNG 
import('./module/helpers/config.mjs').then(({ DNG }) => {
  console.log('✅ Configuration DnG chargée');
  
  // Test traits d'espèce
  const traitsCount = Object.keys(DNG.traitsEspece).length;
  console.log(`✅ Traits d'espèce : ${traitsCount} éléments`);
  
  // Test talents d'explorateur
  const talentsCount = Object.keys(DNG.talentsExplorateur).length;
  console.log(`✅ Talents d'explorateur : ${talentsCount} éléments`);
  
  // Test des fonctions utilitaires
  console.log('✅ Fonction getTraitsEspece :', typeof DNG.getTraitsEspece);
  console.log('✅ Fonction getTalentsExplorateur :', typeof DNG.getTalentsExplorateur);
  
  // Test d'un trait spécifique
  const acrobateEffect = DNG.getTraitEffect('acrobate');
  console.log('✅ Effet trait Acrobate :', acrobateEffect ? 'OK' : 'MANQUANT');
  
  // Test d'un talent spécifique
  const amiSociableEffect = DNG.getTalentEffect('ami_sociable');
  console.log('✅ Effet talent Ami Sociable :', amiSociableEffect ? 'OK' : 'MANQUANT');
  
  console.log('=== Test terminé ===');
}).catch(err => {
  console.error('❌ Erreur lors du chargement :', err);
});
