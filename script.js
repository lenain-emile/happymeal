// Ancien code fonctionnel : Chargement des recettes et affichage
{/* Ajouter la balise script à la page recette.html pour faire fonctionner bare recherche <script src="script.js" defer></script> */}
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const recettes = data.recettes;
        const container = document.getElementById("recetteContainer");

        // Fonction pour afficher les recettes
        function afficherRecettes(recettesAffichees) {
            container.innerHTML = ""; // Réinitialiser le contenu du container
            recettesAffichees.forEach(recette => {
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
        }

        // Afficher toutes les recettes initialement
        afficherRecettes(recettes);

        // Fonction de recherche en temps réel
        const searchInput = document.getElementById("searchInput"); //Remplacer par l'id du de la barre de recherche (ici searchinput mais sur ton code ca doit etre "nom si pas modif barre")

        searchInput.addEventListener("input", function() {
            const searchQuery = searchInput.value.toLowerCase();

            if (searchQuery.length >= 2) {  // Recherche à partir de 2 caractères
                const filteredRecettes = recettes.filter(recette => recette.nom.toLowerCase().includes(searchQuery));
                afficherRecettes(filteredRecettes);
            } else {
                // Si la recherche est vide ou < 2 caractères, afficher toutes les recettes
                afficherRecettes(recettes);
            }
        });
    })
    .catch(error => console.error("Erreur lors du chargement des recettes:", error));
