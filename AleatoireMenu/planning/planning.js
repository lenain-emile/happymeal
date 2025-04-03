// Créer un nouvel objet Date pour obtenir la date actuelle
let aujourdHui = new Date();

// Extraire les informations de la date
let jour = aujourdHui.getDate(); // Jour du mois
let mois = aujourdHui.getMonth() + 1; // Mois (janvier est 0, donc on ajoute 1)
let annee = aujourdHui.getFullYear(); // Année

// Afficher la date dans le format JJ/MM/AAAA
console.log(jour + '/' + mois + '/' + annee);


if (localStorage.getItem("nom") != null) {
  h1.textContent = "Bonjour, " + localStorage.getItem("nom");
}


