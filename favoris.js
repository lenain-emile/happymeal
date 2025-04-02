// Fonction pour afficher les favoris
function afficherFavoris() {
    const favoris = JSON.parse(localStorage.getItem('favorites')) || [];
    const favorisContainer = document.getElementById('favorisContainer');
    favorisContainer.innerHTML = '';  // Vide le conteneur avant d'ajouter les favoris

    if (favoris.length === 0) {
        favorisContainer.innerHTML = '<p>Aucun favori trouvé.</p>';
        return;
    }

    favoris.forEach(fav => {
        const recetteHTML = `
            <div class="col-md-4 mb-4">
                <div class="card shadow-ms">
                    <div class="card-body">
                        <h5 class="card-title">${fav.nom}</h5>
                        <p class="card-text"><strong>Catégorie :</strong> ${fav.categorie}</p>
                        <p class="card-text"><strong>Temps :</strong> ${fav.temps_preparation}</p>
                        <button class="btn btn-danger" onclick="supprimerFavori(${fav.id})">Supprimer des favoris</button>
                    </div>
                </div>
            </div>
        `;
        favorisContainer.innerHTML += recetteHTML;
    });
}

// Fonction pour supprimer un favori par son ID
function supprimerFavori(id) {
    let favoris = JSON.parse(localStorage.getItem('favorites')) || [];
    favoris = favoris.filter(fav => fav.id !== id);  // Filtrer et supprimer la recette avec l'ID donné
    localStorage.setItem('favorites', JSON.stringify(favoris));  // Sauvegarder la liste mise à jour dans le localStorage
    afficherFavoris();  // Réafficher la liste des favoris mise à jour
}

// Appeler la fonction pour afficher les favoris au chargement de la page
window.onload = afficherFavoris;
