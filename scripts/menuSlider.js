function menuSlider(){

 

  const dataMenu = goods; //Берем из globalVars.js
  
  

  

  const slider =renderSlider(dataMenu);
  const menu = document.querySelector('.menu');
  menu.append(slider);
  new Swiper(slider, {
    slidesPerView: 3,
    spaceBetween: 30,
  navigation: {
   nextEl: ".swiper-button-next",
   prevEl: ".swiper-button-prev",
  },

  breakpoints:{
    300:{slidesPerView:1,},
    768:{slidesPerView:2},
    1024:{slidesPerView:3}
  }


  })




// funcs

function renderSlider(dataList){
  var result = null;
  var wrap = document.createElement('div');
  var swiper  = document.createElement('div');
  var btnNext = document.createElement('button');
  var btnPrev = document.createElement('button');

  var iconArrowR =document.createElement('img');
  var iconArrowL =document.createElement('img');
  iconArrowR.src= `./assets/icons/arrow_r.svg`
  iconArrowL.src= `./assets/icons/arrow_l.svg`
  btnNext.append(iconArrowL)
  btnPrev.append(iconArrowR)  
  swiper.classList.add('swiper');
  wrap.classList.add('swiper-wrapper');
  btnPrev.classList.add('swiper-button-prev');
  btnNext.classList.add('swiper-button-next');
 

  dataList.forEach(el => {
    var slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.append(renderItem(el));
    wrap.append(slide);
  });

  swiper.append(wrap, btnNext, btnPrev,);
  result=swiper;
  return result ;

}

function renderItem(ItemData){
  // console.log(ItemData);
  var result =null;
  var wrap = document.createElement('div');
  wrap.classList.add('card-menu');
  var dataObj ={
    id: ItemData?.id,
    img: ItemData?.img,
    price: ItemData?.price,
    name: ItemData?.name,
    text: ItemData?.text,
  }


  wrap.insertAdjacentHTML('beforeend', `
  <div class="card-menu__container">
      <div class="card-menu__preview">
        <img src="./assets/imgs/menu/${dataObj.img}" alt="">
        <span class="card-menu__price">${dataObj.price}</span>
      </div>
      <h4 class="card-menu__title">${dataObj.name}</h4>
      <p class="text">${dataObj.text}</p>
      <button class="btn" data-basket-button="${dataObj.id}">Заказать</button>
    </div>  
  `);


  result = wrap;
  return result
}




}
menuSlider();
