var dropdownMenu = document.querySelector(".dropdown-wrapper");
var infoModal = document.getElementById("info-modal");
var prescInfo = document.getElementById("patron-info");
var addPrescModal = document.getElementById("add-prescription-modal");
var prescNameDropdown = document.getElementById("name-dropdown");


highlightNavbarButton("prescriptions-nav-btn")

/* dropdown menu for table*/
dropdownMenu.addEventListener('change', function() {
    //if dropdown changes to All, reload page since that's the default
    if (dropdownMenu.value == 'All'){
        window.location.href = '/prescriptions'
    }

    //forumlate proper get URL
    if (dropdownMenu.value == 'Cats')
        getRequest = '/vaccines/Feline/Prescriptions'

    else
        getRequest = '/vaccines/Canine/Prescriptions'

    fetchAndReplaceTableRows(getRequest, table, Handlebars.templates.prescriptionTableRow)
})


/* Takes info from row selected and creates info modal body */
function loadPrescriptionModalInfo(prescriptionRowInfo) {
    //update modal based on patron info
    var rowData = prescriptionRowInfo.getElementsByTagName("th");

    var aID = rowData[0].firstChild.data;
    var aName = rowData[1].firstChild.data;
    var pName = rowData[2].firstChild.data;
    var freq = rowData[3].firstChild.data;
    var picURL = rowData[4].firstChild.href;

    //get all p data elements in modal and update them
    var modalData = document.getElementsByClassName("data");

    modalData[0].innerText = aID;
    modalData[1].innerText = aName;
    modalData[2].innerText = pName;
    modalData[3].innerText = freq;
    
    document.getElementById("info-modal").querySelector(".animal-modal-img").src = picURL
}


//on table entry click, load modal with row info
table.addEventListener('click', function (event) {
    //ignore a click on the table header
    if (event.target.parentNode.classList.contains("table-header"))
        return;

    //call a function here to load info into modal
    loadPrescriptionModalInfo(event.target.parentNode);

    infoModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
})

function getPrescriptionInput() {
    animalID = document.getElementById("name-dropdown").value;
    pName = document.getElementById("prescription").value;
    frequency = document.getElementById("frequency").value;

    var data = {
        animalID: animalID,
        name: pName,
        frequency: frequency
    }

     //check if any entries are empty
     for (const [key, value] of Object.entries(data)) {
        if (value.length == 0)
            return null
    }

    return data
}

/* add new prescription */
addNewBtn.addEventListener('click', function() {
    //remove old info
    document.getElementById("name-dropdown").value = "";
    addPrescModal.getElementsByClassName("data id")[0].innerHTML = "0";
    document.getElementById("prescription").value = "";
    document.getElementById("frequency").value = "";

    //remove any existing images
    var imgWrapper = addPrescModal.querySelector(".animal-img-wrapper")
    
    while (imgWrapper.firstChild) {
        imgWrapper.removeChild(imgWrapper.firstChild);
    }

    //addPrescModal.querySelector(".animal-modal-img").src = ""

    addPrescModal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
})


/* confirm addition of new prescription */
confirmBtn.addEventListener('click', function() {
    //make sure all required fields are filled
    data = getPrescriptionInput()

    if (data == null)
        alert("Please fill in all fields")
    else
        postData("/add/Prescriptions", data, '/prescriptions');
})

/* When adding a new prescription, if the dropdown animal changes, update animal ID
    and animal picture */
prescNameDropdown.addEventListener('change', function() {

    aID = prescNameDropdown.value;


    //remove any existing images
    var imgWrapper = addPrescModal.querySelector(".animal-img-wrapper")
        
    while (imgWrapper.firstChild) {
        imgWrapper.removeChild(imgWrapper.firstChild);
    }

    if (prescNameDropdown.value == ""){
        addPrescModal.getElementsByClassName("data id")[0].innerHTML = "0";
    }
    
    else {

        addPrescModal.getElementsByClassName("data id")[0].innerHTML = aID;
        
        //send query request to get animal's picture
        fetch("/animals/" + aID)
        .then((response) => {
            return response.json();
        })
            .then((data) => {
                if (data[0].animalID != "N/A"){
                    //load pic onto modal
                    var newAnimalPic = document.createElement("img")
                    newAnimalPic.classList.add("animal-modal-img")
                    newAnimalPic.src = data[0].pictureURL
                    imgWrapper.append(newAnimalPic)
                } 
            })
        .catch(function(error) {
            console.log(error);
        });
    }
})

confirmDeleteBtn.addEventListener('click', function(){
    //send query for deletion
    
    aID = document.getElementById("info-modal").getElementsByClassName("data")[0].innerText
    pName = document.getElementById("info-modal").getElementsByClassName("data")[2].innerText

    postData('/delete/Prescriptions', {animalID: aID, name: pName}, '/prescriptions')
})