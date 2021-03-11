var ourRequest = new XMLHttpRequest();
var drzave = document.getElementsByClassName("drzava");
var godine = document.getElementsByClassName("godina");
var checkGodine = new Array();
var checkDrzave = new Array();
var ourData = new Array();
var cenaRastuce = document.getElementById("cenaRastuce");
var cenaOpadajuce = document.getElementById("cenaOpadajuce");
var imeRastuce = document.getElementById("imeRastuce");
var imeOpadajuce = document.getElementById("imeOpadajuce");
var copyData;

onLoad = function(){
	ourData = JSON.parse(ourRequest.responseText);
	copyData = ourData;
	var shop = document.getElementById("shop");
	ourData.forEach( function(element, index) {
		createWine(element);
	});

	for(let i = 0, length1 = drzave.length; i < length1; i++){
		drzave[i].getElementsByTagName("input")[0].addEventListener("click",function(){
			var ime = this.parentElement.getElementsByTagName("label")[0].innerHTML; 
			izbaciUbaci(ime, checkDrzave);
			promeniContent();
		})

	}

	for(let i = 0, length1 = godine.length; i < length1; i++){
		godine[i].getElementsByTagName("input")[0].addEventListener("click",function(){
			var ime = this.parentElement.getElementsByTagName("label")[0].innerHTML; 
			izbaciUbaci(ime, checkGodine);
			promeniContent();
		})

	}


};


clickSort = function(){
	copyData = ourData;
	cenaRastuce.addEventListener("click", function(){
		sortiraj(true, false);
		ispisiSort(copyData);
	});
	cenaOpadajuce.addEventListener("click", function(){
		sortiraj(false, false);
		ispisiSort(copyData);
	});
	imeRastuce.addEventListener("click", function(){
		sortiraj(true, true);
		ispisiSort(copyData);
	});
	imeOpadajuce.addEventListener("click", function(){
		sortiraj(false, true);
		ispisiSort(copyData);
	});
}

var bool;
sortiraj = function(rastuci,ime){
	var a;
	if(rastuci){
		if(ime){
			for(let i = 0, length1 = copyData.length; i < length1; i++){
				for(let j = i+1, length2 = copyData.length; j < length2; j++){
					uporedi(copyData[i].name,copyData[j].name);
					if(bool){
						a = copyData[i];
						copyData[i] = copyData[j];
						copyData[j] = a;
					}
				}
			}
		}
		else{
			console.log(copyData.length);
			for(let i = 0, length1 = copyData.length; i < length1; i++){
				for(let j = i+1, length2 = copyData.length; j < length2; j++){
					uporedi(copyData[i].price,copyData[j].price);
					if(bool){
						a = copyData[i];
						copyData[i] = copyData[j];
						copyData[j] = a;
					}
				}
			}
		}
	}
	else{
		if(ime){
			for(let i = 0, length1 = copyData.length; i < length1; i++){
				for(let j = i+1, length2 = copyData.length; j < length2; j++){
					uporedi(copyData[i].name,copyData[j].name);
					if(!bool){
						a = copyData[i];
						copyData[i] = copyData[j];
						copyData[j] = a;
					}
				}
			}
		}
		else{
			for(let i = 0, length1 = copyData.length; i < length1; i++){
				for(let j = i+1, length2 = copyData.length; j < length2; j++){
					uporedi(copyData[i].price,copyData[j].price);
					if(!bool){
						a = copyData[i];
						copyData[i] = copyData[j];
						copyData[j] = a;
					}
				}
			}
		}
	}
}

uporedi = function(obj1,obj2){
	if(obj1>obj2){
		bool=true;
	}
	else{
		bool=false;
	}
}

ispisiSort = function(data){
	document.getElementById("shop").innerHTML = "";
	for(let i = 0, length1 = data.length; i < length1; i++){
		createWine(data[i]);
	}
}

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
	if(checkGodine.length==0&&checkDrzave.length===0){
		ourData.forEach( function(element, index) {
		createWine(element);
	});
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
		var p4 = document.createElement("p");
		p1.innerHTML = "Drzava: " + element.country;
		p2.innerHTML = "Godina: " + element.year;
		p3.innerHTML = element.description;
		p4.innerHTML = "Cena: " + element.price + "e";
		div.appendChild(p1);
		div.appendChild(p2);
		div.appendChild(p4);
		div.appendChild(p3);
		var btn = document.createElement("button");
		btn.className = "btn";
		btn.innerHTML = "Kupite Odmah";
		div.appendChild(btn);
		shop.appendChild(div);
}


clickSort();