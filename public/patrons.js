var dropdownMenu = document.querySelector(".dropdown-wrapper");
var infoModal = document.getElementById("info-modal");
var addPatronModal = document.getElementById("add-patron-modal");

highlightNavbarButton("patrons-nav-btn")

addNewBtn.addEventListener('click', function() {
    //remove old info
    var inputs = document.getElementsByTagName("input")

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = ""
        inputs[i].placeholder = ""
    }

    //pull up model
    document.getElementsByClassName("label id")[0].classList.add("hidden")
    document.getElementsByClassName("data id")[0].classList.add("hidden")
    confirmBtn.classList.remove("hidden")
    updateBtn.classList.add("hidden")
    deleteBtn.classList.add("hidden")
    infoModal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
})


/* When given an input element, returns placeholder if value is 
    empty, otherwise returns value */
function getInputValue(element) {
    //if field is empty, use placeholder
    if (element.value.length == 0)
        return element.placeholder

    //otherwise return the value that has been input
    else
        return element.value
}

/* TODO: reduce code duplication */
document.getElementById("phone1").oninput = function() {
    if (this.value.length > 3) {
        this.value = this.value.slice(0, 3); 
    }
}

document.getElementById("phone2").oninput = function() {
    if (this.value.length > 3) {
        this.value = this.value.slice(0, 3); 
    }
}

document.getElementById("phone3").oninput = function() {
    if (this.value.length > 4) {
        this.value = this.value.slice(0, 4); 
    }
}

function getPatronInput() {
    var firstName = getInputValue(document.getElementById("fname"));
    var lastName = getInputValue(document.getElementById("lname"));
    var address = getInputValue(document.getElementById("address"));
    var phone1 = getInputValue(document.getElementById("phone1"));
    var phone2 = getInputValue(document.getElementById("phone2"));
    var phone3 = getInputValue(document.getElementById("phone3"));
    
    var data = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone1.toString() + "-" + phone2.toString() + "-" + phone3.toString(),
        address: address
    } 

    //check if any entries are empty
    for (const [key, value] of Object.entries(data)) {
        if (value.length == 0)
            return null
        if (key == "phone" && value.length < 12)
            return null
    }

    return data
}

confirmBtn.addEventListener('click', function() {
    data = getPatronInput()

    if (data == null)
        alert("Please fill in all fields")
    
    else {
        //send request to add patron to database
        postData("/add/Patrons", data, '/patrons');
    }
})


/* When update button is pushed, grabs all values
    to update database with */
updateBtn.addEventListener('click', function() {
    var pID = document.getElementsByClassName("data id")[0].innerText;
    data = getPatronInput()

    data.patronID = pID

    //send query for update
    postData('/update/Patrons', data, '/patrons')
})

dropdownMenu.addEventListener('change', function() {
    var getRequest

    //if dropdown changes to All, reload page since that's the default
    if (dropdownMenu.value == 'All'){
        window.location.href = '/patrons'
    }

    //forumlate proper get URL
    if (dropdownMenu.value == 'Adopters')
        getRequest = '/adopted/Patrons'

    else
        getRequest = '/fostered/Patrons'


    fetchAndReplaceTableRows(getRequest, table, Handlebars.templates.patronTableRow)
})


/* Takes info from row selected and creates info modal body */
function loadPatronModalInfo(patronRowInfo) {
    //remove old info
    var inputs = document.getElementsByTagName("input")

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = ""
        inputs[i].placeholder = ""
    }

    //update modal based on patron info
    var rowData = patronRowInfo.getElementsByTagName("th");

    var pid = rowData[0].firstChild.data;
    var fName = rowData[1].firstChild.data;
    var lName = rowData[2].firstChild.data;
    var pNum = rowData[3].firstChild.data;
    var address = rowData[4].firstChild.data;

    //split phone number to place in info modal
    var phone1 = parseInt(pNum.slice(0, 3))
    var phone2 = parseInt(pNum.slice(4, 7))
    var phone3 = parseInt(pNum.slice(8, pNum.length))

    document.getElementsByClassName("data id")[0].innerText = pid;
    document.getElementById("fname").placeholder = fName;
    document.getElementById("lname").placeholder = lName;

    document.getElementById("phone1").placeholder = phone1;
    document.getElementById("phone2").placeholder = phone2;
    document.getElementById("phone3").placeholder = phone3;

    document.getElementById("address").placeholder = address;
}


//on table entry click, load modal with row info
table.addEventListener('click', function (event) {
    //ignore a click on the table header
    if (event.target.parentNode.classList.contains("table-header"))
        return;

    //call a function here to load info into modal
    loadPatronModalInfo(event.target.parentNode);

    document.getElementsByClassName("label id")[0].classList.remove("hidden")
    document.getElementsByClassName("data id")[0].classList.remove("hidden")
    confirmBtn.classList.add("hidden")
    updateBtn.classList.remove("hidden")
    deleteBtn.classList.remove("hidden")
    infoModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
})


/* delete a patron from the database */
deleteBtn.addEventListener('click', function(even) {
    deleteModal.classList.remove('hidden');
    deleteModalBackdrop.classList.remove('hidden');
})

confirmDeleteBtn.addEventListener('click', function(){
    //send query for deletion
    var pID = document.getElementsByClassName("data id")[0].innerText;
    postData('/delete/Patrons', {patronID: pID}, '/patrons')
})