const searchForm = document.getElementById('formSearch');
const randomBtn = document.getElementById('btnRandom');
const loader = document.getElementById('loadingBox');
const errorMessage = document.getElementById('alertBox');
const errorText = document.getElementById('alertMsg');
const resultsSection = document.getElementById('showResults');
const recipeResults = document.getElementById('recipesGrid');
const resultCount = document.getElementById('countTag');
const recipeModal = new bootstrap.Modal(document.getElementById('detailsPopup'));
const SERVER_URL = 'https://recipe-recommender-lab4.netlify.app/';
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const ingredient = document.getElementById('mainItem').value.trim();
    const category = document.getElementById('mealType').value;
    const area = document.getElementById('foodOrigin').value;

    if (!ingredient && !category && !area)
    {
        showError('Please enter at least one search criteria');
        return;
    }

    await searchRecipes(ingredient, category, area);
});

randomBtn.addEventListener('click', async () => {
    await getRandomRecipe();
});

async function searchRecipes(ingredient, category, area) {
    try
    {
        showLoader();
        let recipes = [];
        let apiUrl = '';

        if (ingredient)
        {
            apiUrl = `${API_BASE_URL}/filter.php?i=${ingredient}`;
        }
        else if (category)
        {
            apiUrl = `${API_BASE_URL}/filter.php?c=${category}`;
        }
        else if (area)
        {
            apiUrl = `${API_BASE_URL}/filter.php?a=${area}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        recipes = data.meals || [];
        hideLoader();

        if (recipes && recipes.length > 0)
        {
            displayRecipes(recipes.slice(0, 12));
        }
        else
        {
            displayNoResults();
        }
    }
    catch (error)
    {
        console.error('Error searching recipes:', error);
        hideLoader();
        showError('Failed to search recipes.');
    }
}

async function getRandomRecipe() {
    try
    {
        showLoader();
        const response = await fetch(`${API_BASE_URL}/random.php`);
        const data = await response.json();
        hideLoader();

        if(data.meals && data.meals.length > 0)
        {
            displayRecipes(data.meals);
        }
        else
        {
            showError('Could not fetch random recipe.');
        }
    }
    catch(error)
    {
        console.error('Error getting random recipe:', error);
        hideLoader();
        showError('Failed to get random recipe.');
    }
}

async function getRecipeDetails(mealId) {
    try
    {
        const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    }
    catch(error)
    {
        console.error('Error fetching recipe details:', error);
        return null;
    }
}

function displayRecipes(recipes)
{
    resultsSection.classList.remove('d-none');
    resultCount.textContent = recipes.length;
    recipeResults.innerHTML = recipes.map(recipe => `
        <div class="col-md-6 col-lg-4">
            <div class="card recipe-card h-100" onclick="showRecipeDetails('${recipe.idMeal}')">
                <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
                <div class="card-body">
                    <h5 class="recipe-title">${recipe.strMeal}</h5>
                    ${recipe.strCategory ? `<span class="recipe-category">${recipe.strCategory}</span>` : ''}
                    ${recipe.strArea ? `<span class="recipe-area">${recipe.strArea}</span>` : ''}
                    <p class="mt-2 text-muted small">Click for full recipe</p>
                </div>
            </div>
        </div>
    `).join('');
}

function displayNoResults() {
    resultsSection.classList.remove('d-none');
    recipeResults.innerHTML = `
        <div class="col-12">
            <div class="no-results">
                <i class="bi bi-search"></i>
                <h4>No recipes found</h4>
                <p>Try adjusting your search criteria or use the "Surprise Me!" button</p>
            </div>
        </div>
    `;
    resultCount.textContent = '0';
}

async function showRecipeDetails(mealId) {
    try
    {
        const recipe = await getRecipeDetails(mealId);

        if(!recipe)
        {
            showError('Could not load recipe details');
            return;
        }

        const ingredients = [];
        for (let i = 1; i <= 20; i++)
        {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim())
            {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }

        document.getElementById('detailsTitle').textContent = recipe.strMeal;
        document.getElementById('detailsBody').innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-detail-image">
            
            <div class="row mb-3">
                <div class="col-6">
                    <strong>Category:</strong> ${recipe.strCategory || 'N/A'}
                </div>
                <div class="col-6">
                    <strong>Cuisine:</strong> ${recipe.strArea || 'N/A'}
                </div>
            </div>
            <div class="ingredients-list">
                <h6><i class="bi bi-list-check"></i> Ingredients</h6>
                ${ingredients.map(ing => `
                    <div class="ingredient-item">
                        <i class="bi bi-check-circle text-success"></i> ${ing}
                    </div>
                `).join('')}
            </div>
            <div class="instructions-section">
                <h6><i class="bi bi-book"></i> Instructions</h6>
                <p>${recipe.strInstructions}</p>
            </div>
            
            ${recipe.strYoutube ? `
                <div class="text-center">
                    <a href="${recipe.strYoutube}" target="_blank" class="btn btn-danger">
                        <i class="bi bi-youtube"></i> Watch Video Tutorial
                    </a>
                </div>
            ` : ''}
        `;

        recipeModal.show();
    }
    catch(error)
    {
        console.error('Error showing recipe details:', error);
        showError('Failed to load recipe details');
    }
}

function showLoader()
{
    loader.classList.remove('d-none');
}

function hideLoader()
{
    loader.classList.add('d-none');
}

function showError(message)
{
    errorText.textContent = message;
    errorMessage.classList.remove('d-none');
}

function hideError()
{
    errorMessage.classList.add('d-none');
}

function hideResults()
{
    resultsSection.classList.add('d-none');
}