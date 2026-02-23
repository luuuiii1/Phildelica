// ================================
// PRODUCTS ARRAY WITH CATEGORIES & DESCRIPTIONS
// ================================
const products = [
  { name: "Banana Chips", price: 50, image: "img/bananachips.jpg", description: "Crispy and sweet banana chips.", category: "Snacks" },
  { name: "Bibingka", price: 60, image: "img/bibingka.jpg", description: "Traditional Filipino rice cake with coconut milk.", category: "Kakanin" },
  { name: "Biko", price: 70, image: "img/biko.jpg", description: "Sticky rice cake topped with caramelized coconut.", category: "Kakanin" },
  { name: "Brown Coffee", price: 80, image: "img/browncoffee.jpg", description: "Rich and aromatic Filipino brown coffee.", category: "Drinks" },
  { name: "Buko Pandan", price: 120, image: "img/bukopandan.jpg", description: "Refreshing dessert made with young coconut and pandan jelly.", category: "Desserts" },
  { name: "Buko Pie", price: 250, image: "img/bukopie.jpg", description: "Delicious coconut-filled pie, best served warm.", category: "Desserts" },
  { name: "Bumbong", price: 60, image: "img/bumbong.jpg", description: "Purple sticky rice steamed in bamboo.", category: "Kakanin" },
  { name: "Cassava Cake", price: 150, image: "img/cassavacake.jpg", description: "Soft cassava cake topped with creamy custard.", category: "Desserts" },
  { name: "Egg Pie", price: 100, image: "img/eggpie.jpg", description: "Classic Filipino egg custard pie with golden top.", category: "Desserts" },
  { name: "Espasol", price: 90, image: "img/espasol.jpg", description: "Rice flour and coconut sweet snack rolled in toasted rice flour.", category: "Snacks" },
  { name: "Kapeng Barako", price: 100, image: "img/kapengbarako.jpg", description: "Strong and bold coffee from Batangas.", category: "Drinks" },
  { name: "Kutsinta", price: 60, image: "img/kutsinta.jpg", description: "Chewy brown rice cake topped with grated coconut.", category: "Kakanin" },
  { name: "Leche Flan", price: 150, image: "img/lecheflan.jpg", description: "Smooth and creamy caramel custard.", category: "Desserts" },
  { name: "Maja Blanca", price: 120, image: "img/majablanca.jpg", description: "Coconut milk pudding topped with corn.", category: "Desserts" },
  { name: "Palitaw", price: 70, image: "img/palitaw.jpg", description: "Flat sticky rice cakes coated in coconut and sugar.", category: "Kakanin" },
  { name: "Pichi Pichi", price: 80, image: "img/Pichi-Pichi.jpg", description: "Steamed cassava dessert rolled in grated coconut.", category: "Kakanin" },
  { name: "Polvoron", price: 50, image: "img/polvoron.jpg", description: "Sweet and crumbly shortbread made with toasted flour.", category: "Snacks" },
  { name: "Puto", price: 60, image: "img/puto.jpg", description: "Soft steamed rice cakes, often served with cheese.", category: "Kakanin" },
  { name: "Samalamig", price: 40, image: "img/samalamig.jpg", description: "Chilled sweet drinks, perfect for hot days.", category: "Drinks" },
  { name: "Sapin-Sapin", price: 70, image: "img/sapin2.jpg", description: "Colorful layered sticky rice dessert.", category: "Kakanin" },
  { name: "Suman", price: 60, image: "img/suman.jpg", description: "Sticky rice wrapped in banana leaves.", category: "Kakanin" },
  { name: "Tea", price: 50, image: "img/tea.jpg", description: "Hot or cold brewed tea, refreshing.", category: "Drinks" },
  { name: "Ube Halaya", price: 120, image: "img/ubehalaya.jpg", description: "Purple yam jam, creamy and sweet.", category: "Desserts" },
  { name: "Yema", price: 60, image: "img/yema.jpg", description: "Sweet custard candy coated in sugar.", category: "Snacks" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================================
// DISPLAY PRODUCTS BY CATEGORY
// ================================
function displayProducts(list = products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    const categories = [...new Set(list.map(p => p.category))];

    categories.forEach(cat => {
        const heading = document.createElement("h2");
        heading.innerText = cat;
        switch (cat) {
            case "Drinks": heading.classList.add("category-drinks"); break;
            case "Kakanin": heading.classList.add("category-kakanin"); break;
            case "Desserts": heading.classList.add("category-desserts"); break;
            case "Snacks": heading.classList.add("category-snacks"); break;
        }
        productList.appendChild(heading);

        const catContainer = document.createElement("div");
        catContainer.className = "product-container";

        const catProducts = list.filter(p => p.category === cat);

        catProducts.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            // Product card click = show description
            card.addEventListener("click", () => showDescription(products.indexOf(product)));

            // Inner HTML
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/200?text=No+Image'">
                <h3>${product.name}</h3>
                <p>₱${product.price}</p>
                <button class="add-cart-btn">Add to Cart</button>
            `;

            // Add to Cart button click
            card.querySelector(".add-cart-btn").addEventListener("click", e => {
                e.stopPropagation();
                addToCart(products.indexOf(product));
            });
            
            // Add to Cart button click
                    const addBtn = card.querySelector(".add-cart-btn");
                     addBtn.addEventListener("click", e => {
                     e.stopPropagation();
                     addToCart(products.indexOf(product));

                      // --- Quick success message ---
                     const old = addBtn.textContent;      
                     addBtn.textContent = "Added ";     
                     setTimeout(() => addBtn.textContent = old, 1000);
                    });


            catContainer.appendChild(card);
        });

        productList.appendChild(catContainer);
    });
}

// ================================
// SHOW DESCRIPTION MODAL
// ================================
function showDescription(index) {
    const product = products[index];
    const imgElement = document.getElementById("descImage");
    imgElement.src = product.image;
    imgElement.onerror = () => imgElement.src = "https://via.placeholder.com/200?text=No+Image";

    document.getElementById("descName").innerText = product.name;
    document.getElementById("descText").innerText = product.description;
    document.getElementById("descPrice").innerText = `Price: ₱${product.price}`;

    document.getElementById("descriptionModal").style.display = "block";
}

document.getElementById("descClose").onclick = () => document.getElementById("descriptionModal").style.display = "none";
window.onclick = function (e) {
    if (e.target == document.getElementById("descriptionModal")) document.getElementById("descriptionModal").style.display = "none";
}

// ================================
// CART FUNCTIONS
// ================================
function addToCart(index) {
    const existing = cart.find(item => item.name === products[index].name);
    if (existing) existing.quantity++;
    else cart.push({ ...products[index], quantity: 1 });
    saveCart(); updateCart();
}

function updateCart() {
    document.getElementById("cart-count").innerText = cart.length;
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    ${item.name} - ₱${item.price}<br>
                    <button class="quantity-btn" onclick="changeQty(${index},-1)">-</button>
                    ${item.quantity}
                    <button class="quantity-btn" onclick="changeQty(${index},1)">+</button>
                </div>
                <button onclick="removeItem(${index})">❌</button>
            </div>
        `;
    });

    document.getElementById("cart-total").innerText = total;
}

function changeQty(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    saveCart(); updateCart();
}

function removeItem(index) { cart.splice(index, 1); saveCart(); updateCart(); }
function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); }
function openCart() { document.getElementById("cartModal").style.display = "block"; }
function closeCart() { document.getElementById("cartModal").style.display = "none"; }
function openCheckout() { closeCart(); document.getElementById("checkoutModal").style.display = "block"; }
function closeCheckout() { document.getElementById("checkoutModal").style.display = "none"; }

// ================================
// SEARCH PRODUCTS
// ================================
function searchProducts() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    displayProducts(products.filter(p => p.name.toLowerCase().includes(search)));
}

// ================================
// GENERATE RECEIPT
// ================================
function generateReceipt() {
    const name = document.getElementById("customerName").value;
    const address = document.getElementById("customerAddress").value;
    let receiptHTML = `<h3>Receipt</h3><p>Name: ${name}</p><p>Address: ${address}</p><hr>`;
    let total = 0;
    cart.forEach(item => {
        receiptHTML += `<p>${item.name} x${item.quantity} - ₱${item.price * item.quantity}</p>`;
        total += item.price * item.quantity;
    });
    receiptHTML += `<hr><h4>Total: ₱${total}</h4><p>Thank you for ordering at PhilDelica!</p>`;
    document.getElementById("receipt").innerHTML = receiptHTML;
    cart = [];
    saveCart();
    updateCart();
}




// ================================
// INITIAL LOAD
// ================================
displayProducts();
updateCart();

