var ourRequest = new XMLHttpRequest();
var drzave = document.getElementsByClassName("drzava");
var godine = document.getElementsByClassName("godina");
var checkGodine = new Array();
var checkDrzave = new Array();
var ourData = new Array();


onLoad = function(){
	ourData = JSON.parse(ourRequest.responseText);
	var shop = document.getElementById("shop");
	ourData.forEach( function(element, index) {
		createWine(element);
	});

	for(let i = 0, length1 = drzave.length; i < length1; i++){
		console.log(drzave[i].getElementsByTagName("input"));
		drzave[i].getElementsByTagName("input")[0].addEventListener("click",function(){
			var ime = this.parentElement.getElementsByTagName("label")[0].innerHTML; 
			izbaciUbaci(ime, checkDrzave);
			console.log(checkDrzave);
			
			promeniContent();
		})

	}

	for(let i = 0, length1 = godine.length; i < length1; i++){
		console.log(godine[i].getElementsByTagName("input"));
		godine[i].getElementsByTagName("input")[0].addEventListener("click",function(){
			var ime = this.parentElement.getElementsByTagName("label")[0].innerHTML; 
			izbaciUbaci(ime, checkGodine);
			console.log(checkGodine);
			
			promeniContent();
		})

	}


};

// Bla bla
ourRequest.addEventListener('load', onLoad);
ourRequest.open('GET' , 'https://markomihajlovic26.github.io/Vinarija/data/wines.json');
ourRequest.send();


promeniContent = function(){
	document.getElementById("shop").innerHTML = "";
	for(let i = 0, length1 = ourData.length; i < length1; i++){
		for(let j = 0, length1 = checkGodine.length; j < length1; j++){
			if(ourData[i].year==checkGodine[j]){
				createWine(ourData[i]);
			}
		}
		for(let k = 0, length1 = checkDrzave.length; k < length1; k++){
			if(ourData[i].country==checkDrzave[k]){
				createWine(ourData[i]);
			}
		}
	}

}

izbaciUbaci = function(ime, niz){
	for(let i = 0, length1 = niz.length; i < length1; i++){
		if(niz[i]==ime){
			niz.splice(i,1);
			return;
		}
	}
	niz.push(ime);
};


createWine = function(element){
	var div = document.createElement("div");
		div.className = "wine";
		var img = document.createElement("img");
		img.src = "https://markomihajlovic26.github.io/Vinarija/images/" + element.picture;
		div.appendChild(img);
		var h3 = document.createElement("h3");
		h3.innerHTML = element.name;
		div.appendChild(h3);
		var p1 = document.createElement("p");
		var p2 = document.createElement("p");
		var p3 = document.createElement("p");
		p1.innerHTML = "Drzava: " + element.country;
		p2.innerHTML = "Godina: " + element.year;
		p3.innerHTML = element.description;
		div.appendChild(p1);
		div.appendChild(p2);
		div.appendChild(p3);
		var btn = document.createElement("button");
		btn.className = "btn";
		btn.innerHTML = "Kupite Odmah";
		div.appendChild(btn);
		shop.appendChild(div);
}


