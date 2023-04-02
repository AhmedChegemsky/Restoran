function aboutCardRender(){
  const list = document.querySelector(".about-cards");

  // aboutCArds-globalvars.js
  const datalist = aboutCards


datalist.forEach(el=>{
  let li = `
  <li class='about-cards__item'>
    <img src='${el.imgSrc}'/>
    <h4 class='title'>${el.title}</h4>
    <p class='text'>${el.text1}</p>
  </li>
  `;
  list.insertAdjacentHTML('beforeend',li);
})
}

aboutCardRender()