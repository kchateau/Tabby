var url_storage = {}; //For saving/loading URL's
const URL_list = "urllist"

//runs when chrome extension is loaded - use to load in URL's from storage
window.onload=function(){
  chrome.storage.local.get(URL_list, function(storage){
    if(storage[URL_list] == null){
      url_storage[URL_list] = [];
    };
    url_storage = storage;

    for(var url of url_storage[URL_list]){
      var table = document.getElementById("url_list");
      var row = table.insertRow();
      var url_cell = row.insertCell(0);
      url_cell.id = "url_id"
      var delete_button_cell = row.insertCell(1);

      //get url to be added to table
      // var new_url = document.getElementById("to_add").value;

      deleteButton = createDeleteButton();

      url_cell.innerHTML = (url);
      delete_button_cell.appendChild(deleteButton);
    }
  });
}

//Add URL to list
function addUrl(){
    //Find table and create row and cells for url and delete button
    // TODO: make following into a function
    var table = document.getElementById("url_list");
    var row = table.insertRow();
    var url_cell = row.insertCell(0);
    url_cell.id = "url_id"
    var delete_button_cell = row.insertCell(1);

    //get url to be added to table
    var new_url = document.getElementById("to_add").value;

    deleteButton = createDeleteButton();

    // FIXME: Check if URL is in correct format - if not fix or error msg

    //Check if URl is empty
    if(new_url == ""){
      alert("Cannot add an empty value!");
    } else {
      url_cell.innerHTML = (new_url);
      delete_button_cell.appendChild(deleteButton);
      url_storage[URL_list].push(new_url);
    }
    document.getElementById("to_add").value = ""; // Clear text url from box after
    saveUrl();
    };
  document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('add_url').addEventListener('click', addUrl);
});

// Open Tabs
function openTabs(){ 
  var table = document.getElementById("url_list");
  for(var i = 0; i < table.rows.length; i++){
    var url = table.rows[i].cells[0];
    chrome.tabs.create({
      url: url.innerHTML
    });
  }
}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('open_tabs').addEventListener('click', openTabs);
});

//Button to save the URL's the user adds 
function saveUrl(){
  chrome.storage.local.set(url_storage, function(){
  });
};

function deleteURL(the_url){
  var string_end = "-";
  var url_to_delete = the_url.parentNode.parentNode.rowIndex;
  document.getElementById("url_list").deleteRow(url_to_delete);

  for(var i = 0; i < url_storage[URL_list].length; i++){
    if(url_storage[URL_list][i].concat(string_end) == the_url.parentNode.parentNode.innerText){
      url_storage[URL_list].splice(i, 1);
    }
  }
  saveUrl();
}
function createDeleteButton(){
  var button = document.createElement("button");
  button.setAttribute('class', 'button is-small is-outlined is-warning');
  button.innerHTML = '-';
  button.onclick = function() {
    deleteURL(this);
  }
  return button;
}