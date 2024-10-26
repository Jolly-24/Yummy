let mealsContainer = document.getElementById("mealsContainer")
let searchContainer = document.getElementById("searchContainer")


var nameRegex = /^[a-zA-Z ]+$/;
var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
var passwordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
var ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;


jQuery(function(){
    $(".loading").fadeOut(2000, function(){
        $("body").css({overflow:"auto"});
    });
})

 
let sideNavStatus = false;
$(".open-close-icon").on("click",function(){
    if(sideNavStatus===false){
     $(".side-nav-menu").animate({left:'0px'},500)
    $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-xmark")  
    $(".links li").animate({top: '0'},800)
    sideNavStatus=true;
    }else{
       closeNav()
    }
    
})
function closeNav(){
    $(".side-nav-menu").animate({left:'-260px'},500)
    $(".open-close-icon").removeClass("fa-xmark").addClass("fa-align-justify") 
    $(".links li").animate({top: '300px'},800) 
    sideNavStatus=false
}

function displayMeals(arr){
    let box =""
    for (let i = 0; i < arr.length; i++){
        box+=`
        <div class="col-md-3  overflow-hidden h-100">
                <div class="box position-relative rounded-2 " onclick="getMealDetails('${arr[i].idMeal}')">
                    <div class="">
                        <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-2">
                    </div>
                    <div class="name rounded-2 ps-4  position-absolute bg-white bg-opacity-75 w-100 h-100  start-0 d-flex align-items-center justify-content-start">
                        <h4 class="fs-3">${arr[i].strMeal}</h4>
                    </div>
                </div>
            </div>
        `
    }
    mealsContainer.innerHTML=box
} 

async function getCategories(){
    mealsContainer.innerHTML=""
    $(".loading").fadeIn(400)
    searchContainer.innerHTML=""
    let response = await fetch("https://themealdb.com/api/json/v1/1/categories.php");
    let data = await response.json()
displayCategories(data.categories)
$(".loading").fadeOut(400)
}

function displayCategories(arr){
    closeNav()
    let box =""
    for(var i = 0; i<arr.length; i++){
     box += `
    <div class="col-md-3 overflow-hidden h-100" onclick="getCategoryMeals('${arr[i].strCategory}')">
                <div class="box position-relative rounded-2 ">
                    <div class="">
                        <img src="${arr[i].strCategoryThumb}" alt="" class="w-100 rounded-2">
                    </div>
                    <div class="name rounded-2 ps-4  position-absolute bg-white bg-opacity-75 w-100 h-100  start-0 d-flex flex-column p-4 align-items-center justify-content-start">
                        <h4 class="fs-3">${arr[i].strCategory}</h4>
                        <p class="text-center">${arr[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
   
            `
        }
        mealsContainer.innerHTML=box
        }

async function getCategoryMeals(category){
    mealsContainer.innerHTML=""
    let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let data = await response.json()
    displayMeals(data.meals)
}



async function getAreas() {
    mealsContainer.innerHTML=""
    $(".loading").fadeIn(400)
    searchContainer.innerHTML=""
    let response = await fetch("https://themealdb.com/api/json/v1/1/list.php?a=list");
    let data = await response.json()
    displayAreas(data.meals)
    $(".loading").fadeOut(400)
}

function displayAreas(arr){
    closeNav()
    let box =""
    for(var i = 0; i<arr.length; i++){
     box += `
    <div class="col-md-3  overflow-hidden h-100">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="box position-relative rounded-2 text-white d-flex align-items-center justify-content-center flex-column display-1 gap-2">
                    <i class="fa-solid fa-house-flag"></i>
                    <h4 class="fs-3 text-center">${arr[i].strArea}</h4>
                </div>
            </div>
   
            `
        }
        mealsContainer.innerHTML=box
        }

async function getAreaMeals(area){
    $(".loading").fadeIn(400)
    mealsContainer.innerHTML=""
    let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json()
    displayMeals(data.meals)
    $(".loading").fadeOut(400)
}

   
   async function getIngredients() {
    $(".loading").fadeIn(400)
    searchContainer.innerHTML=""
    let response = await fetch("https://themealdb.com/api/json/v1/1/list.php?i=list");
    let data = await response.json()
    displayIngredients(data.meals.slice(0, 20))
    $(".loading").fadeOut(400)
}

function displayIngredients(arr){
    closeNav()
    let box =""
    for(var i = 0; i<arr.length; i++){
     box += `
    <div class="col-md-3  overflow-hidden h-100">
                <div onclick="geIngredientsMeals('${arr[i].strIngredient}')"  class="box position-relative rounded-2 text-white d-flex align-items-center justify-content-center flex-column display-1 gap-2">
                    <i class="fa-solid fa-drumstick-bite"></i>
                    <h4 class="fs-3 text-center">${arr[i].strIngredient}</h4>
                    <p class="fs-6 text-center">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
   
            `
        }
        mealsContainer.innerHTML=box
        }

        async function geIngredientsMeals(ingr){
            $(".loading").fadeIn(400)
            mealsContainer.innerHTML=""
            let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${ingr}`);
            let data = await response.json()
            displayMeals(data.meals)
            $(".loading").fadeOut(400)
        }



async function getMealDetails(mealId) {
    closeNav();
    mealsContainer.innerHTML = "";
    searchContainer.innerHTML = "";
    
    let response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    let data = await response.json();
    displayMealDetails(data.meals[0]);
}

function displayMealDetails(meal) {
    searchContainer.innerHTML = "";
    mealsContainer.innerHTML = "";

let ingredients=""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="bg-info p-2 rounded-3">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tagsArray = meal.strTags?.split(",")
    if (!tagsArray) tagsArray = []
    let tags = ''
    for (let i = 0; i < tagsArray.length; i++) {
        tags += `
        <li class="bg-new p-2 rounded-3">${tagsArray[i]}</li>`
    }

    let box = `
        <div class="col-md-4">
            <div class="mealImg">
                <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-3">
                <h2 class="text-white display-5 fw-bold">${meal.strMeal}</h2>
            </div>
        </div>
        <div class="col-md-8 pb-5">
            <div class="mealInfo text-white">
                <h3 class="fs-1">Instructions</h3>
                <p class="fs-5">${meal.strInstructions}</p>
                <p class="fs-2">Area: ${meal.strArea}</p>
                <p class="fs-2">Category: ${meal.strCategory}</p>
                <p class="fs-2">Recipes:</p>
                <ul class="text-black fs-6 d-flex flex-wrap gap-4">
                    ${ingredients}
                </ul>
                <p class="fs-2">Tags: </p>
                <ul class="text-black fs-6 d-flex flex-wrap gap-4">
                   ${tags}
                    
                </ul>
                
                <button class="btn btn-success"> <a target="_blank" class="text-white" href="${meal.strSource}" >Source</a></button>
                <button class="btn btn-danger"><a target="_blank" class="text-white" href="${meal.strYoutube}" >Youtube</a></button>
            </div>
        </div>
    `;

    mealsContainer.innerHTML = box;
}



function showSearchInputs(){
    closeNav()
    searchContainer.innerHTML=`
     <div class="mb-3 w-75">
                        <input type="email" class="form-control bg-black text-white" id="exampleFormControlInput1" placeholder="Search By Name" onInput="searchByName(this.value)">
                      </div>
                    <div class="mb-3 w-75">
                        <input type="email" maxlength="1" class="form-control bg-black text-white" id="exampleFormControlInput1" placeholder="Search By First Letter" onInput="searchByLetter(this.value)">
                      </div>
    `
    mealsContainer.innerHTML=""
    }
    
async function searchByName(meal){
   
    let reponse = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    let data = await reponse.json()
    if (data.meals){
     displayMeals(data.meals)   
    }else{
        displayMeals([""])
    }
    
}
searchByName("")

async function searchByLetter(meal){
   if(meal==""){
    meal="a"
   }
    let reponse = await fetch(`https://themealdb.com/api/json/v1/1/search.php?f=${meal}`)
    let data = await reponse.json()
    if (data.meals){
     displayMeals(data.meals)   
    }else{
        displayMeals([])
    }
    
}


function showContactUs(){
    closeNav();
    mealsContainer.innerHTML = `
      <div class="contact min-vh-100 d-flex align-items-center justify-content-center flex-column">
        <div class="d-flex align-items-center justify-content-center gap-5 w-100">
          <div class="w-100">
            <div class="mb-3 w-100">
              <input type="text" class="form-control nameInput" id="exampleFormControlInput1" placeholder="Enter your name" onInput="namevalidate(nameRegex, this)">
              <div class="bg-danger bg-opacity-50 text-white text-center mt-2 p-2 rounded-4 d-none" id="nameError">
                <p>Special characters and numbers not allowed</p>
              </div>
            </div>
            <div class="mb-3 w-100">
              <input type="email" class="form-control emailInput" id="exampleFormControlInput2" placeholder="Enter your email" onInput="emailvalidate(emailRegex, this)">
              <div class="bg-danger bg-opacity-50 text-white text-center mt-2 p-2 rounded-4 d-none" id="emailError">
                <p>Email not valid *example@yyy.zzz</p>
              </div>
            </div>
            <div class="mb-3 w-100">
              <input type="number" class="form-control phoneInput" id="exampleFormControlInput3" placeholder="Enter your phone" onInput="phonevalidate(phoneRegex, this)">
              <div class=" bg-danger bg-opacity-50 text-white text-center mt-2 p-2 rounded-4 d-none" id="phoneError">
                <p>Enter valid Phone Number</p>
              </div>
            </div>
          </div>
          <div class="w-100">
            <div class="mb-3 w-100">
              <input type="number" class="form-control ageInput" id="exampleFormControlInput4" placeholder="Enter your age" onInput="agevalidate(ageRegex, this)">
              <div class="bg-danger bg-opacity-50 text-white text-center mt-2 p-2 rounded-4 d-none" id="ageError ">
                <p>Enter valid age</p>
              </div>
            </div>
            <div class="mb-3 w-100">
              <input type="password" class="form-control passInput" id="exampleFormControlInput5" placeholder="Enter your password" onInput="passvalidate(passwordRegex, this)">
              <div class=" bg-danger bg-opacity-50 text-white text-center mt-2 p-2 rounded-4 d-none" id="passError">
                <p>Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
              </div>
            </div>
            <div class="mb-3 w-100">
              <input type="password" class="form-control repassInput" id="exampleFormControlInput6" placeholder="Repassword" onInput="repassvalidate()">
              <div class=" bg-danger bg-opacity-50 text-white text-center mt-2 p-2 rounded-4 d-none" id="repassError">
                <p>Enter valid repassword</p>
              </div>
            </div>
          </div>   
        </div>
        <button class="mt-5 btn btn-danger" disabled id="submitBtn">Submit</button>
      </div>
    `;      
}



function validateField(regex, inputField, errorId) {
    if (regex.test(inputField.value)) {
        $(`#${errorId}`).addClass("d-none").removeClass("d-block");
        if(inputField.value!=""){
            submitBtn.setAttribute("disabled", "disabled")
        }else{
           submitBtn.removeAttribute("disabled")  
        }

    } else {
        $(`#${errorId}`).removeClass("d-none").addClass("d-block");
        submitBtn.setAttribute("disabled", "disabled")
    }
  
}

function namevalidate(nameRegex, nameInput) {
    validateField(nameRegex, nameInput, "nameError");
    if(nameInput.value!=""){
        submitBtn.setAttribute("disabled", "disabled")
    }else{
       submitBtn.removeAttribute("disabled")  
    }
}

function emailvalidate(emailRegex, emailInput) {
    validateField(emailRegex, emailInput, "emailError");
    if(emailInput.value!=""){
        submitBtn.setAttribute("disabled", "disabled")
    }else{
       submitBtn.removeAttribute("disabled")  
    }
}

function phonevalidate(phoneRegex, phoneInput) {
    validateField(phoneRegex, phoneInput, "phoneError");
    if(phoneInput.value!=""){
        submitBtn.setAttribute("disabled", "disabled")
    }else{
       submitBtn.removeAttribute("disabled")  
    }
}

function agevalidate(ageRegex, ageInput) {
    validateField(ageRegex, ageInput, "ageError");
    if(ageInput.value!=""){
        submitBtn.setAttribute("disabled", "disabled")
    }else{
       submitBtn.removeAttribute("disabled")  
    }
}

function passvalidate(passwordRegex, passInput) {
    validateField(passwordRegex, passInput, "passError");
    if(passInput.value!=""){
        submitBtn.setAttribute("disabled", "disabled")
    }else{
       submitBtn.removeAttribute("disabled")  
    }
}

function repassvalidate() {
    if ($(".repassInput").val() === $(".passInput").val()) {
        $("#repassError").addClass("d-none").removeClass("d-block");
        submitBtn.removeAttribute("disabled")
    } else {
        $("#repassError").removeClass("d-none").addClass("d-block");
        submitBtn.setAttribute("disabled", "disabled")
    }
}


$("#contact").on("click" , function(){
    showContactUs()
})

$("#search").on("click" , function(){
    showSearchInputs()
})

$("#Ingredients").on("click",function(){
    getIngredients();
      })

  $("#categories").on("click",function(){
    getCategories();
    })

    $("#areas").on("click",function(){
   getAreas();
    })



