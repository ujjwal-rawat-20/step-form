let stepCount = 0;
const formOneDataObj = {};
const formTwoDataObj = {};
const formThreeDataObj = {};
const prevBtn = document.querySelector(".buttonOne");
const dateInput = document.getElementById("dateofbirth");

window.onload = function() {
    prevBtn.style.display = "none";
    
    // let minDate = new Date();
    // minDate.setFullYear(minDate.getFullYear() - 2);
    // let minDateStr = minDate.toISOString().split('T')[0];
    // console.log(dateInput.min);
    // dateInput.min = minDateStr;
}

const formMapToSteps = {  // to identify we are on which form based on the steps:
    0: "formOne",
    1: "formTwo",
    2: "formThree"
}

const formMapToData = {     // which form represents which form data object:
    0: formOneDataObj,
    1: formTwoDataObj,
    2: formThreeDataObj
}

const formOne = [true, true, true, true, true];
const formTwo = [true, true, true, true, true];
const formThree = [true, true, true, true];


const formMap = {       // map to maintain or capture the error on each form
    "formOne": formOne,
    "formTwo": formTwo,
    "formThree": formThree
}

//Regex functions:
function checkEmail(inputValue) {
    if(inputValue === "") return true;

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegex.test(inputValue)) return false;
    return true;
}


function customPasswordCheck(inputValue) {
    if(inputValue.length === 0) return true;
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


function checkAllInputFields(formData, form) {
    let foundError = false;
    
    Object.keys(formData).forEach((item, index) => {
        const key = item;
        if(key === "email") {
            const inputBlock = document.querySelector(`.${form}`).querySelector(`#${key}`);
            const errorElement = inputBlock.nextSibling.nextSibling;
            const inputEamil = formData[key];
            if(!checkEmail(inputEamil)) {
                foundError = true;
                errorElement.classList.add("error");
                errorElement.innerText = "not a valid email";
            } else {
                errorElement.classList.remove("error");
                errorElement.innerText = "";
            }
        } else if(key === "password") {
            const inputBlock = document.querySelector(`.${form}`).querySelector(`#${key}`);
            const errorElement = inputBlock.nextSibling.nextSibling.nextSibling.nextSibling;
            console.log(errorElement);
            const inputPassword = formData[key];
            if(!customPasswordCheck(inputPassword)) {
                foundError = true;
                errorElement.classList.add("error");
                errorElement.innerText = "min 8, max 16, one uppercase, one special character";
            } else {
                errorElement.classList.remove("error");
                errorElement.innerText = "";
            }
        } else if(key === "phonenumber") {
            const inputBlock = document.querySelector(`.${form}`).querySelector(`#${key}`);
            const errorElement = inputBlock.nextSibling.nextSibling;
            const inputPhoneNumber = formData[key];
            if(inputPhoneNumber.length !== 10) {
                foundError = true;
                errorElement.classList.add("error");
                errorElement.innerText = "10 digits needed..!";
            } else {
                errorElement.classList.remove("error");
                errorElement.innerText = "";
            }
        } else if(key === "address") {
            const inputBlock = document.querySelector(`.${form}`).querySelector(`#${key}`);
            const errorElement = inputBlock.nextSibling.nextSibling;
            const inputAddress = formData[key];
            if(!inputAddress) {
                foundError = true;
                errorElement.classList.add("error");
                errorElement.innerText = "Field cannot be empty..!";
            } else {
                errorElement.classList.remove("error");
                errorElement.innerText = "";
            }
        } else if(key === "workexperience") {
            const inputBlock = document.querySelector(`.${form}`).querySelector(`#${key}`);
            const errorElement = inputBlock.nextSibling.nextSibling;
            const inputAddress = formData[key];
            if( !((Number(inputAddress) >= 1) && (Number(inputAddress) <= 50)) ) {
                foundError = true;
                errorElement.classList.add("error");
                errorElement.innerText = "field cannot be empty, only numbers allowed, number less then 50";
            } else {
                foundError = false;
                errorElement.classList.remove("error");
                errorElement.innerText = "";
            }
        } else if(key === "yearsworked") {
            const inputBlock = document.querySelector(`.${form}`).querySelector(`#${key}`);
            const errorElement = inputBlock.nextSibling.nextSibling;
            const inputAddress = formData[key];
            if( !((Number(inputAddress) >= 1) && (Number(inputAddress) <= 50)) ) {
                foundError = true;
                errorElement.classList.add("error");
                errorElement.innerText = "field cannot be empty, only numbers allowed, number less then 50";
            } else {
                foundError = false;
                errorElement.classList.remove("error");
                errorElement.innerText = "";
            }
        }
    });

    return foundError;
}

function saveData() {
    console.log("saving data...");
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
        const fOne = document.querySelector("#formOne");
        const fTwo = document.querySelector("#formTwo");
        const fThree = document.querySelector("#formThree");
        fOne.reset(); fTwo.reset(); fThree.reset();

        location.href = "display.html";
    }, 2000);
}

function changeStep(buttonClicked) {
    console.log(stepCount);
    const btn = document.querySelector(".buttonTwo");
    if(buttonClicked !== "prev" && btn.innerText === "Save" && stepCount === 2)
        return saveData();

    if(stepCount === 0 && buttonClicked === "prev") {
        return;
    }
    let formToHide = -1;

    if(buttonClicked === "prev") {
        formToHide = stepCount;
        stepCount--;
        if(stepCount === 2) 
            btn.innerText = "Save";
        else
         btn.innerHTML = "Next";
    } else {
        if(checkAllInputFields(formMapToData[stepCount], formMapToSteps[stepCount])) return;
        formToHide = stepCount;
        stepCount++;
        if(stepCount === 2) 
            btn.innerText = "Save";
        else
            btn.innerHTML = "Next";
    }
    let selectedForm = formMapToSteps[stepCount];
    const selectedFormElement = document.querySelector(`.${selectedForm}`);
    const formToRemoveElement = document.querySelector(`.${formMapToSteps[formToHide]}`);

    formToRemoveElement.classList.add("hideElement");
    selectedFormElement.classList.remove("hideElement");

    if(stepCount === 0) {
        prevBtn.style.display = "none";
    }else {
        prevBtn.style.display = "block";
    }

    // to disable the next button if all the values of the current form are empty:
    const currentForm = formMapToSteps[stepCount];
    let errorFound = false;

    const allInputs = document.querySelector(`.${currentForm}`).querySelectorAll(".inputBlocks");
    allInputs.forEach((inputElement, index) => {
        const inputBox = inputElement.querySelector(".inputbox");
        if(inputBox.value === "" || inputBox.value === undefined || inputBox.value === null)
            errorFound = true;
    });

    if(errorFound) {
        btn.disabled = true;
        btn.style.backgroundColor = "grey";
        btn.style.cursor = "not-allowed";
    }else {
        btn.disabled = false;
        btn.style.backgroundColor = "blue";
        btn.style.cursor = "pointer";
    }
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
    let keyCode = e.keyCode || e.which;
    console.log(keyCode);
    
    if(name === "maritalstatus") {
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

    // let nextButton = true;
    // formMap[form].forEach((item, index) => {
    //     console.log(item);
    //     if(!item) nextButton = false;
    // });

    // if(!nextButton) disableNextButton();
    // else enableNextButton();

    // let changeButtonToSave = true;
    // const btn = document.querySelector(".buttonTwo");

    // const formInputs = document.querySelector(`.${form}`).querySelectorAll(".inputbox");
    // formInputs.forEach((item, index) => {
    //     if(!item.value) changeButtonToSave = false;
    // });
    
    // if(form === "formThree" && nextButton && changeButtonToSave) {
    //     btn.innerText = "Save";
    // } else {
    //     btn.innerText = "Next";
    // }
}


function handleInputChange2(e, form, name, index) { // after key registration:
    const inputValue = e.target.value;
    let keyCode = e.keyCode || e.which;

    if(name === "phonenumber") {
        removeError(form, name, index);
        if(keyCode === 32) e.preventDefault();
        if(!allowOnlyNumbers(e)) e.preventDefault();
    } else if(name === "work-x") {
        removeError(form, name, index);
    } else if(name === "companyname") {

    } else if(name === "yearsworked") {
        removeError(form, name, index);
    } else if(name === "thingsyouworked") {

    } else if(name === "password") {
        removeError(form, name, index);
        if(keyCode === 32) e.preventDefault();
    } else if(name === "email") {
        removeError(form, name, index);
        if(keyCode === 32) e.preventDefault();
    } else if(name === "firstname" || name === "lastname") {
        if(!onlyLettersAllowed(keyCode)) e.preventDefault();
    } else if(name === "address") {
        removeError(form, name, index);
    }

    // let nextButton = true;
    // formMap[form].forEach((item, index) => {
    //     if(!item) nextButton = false;
    // });

    // if(!nextButton) disableNextButton();
    // else enableNextButton();

    // let changeButtonToSave = true;
    // const btn = document.querySelector(".buttonTwo");

    // const formInputs = document.querySelector(`.${form}`).querySelectorAll(".inputbox");
    // formInputs.forEach((item, index) => {
    //     if(!item.value) changeButtonToSave = false;
    // });
    
    // if(form === "formThree" && nextButton && changeButtonToSave) {
    //     btn.innerText = "Save";
    // }else {
    //     btn.innerText = "Next";
    // }
}

function handleInputChange(e, form, name, index) {
    const inputValue = e.target.value;
    let keyCode = e.keyCode || e.which;

    if(name === "firstname" || name === "lastname") {
        if(!onlyLettersAllowed(keyCode)) e.preventDefault();
    } else if(name === "work-x") {
        if(!allowOnlyNumbers(e)) {
            e.preventDefault(); 
        }
    } else if(name === "companyname") {
        if(!onlyLettersAllowed(keyCode)) {
            e.preventDefault(); 
        }
    } else if(name === "yearsworked") {
        if(!allowOnlyNumbers(e)) {
            e.preventDefault(); 
        }
    }


    // let nextButton = true;
    // formMap[form].forEach((item, index) => {
    //     if(!item) nextButton = false;
    // });

    // if(!nextButton) disableNextButton();
    // else
    //     enableNextButton();

    // let changeButtonToSave = true;
    // const btn = document.querySelector(".buttonTwo");

    // const formInputs = document.querySelector(`.${form}`).querySelectorAll(".inputbox");
    // formInputs.forEach((item, index) => {
    //     if(!item.value) changeButtonToSave = false;
    // });
    
    // if(form === "formThree" && nextButton && changeButtonToSave) {
    //     btn.innerText = "Save";
    // }else {
    //     btn.innerText = "Next";
    // }
}


function handleFormChange(e) {
    let errorFound = false;

    const btn = document.querySelector(".buttonTwo");
    const inputs = e.srcElement.form.querySelectorAll(".inputbox");

    inputs.forEach((value, index) => {
        formMapToData[stepCount][value.name] = value.value;
    });

    Object.keys(formMapToData[stepCount]).forEach((value, index) => {
        if(!formMapToData[stepCount][value])
            errorFound = true;
    });

    if(errorFound) {
        btn.disabled = true;
        btn.style.backgroundColor = "grey";
        btn.style.cursor = "not-allowed";
        // btn.classList.remove("btnEnable");
        // btn.classList.add("btnDisable");
    }else {
        btn.disabled = false;
        btn.style.backgroundColor = "blue";
        btn.style.cursor = "pointer";
    }

}

function togglePassword() {
    const passwordField = document.querySelector(".formOne").querySelector("#password");
    const passowrdType = passwordField.type;
    if(passowrdType === "password") passwordField.setAttribute("type", "text");
    else passwordField.setAttribute("type", "password");
}