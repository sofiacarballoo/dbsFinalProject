var logoBtn = document.getElementById("logo-btn");
var navBarBtns = document.getElementById("nav-links").getElementsByTagName("button");
var table = document.getElementsByTagName("table")[0];
var closeModalBtns = document.querySelectorAll(".close-modal-btn");
var modalBackdrop = document.getElementById("modal-backdrop");
var cancelDeleteBtn = document.getElementById("cancel-delete")
var deleteModalBackdrop = document.getElementById("delete-modal-backdrop");
var modalBackdrop = document.getElementById("modal-backdrop");
var deleteModal = document.getElementById("delete-modal")
var confirmDeleteBtn = document.getElementById("confirm-delete")
var confirmBtn = document.getElementById("confirm-btn")
var addNewBtn = document.getElementById("add-btn")
var updateBtn = document.getElementById("update-btn")
var deleteBtn = document.getElementById("delete-btn")

logoBtn.addEventListener('click', function() {
    window.location.href='/';
})

/* highlights requested navbar button to indicate current page */
function highlightNavbarButton(bID) {
    navBtn = document.getElementById(bID);
    navBtn.classList.add("active");
}

/* post data to requested url and reload page after */
async function postData(url, data, reload) {
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    }).then(() => {
        if(reload)
            window.location.href = reload
    })  
}

/* fetch requested data and replace table rows with it */
function fetchAndReplaceTableRows(getRequest, table, hbTemplate) {
    //remove all animal data from table
    for(let i = 1; i < table.rows.length;){
        table.deleteRow(i);
    }

    //fetch requested animal data from server and fill table
    fetch(getRequest)
    .then((response) => {
        return response.json();
    })
        .then((data) => {
            for (let i = 0; i < data.length; i++){
                var newRow = hbTemplate(data[i])
                table.getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeend', newRow)
            }
        })
    .catch(function(error) {
        console.log(error);
    });
}

/* Add an event listener to load all buttons on navbar */
for(let i = 0; i < navBarBtns.length; i++) {
    //add event listener to the button to load file when clicked
    navBarBtns[i].addEventListener('click', function() {
        //get button name without "-nav-btn"
        var btnName = (navBarBtns[i].id).split("-");
        
        //turn it into html file name and load it
        window.location.href="./" + btnName[0];
    })
}

if(closeModalBtns){
    for(let i = 0; i < closeModalBtns.length; i++) {
        closeModalBtns[i].addEventListener('click', function(event){
        event.target.parentNode.parentNode.parentNode.classList.add('hidden')
        modalBackdrop.classList.add('hidden');
})}}

if(cancelDeleteBtn){
    cancelDeleteBtn.addEventListener('click', function(){
        deleteModal.classList.add('hidden');
        deleteModalBackdrop.classList.add('hidden');
})}

if(deleteBtn){
    deleteBtn.addEventListener('click', function() {
        deleteModal.classList.remove('hidden');
        deleteModalBackdrop.classList.remove('hidden');
})}

//return a date formated as MMM D, YYYY into MM-DD-YYYY
function formatDate(date) {
    dateEnd = 5

    if (date.length == 12)
        dateEnd = 6

    let month = date.slice(0, 3)
    let day = date.slice(4, dateEnd)
    let year = date.slice(dateEnd + 2, date.length)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    month = months.indexOf(month) + 1;

    if (day < 10)
        day = "0" + day.toString()
    else
        day = day.toString()

    if (month < 10)
        month = "0" + month.toString()
    else
        month = month.toString()

    newDate = year.toString() + "-" + month + "-" + day

    return newDate
}