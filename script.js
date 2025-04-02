


let recipes = [];
let currentPage = 1;
const RECIPES_PER_PAGE = 9;

async function fetchRecipes() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        
        recipes = data.recettes.map(recipe => ({
            ...recipe,
            image: recipe.image || `https://via.placeholder.com/300x250.png?text=${encodeURIComponent(recipe.nom)}`
        }));
        
        displayRandomRecipes();
        displayAllRecipes();
    } catch (error) {
        console.error('Erreur lors du chargement des recettes:', error);
    }
}

function displayRandomRecipes() {
    const container = document.getElementById('random-recipes');
    container.innerHTML = '';
    const shuffledRecipes = [...recipes].sort(() => 0.5 - Math.random()).slice(0, 3);
    shuffledRecipes.forEach(recipe => container.appendChild(createRecipeCard(recipe)));
}

function displayAllRecipes() {
    const container = document.getElementById('all-recipes');
    container.innerHTML = '';
    const start = (currentPage - 1) * RECIPES_PER_PAGE;
    recipes.slice(start, start + RECIPES_PER_PAGE).forEach(recipe => container.appendChild(createRecipeCard(recipe)));
    updatePagination();
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.nom}" class="recipe-card-image">
        <div class="recipe-card-content">
            <h3>${recipe.nom}</h3>
            <p>Catégorie: ${recipe.categorie}</p>
            <p>Temps de préparation: ${recipe.temps_preparation}</p>
        </div>
    `;
    
    return card;
}


        async function fetchRecipes() {
            try {
                const response = await fetch('./data.json');
                const data = await response.json();
                console.log(data,'coucou ')
                
                recipes = data.recettes || [];
                displayRandomRecipes();
                displayAllRecipes();
            } catch (error) {
                console.error('Erreur lors du chargement des recettes:', error);
            }
        }

        function displayRandomRecipes() {
            const container = document.getElementById('random-recipes');
            container.innerHTML = '';
            const shuffledRecipes = [...recipes].sort(() => 0.5 - Math.random()).slice(0, 3);
            shuffledRecipes.forEach(recipe => container.appendChild(createRecipeCard(recipe)));
        }

        function displayAllRecipes() {
            const container = document.getElementById('all-recipes');
            container.innerHTML = '';
            const start = (currentPage - 1) * RECIPES_PER_PAGE;
            recipes.slice(start, start + RECIPES_PER_PAGE).forEach(recipe => container.appendChild(createRecipeCard(recipe)));
            updatePagination();
        }

        function createRecipeCard(recipe) {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `<h3>${recipe.nom}</h3><p>Catégorie: ${recipe.categorie}</p><p>Temps de préparation: ${recipe.temps_preparation}</p>`;
            return card;
        }

        function updatePagination() {
            const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE) || 1;
            document.getElementById('page-number').textContent = `Page ${currentPage} / ${totalPages}`;
            document.getElementById('prev-page').disabled = currentPage === 1;
            document.getElementById('next-page').disabled = currentPage === totalPages;
        }

        function setupAutocomplete() {
            const searchInput = document.getElementById('search-input');
            const autocompleteList = document.getElementById('autocomplete-list');

            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                autocompleteList.innerHTML = '';
                if (searchTerm.length > 1) {
                    recipes.filter(recipe => recipe.nom.toLowerCase().includes(searchTerm) || 
                        recipe.ingredients.some(ing => typeof ing === 'string' ? ing.toLowerCase().includes(searchTerm) : ing.nom.toLowerCase().includes(searchTerm)))
                        .slice(0, 5).forEach(recipe => {
                            const div = document.createElement('div');
                            div.textContent = recipe.nom;
                            div.addEventListener('click', () => {
                                searchInput.value = recipe.nom;
                                autocompleteList.innerHTML = '';
                            });
                            autocompleteList.appendChild(div);
                        });
                }
            });

            document.addEventListener('click', e => {
                if (!searchInput.contains(e.target) && !autocompleteList.contains(e.target)) {
                    autocompleteList.innerHTML = '';
                }
            });
        }

        document.getElementById('prev-page').addEventListener('click', () => { if (currentPage > 1) { currentPage--; displayAllRecipes(); } });
        document.getElementById('next-page').addEventListener('click', () => { if (currentPage < Math.ceil(recipes.length / RECIPES_PER_PAGE)) { currentPage++; displayAllRecipes(); } });

        document.addEventListener('DOMContentLoaded', () => { fetchRecipes(); setupAutocomplete(); });
  