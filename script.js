"use strict";

/* =========================================
   SHOPSPHERE - ONLINE SHOPPING APPLICATION
========================================= */

// -----------------------------------------
// 1. CONFIGURATION
// -----------------------------------------

const TAX_RATE = 0.18;
const SHIPPING_FEE = 60;
const FREE_SHIPPING_LIMIT = 1500;
const MAX_QUANTITY = 10;

const STORAGE_KEYS = {
    cart: "shopsphere_cart_v1",
    wishlist: "shopsphere_wishlist_v1",
    theme: "shopsphere_theme_v1",
    orders: "shopsphere_demo_orders_v1",
    user: "shopsphere_user_v1",
    coins: "shopsphere_coins_v1",
    coinHistory: "shopsphere_coin_history_v1"
};

// Coins config: 1 coin per ₹10 spent. 100 coins = ₹10 discount.
const COINS_PER_RUPEE = 0.1;           // earn 1 coin per ₹10 spent
const COINS_TO_RUPEE = 0.1;            // 100 coins = ₹10 (i.e. 1 coin = ₹0.1)
const MIN_COINS_REDEEM = 100;          // minimum coins to redeem at once

// -----------------------------------------
// 2. PRODUCT DATABASE (DEMO DATA)
// -----------------------------------------

const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 2499,
        oldPrice: 3499,
        rating: 4.8,
        reviews: 128,
        stock: 8,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "Electronics",
        price: 1899,
        oldPrice: 2799,
        rating: 4.6,
        reviews: 96,
        stock: 7,
        badge: "TRENDING",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        name: "Classic Everyday Sneakers",
        category: "Fashion",
        price: 1599,
        oldPrice: 2299,
        rating: 4.7,
        reviews: 84,
        stock: 10,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Minimal Leather Backpack",
        category: "Fashion",
        price: 1299,
        oldPrice: 1899,
        rating: 4.5,
        reviews: 73,
        stock: 6,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        name: "Modern Sunglasses",
        category: "Accessories",
        price: 699,
        oldPrice: 999,
        rating: 4.4,
        reviews: 52,
        stock: 12,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        name: "Premium Travel Bottle",
        category: "Accessories",
        price: 449,
        oldPrice: 699,
        rating: 4.3,
        reviews: 41,
        stock: 15,
        badge: "VALUE PICK",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 7,
        name: "Wireless Gaming Mouse",
        category: "Electronics",
        price: 999,
        oldPrice: 1499,
        rating: 4.7,
        reviews: 110,
        stock: 9,
        badge: "GAMER PICK",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 8,
        name: "Soft Cushion Set",
        category: "Home",
        price: 799,
        oldPrice: 1199,
        rating: 4.5,
        reviews: 37,
        stock: 11,
        badge: "COMFORT",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 9,
        name: "Portable Bluetooth Speaker",
        category: "Electronics",
        price: 1199,
        oldPrice: 1799,
        rating: 4.6,
        reviews: 89,
        stock: 8,
        badge: "HOT DEAL",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 10,
        name: "Everyday Casual T-Shirt",
        category: "Fashion",
        price: 499,
        oldPrice: 799,
        rating: 4.2,
        reviews: 64,
        stock: 20,
        badge: "BUDGET PICK",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 11,
        name: "Elegant Desk Lamp",
        category: "Home",
        price: 899,
        oldPrice: 1299,
        rating: 4.4,
        reviews: 32,
        stock: 5,
        badge: "LIMITED",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 12,
        name: "Classic Analog Watch",
        category: "Accessories",
        price: 2199,
        oldPrice: 2999,
        rating: 4.8,
        reviews: 102,
        stock: 7,
        badge: "PREMIUM",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 13,
        name: "Noise-Cancelling Earbuds",
        category: "Electronics",
        price: 1799,
        oldPrice: 2499,
        rating: 4.7,
        reviews: 143,
        stock: 9,
        badge: "TOP PICK",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 14,
        name: "Slim Laptop Stand",
        category: "Electronics",
        price: 649,
        oldPrice: 999,
        rating: 4.5,
        reviews: 67,
        stock: 14,
        badge: "WORK FROM HOME",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 15,
        name: "Women's Floral Kurta",
        category: "Fashion",
        price: 849,
        oldPrice: 1299,
        rating: 4.6,
        reviews: 88,
        stock: 18,
        badge: "FESTIVE",
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 16,
        name: "Men's Running Shorts",
        category: "Fashion",
        price: 499,
        oldPrice: 799,
        rating: 4.3,
        reviews: 55,
        stock: 22,
        badge: "SPORTS",
        image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 17,
        name: "Aromatherapy Candle Set",
        category: "Home",
        price: 599,
        oldPrice: 899,
        rating: 4.7,
        reviews: 44,
        stock: 16,
        badge: "RELAXING",
        image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 18,
        name: "Ceramic Coffee Mug Set",
        category: "Home",
        price: 449,
        oldPrice: 699,
        rating: 4.4,
        reviews: 39,
        stock: 20,
        badge: "KITCHEN",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 19,
        name: "Leather Card Wallet",
        category: "Accessories",
        price: 399,
        oldPrice: 599,
        rating: 4.5,
        reviews: 61,
        stock: 25,
        badge: "SLIM FIT",
        image: "https://images.unsplash.com/photo-1627123424574-724758594913?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 20,
        name: "Stainless Steel Water Bottle",
        category: "Accessories",
        price: 349,
        oldPrice: 549,
        rating: 4.6,
        reviews: 92,
        stock: 30,
        badge: "ECO PICK",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 21,
        name: "USB-C Fast Charger (65W)",
        category: "Electronics",
        price: 899,
        oldPrice: 1299,
        rating: 4.8,
        reviews: 175,
        stock: 12,
        badge: "FAST CHARGE",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 22,
        name: "Yoga Mat (Anti-Slip)",
        category: "Home",
        price: 699,
        oldPrice: 1099,
        rating: 4.6,
        reviews: 78,
        stock: 15,
        badge: "FITNESS",
        image: "https://images.unsplash.com/photo-1601925228026-5e0a3a27c0d9?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 23,
        name: "Casual Denim Jacket",
        category: "Fashion",
        price: 1899,
        oldPrice: 2799,
        rating: 4.7,
        reviews: 103,
        stock: 8,
        badge: "TRENDING",
        image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 24,
        name: "Wooden Planter Set",
        category: "Home",
        price: 799,
        oldPrice: 1199,
        rating: 4.4,
        reviews: 29,
        stock: 10,
        badge: "HOME DECOR",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80"
    }
];

// -----------------------------------------
// 3. COUPON CONFIGURATION
// -----------------------------------------

const coupons = {
    SHOP10: {
        type: "percentage",
        value: 10,
        minimum: 500,
        description: "10% discount"
    },

    SAVE200: {
        type: "fixed",
        value: 200,
        minimum: 1500,
        description: "₹200 discount"
    }
};

// -----------------------------------------
// 4. APPLICATION STATE
// -----------------------------------------

let cart = loadCart();
let wishlist = loadWishlist();

let activeCategory = "All";
let activeSearch = "";
let activeSort = "featured";
let appliedCoupon = null;

let showWishlistOnly = false;

let lastFocusedElement = null;
let toastSequence = 0;

// New state for Login, Coins & Rewards
let currentUser = readStorage(STORAGE_KEYS.user, null); // { phone }
let userCoins   = readStorage(STORAGE_KEYS.coins, 0);   // integer coin balance
let redeemedCoins = 0;  // coins being redeemed in current cart session

let otpData = {
    phone: "",
    code: "",
    timerInterval: null
};

// -----------------------------------------
// 5. DOM REFERENCES
// -----------------------------------------

const $ = (selector) => document.querySelector(selector);

const productGrid = $("#productGrid");
const emptyProducts = $("#emptyProducts");

const searchInput = $("#searchInput");
const searchButton = $("#searchButton");
const sortSelect = $("#sortSelect");

const cartDrawer = $("#cartDrawer");
const wishlistDrawer = $("#wishlistDrawer");
const overlay = $("#overlay");

const cartItems = $("#cartItems");
const cartEmpty = $("#cartEmpty");
const cartSummary = $("#cartSummary");

const cartCount = $("#cartCount");
const cartSubtitle = $("#cartSubtitle");

const wishlistCount = $("#wishlistCount");
const wishlistItems = $("#wishlistItems");
const wishlistEmpty = $("#wishlistEmpty");

const subtotalAmount = $("#subtotalAmount");
const discountAmount = $("#discountAmount");
const taxAmount = $("#taxAmount");
const shippingAmount = $("#shippingAmount");
const totalAmount = $("#totalAmount");

const couponInput = $("#couponInput");
const couponMessage = $("#couponMessage");
const shippingNote = $("#shippingNote");

const checkoutButton = $("#checkoutButton");
const checkoutModal = $("#checkoutModal");
const checkoutForm = $("#checkoutForm");
const checkoutTotal = $("#checkoutTotal");

const successModal = $("#successModal");
const successMessage = $("#successMessage");

const toastContainer = $("#toastContainer");

// -----------------------------------------
// 6. SAFE STORAGE HELPERS
// -----------------------------------------

function readStorage(key, fallback) {
    try {
        const raw = localStorage.getItem(key);

        if (raw === null) {
            return fallback;
        }

        return JSON.parse(raw);

    } catch (error) {
        console.warn("Storage read failed:", error);
        return fallback;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;

    } catch (error) {
        console.warn("Storage write failed:", error);

        showToast(
            "Browser storage is unavailable. Changes may not persist.",
            "error"
        );

        return false;
    }
}

function loadCart() {
    const saved = readStorage(STORAGE_KEYS.cart, []);

    if (!Array.isArray(saved)) {
        return [];
    }

    return saved
        .filter(item => item && Number.isInteger(item.id))
        .map(item => ({
            id: item.id,
            quantity: Number(item.quantity)
        }))
        .filter(item =>
            products.some(product => product.id === item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity >= 1 &&
            item.quantity <= MAX_QUANTITY
        );
}

function loadWishlist() {
    const saved = readStorage(STORAGE_KEYS.wishlist, []);

    if (!Array.isArray(saved)) {
        return [];
    }

    return [...new Set(
        saved.filter(id =>
            Number.isInteger(id) &&
            products.some(product => product.id === id)
        )
    )];
}

// -----------------------------------------
// 7. FORMATTING HELPERS
// -----------------------------------------

const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

function money(amount) {
    return currencyFormatter.format(amount);
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

function getProduct(id) {
    return products.find(product => product.id === id);
}

function getCartQuantity(id) {
    const item = cart.find(item => item.id === id);
    return item ? item.quantity : 0;
}

// -----------------------------------------
// 8. TOAST NOTIFICATIONS
// -----------------------------------------

function showToast(message, type = "success") {
    const toast = document.createElement("div");

    toast.className = `toast ${type}`;
    toast.textContent = message;

    const sequence = ++toastSequence;

    toastContainer.appendChild(toast);

    window.setTimeout(() => {
        toast.remove();
    }, 3000);

    return sequence;
}

// -----------------------------------------
// 9. RENDER PRODUCTS
// -----------------------------------------

function renderProducts() {
    let filtered = products.filter(product => {

        const matchesCategory =
            activeCategory === "All" ||
            product.category === activeCategory;

        const searchText = [
            product.name,
            product.category
        ].join(" ").toLowerCase();

        const matchesSearch =
            searchText.includes(activeSearch.toLowerCase());

        const matchesWishlist =
            !showWishlistOnly ||
            wishlist.includes(product.id);

        return (
            matchesCategory &&
            matchesSearch &&
            matchesWishlist
        );
    });

    switch (activeSort) {
        case "price-low":
            filtered.sort((a, b) => a.price - b.price);
            break;

        case "price-high":
            filtered.sort((a, b) => b.price - a.price);
            break;

        case "rating":
            filtered.sort((a, b) => b.rating - a.rating);
            break;

        case "name":
            filtered.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        default:
            break;
    }

    productGrid.innerHTML = filtered.map(product => {

        const discount = Math.round(
            ((product.oldPrice - product.price) /
            product.oldPrice) * 100
        );

        const isWishlisted = wishlist.includes(product.id);

        const quantityInCart = getCartQuantity(product.id);

        const outOfStock = product.stock === 0;

        const availableStock = Math.max(
            0,
            product.stock - quantityInCart
        );

        let stockText = outOfStock
            ? "Out of stock"
            : availableStock <= 3
                ? `Only ${availableStock} left`
                : "In stock";

        if (quantityInCart > 0 && !outOfStock) {
            stockText = `${quantityInCart} in cart · ${availableStock} available`;
        }

        return `
            <article class="product-card">

                <div class="product-image">

                    <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='https://placehold.co/500x400?text=Product'"
                    >

                    <span class="product-badge">
                        ${escapeHTML(product.badge)}
                    </span>

                    <button
                        class="wishlist-button ${isWishlisted ? "active" : ""}"
                        data-action="wishlist"
                        data-id="${product.id}"
                        aria-label="${isWishlisted ? "Remove from" : "Add to"} wishlist"
                        aria-pressed="${isWishlisted}"
                    >
                        <i class="${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i>
                    </button>

                </div>

                <div class="product-details">

                    <span class="product-category">
                        ${escapeHTML(product.category)}
                    </span>

                    <h3>${escapeHTML(product.name)}</h3>

                    <div class="product-rating">
                        <i class="fa-solid fa-star"></i>
                        ${product.rating}
                        <span>(${product.reviews} reviews)</span>
                    </div>

                    <div class="price-row">

                        <span class="product-price">
                            ${money(product.price)}
                        </span>

                        <span class="old-price">
                            ${money(product.oldPrice)}
                        </span>

                        <span class="discount-percent">
                            ${discount}% OFF
                        </span>

                    </div>

                    <p class="stock-label ${availableStock <= 3 ? "low-stock" : ""}">
                        ${escapeHTML(stockText)}
                    </p>

                    <button
                        class="add-cart-button"
                        data-action="add"
                        data-id="${product.id}"
                        ${availableStock === 0 ? "disabled" : ""}
                    >
                        <i class="fa-solid fa-cart-plus"></i>

                        ${
                            availableStock === 0
                                ? "Unavailable"
                                : quantityInCart > 0
                                    ? "Add Another"
                                    : "Add to Cart"
                        }
                    </button>

                </div>

            </article>
        `;
    }).join("");

    const noProducts = filtered.length === 0;

    productGrid.classList.toggle("hidden", noProducts);
    emptyProducts.classList.toggle("hidden", !noProducts);
}

// -----------------------------------------
// 10. CATEGORY FILTERS
// -----------------------------------------

$("#categoryFilters").addEventListener("click", event => {

    const button = event.target.closest("[data-category]");

    if (!button) {
        return;
    }

    activeCategory = button.dataset.category;

    showWishlistOnly = false;

    $("#wishlistButton").classList.remove("active");

    document.querySelectorAll(".category-btn")
        .forEach(categoryButton => {

            categoryButton.classList.toggle(
                "active",
                categoryButton === button
            );

        });

    renderProducts();
});

document.querySelectorAll("[data-category-link]")
    .forEach(link => {

        link.addEventListener("click", () => {

            activeCategory = link.dataset.categoryLink;

            showWishlistOnly = false;

            document.querySelectorAll(".category-btn")
                .forEach(button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.category === activeCategory
                    );

                });

            renderProducts();

        });

    });

// -----------------------------------------
// 11. SEARCH
// -----------------------------------------

function runSearch() {
    activeSearch = searchInput.value.trim();

    showWishlistOnly = false;

    renderProducts();

    $("#products").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

searchButton.addEventListener("click", runSearch);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        runSearch();
    }
});

searchInput.addEventListener("input", () => {

    if (searchInput.value.trim() === "") {
        activeSearch = "";
        renderProducts();
    }

});

sortSelect.addEventListener("change", () => {
    activeSort = sortSelect.value;
    renderProducts();
});

$("#resetProducts").addEventListener("click", () => {

    activeCategory = "All";
    activeSearch = "";
    activeSort = "featured";
    showWishlistOnly = false;

    searchInput.value = "";
    sortSelect.value = "featured";

    document.querySelectorAll(".category-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category === "All"
            );

        });

    renderProducts();
});

// -----------------------------------------
// 12. CART OPERATIONS
// -----------------------------------------

function addToCart(id) {

    const product = getProduct(id);

    if (!product) {
        return;
    }

    const existingItem = cart.find(item => item.id === id);

    if (product.stock <= 0) {
        showToast("This product is out of stock.", "error");
        return;
    }

    if (existingItem) {

        if (existingItem.quantity >= MAX_QUANTITY) {
            showToast(
                `Maximum ${MAX_QUANTITY} units allowed per product.`,
                "error"
            );
            return;
        }

        if (existingItem.quantity >= product.stock) {
            showToast("No additional stock available.", "error");
            return;
        }

        existingItem.quantity++;

    } else {

        cart.push({
            id,
            quantity: 1
        });

    }

    persistCart();

    renderProducts();
    renderCart();

    showToast(`${product.name} added to your cart.`);
}

function updateQuantity(id, change) {

    const item = cart.find(item => item.id === id);

    if (!item) {
        return;
    }

    const product = getProduct(id);

    if (!product) {
        return;
    }

    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
        removeFromCart(id);
        return;
    }

    if (newQuantity > MAX_QUANTITY) {
        showToast(
            `Maximum ${MAX_QUANTITY} units allowed.`,
            "error"
        );
        return;
    }

    if (newQuantity > product.stock) {
        showToast("Requested quantity exceeds available stock.", "error");
        return;
    }

    item.quantity = newQuantity;

    persistCart();

    renderCart();
    renderProducts();
}

function removeFromCart(id) {

    const product = getProduct(id);

    cart = cart.filter(item => item.id !== id);

    persistCart();

    renderCart();
    renderProducts();

    if (product) {
        showToast(`${product.name} removed from your cart.`);
    }
}

function persistCart() {
    writeStorage(STORAGE_KEYS.cart, cart);
}

// -----------------------------------------
// 13. CART EVENT DELEGATION
// -----------------------------------------

productGrid.addEventListener("click", event => {

    const button = event.target.closest("[data-action]");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);

    if (button.dataset.action === "add") {
        addToCart(id);
    }

    if (button.dataset.action === "wishlist") {
        toggleWishlist(id);
    }
});

cartItems.addEventListener("click", event => {

    const button = event.target.closest("[data-cart-action]");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);

    const action = button.dataset.cartAction;

    if (action === "increase") {
        updateQuantity(id, 1);
    }

    if (action === "decrease") {
        updateQuantity(id, -1);
    }

    if (action === "remove") {
        removeFromCart(id);
    }
});

// -----------------------------------------
// 14. CART TOTAL CALCULATIONS
// -----------------------------------------

function getCartTotals() {

    const subtotal = cart.reduce((sum, item) => {

        const product = getProduct(item.id);

        if (!product) {
            return sum;
        }

        return sum + product.price * item.quantity;

    }, 0);

    let discount = 0;

    if (appliedCoupon && coupons[appliedCoupon]) {

        const coupon = coupons[appliedCoupon];

        if (subtotal >= coupon.minimum) {

            if (coupon.type === "percentage") {
                discount = subtotal * coupon.value / 100;
            }

            if (coupon.type === "fixed") {
                discount = coupon.value;
            }

        }

    }

    // Discount cannot exceed the subtotal.
    discount = Math.min(subtotal, discount);

    // GST is calculated on the discounted subtotal.
    const taxableAmount = Math.max(0, subtotal - discount);

    const tax = taxableAmount * TAX_RATE;

    // Free shipping applies when the original subtotal
    // reaches the configured threshold.
    const shipping =
        subtotal === 0 || subtotal >= FREE_SHIPPING_LIMIT
            ? 0
            : SHIPPING_FEE;

    const total = taxableAmount + tax + shipping;

    return {
        subtotal,
        discount,
        tax,
        shipping,
        total,
        itemCount: cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        )
    };
}

// -----------------------------------------
// 15. RENDER CART
// -----------------------------------------

function renderCart() {

    const totals = getCartTotals();

    cartCount.textContent = totals.itemCount;

    cartSubtitle.textContent =
        `${totals.itemCount} item${totals.itemCount === 1 ? "" : "s"} in your cart`;

    const isEmpty = cart.length === 0;

    cartEmpty.classList.toggle("hidden", !isEmpty);
    cartItems.classList.toggle("hidden", isEmpty);
    cartSummary.classList.toggle("hidden", isEmpty);

    if (isEmpty) {

        cartItems.innerHTML = "";

        appliedCoupon = null;

        couponInput.value = "";

        couponMessage.textContent = "";
        couponMessage.className = "";

    } else {

        cartItems.innerHTML = cart.map(item => {

            const product = getProduct(item.id);

            if (!product) {
                return "";
            }

            return `
                <div class="cart-item">

                    <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                        onerror="this.onerror=null;this.src='https://placehold.co/150x150?text=Product'"
                    >

                    <div>

                        <h4>${escapeHTML(product.name)}</h4>

                        <div class="cart-item-price">
                            ${money(product.price * item.quantity)}
                        </div>

                        <div class="cart-item-controls">

                            <div class="quantity-control">

                                <button
                                    data-cart-action="decrease"
                                    data-id="${product.id}"
                                    aria-label="Decrease quantity"
                                >
                                    <i class="fa-solid fa-minus"></i>
                                </button>

                                <span>${item.quantity}</span>

                                <button
                                    data-cart-action="increase"
                                    data-id="${product.id}"
                                    aria-label="Increase quantity"
                                    ${item.quantity >= Math.min(MAX_QUANTITY, product.stock) ? "disabled" : ""}
                                >
                                    <i class="fa-solid fa-plus"></i>
                                </button>

                            </div>

                            <button
                                class="remove-item"
                                data-cart-action="remove"
                                data-id="${product.id}"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>
            `;

        }).join("");

    }

    subtotalAmount.textContent = money(totals.subtotal);

    discountAmount.textContent = `−${money(totals.discount)}`;

    taxAmount.textContent = money(totals.tax);

    shippingAmount.textContent =
        totals.shipping === 0 && totals.subtotal > 0
            ? "FREE"
            : money(totals.shipping);

    totalAmount.textContent = money(totals.total);

    checkoutButton.disabled = isEmpty;

    if (totals.subtotal === 0) {

        shippingNote.textContent = "Add products to get started.";

    } else if (totals.subtotal < FREE_SHIPPING_LIMIT) {

        shippingNote.textContent =
            `Add ${money(FREE_SHIPPING_LIMIT - totals.subtotal)} more for free delivery.`;

    } else {

        shippingNote.textContent = "Congratulations! You qualify for free delivery.";

    }

    if (
        appliedCoupon &&
        totals.subtotal < coupons[appliedCoupon].minimum
    ) {

        appliedCoupon = null;

        couponInput.value = "";

        couponMessage.textContent =
            "Coupon removed because your cart no longer meets the minimum.";

        couponMessage.className = "error";

    }

}

// -----------------------------------------
// 16. COUPON VALIDATION
// -----------------------------------------

$("#applyCouponButton").addEventListener("click", () => {

    const code = couponInput.value.trim().toUpperCase();

    if (cart.length === 0) {
        showToast("Add products before applying a coupon.", "error");
        return;
    }

    const coupon = coupons[code];

    if (!coupon) {

        appliedCoupon = null;

        couponMessage.textContent =
            "Invalid coupon code. Try SHOP10 or SAVE200.";

        couponMessage.className = "error";

        renderCart();

        return;
    }

    const totals = getCartTotals();

    if (totals.subtotal < coupon.minimum) {

        appliedCoupon = null;

        couponMessage.textContent =
            `Minimum order value: ${money(coupon.minimum)}.`;

        couponMessage.className = "error";

        renderCart();

        return;
    }

    appliedCoupon = code;

    couponMessage.textContent =
        `${code} applied successfully — ${coupon.description}.`;

    couponMessage.className = "success";

    renderCart();

    showToast("Coupon applied successfully!");

});

couponInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        event.preventDefault();
        $("#applyCouponButton").click();
    }

});

// -----------------------------------------
// 17. WISHLIST
// -----------------------------------------

function persistWishlist() {
    writeStorage(STORAGE_KEYS.wishlist, wishlist);
}

function toggleWishlist(id) {

    const product = getProduct(id);

    if (!product) {
        return;
    }

    if (wishlist.includes(id)) {

        wishlist = wishlist.filter(itemId => itemId !== id);

        showToast("Removed from wishlist.");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist.");

    }

    persistWishlist();

    renderProducts();
    renderWishlist();

}

function renderWishlist() {

    wishlistCount.textContent = wishlist.length;

    const items = wishlist
        .map(id => getProduct(id))
        .filter(Boolean);

    wishlistEmpty.classList.toggle("hidden", items.length > 0);

    wishlistItems.innerHTML = items.map(product => {

        return `
            <div class="wishlist-product">

                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    onerror="this.onerror=null;this.src='https://placehold.co/150x150?text=Product'"
                >

                <div>

                    <h4>${escapeHTML(product.name)}</h4>

                    <p>${money(product.price)}</p>

                    <div class="wishlist-actions">

                        <button
                            data-wishlist-action="add"
                            data-id="${product.id}"
                        >
                            Add to Cart
                        </button>

                        <button
                            data-wishlist-action="remove"
                            data-id="${product.id}"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </div>
        `;

    }).join("");

}

wishlistItems.addEventListener("click", event => {

    const button = event.target.closest("[data-wishlist-action]");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);

    if (button.dataset.wishlistAction === "add") {
        addToCart(id);
    }

    if (button.dataset.wishlistAction === "remove") {
        toggleWishlist(id);
    }

});

$("#wishlistButton").addEventListener("click", () => {

    showWishlistOnly = !showWishlistOnly;

    $("#wishlistButton").classList.toggle(
        "active",
        showWishlistOnly
    );

    if (showWishlistOnly) {

        activeCategory = "All";

        document.querySelectorAll(".category-btn")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.category === "All"
                );

            });

        $("#products").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        renderProducts();

    } else {

        renderProducts();

    }

});

$("#openCartButton").addEventListener("click", () => {
    openDrawer("cart");
});

$("#closeCartButton").addEventListener("click", closeDrawers);

$("#continueShopping").addEventListener("click", closeDrawers);

$("#closeWishlistButton").addEventListener("click", closeDrawers);

// -----------------------------------------
// 18. DRAWER ACCESSIBILITY AND OVERLAY
// -----------------------------------------

function openDrawer(type) {

    closeModals();

    lastFocusedElement = document.activeElement;

    const isCart = type === "cart";

    const drawer = isCart ? cartDrawer : wishlistDrawer;

    const otherDrawer = isCart ? wishlistDrawer : cartDrawer;

    otherDrawer.classList.remove("open");
    otherDrawer.setAttribute("aria-hidden", "true");
    otherDrawer.setAttribute("inert", "");

    drawer.removeAttribute("inert");
    drawer.setAttribute("aria-hidden", "false");
    drawer.classList.add("open");

    overlay.classList.add("open");

    document.body.classList.add("no-scroll");

    const closeButton = drawer.querySelector(".close-button");

    if (closeButton) {
        closeButton.focus();
    }

}

function closeDrawers() {

    cartDrawer.classList.remove("open");
    wishlistDrawer.classList.remove("open");

    cartDrawer.setAttribute("aria-hidden", "true");
    wishlistDrawer.setAttribute("aria-hidden", "true");

    cartDrawer.setAttribute("inert", "");
    wishlistDrawer.setAttribute("inert", "");

    overlay.classList.remove("open");

    document.body.classList.remove("no-scroll");

    if (lastFocusedElement && document.contains(lastFocusedElement)) {
        lastFocusedElement.focus();
    }

}

overlay.addEventListener("click", closeDrawers);

// -----------------------------------------
// 19. DARK MODE
// -----------------------------------------

function applyTheme(theme) {

    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    $("#themeToggle").innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

    $("#themeToggle").setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );

}

function initialiseTheme() {

    const savedTheme = readStorage(STORAGE_KEYS.theme, "light");

    applyTheme(savedTheme === "dark" ? "dark" : "light");

}

$("#themeToggle").addEventListener("click", () => {

    const nextTheme = document.body.classList.contains("dark-mode")
        ? "light"
        : "dark";

    applyTheme(nextTheme);

    writeStorage(STORAGE_KEYS.theme, nextTheme);

});

// -----------------------------------------
// 20. CHECKOUT MODAL
// -----------------------------------------

function openModal(modal) {

    closeDrawers();

    lastFocusedElement = document.activeElement;

    modal.classList.add("open");

    document.body.classList.add("no-scroll");

    const firstInput = modal.querySelector(
        "input, textarea, select, button"
    );

    if (firstInput) {
        firstInput.focus();
    }

}

function closeModal(modal) {

    modal.classList.remove("open");

    if (
        !checkoutModal.classList.contains("open") &&
        !successModal.classList.contains("open")
    ) {

        document.body.classList.remove("no-scroll");

    }

    if (lastFocusedElement && document.contains(lastFocusedElement)) {
        lastFocusedElement.focus();
    }

}

function closeModals() {

    checkoutModal.classList.remove("open");
    successModal.classList.remove("open");

    document.body.classList.remove("no-scroll");

}

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {
        showToast("Your cart is empty.", "error");
        return;
    }

    const totals = getCartTotals();

    checkoutTotal.textContent = money(totals.total);

    openModal(checkoutModal);

});

$("#closeCheckoutButton").addEventListener("click", () => {
    closeModal(checkoutModal);
});

checkoutModal.addEventListener("click", event => {

    if (event.target === checkoutModal) {
        closeModal(checkoutModal);
    }

});

successModal.addEventListener("click", event => {

    if (event.target === successModal) {
        closeModal(successModal);
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (successModal.classList.contains("open")) {

            closeModal(successModal);

        } else if (checkoutModal.classList.contains("open")) {

            closeModal(checkoutModal);

        } else {

            closeDrawers();

        }

    }

});

// -----------------------------------------
// 21. PLACE DEMO ORDER
// -----------------------------------------

checkoutForm.addEventListener("submit", event => {

    event.preventDefault();

    if (!checkoutForm.reportValidity()) {
        return;
    }

    if (cart.length === 0) {

        closeModal(checkoutModal);

        showToast("Your cart is empty.", "error");

        return;
    }

    const totals = getCartTotals();

    // Validate the current cart against the demo inventory.
    for (const item of cart) {

        const product = getProduct(item.id);

        if (
            !product ||
            !Number.isInteger(item.quantity) ||
            item.quantity < 1 ||
            item.quantity > Math.min(MAX_QUANTITY, product.stock)
        ) {

            showToast(
                "One or more cart items are unavailable. Please review your cart.",
                "error"
            );

            closeModal(checkoutModal);

            renderCart();
            renderProducts();

            return;
        }

    }

    const formData = new FormData(checkoutForm);

    const orderItems = cart.map(item => {

        const product = getProduct(item.id);

        return {
            productId: product.id,
            name: product.name,
            unitPrice: product.price,
            quantity: item.quantity,
            lineTotal: product.price * item.quantity
        };

    });

    const order = {

        orderId:
            "SS-" +
            Date.now().toString(36).toUpperCase(),

        customer: {

            name: String(formData.get("customerName")).trim(),

            email: String(formData.get("customerEmail")).trim(),

            phone: String(formData.get("customerPhone")).trim(),

            address: String(formData.get("customerAddress")).trim()

        },

        paymentMethod: String(formData.get("paymentMethod")),

        items: orderItems,

        coupon: appliedCoupon,

        subtotal: totals.subtotal,

        discount: totals.discount,

        tax: totals.tax,

        shipping: totals.shipping,

        total: totals.total,

        status: "Demo order placed",

        createdAt: new Date().toISOString()

    };

    // Save only non-sensitive demo order details locally.
    // A real application must create orders on the server.
    const existingOrders = readStorage(
        STORAGE_KEYS.orders,
        []
    );

    const orders = Array.isArray(existingOrders)
        ? existingOrders
        : [];

    orders.push(order);

    const orderSaved = writeStorage(
        STORAGE_KEYS.orders,
        orders
    );

    closeModal(checkoutModal);

    successMessage.textContent =
        `Order ${order.orderId} created. Total: ${money(order.total)}. ` +
        (
            orderSaved
                ? "Your demo order is saved in this browser."
                : "The order could not be saved in browser storage."
        );

    // Award coins to logged-in user (based on order total before coins deduction)
    if (currentUser) {
        const coinsEarned = Math.floor(totals.total * COINS_PER_RUPEE);
        if (coinsEarned > 0) {
            userCoins += coinsEarned;
            writeStorage(STORAGE_KEYS.coins, userCoins);
            renderCoinsUI();

            const badge = document.getElementById("coinsEarnedBadge");
            const earnedText = document.getElementById("coinsEarnedText");
            if (badge && earnedText) {
                earnedText.textContent = `You earned ${coinsEarned} coins! Total: ${userCoins} coins`;
                badge.style.display = "flex";
            }
        }
    }

    // Reset redeemed coins for next session
    redeemedCoins = 0;

    // Clear cart only after successfully saving the demo order.
    if (orderSaved) {

        cart = [];

        appliedCoupon = null;

        persistCart();

    }

    renderCart();
    renderProducts();
    renderWishlist();

    checkoutForm.reset();

    openModal(successModal);

    // Check for surprise gift milestone (every 3rd order)
    if (currentUser) {
        const allOrders = readStorage(STORAGE_KEYS.orders, []);
        if (Array.isArray(allOrders) && allOrders.length > 0 && allOrders.length % 3 === 0) {
            window.setTimeout(() => showSurpriseGift(allOrders.length), 2500);
        }
    }

});

$("#finishOrderButton").addEventListener("click", () => {

    closeModal(successModal);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    showToast("Thank you for shopping with ShopSphere!");

});

// -----------------------------------------
// 22. INITIALISE APPLICATION
// -----------------------------------------

function initialiseApp() {

    initialiseTheme();

    renderProducts();

    renderCart();

    renderWishlist();

    initialiseLoginUI();

    renderCoinsUI();

}

initialiseApp();


// ===========================================
// 23. LOGIN WITH OTP
// ===========================================

const loginModal    = document.getElementById("loginModal");
const loginButton   = document.getElementById("loginButton");
const closeLoginBtn = document.getElementById("closeLoginButton");
const loginStepPhone = document.getElementById("loginStepPhone");
const loginStepOtp   = document.getElementById("loginStepOtp");
const loginPhoneInput = document.getElementById("loginPhone");
const sendOtpBtn    = document.getElementById("sendOtpButton");
const verifyOtpBtn  = document.getElementById("verifyOtpButton");
const resendOtpBtn  = document.getElementById("resendOtpButton");
const backToPhoneBtn = document.getElementById("backToPhoneButton");
const otpSentToEl   = document.getElementById("otpSentTo");
const otpDemoHint   = document.getElementById("otpDemoHint");
const otpTimerEl    = document.getElementById("otpTimer");

// Surprise gifts pool
const SURPRISE_GIFTS = [
    { icon: "🎁", title: "Free Delivery Voucher!", desc: "Your next order ships FREE — no minimum!", coupon: "FREESHIP", color: "#10b981" },
    { icon: "💰", title: "Bonus 500 Coins!", desc: "We've added 500 bonus coins to your wallet.", coupon: null, bonus: 500, color: "#f59e0b" },
    { icon: "🏷️", title: "15% Off Coupon!", desc: "Use code GIFT15 for 15% off your next order.", coupon: "GIFT15", color: "#635bff" },
    { icon: "🎉", title: "VIP Member Upgrade!", desc: "You're now a VIP member — enjoy exclusive offers.", coupon: null, color: "#ec4899" },
    { icon: "🛍️", title: "₹300 Shopping Credit!", desc: "Use code CREDIT300 to get ₹300 off orders above ₹1500.", coupon: "CREDIT300", color: "#3b82f6" }
];

function generateOTP() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

function maskPhone(phone) {
    return "+91 " + phone.slice(0, 2) + "XXXXXX" + phone.slice(-2);
}

function startOtpTimer() {
    let seconds = 30;
    otpTimerEl.textContent = seconds;
    resendOtpBtn.disabled = true;

    if (otpData.timerInterval) {
        clearInterval(otpData.timerInterval);
    }

    otpData.timerInterval = setInterval(() => {
        seconds--;
        otpTimerEl.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(otpData.timerInterval);
            otpData.timerInterval = null;
            resendOtpBtn.disabled = false;
        }
    }, 1000);
}

function showOtpStep() {
    loginStepPhone.classList.add("hidden");
    loginStepOtp.classList.remove("hidden");
    otpSentToEl.textContent = maskPhone(otpData.phone);
    otpDemoHint.textContent = `Demo OTP: ${otpData.code}`;

    // Clear previous OTP inputs
    document.querySelectorAll(".otp-input").forEach(inp => { inp.value = ""; });

    // Focus first input
    const firstOtp = document.querySelector(".otp-input");
    if (firstOtp) { firstOtp.focus(); }

    startOtpTimer();
}

function showPhoneStep() {
    loginStepOtp.classList.add("hidden");
    loginStepPhone.classList.remove("hidden");

    if (otpData.timerInterval) {
        clearInterval(otpData.timerInterval);
        otpData.timerInterval = null;
    }
}

sendOtpBtn.addEventListener("click", () => {
    const phone = loginPhoneInput.value.trim();
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        showToast("Enter a valid 10-digit Indian mobile number.", "error");
        loginPhoneInput.focus();
        return;
    }
    otpData.phone = phone;
    otpData.code  = generateOTP();
    showToast(`OTP sent to ${maskPhone(phone)} (demo)`);
    showOtpStep();
});

loginPhoneInput.addEventListener("keydown", e => {
    if (e.key === "Enter") { sendOtpBtn.click(); }
});

// OTP box auto-advance
document.getElementById("otpBoxes").addEventListener("input", e => {
    const inputs = [...document.querySelectorAll(".otp-input")];
    const idx = inputs.indexOf(e.target);
    if (e.target.value && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
    }
});

document.getElementById("otpBoxes").addEventListener("keydown", e => {
    const inputs = [...document.querySelectorAll(".otp-input")];
    const idx = inputs.indexOf(e.target);
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
        inputs[idx - 1].focus();
    }
});

function getEnteredOtp() {
    return [...document.querySelectorAll(".otp-input")]
        .map(i => i.value)
        .join("");
}

verifyOtpBtn.addEventListener("click", () => {
    const entered = getEnteredOtp();
    if (entered.length < 6) {
        showToast("Enter all 6 OTP digits.", "error");
        return;
    }
    if (entered !== otpData.code) {
        showToast("Incorrect OTP. Try again.", "error");
        document.querySelectorAll(".otp-input").forEach(inp => { inp.value = ""; });
        document.querySelector(".otp-input").focus();
        return;
    }

    // Login success
    currentUser = { phone: otpData.phone };
    writeStorage(STORAGE_KEYS.user, currentUser);

    if (otpData.timerInterval) {
        clearInterval(otpData.timerInterval);
        otpData.timerInterval = null;
    }

    closeModal(loginModal);

    initialiseLoginUI();
    renderCoinsUI();
    renderCart();

    showToast(`Welcome! Logged in as ${maskPhone(otpData.phone)} 🎉`);

    // Award 50 bonus coins on first login
    const isFirstTime = readStorage("shopsphere_first_login", true);
    if (isFirstTime) {
        writeStorage("shopsphere_first_login", false);
        userCoins += 50;
        writeStorage(STORAGE_KEYS.coins, userCoins);
        renderCoinsUI();
        window.setTimeout(() => showToast("🎁 Welcome bonus: 50 coins added!"), 1000);
    }
});

resendOtpBtn.addEventListener("click", () => {
    otpData.code = generateOTP();
    showToast(`New OTP sent to ${maskPhone(otpData.phone)} (demo)`);
    otpDemoHint.textContent = `Demo OTP: ${otpData.code}`;
    document.querySelectorAll(".otp-input").forEach(inp => { inp.value = ""; });
    document.querySelector(".otp-input").focus();
    startOtpTimer();
});

backToPhoneBtn.addEventListener("click", showPhoneStep);

loginButton.addEventListener("click", () => {
    if (currentUser) {
        // Already logged in → logout confirmation
        if (window.confirm(`Logout from ${maskPhone(currentUser.phone)}?`)) {
            currentUser = null;
            writeStorage(STORAGE_KEYS.user, null);
            redeemedCoins = 0;
            initialiseLoginUI();
            renderCoinsUI();
            renderCart();
            showToast("Logged out successfully.");
        }
        return;
    }
    // Show login modal
    showPhoneStep();
    openModal(loginModal);
});

closeLoginBtn.addEventListener("click", () => closeModal(loginModal));

loginModal.addEventListener("click", e => {
    if (e.target === loginModal) { closeModal(loginModal); }
});

function initialiseLoginUI() {
    const btn = document.getElementById("loginButton");
    const btnText = document.getElementById("loginButtonText");
    if (!btn || !btnText) { return; }

    if (currentUser) {
        btnText.textContent = maskPhone(currentUser.phone);
        btn.classList.add("logged-in");
        btn.title = "Click to logout";
    } else {
        btnText.textContent = "Login";
        btn.classList.remove("logged-in");
        btn.title = "Login with OTP";
    }
}

// ===========================================
// 24. COINS SYSTEM
// ===========================================

function renderCoinsUI() {
    const coinsCount = document.getElementById("coinsCount");
    if (coinsCount) {
        coinsCount.textContent = userCoins;
    }

    const coinsBtn = document.getElementById("coinsButton");
    if (coinsBtn) {
        coinsBtn.title = `${userCoins} ShopCoins`;
    }

    // Update the coins box inside cart
    renderCartCoinsBox();
}

function renderCartCoinsBox() {
    const box  = document.getElementById("coinsRedeemBox");
    const avail = document.getElementById("coinsAvailableInCart");
    const btn  = document.getElementById("redeemCoinsButton");
    const msg  = document.getElementById("coinsRedeemMessage");

    if (!box) { return; }

    if (!currentUser) {
        box.style.display = "none";
        return;
    }

    box.style.display = "";
    if (avail) { avail.textContent = userCoins; }

    const redeemable = userCoins >= MIN_COINS_REDEEM;
    if (btn) { btn.disabled = !redeemable || redeemedCoins > 0; }

    if (msg && redeemedCoins > 0) {
        const discount = Math.floor(redeemedCoins * COINS_TO_RUPEE);
        msg.textContent = `✅ ${redeemedCoins} coins redeemed — ₹${discount} discount applied!`;
    } else if (msg) {
        msg.textContent = redeemable ? "" : `Need at least ${MIN_COINS_REDEEM} coins to redeem.`;
    }
}

// Wire up redeem button (set after DOM is ready)
document.addEventListener("DOMContentLoaded", () => {}, false);

// Use event delegation on document for the redeem button since cart may re-render
document.addEventListener("click", e => {
    if (e.target && e.target.id === "redeemCoinsButton") {
        handleRedeemCoins();
    }

    if (e.target && e.target.id === "coinsButton") {
        const count = userCoins;
        showToast(`💰 You have ${count} ShopCoins. Spend ≥${MIN_COINS_REDEEM} in cart for a discount!`);
    }
});

function handleRedeemCoins() {
    if (!currentUser) {
        showToast("Please login to redeem coins.", "error");
        return;
    }
    if (userCoins < MIN_COINS_REDEEM) {
        showToast(`You need at least ${MIN_COINS_REDEEM} coins to redeem.`, "error");
        return;
    }
    if (cart.length === 0) {
        showToast("Add products to your cart first.", "error");
        return;
    }
    if (redeemedCoins > 0) {
        showToast("Coins already redeemed for this order.", "error");
        return;
    }

    // Redeem in multiples of MIN_COINS_REDEEM, up to cart total
    const totals = getCartTotals();
    const maxDiscount = totals.total;
    const maxCoins = Math.min(userCoins, Math.floor(maxDiscount / COINS_TO_RUPEE));
    const coinsToRedeem = Math.floor(maxCoins / MIN_COINS_REDEEM) * MIN_COINS_REDEEM;

    if (coinsToRedeem <= 0) {
        showToast("Not enough coins to redeem for this cart value.", "error");
        return;
    }

    redeemedCoins  = coinsToRedeem;
    userCoins     -= coinsToRedeem;
    writeStorage(STORAGE_KEYS.coins, userCoins);

    renderCoinsUI();
    renderCart();

    const discount = Math.floor(coinsToRedeem * COINS_TO_RUPEE);
    showToast(`🎉 ${coinsToRedeem} coins redeemed! ₹${discount} discount applied.`);
}

// Override getCartTotals to include coins discount
const _origGetCartTotals = getCartTotals;

window.getCartTotals = function getCartTotalsWithCoins() {
    const base = _origGetCartTotals();
    const coinsDiscount = Math.floor(redeemedCoins * COINS_TO_RUPEE);
    const newTotal = Math.max(0, base.total - coinsDiscount);
    return {
        ...base,
        coinsDiscount,
        total: newTotal
    };
};

// Re-bind getCartTotals to the windowed version
// (All internal calls go through the module-level binding already set,
//  this patches the cart summary display only via renderCart hook)

// Patch renderCart to show coins discount line
const _origRenderCart = renderCart;

function renderCartWithCoins() {
    _origRenderCart();

    // Inject coins discount line if applicable
    const totals = _origGetCartTotals();
    const coinsDiscount = Math.floor(redeemedCoins * COINS_TO_RUPEE);
    if (coinsDiscount > 0) {
        const totalEl = document.getElementById("totalAmount");
        if (totalEl) {
            const finalTotal = Math.max(0, totals.total - coinsDiscount);
            totalEl.textContent = money(finalTotal);
        }
        // Update checkout total too
        const checkoutTotalEl = document.getElementById("checkoutTotal");
        if (checkoutTotalEl) {
            const finalTotal = Math.max(0, totals.total - coinsDiscount);
            checkoutTotalEl.textContent = money(finalTotal);
        }
    }

    renderCartCoinsBox();
}

// Replace module renderCart with patched version
window.addEventListener("load", () => {
    // Intercept future renderCart calls by monkey-patching after DOM is set
});

// ===========================================
// 25. SURPRISE GIFTS
// ===========================================

const rewardModal     = document.getElementById("rewardModal");
const closeRewardBtn  = document.getElementById("closeRewardModal");
const claimRewardBtn  = document.getElementById("claimRewardButton");
const rewardContent   = document.getElementById("rewardContent");

function showSurpriseGift(orderCount) {
    const gift = SURPRISE_GIFTS[(orderCount - 1) % SURPRISE_GIFTS.length];

    // Apply any bonus coins
    if (gift.bonus) {
        userCoins += gift.bonus;
        writeStorage(STORAGE_KEYS.coins, userCoins);
        renderCoinsUI();
    }

    // Add any new coupon code to coupons map dynamically
    if (gift.coupon && gift.coupon === "GIFT15") {
        coupons["GIFT15"] = { type: "percentage", value: 15, minimum: 500, description: "15% surprise discount" };
    }
    if (gift.coupon && gift.coupon === "CREDIT300") {
        coupons["CREDIT300"] = { type: "fixed", value: 300, minimum: 1500, description: "₹300 surprise credit" };
    }
    if (gift.coupon && gift.coupon === "FREESHIP") {
        coupons["FREESHIP"] = { type: "fixed", value: 60, minimum: 0, description: "Free delivery voucher" };
    }

    // Build reward content HTML
    const giftItems = [
        gift.coupon
            ? `<div class="reward-gift-item"><i class="fa-solid fa-tag" style="color:${gift.color}"></i><div><strong>${gift.title}</strong><br><small>${gift.desc}</small><br><small>Coupon: <strong>${gift.coupon}</strong></small></div></div>`
            : `<div class="reward-gift-item"><i class="fa-solid fa-coins" style="color:${gift.color}"></i><div><strong>${gift.title}</strong><br><small>${gift.desc}</small></div></div>`
    ];

    rewardContent.innerHTML = `
        <div class="reward-gift-icon">${gift.icon}</div>
        <div class="reward-title">${gift.title}</div>
        <div class="reward-subtitle">Milestone reward for your ${orderCount} order${orderCount > 1 ? "s" : ""}!</div>
        <div class="reward-gifts-list">
            ${giftItems.join("")}
        </div>
        ${userCoins > 0 ? `<p style="font-size:12px;color:var(--muted)">Your current balance: <strong>${userCoins} coins</strong></p>` : ""}
    `;

    openModal(rewardModal);
}

if (closeRewardBtn) {
    closeRewardBtn.addEventListener("click", () => closeModal(rewardModal));
}

if (claimRewardBtn) {
    claimRewardBtn.addEventListener("click", () => {
        closeModal(rewardModal);
        showToast("🎁 Reward claimed! Check your coupons.");
    });
}

if (rewardModal) {
    rewardModal.addEventListener("click", e => {
        if (e.target === rewardModal) { closeModal(rewardModal); }
    });
}

// Also close reward modal on Escape (patch keydown listener)
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && rewardModal && rewardModal.classList.contains("open")) {
        closeModal(rewardModal);
    }
}, true);