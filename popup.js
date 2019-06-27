var url_storage = {}; //For saving/loading URL's
const URL_list = "urllist"
// storage["URL_list"] = ["TEST-TEST-TEST"];

//runs when chrome extension is loaded - use to load in URL's from storage
window.onload=function(){
  chrome.storage.local.get(URL_list, function(storage){
    if(storage[URL_list] == null){
      alert("making list empty");
      url_storage[URL_list] = [];
    };
    url_storage = storage;
    alert(JSON.stringify(storage));
  });
}

// Add URL to list
function addUrl(){
    //var ul = document.getElementById("list"); //Create List
    var br = document.createElement("br");
    var li = document.createElement("li");    //Create List Item
    var new_url = document.getElementById("to_add").value; //Get item value from the "Add" button
    var t = document.createTextNode(new_url); //Create URL from item value
    li.appendChild(t); //Append URL to list

    // TODO: Check if URL is in correct format - if not fix or error msg
    
    //Check if URl is empty
    if(new_url == ""){
      alert("Cannot add an empty value!");
    } else {
      document.getElementById("url_list").appendChild(li);
      document.getElementById("url_list").appendChild(br);
      url_storage[URL_list].push(new_url);
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