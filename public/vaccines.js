var dropdownMenu = document.querySelector(".dropdown-wrapper");
var infoModal = document.getElementById("info-modal");
var vaccineInfo = document.getElementById("vaccine-info");
var addVaccineModal = document.getElementById("add-vaccine-modal");

highlightNavbarButton("vaccines-nav-btn")

/* dropdown menu for table*/
dropdownMenu.addEventListener('change', function() {
    //if dropdown changes to All, reload page since that's the default
    if (dropdownMenu.value == 'All'){
        window.location.href = '/vaccines'
    }

    //forumlate proper get URL
    if (dropdownMenu.value == 'Cats')
        getRequest = '/vaccines/Feline/Vaccines'

    else
        getRequest = '/vaccines/Canine/Vaccines'

    fetchAndReplaceTableRows(getRequest, table, Handlebars.templates.vaccineTableRow)
})


/* Takes info from row selected and creates info modal body */
function loadVaccineModalInfo(vaccineRowInfo) {
    //update modal based on vaccine info
    var rowData = vaccineRowInfo.getElementsByTagName("th");

    var name = rowData[0].firstChild.data;
    var species = rowData[1].firstChild.data;
    var doses = rowData[2].firstChild.data;

    //get all p data elements in modal and update them
    var modalData = document.getElementById("info-modal").getElementsByClassName("data");

    modalData[0].innerText = name;
    modalData[1].innerText = species;

    //update doses separately since it's an input
    document.getElementById("update-doses").placeholder = doses;
}


//on table entry click, load modal with row info
table.addEventListener('click', function (event) {
    //ignore a click on the table header
    if (event.target.parentNode.classList.contains("table-header"))
        return;

    //call a function here to load info into modal
    loadVaccineModalInfo(event.target.parentNode);

    infoModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
})

/* Add a new vaccine */
addNewBtn.addEventListener('click', function() {
    //remove old info
    document.getElementById("name").value = "";
    document.getElementById("doses").value = "";

    addVaccineModal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
})

function getVaccineInput() {
    var name = document.getElementById("name").value
    var doses = document.getElementById("doses").value
    var species = document.getElementById("species-dropdown").value

    var data = {
        name: name,
        doses: doses,
        species: species
    }

     //check if any entries are empty
     for (const [key, value] of Object.entries(data)) {
        if (value.length == 0)
            return null
    }

    return data
}

/* confirm addition of new vaccine */
confirmBtn.addEventListener('click', function() {
    //make sure all required fields are filled
    data = getVaccineInput()

    if (data == null)
        alert("Please fill in all fields")
    else
        postData("/add/Vaccines", data, '/vaccines');
})

updateBtn.addEventListener('click', function() {
    vaccName = document.getElementById("info-modal").getElementsByClassName("data")[0].innerText
    doses = document.getElementById("update-doses").value

    let data = {
        name: vaccName,
        doses: doses
    }

    if (doses == 0 && document.getElementById("update-doses").placeholder != 0)
        alert("There are no changes to update")
    else
        postData("/update/Vaccines", data, '/vaccines')
})

confirmDeleteBtn.addEventListener('click', function(){
    //send query for deletion
    vaccName = document.getElementById("info-modal").getElementsByClassName("data")[0].innerText

    postData('/delete/Vaccines', {name: vaccName}, '/vaccines')
})