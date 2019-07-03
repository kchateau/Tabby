var url_storage = {}; //For saving/loading URL's
const URL_list = "urllist"
// storage["URL_list"] = ["TEST-TEST-TEST"];

//runs when chrome extension is loaded - use to load in URL's from storage
// window.onload=function(){
//   chrome.storage.local.get(URL_list, function(storage){
//     if(storage[URL_list] == null){
//       alert("making list empty");
//       url_storage[URL_list] = [];
//     };
//     url_storage = storage;
//     alert(JSON.stringify(storage));
//     // for(var i = 0; i < url_storage.length; i++){
//     //   document.getElementById("url_list").appendChild(url_storage[i]);
//     //   alert("added " + url_storage[i] + " to list");
//     // }
//     for(var url of url_storage[URL_list]){
//       var li = document.createElement("li");  //Create list item
//       var x = document.createTextNode(url);   //Create text node for URL to be added
//       var br = document.createElement("br");  //Break line to separate list items
//       li.appendChild(x);                      //Append URL to list item
//       document.getElementById("url_list").appendChild(li);  //Append list item to list
//       document.getElementById("url_list").appendChild(br);  //Append break line
//     }
//   });
// }

//Add URL to list
function addUrl(){
    //Find table and create row and cells for url and delete button
    var table = document.getElementById("url_list");
    var row = table.insertRow();
    var url_cell = row.insertCell(0);
    var delete_button_cell = row.insertCell(1);

    //get url to be added to table
    var new_url = document.getElementById("to_add").value;

    //create delete button
    var button = document.createElement("button");
    button.innerHTML = '-';

    // FIXME: Check if URL is in correct format - if not fix or error msg

    //Check if URl is empty
    if(new_url == ""){
      alert("Cannot add an empty value!");
    } else {
      url_cell.innerHTML = (new_url);
      delete_button_cell.appendChild(button);
    }
    document.getElementById("to_add").value = ""; // Clear text url from box after
    };
  document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('add_url').addEventListener('click', addUrl);
});

// Open Tabs
function openTabs(){ 
  var ul = document.getElementById("url_list");
  var urls = ul.getElementsByTagName("li");
  for(var i = 0; i < urls.length; i++){
    // alert(urls[i].innerHTML);
    // setTimeout(() => window.open(urls[i].innerHTML, i), 1000);
    chrome.tabs.create({
      url: urls[i].innerHTML
    });
  }
  //window.open("https://www.facebook.com", "https://www.google.com");
}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('open_tabs').addEventListener('click', openTabs);
});

//Button to save the URL's the user adds 
function saveUrl(){
  alert("save url button clicked");
  chrome.storage.local.set(url_storage, function(){
    //Optional Callback
  });
  };
document.addEventListener('DOMContentLoaded', function () {
document.getElementById('save_urls').addEventListener('click', saveUrl);
});