var url_storage = {}; //For saving/loading URL's
const URL_list = "urllist"

//runs when chrome extension is loaded - use to load in URL's from storage
window.onload=function(){
  chrome.storage.local.get(URL_list, function(storage){
    if(storage[URL_list] == undefined){
      url_storage[URL_list] = [];
    } else {
      url_storage = storage;
    }
    for(var url of url_storage[URL_list]){
      table = createTable();
      row = createRow(table);
      cell = createCell(row);
      button_cell = createButtonCell(row);
      deleteButton = createDeleteButton();
      cell.innerHTML = (url);
      button_cell.appendChild(deleteButton);
    }
  });
}
//Add URL and delete button to list
function addUrl(){
    //Create table, rows, cells
    table = createTable();
    row = createRow(table);
    cell = createCell(row);
    button_cell = row.insertCell(1);

    new_url = document.getElementById("to_add").value;
    deleteButton = createDeleteButton();

    if(new_url == ""){
      alert("Cannot add an empty value!");
    } else {
      cell.innerHTML = (new_url);
      button_cell.appendChild(deleteButton);
      url_storage[URL_list].push(new_url);
    }
    document.getElementById("to_add").value = ""; // Clear text url from box after
    saveUrl();
    };
  

// Open Tabs
function openTabs(){ 
  var table = createTable();
  for(var i = 0; i < table.rows.length; i++){
    var url = table.rows[i].cells[0];
    chrome.tabs.create({
      url: url.innerHTML
    });
  }
}
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

//Helper functions and event listeners
function createDeleteButton(){
  var button = document.createElement("button");
  button.setAttribute('class', 'button is-small is-outlined is-info');
  button.innerHTML = '-';
  button.onclick = function() {
    deleteURL(this);
  }
  return button;
}
function createTable(){
  var table = document.getElementById("url_list");
  return table;
}
function createRow(table){
  var row = table.insertRow();
  return row;
}
function createCell(row){
  var cell = row.insertCell(0);
  cell.id = "url_id";
  return cell;
}
function createButtonCell(row){
  var button_cell = row.insertCell(1);
  return button_cell;
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('add_url').addEventListener('click', addUrl);
});
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('open_tabs').addEventListener('click', openTabs);
});