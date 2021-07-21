window.addEventListener("load", init);

function init(){
	var btnSearch = document.querySelector("#searchButton");
	btnSearch.addEventListener("click", search);

}
var url = "https://www.vam.ac.uk/api/json/museumobject/search?q=";
var imgLocation = "http://media.vam.ac.uk/media/thira/collection_images/"
var xhr = new XMLHttpRequest();

var cardList;
var searched = false;

xhr.addEventListener("load", function(){
   if(xhr.status == 200){
       var data = document.querySelector(".cards");
       var elem = document.querySelector("#result");
       var item = JSON.parse(xhr.responseText);
       var x = "";
       
       if(searched === true){
            while(data.lastChild){
                data.removeChild(data.lastChild);   
            }
        }
       
        searched = true;
        for(var i in item.records){
            var recordTitle = item.records[i].fields.title;
            var recordArtist = item.records[i].fields.artist;
            var recordPlace = item.records[i].fields.place;
            var recordlocation = item.records[i].fields.location;
            var recordNumber =  item.records[i].fields.object_number;
            var recordObject = item.records[i].fields.object;      
            var image = item.records[i].fields.primary_image_id;
            
            var result = JSON.stringify(recordTitle);
            var artistResult = JSON.stringify(recordArtist);
            var placeResult = JSON.stringify(recordPlace);
            var locationResult = JSON.stringify(recordlocation);
            var numberResult = JSON.stringify(recordNumber);
            var objectResult = JSON.stringify(recordObject);
            
            console.log(result);  
            console.log(artistResult);
            console.log(image);  
            console.log(placeResult);  
            console.log(locationResult);
            console.log(numberResult);  
            console.log(objectResult);  
            

            cardList = document.createElement("li");
            var cardDiv = document.createElement("div");
            var cardTitle = document.createElement("p");
            var cardArtist = document.createElement("p");
            var cardPlace = document.createElement("p");
            var cardLocation = document.createElement("p");
            var cardNumber = document.createElement("p");
            var cardObject = document.createElement("p");
            var cardImg = document.createElement("img");

            cardList.setAttribute('class', 'card');
            cardDiv.setAttribute('class', 'cardContent');       
            cardTitle.setAttribute('class', 'cardTitle'); 
            cardPlace.setAttribute('class', 'cardParagraph'); 
            cardPlace.setAttribute('id', 'stylePlace'); 
            cardImg.setAttribute('class', 'imgClass');
            cardObject.setAttribute('id', 'objectID');



            if(result.includes('""')){
                cardTitle.textContent = "Title: Unknown Title";
                cardTitle.style.color = "red";
            }
            else{
                cardTitle.textContent = "Title: " + result;
            }


            if(placeResult.includes('""')){

                cardPlace.textContent = "Place: Unknown Place";
                cardPlace.style.color = "red";
            }
            else{
                cardPlace.textContent = "Place: " + placeResult;
            }
            
            cardLocation.textContent = "Location: " + locationResult;
            cardObject.textContent = "Object Type: " + objectResult;

            cardImg.src = imgLocation + image.substring(0, 6) + "/" + image + ".jpg";
            console.log(cardImg);

            data.appendChild(cardList);
            cardList.appendChild(cardDiv);
            cardDiv.appendChild(cardTitle);

            cardDiv.appendChild(cardImg);
            cardDiv.appendChild(cardArtist);

            cardArtist.appendChild(cardPlace);
            cardPlace.appendChild(cardObject);
            cardObject.appendChild(cardLocation);
        }     
    }
});

function search(event){
    event.preventDefault();
    var searchedContent = document.querySelector("#searchBar").value;
	console.log(searchedContent);
    xhr.open("GET", url+searchedContent, true);
    xhr.send();
}

