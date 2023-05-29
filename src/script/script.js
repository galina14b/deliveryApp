// DOM Elements ===========================

const productsBlock = document.querySelector('.product__content');

class Api {
  url = 'https://api.spoonacular.com/recipes/random?apiKey=348b6476d9b74cf0ba7a236951676ef8&number=100';
  options = {
	method: 'GET',
  };

  async getMeals() {
  const response = await fetch(this.url, this.options); 
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message);
    }
    
  return data.recipes;
  }
};


class CardMeal {

  postMeals(data) {
    data.forEach(({image="https://media-cdn.tripadvisor.com/media/photo-s/11/de/d3/3d/easy-food.jpg", title}) => {
      let element = document.createElement('div');
      element.classList.add('product__card');
      let content = `
      <div class="product__card-wrapper">
        <img class="card__img" src="${image}" alt="">
        <h3 class="card__title">${title}</h3>
        <button class="card__btn" title="This item should be added in the Shopping Cart">Add to Cart</button>
      </div>
      `;
      element.innerHTML = content;
      productsBlock.insertAdjacentElement('beforeend', element);
    })
  };
}

// Loading Product Cards =============================
window.onload = () => {
  createCards();
}

// Selected Product Cards Detection =====================

productsBlock.addEventListener('click', function (e) {
  if (e.target.className === "card__btn") {
    let data = {
      img: e.target.parentNode.children[0].src,
      title: e.target.parentNode.children[1].textContent,
      price: 200,
      count: 1
    };

    // Storing selected Cards
    let storedData = localStorage.getItem('storedProduct');
    let allData = []

    if (storedData) {
      let previousData = JSON.parse(storedData);
      localStorage.removeItem('storedProduct');
      previousData.push(data);
      localStorage.setItem('storedProduct', JSON.stringify(previousData))
    } else {
      allData.push(data)
      localStorage.setItem('storedProduct', JSON.stringify(allData))
    }
  }
});

// Functions =========================================

async function createCards() {
  const card = new CardMeal();

  try {
  const api = new Api();
    const gotMeals = await api.getMeals();
    card.postMeals(gotMeals);

  } catch (error) {
  	console.error(error);
  }
};

function choosingCard(data) {
  let storedData = JSON.stringify(data);
  localStorage.setItem(storedData);
};
