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
let filter1 = "any";
let filter2 = "any";
const dietElements = document.getElementsByClassName('diet');
const typeElements = document.getElementsByClassName('type');
function addFilter(fil1  = null, fil2 = null){
  if (fil1 !== null){
    for (let i = 0; i < dietElements.length; i++) {
      dietElements[i].style.borderColor = "black";
    }
    document.getElementById(`${fil1}`).style.borderColor = "red";
    filter1 = fil1;
  }
  if (fil2!== null){
    for (let i = 0; i < typeElements.length; i++) {
      typeElements[i].style.borderColor = "black";
    }
    document.getElementById(`${fil2}`).style.borderColor = "red";
    filter2 = fil2;
  }
}
let idArray = [];
let isVeg = true;
//Arrays to filter vegetarian and vegan elements
const meatCategoriesCat = [
  "Beef",
  "Chicken",
  "Lamb",
  "Pork",
  "Seafood",
  "Goat"
]
const meatCategories = [
  "beef", "Beef",
  "pork", "Pork",
  "ham", "Ham",
  "chicken", "Chicken",
  "turkey", "Turkey",
  "lamb", "Lamb",
  "veal", "Veal",
  "duck", "Duck",
  "goose", "Goose",
  "quail", "Quail",
  "rabbit", "Rabbit",
  "venison", "Venison",
  "buffalo", "Buffalo",
  "elk", "Elk",
  "bison", "Bison",
  "kangaroo", "Kangaroo",
  "game meat", "Game Meat",
  "chicken breast", "Chicken Breast",
  "chicken thigh", "Chicken Thigh",
  "chicken leg", "Chicken Leg",
  "beef steak", "Beef Steak",
  "beef roast", "Beef Roast",
  "pork chop", "Pork Chop",
  "pork tenderloin", "Pork Tenderloin",
  "lamb chops", "Lamb Chops",
  "lamb leg", "Lamb Leg",
];


const dairyProducts = [
  "milk", "Milk",
  "cheese", "Cheese",
  "butter", "Butter",
  "yogurt", "Yogurt",
  "cream", "Cream",
  "sour cream", "Sour Cream",
  "whey", "Whey",
  "casein", "Casein",
  "lactose", "Lactose",
  "ghee", "Ghee",
  "paneer", "Paneer",
  "curd", "Curd",
  "clotted cream", "Clotted Cream",
  "mozzarella", "Mozzarella",
  "cheddar", "Cheddar",
  "parmesan", "Parmesan",
  "gouda", "Gouda",
  "swiss", "Swiss",
  "blue cheese", "Blue Cheese",
  "feta", "Feta",
  "brie", "Brie",
  "camembert", "Camembert",
  "goat cheese", "Goat Cheese",
  "ricotta", "Ricotta",
];


const nonVegetarianIngredients = [
  ...meatCategories,
  "fish", "Fish",
  "shellfish", "Shellfish",
  "crab", "Crab",
  "lobster", "Lobster",
  "shrimp", "Shrimp",
  "cray fish", "Cray fish",
  "white fish", "White fish",
  "prawns", "Prawns",
  "squid", "Squid",
  "octopus", "Octopus",
  "oyster", "Oyster",
  "mussel", "Mussel",
  "scallop", "Scallop",
  "king prawns", "King Prawns",
  "poultry", "Poultry",
  "gelatin", "Gelatin",
  "rennet", "Rennet",
  "lard", "Lard",
  "tallow", "Tallow",
  "collagen", "Collagen",
  "animal-derived broths", "Animal-Derived Broths"
];

const nonVeganIngredients = [
  ...nonVegetarianIngredients,
  ...dairyProducts,
  "eggs", "Eggs",
  "honey", "Honey",
  "royal jelly", "Royal Jelly",
  "propolis", "Propolis",
  "shellac", "Shellac",
  "carmine", "Carmine"
];


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
    
    //filters
    if (meatCategoriesCat.includes(type)){
      isVeg = false;
    }
    console.log(isVeg)

    if (filter1 === "vegetarian"){
      for (let i = 0; i < ingredients.length; i++){
          while(nonVegetarianIngredients.includes(rawIngredients[i]) || isVeg === false){
            console.log("non vegetarian")
            fetchRandomRecipe().then(newRecipe => {
              recipe = newRecipe;
            });
          }
      }
    } else if(filter1 === "vegan"){
      for (let i = 0; i < ingredients.length; i++){
          while(nonVeganIngredients.includes(rawIngredients[i]) || isVeg === false){
            console.log("non vegan")
            fetchRandomRecipe().then(newRecipe => {
              recipe = newRecipe;
            });
          }
        }
      }
    
    if (filter2 === "dessert"){
      if (type !== "Dessert"){
        fetchRandomRecipe().then(newRecipe => {
          recipe = newRecipe;
        });
      }
    } else if (filter2 === "side"){
        if (type !== "Side"){
          fetchRandomRecipe().then(newRecipe => {
            recipe = newRecipe;
          });
    }} else if (filter2 === "main"){
        if (type === "Dessert" || type === "Side"){
          fetchRandomRecipe().then(newRecipe => {
            recipe = newRecipe;
          });
        }
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