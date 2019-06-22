// Add URL to list
function addUrl(){
    //var ul = document.getElementById("list"); //Create List
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
    }
    var storage = {};
    storage["URL_list"] = ["google"];
    chrome.storage.local.set(storage, function(){
      //Optional Callback
    });
    chrome.storage.local.get("URL_list", function(storage){
      alert(JSON.stringify(storage));
    });
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

window.onload=function(){
  alert("page load!");
}