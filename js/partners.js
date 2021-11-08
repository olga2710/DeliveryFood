const parthers = () =>{
    const cardRestaurant = document.querySelector('.cards-restaurants');



    const renderItem = (data)=>{
         data.forEach((item)=>{
             const{image, kitchen, name, price, products, stars, time_of_delivery } = item;
            const a = document.createElement('a');
            a.setAttribute('href', '/restaurant.html');
            a.classList.add('card');
            a.classList.add('card-restaurant');
            a.dataset.products = products;
    
    
            a.innerHTML = `
                <img src="${image}" alt="${name}" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${name}</h3>
                        <span class="card-tag tag">${time_of_delivery} мин</span>
                    </div>
                    <!-- /.card-heading -->
                    <div class="card-info">
                        <div class="rating">
                            ${stars}
                        </div>
                        <div class="price">От ${price} ₽</div>
                        <div class="category">${kitchen}</div>
                    </div>
                    <!-- /.card-info -->
                </div>
                <!-- /.card-text -->
            `
            
            a.addEventListener('click', (ev) =>{
                ev.preventDefault();
                if (localStorage.getItem('user')){
                    localStorage.setItem('restaurant', JSON.stringify(item) );
                    window.location.href = '/restaurant.html'
                } else {
                    
                        modalAuth.style.display = 'flex';
                    
                }
                
        
                
    
    
            })
            cardRestaurant.append(a);
    
             
         });
        
    
    }
    
    
    fetch(`https://food-519ce-default-rtdb.firebaseio.com/db/partners.json`) //получаем данные из файла
        .then((response)=>response.json()) //переводим их в формат json 
        .then((data)=>{
            renderItem(data)
        })
        .catch((err)=>{ 
            console.log(err);
        })
        
}

parthers();
