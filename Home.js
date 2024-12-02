

// // import products from "./productdata.js";
// // const products = require('./productdata');
// // const products = require('./products.js');
// // import products from "./productdata.js"
// // console.log(products);
import { updateCartCount } from "./Navbar.js";
export function Homepagepass(){




  const homepage = document.createElement('div');

homepage.style.cssText = `
    background: white;
    width: 100%;
   
    display: flex;
    justify-content: center;
    align-items: center;
`;

  const productContainer = document.createElement('div');

  productContainer.id = 'product-container';


 
  productContainer.style.display = 'flex';
  productContainer.style.flexWrap = 'wrap';
  productContainer.style.justifyContent = 'space-around';
  productContainer.style.gap = '20px';
  productContainer.style.padding = '20px';

const apiUrl = 'https://dummyjson.com/products';
fetchData(apiUrl);

function fetchData(apiUrl) {
 
    fetch(apiUrl)
        .then(response => {
           
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            
            return response.json();
        })
        .then(data => {
            
            console.log(data); 
           
            data.products.forEach(product => {
               
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                
                productCard.style.flex = '1 1 150px';  // 
                productCard.style.border = '1px solid #ddd';
                productCard.style.borderRadius = '8px';
                productCard.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                productCard.style.textAlign = 'center';
                productCard.style.padding = '20px';
                productCard.style.backgroundColor = 'gray';

                const productImage = product.thumbnail; // 
                const productTitle = product.title;     // 
                const productPrice = product.price;     // 

               
                productCard.innerHTML = `
            <img src="${productImage}" alt="${productTitle}" style="width: 100%; height: auto; border-radius: 8px;" />
            <h2 style="font-size: 1.2rem; margin: 10px 0;">${productTitle}</h2>
            <p style="font-size: 1.1rem; color: #333;">$${productPrice}</p>
            <button style="
        padding: 10px 20px; 
             background-color: green; 
           color: white; 
           border: none; 
         border-radius: 5px; 
             cursor: pointer;
             
             ;
             class="add-to-cart-button" 
               id="add-to-cart-button-${product.id}" 
                 " data-id="${product.id}" data-title="${productTitle}" data-image="${productImage}" data-price="${productPrice}">
               Add to Cart
              </button>
          `;






       const tesimgclicked= productCard.querySelector('h2')
       tesimgclicked.style.cursor='pointer';


        tesimgclicked.addEventListener('click', ()=>Showdescription(product.id));

          const buttonclicked=  productCard.querySelector('button')
          buttonclicked.addEventListener('click', function () {
            const item = {
              id: this.getAttribute('data-id'),
              title: this.getAttribute('data-title'),
              image: this.getAttribute('data-image'),
              price: this.getAttribute('data-price'),
            };
            
            
            if (this.style.backgroundColor === 'green') {
                // If it's green, change it to red and change text to "Remove"
                this.style.backgroundColor = 'red';
                this.innerText = 'Remove';
               
                addToCart(item);
            } else {

                
                this.style.backgroundColor = 'green';
                this.innerText = 'Add to Cart';
             
                removeFromCart(item);
            }
          });
                // Append the card to the container
                productContainer.appendChild(productCard);
            });

            // Append the container to the body of the HTML page
            homepage.appendChild(productContainer);
            document.body.append(homepage);
        })
        .catch(error => {
        
            console.error('There was a problem with the fetch operation:', error);
        });
}



function addToCart(item) {
    // Retrieve the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    if (cart.find(cartItem => cartItem.id === item.id)) {
        alert('Item is already in the cart!');
        return;
    }


    cart.push(item);
  
  
    localStorage.setItem('cart', JSON.stringify(cart));

 
    alert(`${item.title} has been added to the cart!`);
    updateCartCount()
}




   function removeFromCart(item) {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

   
    cart = cart.filter(cartItem => cartItem.id !== item.id);
      console.log("filter ho gya and removed item",cart)
    
    localStorage.setItem('cart', JSON.stringify(cart));


    alert(`${item.title} has been removed from the cart!`);
    updateCartCount()
}

const Showdescription = async (id) => { 
    try {
        
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product details.");
        }
        const product = await response.json();

      
        let modal = document.querySelector('#productModal');
        console.log(modal);

        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'productModal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            document.body.appendChild(modal);
            console.log(modal);
        }

        // Disable background scrolling
        document.body.style.overflow = 'hidden';

        // **3. Create modal content container**
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            width: 90%;
            max-width: 500px;
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            position: relative;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
            font-family: Arial, sans-serif;
        `;

        const closeButton = document.createElement('button');
        closeButton.innerText = "✕";
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            border: none;
            background: transparent;
            font-size: 1.5rem;
            cursor: pointer;
        `;
        closeButton.addEventListener('click', () => {
            console.log('Close button clicked for decription',);
            modal.style.display = 'none'; // Hide modal
            document.body.style.overflow = 'auto'; 
        });
        modalContent.appendChild(closeButton);

        const productImage = document.createElement('img');
        productImage.src = product.thumbnail;
        productImage.alt = product.title;
        productImage.style.cssText = `
            width: 100%;
            max-width: 200px;
            border-radius: 4px;
            margin-bottom: 20px;
        `;
        modalContent.appendChild(productImage);

        //  Add product details here
        const productDetails = document.createElement('div');
        productDetails.innerHTML = `
            <h2 style="margin: 0 0 10px; font-size: 1.5rem; color: #333;">${product.title}</h2>
            <p style="margin: 0 0 10px; font-size: 1rem; color: #555;">${product.description}</p>
            <p style="margin: 0 0 10px; font-size: 1rem; font-weight: bold; color: #007BFF;">
                $${product.price} (Discount: ${product.discountPercentage}%)
            </p>
            <p style="margin: 0 0 10px; font-size: 1rem; color: #555;">Rating: ⭐ ${product.rating}</p>
            <p style="margin: 0 0 10px; font-size: 1rem; color: #555;">Warranty: ${product.warrantyInformation}</p>
        `;
        modalContent.appendChild(productDetails);

        //  Clear previous content and display modal
        modal.innerHTML = ""; // Clear existing modal content (if any)
        modal.appendChild(modalContent);
        modal.style.display = 'flex'; // Show the modal

    } catch (error) {
        
        console.error("Error fetching product details:", error);
        alert("Unable to fetch product details. Please try again later.");
    }
};




};
Homepagepass();
