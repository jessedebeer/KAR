function addCard(id){
    var temp = document.createElement("temp");
    temp.innerHTML = `<div class="card fade-in">
    <div class="location-info">
            <img src="./images/path.svg" class="path-icon" alt="">
            <div class="locations">
                <span class="location">
                    <h3>Delft</h3>
                    <h4>13-01-2023 16:00</h4>
                </span>
                <hr>
                <span class="location">
                    <h3>Eindhoven</h3>
                    <h4>13-01-2023 18:00</h4>
                </span>
            </div>
        </div>
        <div class="card-info">
            <a class="userlink" href="./profile/Ben">Ben</a>
            <strong class="card-cost">€ 5.3</strong>
            <a class="card-button" href="./trip/1">More Info</a>
        </div>
    </div>`;
    document.getElementById("cards-container").appendChild(temp.firstChild);
}

