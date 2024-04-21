
function encryptPassword(inputValue) {
    let str = inputValue;
    return str.slice(inputValue.length-3, inputValue.length);
}

window.onload = () => {
    const formData = localStorage.getItem('formData');
    const dataParent = document.querySelector(".formDataContainer");
    const retrievedObject = JSON.parse(formData);

    Object.keys(retrievedObject).forEach(key => {
        const dataBlock = document.createElement("div");
        const dataLabel = document.createElement("p");
        const data = document.createElement("p");

        dataLabel.innerText = key;
        dataLabel.classList.add("dataLabel");

        if(key === "password") {
           let str = encryptPassword(retrievedObject[key]);
           let starString = "";
           for(let i=1; i<=(retrievedObject[key].length)-3; i++) {
                starString += "*";
           }
           data.innerText = starString + str;
        }else {
            data.innerText = retrievedObject[key];
        }
        data.classList.add("data");

        dataBlock.append(dataLabel, data);
        dataBlock.classList.add("dataBlock");
        dataParent.appendChild(dataBlock); 
    });
};