// DOM Elements

const priceTitle = document.querySelector('.actions__title');
const cartContent = document.querySelector('.cartData__content');
const formElement = document.querySelector('.cart');


let selectedProducts = JSON.parse(localStorage.getItem('storedProduct'));
let totalOrder = [];


// Loading Selected Product Cards ==========================

window.onload = () => {
  showSelectedItems(selectedProducts);
  // Summing Final Price
  selectedProducts.forEach(({title, price, count}) => {
    summingProducts(title, price, count);
  });

  localStorage.setItem('TotalOrder', JSON.stringify(totalOrder));
} 


// Form Product Input`s Change Detection ====================

cartContent.addEventListener('change', function (event) {
  
  if (event.target.className === "cartData__input") {

    let parentElements = event.target.parentElement.children;
    let name = parentElements[0].textContent;
    let price = +parentElements[1].textContent;
    let count = +parentElements[3].value;

    summingProducts(name, price, count);
  }
});


// Form Submit Detection =================================

formElement.addEventListener('submit', handleFormSubmit);


// Functions =============================================

function showSelectedItems(data) {
  data.forEach(({img="https://media-cdn.tripadvisor.com/media/photo-s/11/de/d3/3d/easy-food.jpg", title, price=300}) => {
    let element = `
      <div class="product__card">
        <div class="product__card-wrapper cartData__inner">
          <img class="cartData__img"
            src=${img}>
          <div class="cartData__info">
            <h3 class="cartData__title">${title}</h3>
            <p class="cartData__price">${price}</p><p class="unit">$</p>
            <input class="cartData__input" name="${title}" type="number" min="0" max="10" value="1">
          </div>
        </div>
      </div>
    `;
    cartContent.insertAdjacentHTML('beforeend', element);
  })
};


function countingProducts(price, count) {
  return (price * count)
};


function summingProducts(name, price, count) {
  let sum = countingProducts(price, count);
  let totalSum = 0;

  totalOrder.forEach(element => {
    if (element.name === name) {
      totalOrder.splice(totalOrder.indexOf(element), 1);
    }
  });

  order = {
    name,
    price,
    count,
    sum
  };

  totalOrder.push(order);
  totalOrder.forEach(element => {
    return totalSum += element.sum;
  });

  priceTitle.textContent = `Total Price: ${totalSum} $`;
  localStorage.setItem('TotalOrder', JSON.stringify(totalOrder));
};


async function handleForm(formNode) {
  const { elements } = formNode

  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element

      return { name, value }
    })

  return data;
};


async function handleFormSubmit(event) {
  event.preventDefault();
  const data = handleForm(event.target);
  const response = await sendData(data);
};


async function sendData(data) {
  return await fetch('/sample/post/json HTTP/1.1', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: data,
  })
};


