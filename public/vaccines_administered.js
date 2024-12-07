var dropdownMenu = document.querySelector(".dropdown-wrapper");
var closeModalBtn = document.getElementById("close-modal-btn");
var infoModal = document.getElementById("info-modal");
var table = document.getElementsByTagName("table")[0];
var vaccineInfo = document.getElementById("patron-info");
var addVaccNameDropdown = document.getElementById("name-dropdown");
var vaccineDD = document.getElementById("vaccine-dropdown")

var tempData = {
    animalID: 0,
    vaccineID: 0,
    vaccineName: "",
    dateGiven: "",
    dateExpires: ""
}

highlightNavbarButton("vaccines_administered-nav-btn")

/* dropdown menu for table*/
dropdownMenu.addEventListener('change', function() {
    
    //if dropdown changes to All, reload page since that's the default
    if (dropdownMenu.value == 'All'){
        window.location.href = '/vaccines_administered'
    }

    //forumlate proper get URL
    if (dropdownMenu.value == 'Cats')
        getRequest = '/vaccines/Feline/VaccinesAdministered'

    else
        getRequest = '/vaccines/Canine/VaccinesAdministered'

    fetchAndReplaceTableRows(getRequest, table, Handlebars.templates.vaccines_administeredTableRow)
})

/* Takes info from row selected and creates info modal body */
function loadVaccineModalInfo(vaccineRowInfo) {
    //update modal based on info
    var rowData = vaccineRowInfo.getElementsByTagName("th");

    var aID = rowData[0].id;
    var vID = rowData[1].id;
    var vName = rowData[1].firstChild.data;
    var dateGiven = formatDate(rowData[2].firstChild.data);
    var dateExpires = formatDate(rowData[3].firstChild.data);

    //store the aID and vName in case user wants to update
    tempData.animalID = aID
    tempData.vaccineID = vID
    tempData.vaccineName = vName
    tempData.dateGiven = dateGiven
    tempData.dateExpires = dateExpires

    //update animal info in modal
    document.getElementsByClassName("data id")[0].innerText = aID;
    document.getElementById("name-dropdown").value = aID;
    document.getElementById("vaccine-dropdown").value = vID;
    document.getElementById("date-given").value = dateGiven;
    document.getElementById("date-expires").value = dateExpires;

    //send query request to get animal's picURL
    fetch("/animals/" + aID)
        .then((response) => {
            return response.json();
        })
            .then((data) => {
                if (data[0].animalID != "N/A"){
                    document.getElementById("info-modal").querySelector(".animal-modal-img").src = data[0].pictureURL
                } 
            })
        .catch(function(error) {
            console.log(error);
    });
}


//on table entry click, load modal with row info
table.addEventListener('click', function (event) {
    //ignore a click on the table header
    if (event.target.parentNode.classList.contains("table-header"))
        return;

    //call a function here to load info into modal
    loadVaccineModalInfo(event.target.parentNode);

    confirmBtn.classList.add("hidden");
    updateBtn.classList.remove("hidden");
    deleteBtn.classList.remove("hidden");
    infoModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
})

/* add new vaccine */
addNewBtn.addEventListener('click', function() {
    //remove old info
    document.getElementById("name-dropdown").value = "";
    document.getElementsByClassName("data id")[0].innerHTML = "0";
    document.getElementById("vaccine-dropdown").value = "";
    document.getElementById("date-given").value = "";
    document.getElementById("date-expires").value = "";

    //remove any existing images
    var imgWrapper = document.querySelector(".animal-img-wrapper")
    
    while (imgWrapper.firstChild) {
        imgWrapper.removeChild(imgWrapper.firstChild);
    }

    confirmBtn.classList.remove("hidden")
    updateBtn.classList.add("hidden")
    deleteBtn.classList.add("hidden")
    infoModal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
})

/* When adding a new vaccine, if the dropdown animal changes, update animal ID
    and animal picture */
addVaccNameDropdown.addEventListener('change', function() {

    //remove any existing images
    var imgWrapper = document.querySelector(".animal-img-wrapper")
        
    while (imgWrapper.firstChild) {
        imgWrapper.removeChild(imgWrapper.firstChild);
    }

    if (addVaccNameDropdown.value == ""){
        document.getElementsByClassName("data id")[0].innerHTML = "0";
    }
    
    else {
        aID = addVaccNameDropdown.value;
        document.getElementsByClassName("data id")[0].innerHTML = aID;

        //send query request to get animal's picURL
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

/* get input from add modal, return null if required fields are not filled, 
    return data otherwise */
function getVaccineAdministeredInput() {
    //get animal data
    var aID = addVaccNameDropdown.value
    var vaccName = vaccineDD.options[vaccineDD.selectedIndex].text
    var vaccID = vaccineDD.value
    var dateGiven = document.getElementById("date-given").value
    var dateExpires = document.getElementById("date-expires").value


    if (aID == "" || vaccName == "" || dateGiven == "" || dateExpires == "")
        return null

    let data = {
        animalID: aID,
        vaccineName: vaccName,
        vaccineID: vaccID,
        dateGiven: dateGiven,
        dateExpires: dateExpires
    }

    return data
}

confirmBtn.addEventListener('click', function() {
    var data = getVaccineAdministeredInput()

    if (data == null)
        alert("Please fill in all fields")
    
    else {
        //send request to add animal to database
        postData("/add/VaccinesAdministered", data, '/vaccines_administered');
    }  
})


updateBtn.addEventListener('click', function () {
    var data = getVaccineAdministeredInput()

    if (data == null)
        alert("Please fill in all fields")

    //no need to update if they didn't change any data
    else if (JSON.stringify(tempData) === JSON.stringify(data))
        alert("No data was changed to update")
    
    //if animal/vaccine changed, need to delete old one and add new one
    else if(data.animalID != tempData.animalID || data.vaccineName != tempData.vaccineName) {
        postData('/delete/VaccinesAdministered', tempData, null)
        postData("/add/VaccinesAdministered", data, '/vaccines_administered');
    }

    //if animal/vaccine are the same, send update for dates
    else {
        postData("/update/VaccinesAdministered", data, '/vaccines_administered');
    }  
})


/* delete an animal from the database */
deleteBtn.addEventListener('click', function(even) {
    deleteModal.classList.remove('hidden');
    deleteModalBackdrop.classList.remove('hidden');
})

confirmDeleteBtn.addEventListener('click', function(){
    //send query for deletion
    var aID = document.getElementById("name-dropdown").value;
    var vName = vaccineDD.options[vaccineDD.selectedIndex].text;

    let data = {
        animalID: aID, 
        vaccineName: vName
    }

    postData('/delete/VaccinesAdministered', data, '/vaccines_administered')
})