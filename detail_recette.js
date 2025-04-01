fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const recettes = data.recettes;
        const container = document.getElementById("recetteContainer");

        recettes.forEach(recette => {
            const recetteHTML = `
                <div class="col-md-4 mb-4">
                    <a href="detail.html?id=${recette.id}" class="card shadow-ms">
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
                } else {
                    
                    document.getElementById("nomRecette").textContent = "Recette non trouvée";
                }
            })
            .catch(error => console.error("Erreur lors du chargement des détails de la recette :", error));
    } else {
        console.error("Aucun ID de recette fourni dans l'URL !");
    }

    const button = document.getElementById("favoriteBtn");

    button.addEventListener("click", function() {
        alert("Recette ajoutée aux favoris !");
    });

