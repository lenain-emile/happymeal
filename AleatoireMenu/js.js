// Description: Script pour afficher des recettes aléatoires sur la page web.

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
      <h2>${recette.nom}</h2>
      <h3>Instructions :</h3>
      <p>${recette.temps_preparation}</p>
      
    `;
    recettesContainer.appendChild(recetteDiv);
  });
}


window.addEventListener('scroll', function() {
  if (window.scrollY > 100) {
    document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b")';
  } else {
    document.body.style.backgroundColor = '';
  }
});

document.getElementById("button").addEventListener("click", function() {
  const nameValue = document.querySelector('#nom').value;
    localStorage.setItem('nom', nameValue);
});
  






{/* <h3>Ingrédients :</h3>
<ul>${recette.ingredients.map(ingredient => `<li>${ingredient.quantite} de ${ingredient.nom}</li>`).join('')}</ul> */}

// permet de rajouter les ingrédients dans la recette


// Code pour eviter les doublons dans les recettes aléatoires

// // Nombre de recettes aléatoires à afficher
// const nombreDeRecettes = 2;

// // Charger le fichier JSON contenant les recettes
// fetch('data.json')
//   .then(response => response.json())  
//   .then(data => {
//     // Extraire la liste des recettes
//     const recettes = data.recettes;
    
//     // Créer un tableau d'indices allant de 0 à recettes.length - 1
//     const indices = [...Array(recettes.length).keys()];

//     // Mélanger les indices de manière aléatoire
//     for (let i = indices.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [indices[i], indices[j]] = [indices[j], indices[i]]; // Échange des indices
//     }

//     // Sélectionner un certain nombre de recettes aléatoires sans répétition
//     const recettesAleatoires = [];
//     for (let i = 0; i < nombreDeRecettes; i++) {
//       const indexAleatoire = indices[i]; // Utiliser l'indice du tableau mélangé
//       recettesAleatoires.push(recettes[indexAleatoire]);
//     }

//     afficherRecettesAleatoires(recettesAleatoires);
//   })
//   .catch(error => {
//     console.error("Erreur lors du chargement du fichier JSON :", error);
//     // Afficher un message d'erreur sur la page
//     document.getElementById("recettes-container").innerHTML = "Erreur lors du chargement des recettes. Veuillez réessayer plus tard.";
//   });

// // Fonction pour afficher plusieurs recettes
// function afficherRecettesAleatoires(recettes) {
//   const recettesContainer = document.getElementById("recettes-container");
//   recettesContainer.innerHTML = ''; // Réinitialiser le conteneur avant d'ajouter de nouvelles recettes

//   recettes.forEach((recette, index) => {
//     const recetteDiv = document.createElement("div");
//     recetteDiv.classList.add("recette");
//     recetteDiv.innerHTML = `
//       <h2>${recette.nom}</h2>
//       <h3>Instructions :</h3>
//       <p>${recette.temps_preparation}</p>
//     `;
//     recettesContainer.appendChild(recetteDiv);
//   });