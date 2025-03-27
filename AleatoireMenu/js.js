// Description: Script pour afficher des recettes aléatoires sur la page web.

// Nombre de recettes aléatoires à afficher

document.getElementById("button").addEventListener("click", function() {
  const nameValue = document.querySelector('#nom').value;
    localStorage.setItem('nom', nameValue);
}); 
//  pour save le nom 
  


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

  recettes.forEach((recette) => {
    const recetteDiv = document.createElement("div");
    recetteDiv.classList.add("recette");
    recetteDiv.innerHTML = `
      <h2><button class="myBtn" data-etapes="${recette.etapes}" data-ingredients="${recette.ingredients.map(ingredient => `${ingredient.quantite} de ${ingredient.nom}`).join(', ')}">${recette.nom}</button></h2>
     
      <p>${recette.temps_preparation}</p>
    `;
    recettesContainer.appendChild(recetteDiv);
  });

  // Ajouter un événement à chaque bouton généré dynamiquement
  document.querySelectorAll(".myBtn").forEach(button => {
    button.addEventListener("click", function () {
      const modal = document.getElementById("myModal");
      const preparation = document.getElementById("preparation");
      const ingredients = document.getElementById("ingredients");

      // Récupérer les étapes depuis l'attribut data-etapes du bouton cliqué
      preparation.innerText = this.getAttribute("data-etapes");
      
      // Récupérer les ingrédients depuis l'attribut data-ingredients du bouton cliqué
      ingredients.innerHTML = this.getAttribute("data-ingredients");

      // Afficher le modal
      modal.style.display = "block";
    });
  });
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}























      // <ul>${recette.ingredients.map(ingredient => `<li>${ingredient.quantite} de ${ingredient.nom}</li>`).join('')}</ul>
      // <h3>Instructions :</h3>
      // <p>${recette.etapes}</p>



// Get the modal


































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