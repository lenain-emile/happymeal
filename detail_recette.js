// Ancien code fonctionnel : Chargement des recettes et affichage
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const recettes = data.recettes;
        const container = document.getElementById("recetteContainer");

        recettes.forEach(recette => {
            const recetteHTML = `
                <div class="col-md-4 mb-4">
                    <a href="detail.html?id=${recette.id}" class="card shadow-ms text-decoration-none text-dark">
                        <div class="card-body">
                            <h5 class="card-title">${recette.nom}</h5>
                            <p class="card-text"><strong>Catégorie :</strong> ${recette.categorie}</p>
                            <p class="card-text"><strong>Temps :</strong> ${recette.temps_preparation}</p>
                        </div>
                    </a>
                </div>
            `;
            container.innerHTML += recetteHTML;
        });
    })
    .catch(error => console.error("Erreur lors du chargement des recettes:", error));




const params = new URLSearchParams(window.location.search);
const recetteId = params.get("id");

// Fonction pour vérifier si une recette est dans les favoris
function isFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav.id === id);
}

// Fonction pour ajouter une recette aux favoris
function addFavorite(id) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const recette = data.recettes.find(r => r.id == id);
            if (!recette) return;  // Si la recette n'existe pas, on arrête

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.some(fav => fav.id === id)) {
                favorites.push(recette); // Ajoute la recette complète
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert("Recette ajoutée aux favoris !");
            } else {
                alert("Cette recette est déjà dans vos favoris.");
            }
        })
        .catch(error => console.error("Erreur lors de l'ajout aux favoris:", error));
}

// Fonction pour supprimer une recette des favoris
function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.id !== id); // Supprimer la recette par son ID
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Sauvegarder les favoris mis à jour dans le localStorage
    alert("Recette retirée des favoris !");
}

// Chargement de la recette et gestion des favoris dans le détail de la recette
if (recetteId) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const recette = data.recettes.find(r => r.id == recetteId);

            if (recette) {
                // Affichage des détails de la recette
                document.getElementById("nomRecette").textContent = recette.nom;
                document.getElementById("tempsPreparation").textContent = recette.temps_preparation;

                const ingredientsList = document.getElementById("ingredients");
                recette.ingredients.forEach(ingredient => {
                    const li = document.createElement("li");
                    li.className = "list-group-item";
                    li.textContent = `${ingredient.nom} - ${ingredient.quantite}`;
                    ingredientsList.appendChild(li);
                });

                const etapesList = document.getElementById("etapes");
                recette.etapes.forEach(etape => {
                    const li = document.createElement("li");
                    li.className = "list-group-item";
                    li.textContent = etape;
                    etapesList.appendChild(li);
                });

                // Gestion du bouton "Ajouter aux favoris" / "Retirer des favoris"
                const button = document.getElementById("favoriteBtn");
                button.textContent = isFavorite(recetteId) ? "Retirer des favoris" : "❤️ Ajouter aux favoris";

                button.addEventListener("click", function () {
                    if (isFavorite(recetteId)) {
                        // Si la recette est dans les favoris, on la retire
                        removeFavorite(recetteId);
                        button.textContent = "❤️ Ajouter aux favoris"; // Mettre à jour le texte du bouton
                    } else {
                        // Si la recette n'est pas dans les favoris, on l'ajoute
                        addFavorite(recetteId);
                        button.textContent = "Retirer des favoris"; // Mettre à jour le texte du bouton
                    }
                });
            }
        })
        .catch(error => console.error("Erreur lors du chargement des détails de la recette :", error));
} else {
    console.error("Aucun ID de recette fourni dans l'URL !");
}
