

function basketModal(){
  var basketData=[];
  const basketBtns = document.querySelectorAll('.basket-btn');
  basketBtns.forEach(btn=>{btn.onclick= openBasket;
  });
  checkBasketCount(); //считает общее кол. товаров в корзине  
  
  addbusketBtns(); //Активируем все кнопки которые добавляют товары в корзину
  
  function openBasket(){
    const modal = new ModalWindow({title: "корзина", html: render(),})
    modal.open();
  }

  function addBasketItem(item_id){
    //goods берем из globalVars.js
    let itemExist =false;

    basketData.forEach((el, i)=>{
      if (el.id===item_id){
        el.quantity = el.quantity + 1;
        itemExist = true;
      }
    })


    if(!itemExist){
      goods.forEach((el, i)=>{
        if (el.id===item_id) basketData.push({...el, quantity:1});
      })  
    }  
    checkBasketCount(); 
  }
  

  function render(){
    let result = null;
    const wrap =document.createElement('form');
    wrap.classList.add('basket');
    


    wrap.insertAdjacentHTML('beforeend',`
      <ul class="basket__list"></ul>
      <div class='basket__final'>
        <h4 name="title">Итоговая сумма:</h4>
        <div name='final-price'>0₽</div>
      </div>
      <div class="basket__foot">
        <button class="basket__reset" type="reset">Очистить корзину</button>
        <button class="btn" type="submit">Оформить заказ</button>
      </div>
    `);
    

    const btnReset = wrap.querySelector('.basket__reset');
    const list = wrap.querySelector('.basket__list');
    const finalPrice = wrap.querySelector('[name="final-price"]');
    creteList(list);
    checkFinalPrice(finalPrice);

    btnReset.onclick =()=>{
      const close =wrap.parentNode.parentNode.parentNode.parentNode;
      close.click();
      basketData=[];
      list.innerHTML ='';
      checkFinalPrice(finalPrice);

    }

    
   
    
    
    wrap.onsubmit = (e)=>{
      e.preventDefault();
      console.log(basketData);
      btnReset.click();
      const modal = new ModalWindow({title:"Заказ оформлен", text:"Ожидайте звонка"});
      modal.open();
      checkFinalPrice(finalPrice);
    }
      
    result= wrap;
    return result;
  }
  
  function checkFinalPrice(item){
    let result = 0;
    basketData.forEach((el, i)=>{
      result+=(el.price * el.quantity);
    })
    if(item) item.innerHTML =`${result}₽`;
    checkBasketCount();

    return result;
  }

  function creteList(list){
    basketData.map((el, i)=>{
      const basketItem = document.createElement('li');
      basketItem.classList.add('basket__item');
      basketItem.insertAdjacentHTML('beforeend',`
      <div name="item-name">${el.name}</div>
      <div name="item-price">${el.price}₽</div>
      <div name="item-quantity">${el.quantity}</div>
      <button type="button" name="item-increment">+</button>
      <button type="button" name="item-decrement">-</button>
      <button type="button" name="item-remove">✖</button>
      `)


      const btnIncrement = basketItem.querySelector('[name="item-increment"]');
      const btnDecrement = basketItem.querySelector('[name="item-decrement"]');
      const btnRemove = basketItem.querySelector('[name="item-remove"]');
      const price = basketItem.querySelector('[name="item-price"]');
      const quantity = basketItem.querySelector('[name="item-quantity"]');
      const finalPrice = list.parentNode.querySelector('[name="final-price"]')




      btnIncrement.onclick = ()=>{

      el.quantity++;
      quantity.textContent=basketData[i].quantity;
      price.textContent =`${el.quantity * el.price}₽`;
      checkFinalPrice(finalPrice);
    }




      btnDecrement.onclick = ()=>{
        if(el.quantity>1){
          el.quantity--;
          quantity.textContent=el.quantity;
          price.textContent =`${el.quantity * el.price}₽`;
          checkFinalPrice(finalPrice);
          
        }

      };




      btnRemove.onclick = ()=>{
        basketItem.remove();
        // basketData.splice(i);
        basketData = basketData.filter(item=>item.id!==el.id);
        checkFinalPrice(finalPrice);
        
      };


      list.prepend(basketItem);
      
    })
    
  }

  



  function addbusketBtns(){
    const btns = document.querySelectorAll('[data-basket-button]');
    console.log(btns);
    btns.forEach((el, i)=>{
      el.addEventListener('click', ()=>{
        addBasketItem(el.dataset.basketButton);
        
      })
    })
  }


  function checkBasketCount(){
    basketBtns.forEach(btn=>{

      let count = 0;

      basketData.forEach(el=>count += el.quantity)
      btn.dataset.elements = count;
    });
  
  }
}

basketModal();