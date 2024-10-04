
document.addEventListener("DOMContentLoaded", function() {
  var addToCartButtons = document.querySelectorAll(".add-to-cart");
  
  addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      alert("Produto contratado!");
      window.location.href = "Login.html";
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var addToCartButtons = document.querySelectorAll(".comprar");
  
  addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      alert("Produto adicionado ao carrinho!");
      window.location.href = "Login.html";
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var Continue = document.querySelectorAll(".entrar"); 
  
  Continue.forEach(function(button) {
    button.addEventListener("click", function() {
var bd = [{text: "jo", password: "1234"}];
      var ester = [{text: "rip", password: "spyke"}];
      
      var usu = document.getElementById('text').value;
      var pas = document.getElementById('password').value;
      var vali = false;
      var valiu = false/
      alert(usu + pas);
      for(var i = 0; i< bd.length; i++){
        if(bd[i].text == usu && bd[i].password == pas){
          vali = true;
          break;
        }  
      }
       if(vali == true){
        alert("Isso ae");
          window.location.href = "carrosel.html";
      }else{
         for(var i = 0; i< bd.length; i++){
        if(ester[i].text == usu && ester[i].password == pas){
          valiu = true;
          break;
        }  
      }
      if(valiu == true){
        alert("Homenagem ao companheiro mais fiel que já tive");
          window.location.href = "pyke.html";
      }else{
         alert("Tente novamente");
      }
         
      }
      
      
    });
  });
});

var slides = document.getElementsByClassName("slide");
var currentSlide = 0;
var carouselInterval;

function showSlide(n) {
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[n].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function startCarousel() {
  carouselInterval = setInterval(nextSlide, 5000);
}

function stopCarousel() {
  clearInterval(carouselInterval);
}

showSlide(currentSlide);
startCarousel();

var carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseover", stopCarousel);
carousel.addEventListener("mouseout", startCarousel);
//--------------------------Botão de navegação---------------------------------//

 document.getElementById("mostrarBtn").addEventListener("click", function() {
            var lista = document.getElementById("listaNav");
            if (lista.style.display === "none") {
                lista.style.display = "block";
            } else {
                lista.style.display = "none";
            }
        });
 


document.querySelector(".pageup").addEventListener("click", function() {
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        window.scrollBy({
        top: -windowHeight,
        behavior: 'smooth' 
      });
        });

document.querySelector(".pagedown").addEventListener("click", function() {
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        window.scrollBy({
        top: windowHeight,
        behavior: 'smooth' 
      });
        });

document.querySelector(".ghi").addEventListener("move", function() {
          
        });

document.querySelector("gallery").addEventListener("move", function() {
      var galery = document.querySelector("gallery-item");

           galery.style.maxWidth = "1280px";
            galery.style.height = "720px";
});

