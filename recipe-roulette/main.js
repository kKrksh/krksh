async function fetchRandomRecipe() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    return null;
  }
}
let idArray = [];
function run(){
  fetchRandomRecipe().then(recipe => {
    //Checking if recipe has already been shown

    while (idArray.includes(recipe.idMeal)) {
      fetchRandomRecipe().then(newRecipe => {
        recipe = newRecipe;
      });
    }
    idArray.push(recipe.idMeal);

    //removes previous ingredients

    let parentDiv = document.getElementById('recipe');
    let childrenToRemove = parentDiv.getElementsByClassName('ingredient');
    Array.from(childrenToRemove).forEach(function(child) {
        child.parentNode.removeChild(child);
    });
    //assigns values to variables
    let name = recipe.strMeal;
    let img = recipe.strMealThumb;	
    let type = recipe.strCategory;
    let country = recipe.strArea;
    let instructions = recipe.strInstructions;
    let tutorial = recipe.strYoutube;
    let ingredients = ["Ingredients:"];
    let rawIngredients = [];
    for (let i = 1; i < 20; i++){
      let ingredient = recipe[`strMeasure${i}`] + ' ' + recipe[`strIngredient${i}`];
      ingredients.push(ingredient);
    }
    for (let i = 1; i < ingredients.length; i++){
      rawIngredients.push(recipe[`strIngredient${i}`]);
    }
    
    //adds variables to HTML elements

    console.log(recipe.strSource);
    document.getElementById("name").innerText = name;
    document.getElementById("img").innerHTML = `<img src="${img}"/ id="image">`;
    document.getElementById("type").innerText = 'Category: ' + type;
    document.getElementById("country").innerText = 'Origin: ' + country;
    document.getElementById("instructions").innerText = instructions;
    document.getElementById("tutorial").textContent = "Tutorial";
    document.getElementById("tutorial").href = tutorial;
    let ingredientsHTML = "";
    for (let i = 0; i < ingredients.length; i++) {
        ingredientsHTML += `<p class="center ingredient" >${ingredients[i]}</p>`;
      }
    document.getElementById('recipe').innerHTML += ingredientsHTML;
  });
}