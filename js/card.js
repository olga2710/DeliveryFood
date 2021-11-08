let totalPrice =0;
const modalCart = document.querySelector('.modal-cart');
const modalPricetag = modalCart.querySelector('.modal-pricetag');

const card = () =>{

    const buttonCart = document.getElementById('cart-button');
    
    const btnClose = modalCart.querySelector('.close');
    const clearCart = modalCart.querySelector('.clear-cart');
    
    const modalBody = document.querySelector('.modal-body');
    const buttonPrimary = modalCart.querySelector('.button-primary');
    

    const clearModal = () =>{
        const foodRow = modalCart.querySelectorAll('.food-row');
        foodRow.forEach((item)=>{
            item.remove();
        });
        totalPrice = 0;
        modalPricetag.textContent = '0 ₽';
        const Array=[];


        modalCart.classList.remove('is-open');
        localStorage.removeItem('card');

        


    }


    const incCount = (id)=>{
        const cardArray = JSON.parse(localStorage.getItem('card'));  
        
        cardArray.map((item)=>{
            if (item.id===id){
                item.count++;
            }
            return item
        })

        localStorage.setItem('card', JSON.stringify(cardArray));
        
        
        renderItems(JSON.parse(localStorage.getItem('card')));

    }

    const decCount = (id)=>{
       const cardArray = JSON.parse(localStorage.getItem('card'));
      
       
       cardArray.map((item)=>{
        if (item.id===id && item.count>0){
            item.count--;
        }
        return item
    })


    localStorage.setItem('card', JSON.stringify(cardArray));
    renderItems(JSON.parse(localStorage.getItem('card')));



    }




    const renderItems =  (data) =>{
        modalBody.innerHTML='';
        totalPrice=0;
        data.forEach(({name, price, id, count}) =>{
        const newElem = document.createElement('div');
        newElem.classList.add('food-row');
        newElem.innerHTML =`
            <span class="food-name">${name}</span>
			<strong class="food-price">${price} ₽</strong>
			<div class="food-counter">
				<button class="counter-button btn-dec" data-index="${id}">-</button>
				<span class="counter">${count}</span>
				<button class="counter-button btn-inc" data-index="${id}">+</button>
			</div>
        
        `;

        totalPrice = totalPrice + price*count;

        modalBody.append(newElem)
        })
        modalPricetag.innerHTML = `${totalPrice} ₽`;
    }

    modalBody.addEventListener('click', e =>{
        e.preventDefault();

        if (e.target.classList.contains('btn-inc')){
            incCount(e.target.dataset.index);
        } else if (e.target.classList.contains('btn-dec')){
            decCount(e.target.dataset.index);
        }
    })



    buttonCart.addEventListener('click', () =>{
        if (localStorage.getItem('card')){
            renderItems(JSON.parse(localStorage.getItem('card')))
        }
        

        modalCart.classList.add('is-open');
      
    })

    btnClose.addEventListener('click', () =>{
        modalCart.classList.remove('is-open');
    })


    clearCart.addEventListener('click', () =>{
        clearModal();
    })


    buttonPrimary.addEventListener('click', () =>{
        const cardArray = localStorage.getItem('card');
        fetch ('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cardArray,
        })
        .then(response =>{
            if (response.ok){
                alert ('Ваш закзаз принят');
                clearModal();
                modalCart.classList.remove('is-open');
            }

        })
        .catch (err =>{
            console.error(err);
            alert ('Ошибка, попробуйте отправить заказ позже');
            modalCart.classList.remove('is-open');
        })
})

};

 card();
