/* CYSPA Website: kleine Interaktionen für HubSpot (in Einstellungen > Website > Seiten > Footer-HTML oder im Template einbinden) */
document.addEventListener("DOMContentLoaded",function(){
  // Mobiles Menü
  var btn=document.getElementById("menu-btn"),nav=document.getElementById("nav-links");
  if(btn&&nav){btn.addEventListener("click",function(){var o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",String(o));});}
  // Stellenfilter (Karriere)
  var fb=document.querySelectorAll(".filters button");
  fb.forEach(function(b){b.addEventListener("click",function(){
    fb.forEach(function(x){x.setAttribute("aria-pressed",String(x===b));});
    var f=b.getAttribute("data-filter");
    document.querySelectorAll(".job").forEach(function(j){j.hidden=!(f==="all"||j.getAttribute("data-dept")===f);});
  });});
});
