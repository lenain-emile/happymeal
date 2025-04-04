document.getElementById('pdf').addEventListener('click', function () {
    // Récupérer les favoris du localStorage
    const favoris = JSON.parse(localStorage.getItem('favorites')) || [];

    // Créer un objet jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Titre du document PDF
    doc.setFontSize(16);
    doc.text('Recettes de la semaine', 20, 20);
    
    // Position initiale pour l'affichage des recettes
    let yPosition = 30;

    // Boucle sur les favoris pour les ajouter au PDF
    favoris.forEach(fav => {
        doc.setFontSize(12);
        doc.text(`Nom de la recette : ${fav.nom}`, 20, yPosition);
        yPosition += 10;

        doc.text(`Catégorie : ${fav.categorie}`, 20, yPosition);
        yPosition += 10;

        doc.text(`Temps de préparation : ${fav.temps_preparation}`, 20, yPosition);
        yPosition += 10;

        // Afficher les ingrédients
        doc.text('Ingrédients :', 20, yPosition);
        yPosition += 10;

        fav.ingredients.forEach(ingredient => {
            doc.text(`- ${ingredient.quantite} de ${ingredient.nom}`, 20, yPosition);
            yPosition += 8;
        });

        // Ajouter un espacement avant la prochaine recette
        yPosition += 10;

        // Si on atteint la fin de la page, on ajoute une nouvelle page
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20; // Réinitialiser la position Y pour la nouvelle page
        }
    });

    // Télécharger le PDF
    doc.save('recettes_semaine.pdf');
});
