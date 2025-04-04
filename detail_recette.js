fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const recettes = data.recettes;
        const container = document.getElementById("recetteContainer");

        recettes.forEach(recette => {
            const recetteHTML = `
                <div class="col-md-4 mb-4">
                    <a href="detail.html?id=${recette.id}" class="card recette-card shadow-ms text-decoration-none text-dark ">
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

        const recetteCards = document.querySelectorAll(".recette-card");
        recetteCards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                card.style.transform = "scale(1.05)";
                card.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "scale(1)";
                card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            });
        });
    })
    .catch(error => console.error("Erreur lors du chargement des recettes:", error));




const params = new URLSearchParams(window.location.search);
const recetteId = params.get("id");

function isFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav.id === id);
}

function addFavorite(id) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const recette = data.recettes.find(r => r.id == id);
            if (!recette) return; 

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.some(fav => fav.id === id)) {
                favorites.push(recette);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            } else {
                alert("Cette recette est déjà dans vos favoris.");
            }
        })
        .catch(error => console.error("Erreur lors de l'ajout aux favoris:", error));
}

function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.id !== id); 
    localStorage.setItem('favorites', JSON.stringify(favorites));  
    alert("Recette retirée des favoris !");
}

if (recetteId) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const recette = data.recettes.find(r => r.id == recetteId);

            if (recette) {
                
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

                const button = document.getElementById("favoriteBtn");
                button.textContent = isFavorite(recetteId) ? "Retirer des favoris" : "❤️ Ajouter aux favoris";

                button.addEventListener("click", function () {
                    if (isFavorite(recetteId)) {
                        
                        removeFavorite(recetteId);
                        button.textContent = "❤️ Ajouter aux favoris"; 
                    } else {
                        
                        addFavorite(recetteId);
                        button.textContent = "Retirer des favoris"; 
                    }
                });
            }
        })
        .catch(error => console.error("Erreur lors du chargement des détails de la recette :", error));
} else {
    console.error("Aucun ID de recette fourni dans l'URL !");
}

document.getElementById('favoriteBtn').addEventListener('click', function () {
    const toast = new bootstrap.Toast(document.getElementById('favoriteToast'));
    toast.show();
});
