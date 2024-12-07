var infoModal = document.getElementById("info-modal");
var table = document.getElementsByTagName("table")[0];
var addNewAnimalBtn = document.getElementById("add-animal-btn");
var confirmAnimalBtn = document.getElementById("confirm-animal-btn");
var deleteAnimalBtn = document.getElementById("delete-animal-btn");
var animalDropdown = document.getElementById("animal-dropdown");
var addAnimalModal = document.getElementById("add-animal-modal");
var newAnimalPicInput = document.getElementById("picURL");
var updateAnimalBtn = document.getElementById("update-animal-btn")


highlightNavbarButton("animals-nav-btn")

animalDropdown.addEventListener('change', function() {
    var getRequest

    //if dropdown changes to All, reload page since that's the default
    if (animalDropdown.value == 'All'){
        window.location.href = '/animals'
    }

    //forumlate proper get URL
    if (animalDropdown.value == 'Adopted')
        getRequest = '/adopted/Animals'

    else if (animalDropdown.value == 'Fostered')
        getRequest = '/fostered/Animals'

    else
        getRequest = '/adoptable'


    fetchAndReplaceTableRows(getRequest, table, Handlebars.templates.animalTableRow)
})

addNewAnimalBtn.addEventListener('click', function() {
    //clear existing info
    document.getElementById("name").value  = ""
    document.getElementById("breed").value = ""
    document.getElementById("age").value = ""
    document.getElementById("picURL").value = ""
    document.getElementById("i-restrictions").value = ""

    //remove any existing images
    var imgWrapper = document.getElementById("add-animal-img")

    while (imgWrapper.firstChild) {
        imgWrapper.removeChild(imgWrapper.firstChild);
    }

    addAnimalModal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
})

/* get input from input modal, return null if required fields are not filled, 
    return data otherwise */
function getAnimalInput() {
    //get animal data
    var name = document.getElementById("name").value
    var species = document.getElementById("species-dropdown").value
    var breed = document.getElementById("breed").value
    var age = document.getElementById("age").value
    var gender = document.getElementById("gender-dropdown").value
    var picURL = document.getElementById("picURL").value
    var adoptable = document.getElementById("i-adoptable-dropdown").value
    var restrictions = document.getElementById("i-restrictions").value

    //make sure all required fields are filled (restrictions is not required)
    var inputs = document.getElementById("add-animal-modal").getElementsByTagName("input")

    for (let x = 0; x < inputs.length - 1; x++) {
        if (inputs[x].value == "")
            return null
    }

    let data = {
        species: species,
        animalName: name,
        age: age,
        gender: gender,
        breed: breed,
        pictureURL: picURL,
        adoptable: adoptable,
        restrictions: restrictions
    }

    return data
}

/* get animal data to send to database */
confirmAnimalBtn.addEventListener('click', async function() {
    
    var animalData = getAnimalInput()

    if (animalData == null)
        alert("Please fill in all fields")
    
    else {
        //send request to add animal to database
        postData("/add/Animals", animalData, '/animals');
    }  
})


/* load animal picture in add animal modal */
newAnimalPicInput.addEventListener('focusout', function() {

    // if no text was input, don't do anything
    if (newAnimalPicInput.value.length == 0)
        return;

    // otherwise, load pic onto modal
    var newAnimalPic = document.createElement("img")
    newAnimalPic.classList.add("animal-modal-img")
    newAnimalPic.src = newAnimalPicInput.value

    var imgWrapper = document.getElementById("add-animal-img")

    //remove any existing images before adding another
    while (imgWrapper.firstChild) {
        imgWrapper.removeChild(imgWrapper.firstChild);
    }

    imgWrapper.append(newAnimalPic)
})

/* Takes info from row selected and creates info modal body */
function loadAnimalModalInfo(animalRowInfo) {
    //update modal based on animal info
    var rowData = animalRowInfo.getElementsByTagName("th");

    var aid = rowData[0].firstChild.data;
    var species = rowData[1].firstChild.data;
    var breed = rowData[2].firstChild.data;
    var name = rowData[3].firstChild.data;
    var age = rowData[4].firstChild.data;
    var gender = rowData[5].firstChild.data;
    var picURL = rowData[6].firstChild.href;
    var restrictions = "N/A";
    var adoptable = "No";

    //get all p data elements in modal and update them
    var modalData = document.getElementsByClassName("data");

    modalData[0].innerText = aid;
    modalData[1].innerText = species;
    modalData[2].innerText = breed;
    modalData[3].innerText = name;
    modalData[4].innerText = age;
    modalData[5].innerText = gender;

    //send query request to get animal's adoptable status
    fetch("/adoptable/" + aid)
        .then((response) => {
            return response.json();
        })
            .then((data) => {
                if (data[0].restrictions != "N/A"){
                    adoptable = "Yes"
                    restrictions = data[0].restrictions
                }
                
                modalData[6].value = adoptable;
                modalData[7].value = restrictions;   
            })
        .catch(function(error) {
            console.log(error);
    });
    
    document.getElementById("info-modal").querySelector(".animal-modal-img").src = picURL
}


/* delete an animal from the database */
deleteAnimalBtn.addEventListener('click', function(even) {
    deleteModal.classList.remove('hidden');
    deleteModalBackdrop.classList.remove('hidden');
})

confirmDeleteBtn.addEventListener('click', function(){
    //send query for deletion
    var aID = document.getElementsByClassName("data")[0].innerText;

    postData('/delete/Animals', {animalID: aID}, '/animals')
})


updateAnimalBtn.addEventListener('click', function(){
    var aID = infoModal.getElementsByClassName("data id")[0].innerText
    var adoptable = document.getElementById("adoptable-dropdown").value
    var restrictions = document.getElementById("restrictions").value

    let adoptData = {
        animalID: aID,
        adoptable: adoptable,
        restrictions: restrictions
    }

    postData('update-adoptable', adoptData, '/animals');
})


//on table entry click, load modal with row info
table.addEventListener('click', function (event) {
    //ignore a click on the table header
    if (event.target.parentNode.classList.contains("table-header"))
        return;

    //call a function here to load info into modal
    loadAnimalModalInfo(event.target.parentNode);

    infoModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
})