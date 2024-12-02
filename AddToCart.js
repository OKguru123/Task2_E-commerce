


import { updateCartCount } from "./Navbar.js";

function loadCartFromLocalStorage() {
   const cartData = JSON.parse(localStorage.getItem('cart')) || [];


   return cartData;
}

  

function renderCartPage() {
    
    let cartModal = document.querySelector('#cartModal');
    if (!cartModal) {
        cartModal = document.createElement('div');
        cartModal.id = 'cartModal';
        cartModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: flex-start; /* Align content to the top for scrolling */
            overflow-y: auto; /* Enable vertical scrolling for large content */
            z-index: 1000;
        `;
        document.body.appendChild(cartModal);
    }

    // **2. Create cart content container**
    const cartPage = document.createElement('div');
    cartPage.style.cssText = `
        width: 90%;
        max-width: 600px;
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;
        margin-top: 30px; /* Add margin from the top */
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    `;

    // **3. Add close button to modal**
    const closeButton = document.createElement('button');
    closeButton.innerText = "X";
    closeButton.style.cssText = `
        position: relative; 
        top: 10px;
        right: 10px;
        left:270px;
      
     
       
        z-index: 1100; 
         margin-top: 20px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #333;
        color: white;
        cursor: pointer;
        font-size: 1rem;
    `;
    closeButton.addEventListener('click', () => {
        cartModal.style.display = 'none'; // Hide modal
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    cartPage.appendChild(closeButton);

    // **4. Add title**
    const pageTitle = document.createElement('h1');
    pageTitle.innerText = "Your Cart";
    pageTitle.style.cssText = `
        font-size: 2rem;
        margin-bottom: 20px;
        color: #333;
    `;
    cartPage.appendChild(pageTitle);

    // **5. Create container for cart items**
    const cartContainer = document.createElement('div');
    cartContainer.style.cssText = `
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-height: 400px; /* Set a max height */
        overflow-y: auto; /* Enable scrolling for items */
    `;
    cartPage.appendChild(cartContainer);

    // **6. Populate cart items**
    const cartData = loadCartFromLocalStorage();
    if (cartData.length > 0) {
        cartData.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            `;

            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemImage.alt = item.title;
            itemImage.style.cssText = `
                width: 80px;
                height: 80px;
                border-radius: 4px;
            `;
            cartItem.appendChild(itemImage);

            const itemDetails = document.createElement('div');
            itemDetails.style.cssText = `
                flex: 1;
                margin-left: 20px;
            `;
            const itemTitle = document.createElement('h2');
            itemTitle.innerText = item.title;
            itemTitle.style.cssText = `
                font-size: 1.2rem;
                margin: 0;
                color: #333;
            `;
            const itemPrice = document.createElement('p');
            itemPrice.innerText = `$${item.price}`;
            itemPrice.style.cssText = `
                font-size: 1rem;
                color: #555;
            `;
            itemDetails.appendChild(itemTitle);
            itemDetails.appendChild(itemPrice);
            cartItem.appendChild(itemDetails);

            const removeButton = document.createElement('button');
            removeButton.innerText = "Remove";
            removeButton.style.cssText = `
                padding: 10px 15px;
                border: none;
                border-radius: 5px;
                background-color: red;
                color: white;
                cursor: pointer;
                font-size: 0.9rem;
            `;
            removeButton.addEventListener('click', () => {
                removeFromCart(item.id);
                cartItem.remove();
                updateCartCount();

                 // Remove the item from the DOM immediately
            });
            cartItem.appendChild(removeButton);

            cartContainer.appendChild(cartItem);
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.innerText = "Your cart is empty.";
        emptyMessage.style.cssText = `
            font-size: 1.2rem;
            color: #555;
            text-align: center;
        `;
        cartContainer.appendChild(emptyMessage);
    }

    // **7. Add Clear Cart button**
    const clearCartButton = document.createElement('button');
    clearCartButton.innerText = "Clear Cart";
    clearCartButton.style.cssText = `
        margin-top: 20px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #333;
        color: white;
        cursor: pointer;
        font-size: 1rem;
    `;
    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        cartContainer.innerHTML = ""; // Clear the items visually
        const emptyMessage = document.createElement('p');
        emptyMessage.innerText = "Your cart is empty.";
        emptyMessage.style.cssText = `
            font-size: 1.2rem;
            color: #555;
            text-align: center;
        `;
        cartContainer.appendChild(emptyMessage);
        updateCartCount();

    });
    cartPage.appendChild(clearCartButton);

    // **8. Attach cartPage to the modal and display it**
    cartModal.innerHTML = ""; // Clear the modal
    cartModal.appendChild(cartPage);
    cartModal.style.display = 'flex'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable scrolling in the background
}

// Function to remove an item from the cart and update storage
function removeFromCart(id) {
    const cartData = loadCartFromLocalStorage();
    const updatedCart = cartData.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update storage
}
 

setTimeout(renderCartPage, 100);
console.log("rander called")
renderCartPage();
