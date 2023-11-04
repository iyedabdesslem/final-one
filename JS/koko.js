// JavaScript code for adding items to the cart, adjusting quantity, deleting items, and liking items.

// You can define your items and their details as JavaScript objects here.

// Sample code for adding an item to the cart:
const cartItems = []; // Array to store cart items
const addToCartButtons = document.querySelectorAll('.addToCart');
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        console.log(e.target)
        const item=e.target.parentNode
        console.log(item)
        const price = parseFloat(item.querySelector('p').textContent.replace('Price: $',''))
        console.log(price)
        const name = item.querySelector('h3').textContent
        console.log(name)
        // Add item to cart array
        
        var i=0;
        while(i<cartItems.length && cartItems[i].name!=name)
            i++;
        if(i<cartItems.length){
            cartItems[i].quantity++;
        }else {
            cartItems.push({
                name: name,
                quantity: 1,
                price: price
            });
            console.log("adding new !")
        }
        console.log(cartItems);

        // Update cart display
        updateCart();
    });
});

// Sample code for updating the cart display:
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;
    var countReal=0,countBarca=0;
    cartItems.forEach((item, index) => {
        const itemsexisted = document.querySelector('.cart-items');
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <button class="deleteItem">Delete</button>
            <button class="likeItem">Like</button>
            <span>Quantity: ${item.quantity}</span>
            <span>Price: $${item.price}</span>
        `;
        if(item.name.includes("Real")) countReal++;

        if(item.name.includes("Barcelona")) countBarca++;

        const deleteButton = itemElement.querySelector('.deleteItem');
        const likeButton = itemElement.querySelector('.likeItem');

        deleteButton.addEventListener('click', () => {
            cartItems.splice(index, 1);
            updateCart();
        });
        let liked = false;

        likeButton.addEventListener('click', () => {
            liked = !liked;
            likeButton.style.color = liked ? 'red' : 'gray';
        });

        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = totalPrice;
    console.log("countReal : " + countReal);
    console.log("countBarca : "+countBarca);
    document.getElementById('barcelonaScore').textContent = countBarca;
    document.getElementById('realMadridScore').textContent = countReal;
}


const contactForm = document.getElementById('contactForm');
console.log(contactForm);

contactForm.addEventListener('submit',  (e) =>{
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // You can handle the form data here, e.g., sending it to a server, displaying a confirmation message, or other actions.
    // For this example, we'll just display an alert.
    alert(`Thank you, ${name}! We have received your message.\nEmail: ${email}\nMessage: ${message}`);
    contactForm.reset();
});




