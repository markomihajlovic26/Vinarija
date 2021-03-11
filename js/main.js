function initMap() {
  const uluru = { lat: -25.344, lng: 131.036 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

function provera(){
  let imePrezime= document.getElementById("imePrezime").value;
  let email= document.getElementById("email").value;
  let telefon= document.getElementById("telefon").value;
  let poruka= document.getElementById("poruka").value;
  let regExpImePrezime=/^[A-Z][a-z]{2,19}(\s[A-Z][a-z]{2,19})+$/;
  let regExpEmail=/^[^@]+@[^@]+\.[^@\.]+$/;
  let regExpTelefon=/^06\d{7,8}$/;
  let regExpPoruka=/^[^@]+(\s[^@]+)*$/;
  let greske=0;
  if(!regExpImePrezime.test(imePrezime)){
    $("#greskaImePrezime").show();
  greske++;
  }else{
  $("#greskaImePrezime").hide();
  }
  if(!regExpEmail.test(email)){
  $("#greskaEmail").show();
  greske++;
  }else{
  $("#greskaEmail").hide();
  }
  if(!regExpTelefon.test(telefon)){
  $("#greskaTelefon").show();
  greske++;
  }else{
  $("#greskaTelefon").hide();
  }
  if(!regExpPoruka.test(poruka)){
  $("#greskaPoruka").show();
  greske++;
  }
  else{
  $("#greskaPoruka").hide();
  }
  console.log(greske);
  if(greske)
  return false;
  else
  return true;
 }
 