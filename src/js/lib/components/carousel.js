import $ from "../core";
// sliderInfo{
//   slides[
//     name
//     url
//   ]
//   width
//   heigth
// }
$.prototype.createSlider  = function(sliderInfo) {
  for (let i = 0; i < this.length; i++) {
    const amountOfSlides = sliderInfo.slides.length
    let sliderWidth;
    if(typeof(sliderInfo.width) == 'string'){
      sliderWidth = sliderInfo.width;
    }else{
      sliderWidth = sliderInfo.width + "px";
    }
    
    this[i].innerHTML = `
        <ol class="carousel-indicators">
        </ol>

        <div class="carousel-inner">
          <div class="carousel-slides">
            
          </div>
        </div>

        <a href="#" class="carousel-prev" data-slide="prev">
          <span class="carousel-prev-icon">&lt;</span>
        </a>

        <a href="#" class="carousel-next" data-slide="next">
          <span class="carousel-next-icon">&gt;</span>
        </a>
    `;

    
    for (let j = 0; j < amountOfSlides; j++) {
      const dotsItem = document.createElement("li"),
        slideItem = document.createElement("div"),
        slideImage = document.createElement("img");
      
      const carouselInner = this[i].querySelector(".carousel-inner");
      carouselInner.style.heigth = sliderInfo.height + 'px'
      dotsItem.setAttribute("data-slide-to" , `${j}`);
      const carouselIndicators = this[i].querySelector(".carousel-indicators")
      carouselIndicators.appendChild(dotsItem)
      const carouselSlides = this[i].querySelector(".carousel-slides")
      carouselSlides.appendChild(slideItem);
      slideItem.classList.add('carousel-item')
      slideItem.appendChild(slideImage)
      slideImage.setAttribute('src' , `${sliderInfo.slides[j].url}`)
      slideImage.setAttribute("alt", `${sliderInfo.slides[j].name}`);
    }
  }
  return this
}

$.prototype.carousel = function() {
  for (let i = 0; i < this.length; i++) {
    const width = window.getComputedStyle(this[i].querySelector('.carousel-inner')).width
    const slides = this[i].querySelectorAll(".carousel-item");
    const slidesField = this[i].querySelector(".carousel-slides");
    const dots = this[i].querySelectorAll(".carousel-indicators li");
    let slideIndex = 0;
    slidesField.style.width = 100 * slides.length + "%";
    slides.forEach(slide => {
      slide.style.width = width
    });

    let offset = 0;

    $(this[i].querySelector('[data-slide = "next"]')).click((e) => {
      e.preventDefault()
      if(offset == +width.replace(/\D/g , '') * (slides.length -1)){
        offset = 0
      }else{
        offset += +width.replace(/\D/g, "");
      }

      slidesField.style.transform = `translateX(-${offset}px)`

      if(slideIndex == slides.length - 1){
        slideIndex = 0
      }else{
        slideIndex++
      }

      dots.forEach((dot) => {
        dot.classList.remove("active");
      });

      dots[slideIndex].classList.add("active");
    
    })

    $(this[i].querySelector('[data-slide = "prev"]')).click((e) => {
      e.preventDefault();
      if (offset == 0) {
        offset = +width.replace(/\D/g, "") * (slides.length - 1)
      } else {
        offset -= +width.replace(/\D/g, "");
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 0) {
        slideIndex = slides.length - 1;
      } else {
        slideIndex--;
      }

      dots.forEach((dot) => {
        dot.classList.remove("active");
      });

      dots[slideIndex].classList.add("active");
    });

    const sliderId = this[i].getAttribute('id')
    $(`#${sliderId} .carousel-indicators li`).click((e) => {
      const slideTo = e.target.getAttribute('data-slide-to')
      slideIndex = slideTo
      offset = +width.replace(/\D/g, "") * slideTo

      slidesField.style.transform = `translateX(-${offset}px)`;

      dots.forEach((dot) => {
        dot.classList.remove("active");
      });

      dots[slideIndex].classList.add("active");
    })
  }
}

$(".carousel")
  .createSlider({
    width: 700,
    height: 400,
    slides: [
      {
        name: "photo1",
        url: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      },
      {
        name: "photo2",
        url: "https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      {
        name: "photo3",
        url: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      },
    ],
  })
  .carousel();
