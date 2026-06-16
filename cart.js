const productsDB = [
    {
        id: '1',
        name: 'Vestido Casual Chic',
        price: 289.90,
        image: 'assets/Vestido Casual Chic.png',
        description: 'Um vestido fluido e elegante, perfeito para qualquer ocasião. Tecido leve que valoriza as curvas com conforto.',
        sizes: ['M', 'G', 'GG', 'G1', 'G2', 'G3', 'G4']
    },
    {
        id: '2',
        name: 'Conjunto Alfaiataria',
        price: 349.90,
        image: 'assets/Conjunto Alfaiataria.png',
        description: 'Conjunto moderno de alfaiataria. Caimento impecável para um visual sofisticado e profissional.',
        sizes: ['M', 'G', 'GG', 'G1', 'G2', 'G3', 'G4']
    },
    {
        id: '3',
        name: 'Blusa Moderna',
        price: 159.90,
        image: 'assets/Blusa Moderna.png',
        description: 'Blusa versátil com detalhes sutis. Ideal para compor looks casuais ou mais arrumados.',
        sizes: ['M', 'G', 'GG', 'G1', 'G2', 'G3', 'G4']
    },
    {
        id: '4',
        name: 'Short Elegante',
        price: 179.90,
        image: 'assets/Short Elegante.png',
        description: 'Short com corte em alfaiataria, oferecendo conforto e muito estilo para dias mais quentes.',
        sizes: ['M', 'G', 'GG', 'G1', 'G2', 'G3', 'G4']
    }
];

let cart = JSON.parse(localStorage.getItem('thiffany_cart')) || [];

function saveCart() {
    localStorage.setItem('thiffany_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(product, size, quantity) {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, size, quantity });
    }
    saveCart();
    showFeedback('Produto adicionado ao carrinho!');
    openCartDrawer();
}

function removeFromCart(id, size) {
    cart = cart.filter(item => !(item.id === id && item.size === size));
    saveCart();
}

function updateQuantity(id, size, change) {
    const item = cart.find(item => item.id === id && item.size === size);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id, size);
        } else {
            saveCart();
        }
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartUI() {
    const countElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    countElements.forEach(el => {
        el.textContent = totalItems;
        if (totalItems > 0) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });

    const drawerItems = document.getElementById('cart-drawer-items');
    if (drawerItems) {
        if (cart.length === 0) {
            drawerItems.innerHTML = '<p class="empty-cart-msg">Seu carrinho está vazio.</p>';
        } else {
            drawerItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Tam: ${item.size}</p>
                        <p class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                        <div class="cart-item-actions">
                            <button onclick="updateQuantity('${item.id}', '${item.size}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', '${item.size}', 1)">+</button>
                            <button class="remove-btn" onclick="removeFromCart('${item.id}', '${item.size}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        const totalEl = document.getElementById('cart-drawer-total');
        if (totalEl) {
            totalEl.textContent = `R$ ${getCartTotal().toFixed(2).replace('.', ',')}`;
        }
    }
}

function openCartDrawer() {
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
}

function closeCartDrawer() {
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
}

function showFeedback(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast-feedback';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }, 10);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    
    const cartToggleBtns = document.querySelectorAll('.cart-toggle');
    cartToggleBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCartDrawer();
    }));

    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.addEventListener('click', closeCartDrawer);
    
    const closeBtn = document.getElementById('cart-close');
    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
});
