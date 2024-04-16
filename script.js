let stepCount = 0;

const formMapToSteps = {
    0: "formOne",
    1: "formTwo",
    2: "formThree"
}

const formOne = [true, true, true, true, true];
const formTwo = [true, true, true, true, true];
const formThree = [true, true, true, true];


const formMap = {
    "formOne": formOne,
    "formTwo": formTwo,
    "formThree": formThree
}

//Regex functions:
function checkEmail(inputValue) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegex.test(inputValue)) return false;
    return true;
}


function customPasswordCheck(inputValue) {
    if( !((inputValue.length >= 8) && (inputValue.length <= 16))) 
        return false;

    let specialChar = 0, lowerCase=0, numbers = 0, upperCase = 0;
    for(let i=0; i<inputValue.length; i++) {
        if(inputValue[i] >= 'a' && inputValue[i] <= 'z')
            lowerCase++;
        else if(inputValue[i] >= 'A' && inputValue[i] <= 'Z')
            upperCase++;
        else if(inputValue[i] >= '0' && inputValue[i] <= '9'){
            numbers++;
        }else {
            specialChar++;
        }
    }
    if(specialChar < 1 || upperCase < 1) return false;

    return true;
}


function allowOnlyNumbers(event) {
    let keyCode = event.keyCode || event.which;
  
    let allowedKeys = [8, 9, 13, 16, 17, 18, 19, 20, 27, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];
    
    if (!((keyCode >= 48 && keyCode <= 57) || allowedKeys.includes(keyCode))) return false;
    return true;
}


function checkAllInputFields(form) {
    let foundError = false;
    console.log(form);

    const allInputs = document.querySelector(`.${form}`).querySelectorAll(".inputBlocks");
    allInputs.forEach((inputElement, index) => {
        const inputBox = inputElement.querySelector(".inputbox");
        // console.log(inputBox.value);

        if(!inputBox.value) {
            showError(form, inputBox.name, index+1, "field cannot be empty..!");
            foundError = true;
        }
    });
    console.log(foundError);
    return foundError;
}

function saveData() {
    let dataObject = {};

    const formInputsData = document.querySelectorAll(".inputbox");
    formInputsData.forEach((item, index) => {
        const name = item.name;
        const value = item.value;
        dataObject[name] = value;
    });
    const stringData = JSON.stringify(dataObject);
    localStorage.setItem("formData", stringData);

    setTimeout(() => {
        location.href = "display.html";
    }, 2000);
}

function changeStep(buttonClicked) {
    const btn = document.querySelector(".buttonTwo");
    if(btn.innerText === "Save") {
       return saveData();
    }

    if(stepCount === 0 && buttonClicked === "prev") return;
    let formToHide = -1;

    if(buttonClicked === "prev") {
        checkAllInputFields(formMapToSteps[stepCount]);
        formToHide = stepCount;
        stepCount--;
    } else {
        if(checkAllInputFields(formMapToSteps[stepCount])) return;
        formToHide = stepCount;
        stepCount++;
    }

    let selectedForm = formMapToSteps[stepCount];
    const selectedFormElement = document.querySelector(`.${selectedForm}`);
    const formToRemoveElement = document.querySelector(`.${formMapToSteps[formToHide]}`);

    formToRemoveElement.classList.add("hideElement");
    selectedFormElement.classList.remove("hideElement");
}

function disableNextButton() {
    const btn = document.querySelector(".buttonTwo");
    btn.disabled = true;
    btn.style.backgroundColor = "grey";
    btn.style.cursor = "not-allowed";
}

function enableNextButton() {
    const btn = document.querySelector(".buttonTwo");
    btn.disabled = false;
    btn.style.backgroundColor = "#6c5ce7";
    btn.style.cursor = "pointer";
}

function showError(form, name, index, message) {
    console.log(message);
    const inputBlocks = document.querySelector(`.${form}`).querySelectorAll(".inputBlocks");
    const errorElement = inputBlocks[index-1].querySelector("p");
    errorElement.classList.add("error");
    errorElement.innerText = message;
}

function removeError(form, name, index) {
    const inputBlocks = document.querySelector(`.${form}`).querySelectorAll(".inputBlocks");
    const errorElement = inputBlocks[index-1].querySelector("p");
    errorElement.classList.remove("error");
    errorElement.innerText = "";
}

function onlyLettersAllowed(keyCode) {
    let allowedKeys = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];
  
    if (!((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || allowedKeys.includes(keyCode)))
      return false;

    return true;
}

function handleOnChangeFunction(e, form, name, index) {
    const value = e.target.value;
    if(name === "dob") {
        if(!value) {
            formMap[form][index-1] = false;
            showError(form, name, index, "field cannot be empty..!");
        }else {
            removeError(form, name, index);
            formMap[form][index-1] = true;
        }
    }else if(name === "maritalstatus") {
        console.log(value);
        if(!value) {
            formMap[form][index-1] = false;
            showError(form, name, index, "field cannot be empty..!");
        }else {
            removeError(form, name, index);
            formMap[form][index-1] = true;
        }
    }else if(name === "gender") {
        if(!value) {
            formMap[form][index-1] = false;
            showError(form, name, index, "field cannot be empty..!");
        }else {
            removeError(form, name, index);
            formMap[form][index-1] = true;
        }
    } else if(name === "domain") {
        if(!value) {
            formMap[form][index-1] = false;
            showError(form, name, index, "field cannot be empty..!");
        }else {
            removeError(form, name, index);
            formMap[form][index-1] = true;
        }
    }

    let nextButton = true;
    formMap[form].forEach((item, index) => {
        console.log(item);
        if(!item) nextButton = false;
    });

    if(!nextButton) disableNextButton();
    else enableNextButton();

    let changeButtonToSave = true;
    const btn = document.querySelector(".buttonTwo");

    const formInputs = document.querySelector(`.${form}`).querySelectorAll(".inputbox");
    formInputs.forEach((item, index) => {
        console.log(item.value);
        console.log(item);
        if(!item.value) changeButtonToSave = false;
    });
    
    if(form === "formThree" && nextButton && changeButtonToSave) {
        btn.innerText = "Save";
    }else {
        btn.innerText = "Next";
    }
}

function getSpecialCharacters(inputValue) {
    let specialChar = 0, lowerCase=0, numbers = 0, upperCase = 0;
    for(let i=0; i<inputValue.length; i++) {
        if(inputValue[i] >= 'a' && inputValue[i] <= 'z')
            lowerCase++;
        else if(inputValue[i] >= 'A' && inputValue[i] <= 'Z')
            upperCase++;
        else if(inputValue[i] >= '0' && inputValue[i] <= '9'){
            numbers++;
        }else {
            specialChar++;
        }
    }
    return specialChar;
}

function handleInputChange2(e, form, name, index) {
    const inputValue = e.target.value;

    if(name === "firstname" || name === "lastname") {
        if(!inputValue) {
            formMap[form][index-1] = false;
            showError(form, name, index, "field cannot be empty..!");
        }else {
            formMap[form][index-1] = true;
            removeError(form, name, index);
        }
    }else if(name === "phonenumber") {
        if(!allowOnlyNumbers(e)) {
            formMap[form][index-1] = false;
            e.preventDefault();
        }else {
            formMap[form][index-1] = true;
        }
    } else if(name === "work-x") {
        if( !((Number(inputValue) >= 1) && (Number(inputValue) <= 50)) ) {
            formMap[form][index-1] = false;
            showError(form, name, index, "field cannot be empty, only numbers allowed, number less then 50");
        } else {
            formMap[form][index-1] = true;
            removeError(form, name, index);
        }
    } else if(name === "companyname") {
        if(!inputValue) {
            formMap[form][index-1] = false;
            showError(form, name, index, "field cannot be empty..!");
        }else {
            formMap[form][index-1] = true;
            removeError(form, name, index);
        }
    } else if(name === "yearsworked") {
        if( !((Number(inputValue) >= 1) && (Number(inputValue) <= 50)) ) {
            formMap[form][index-1] = false;
            showError(form, name, index, "field cannot be empty, only numbers allowed, number less then 50");
        } else {
            formMap[form][index-1] = true;
            removeError(form, name, index);
        }
    } else if(name === "thingsyouworked") {
        console.log(form, name, index);
        if(!inputValue) {
            formMap[form][index-1] = false;
            showError(form, name, index, "field cannot be empty");
        } else {
            formMap[form][index-1] = true;
            removeError(form, name, index);
        }
    }

    let nextButton = true;
    formMap[form].forEach((item, index) => {
        if(!item) nextButton = false;
    });

    if(!nextButton) disableNextButton();
    else enableNextButton();

    let changeButtonToSave = true;
    const btn = document.querySelector(".buttonTwo");

    const formInputs = document.querySelector(`.${form}`).querySelectorAll(".inputbox");
    formInputs.forEach((item, index) => {
        console.log(item.value);
        console.log(item);
        if(!item.value) changeButtonToSave = false;
    });
    
    if(form === "formThree" && nextButton && changeButtonToSave) {
        btn.innerText = "Save";
    }else {
        btn.innerText = "Next";
    }
}

function handleInputChange(e, form, name, index) {
    const inputValue = e.target.value;
    let keyCode = e.keyCode || e.which;

    if(name === "firstname" || name === "lastname") {
        if(!onlyLettersAllowed(keyCode)) {
            showButton = false; formMap[form][index-1] = false;
            e.preventDefault(); 
        }else {
            formMap[form][index-1] = true;
        }
    }else if(name === "email") {
        if(!inputValue) {
            showError(form, name, index, "field cannot be empty..!");
            formMap[form][index-1] = false;
        } else {
            formMap[form][index-1] = true;
            removeError(form, name, index); 
        }

        if(!checkEmail(inputValue)) {
            formMap[form][index-1] = false;
            showError(form, name, index, "not a valid email..!");
        }else{
            formMap[form][index-1] = true;
            removeError(form, name, index);
        }
    }else if(name === "password") {
        if(!inputValue) {
            showError(form, name, index, "field cannot be empty..!");
            formMap[form][index-1] = false;
        }else {
            formMap[form][index-1] = true;
            removeError(form, name, index);
        }
        if(!customPasswordCheck(inputValue)) {
            formMap[form][index-1] = false;
            showError(form, name, index, "min 8, max 16, one upper case, one special character..!");
        }else{ 
            showButton = true; formMap[form][index-1] = true;
            removeError(form, name, index);
        }
    }else if(name === "phonenumber"){
        if(inputValue !== " " && inputValue.length !== 10) {
            formMap[form][index-1] = false;
            showError(form, name, index, "field cannot be empty, only numbers allowed..!");
        }else {
            showButton = true; formMap[form][index-1] = true;
             removeError(form, name, index);
        }
    }else if(name === "address") {
        if(!inputValue) {
            showError(form, name, index, "field cannot be empty..!"); formMap[form][index-1] = false; 
        }else {
            removeError(form, name, index); formMap[form][index-1] = true;
        }
    }else if(name === "dob") {
        if(!inputValue) {
            showError(form, name, index, "field cannot be empty..!"); formMap[form][index-1] = false; 
        }else {
            removeError(form, name, index); formMap[form][index-1] = true;
        }
    }else if(name === "work-x") {
        if(!allowOnlyNumbers(e)) {
            formMap[form][index-1] = false;
            e.preventDefault(); 
        } else {
            formMap[form][index-1] = true;
        }
    } else if(name === "companyname") {
        if(!onlyLettersAllowed(keyCode)) {
            e.preventDefault(); 
        } else {
            removeError(form, name, index);
        }
    } else if(name === "yearsworked") {
        if(!allowOnlyNumbers(e)) {
            formMap[form][index-1] = false;
            e.preventDefault(); 
        } else {
            formMap[form][index-1] = true;
        }
    }



    let nextButton = true;
    formMap[form].forEach((item, index) => {
        if(!item) nextButton = false;
    });

    if(!nextButton) disableNextButton();
    else
        enableNextButton();

    let changeButtonToSave = true;
    const btn = document.querySelector(".buttonTwo");

    const formInputs = document.querySelector(`.${form}`).querySelectorAll(".inputbox");
    formInputs.forEach((item, index) => {
        console.log(item.value);
        console.log(item);
        if(!item.value) changeButtonToSave = false;
    });
    
    if(form === "formThree" && nextButton && changeButtonToSave) {
        btn.innerText = "Save";
    }else {
        btn.innerText = "Next";
    }
}