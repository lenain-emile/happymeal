fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const recettes = data.recettes;
        const container = document.getElementById("recetteContainer");

        recettes.forEach(recette => {
            const recetteHTML = `
                <div class="col-md-4 mb-4">
                    <div class="card shadow-ms">
                        <div class="card-body">
                            <h5 class="card-title">${recette.nom}</h5>
                            <p class="card-text"><strong>Catégorie :</strong> ${recette.categorie}</p>
                            <p class="card-text"><strong>Temps :</strong> ${recette.temps_preparation}</p>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += recetteHTML;
        });
    })
    .catch(error => console.error("Erreur lors du chargement des recettes:", error));
