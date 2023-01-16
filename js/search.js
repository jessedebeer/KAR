function addCard(id){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var temp = document.createElement("temp");
            temp.innerHTML = xhttp.responseText;
            document.getElementById("cards-container").appendChild(temp.firstChild);
        }
    };
    xhttp.open("GET", "/cards/trip/" + id, true);
    xhttp.send();
}