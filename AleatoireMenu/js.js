// // Charger le fichier JSON contenant les recettes
// fetch('data.json')
//   .then(response => response.json())  
//   .then(data => {
//     // Extraire la liste des recettes
//     const recettes = data.recettes;
    
//     // Sélectionner une recette aléatoire
//     const recetteAleatoire = recettes[Math.floor(Math.random() * recettes.length)];
    
   
//     afficherRecetteAleatoire(recetteAleatoire);
//   })
//   .catch(error => {
//     console.error("Erreur lors du chargement du fichier JSON :", error);
//   });

// // Fonction pour afficher une recette
// function afficherRecetteAleatoire(recette) {
//   console.log("Nom de la recette : " + recette.nom);
//   document.getElementById("recette1").innerHTML = recette.nom;
//   console.log("Catégorie : " + recette.categorie);
//   console.log("Temps de préparation : " + recette.temps_preparation);
  
//   console.log("Ingrédients :");
//   recette.ingredients.forEach(ingredient => {
//     console.log(`- ${ingredient.quantite} de ${ingredient.nom}`);
//   });

//   console.log("Étapes de préparation :");
//   recette.etapes.forEach((etape, index) => {
//     console.log(`${index + 1}. ${etape}`);
//   });
// }



// Nombre de recettes aléatoires à afficher
const nombreDeRecettes = 2;

// Charger le fichier JSON contenant les recettes
fetch('data.json')
  .then(response => response.json())  
  .then(data => {
    // Extraire la liste des recettes
    const recettes = data.recettes;
    
    // Sélectionner un certain nombre de recettes aléatoires
    const recettesAleatoires = [];
    for (let i = 0; i < nombreDeRecettes; i++) {
      const recetteAleatoire = recettes[Math.floor(Math.random() * recettes.length)];
      recettesAleatoires.push(recetteAleatoire);
    }

    afficherRecettesAleatoires(recettesAleatoires);
  })
  .catch(error => {
    console.error("Erreur lors du chargement du fichier JSON :", error);
    // Afficher un message d'erreur sur la page
    document.getElementById("recettes-container").innerHTML = "Erreur lors du chargement des recettes. Veuillez réessayer plus tard.";
  });

// Fonction pour afficher plusieurs recettes
function afficherRecettesAleatoires(recettes) {
  const recettesContainer = document.getElementById("recettes-container");
  recettesContainer.innerHTML = ''; // Réinitialiser le conteneur avant d'ajouter de nouvelles recettes

  recettes.forEach((recette, index) => {
    const recetteDiv = document.createElement("div");
    recetteDiv.classList.add("recette");
    recetteDiv.innerHTML = `
      <h2>Recette ${index + 1}: ${recette.nom}</h2>
      <h3>Ingrédients :</h3>
      <ul>${recette.ingredients.map(ingredient => `<li>${ingredient.quantite} de ${ingredient.nom}</li>`).join('')}</ul>
      
    `;
    recettesContainer.appendChild(recetteDiv);
  });
}
