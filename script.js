// Booking Modal
function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'block';
  }
  
  function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
  }
  
  // Order Confirmation Modal
  function openOrderModal() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const orderSummary = document.getElementById('orderSummary');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    orderSummary.innerHTML = `
      <p><strong>Order Details:</strong></p>
      ${cart.map(item => `<p>${item.quantity}x ${item.name} ${item.customInstructions ? `(${item.customInstructions})` : ''} - $${(item.price * item.quantity).toFixed(2)}</p>`).join('')}
      <p><strong>Total:</strong> $${total.toFixed(2)}</p>
    `;
    document.getElementById('orderModal').style.display = 'block';
  }
  
  function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
  }
  
  function confirmOrder() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const pointsEarned = Math.floor(total / 2);
    updateLoyaltyPoints(pointsEarned);
    document.getElementById('orderCount').textContent = parseInt(document.getElementById('orderCount').textContent) + 1;
    alert(`Order confirmed for $${total.toFixed(2)}! +${pointsEarned} Loyalty Points earned. We’ll confirm soon.`);
    cart = [];
    updateCart();
    closeOrderModal();
  }
  
  // Customization Modal
  function openCustomizeModal(dishName) {
    document.getElementById('customizeDishName').textContent = dishName;
    document.getElementById('customizeModal').style.display = 'block';
  }
  
  function closeCustomizeModal() {
    document.getElementById('customizeModal').style.display = 'none';
  }
  
  document.getElementById('customizeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const dishName = document.getElementById('customizeDishName').textContent;
    const customInstructions = document.getElementById('customInstructions').value;
    const cartItem = cart.find(item => item.name === dishName);
    if (cartItem) {
      cartItem.customInstructions = customInstructions;
    } else {
      cart.push({ name: dishName, price: 0, quantity: 0, customInstructions: customInstructions });
    }
    alert(`Customization saved for ${dishName}: ${customInstructions}`);
    closeCustomizeModal();
    updateCart();
  });
  
  // Lightbox
  function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
  }
  
  function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
  }
  
  // Scroll-to-Top Button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  };
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Theme Toggle
  document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    this.textContent = document.body.classList.contains('dark-theme') ? 'Toggle Theme (Dark)' : 'Toggle Theme (Light)';
  });
  
  // Form Submissions
  document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const promoCode = document.getElementById('promoCode').value.toUpperCase();
    const specialRequests = document.getElementById('specialRequests').value;
    const validCodes = { 'LUXE25': 25, 'STAY10': 10 };
    const discount = validCodes[promoCode] ? validCodes[promoCode] : 0;
    updateLoyaltyPoints(50);
    document.getElementById('bookingCount').textContent = parseInt(document.getElementById('bookingCount').textContent) + 1;
    alert(`Booking submitted! ${discount > 0 ? `${discount}% discount applied.` : 'No discount applied.'} ${specialRequests ? `Special Requests: ${specialRequests}` : ''} +50 Loyalty Points earned!`);
    closeBookingModal();
  });
  
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent! We’ll get back to you soon.');
    this.reset();
  });
  
  document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    this.reset();
  });
  
  // Availability Checker (Simulated)
  document.getElementById('availabilityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const checkin = new Date(document.getElementById('checkinDate').value);
    const checkout = new Date(document.getElementById('checkoutDate').value);
    const today = new Date();
    
    if (checkin < today || checkout <= checkin) {
      document.getElementById('availabilityResult').textContent = 'Please select valid dates.';
    } else {
      document.getElementById('availabilityResult').textContent = 'Deluxe Room: Available | Grand Suite: Occupied';
    }
  });
  
  // Virtual Tour (Simulated)
  function openVirtualTour() {
    alert('Launching Virtual Tour... (This is a placeholder. Integrate a 360° tour here.)');
  }
  
  // Toggle Room Availability
  function toggleAvailability(roomId) {
    const roomCard = document.querySelector(`.room-card[data-room-id="${roomId}"] .status`);
    if (roomCard.classList.contains('available')) {
      roomCard.classList.remove('available');
      roomCard.classList.add('occupied');
      roomCard.textContent = 'Occupied';
    } else {
      roomCard.classList.remove('occupied');
      roomCard.classList.add('available');
      roomCard.textContent = 'Available';
    }
  }
  
  // Refresh Occupancy (Simulated)
  function refreshOccupancy() {
    const statuses = document.querySelectorAll('.room-card .status');
    statuses.forEach(status => {
      if (Math.random() > 0.5) {
        status.classList.remove('occupied');
        status.classList.add('available');
        status.textContent = 'Available';
      } else {
        status.classList.remove('available');
        status.classList.add('occupied');
        status.textContent = 'Occupied';
      }
    });
    alert('Occupancy status refreshed!');
  }
  
  // Suggest Room Upgrade
  function suggestUpgrade(currentRoom) {
    if (currentRoom === 'deluxe') {
      alert('Upgrade to Grand Suite for an additional $150/night (10% off regular price)! Click "Book Now" to proceed.');
    } else {
      alert('You’re already in our best room! Enjoy your stay.');
    }
  }
  
  // Live Chat
  function openChat() {
    document.getElementById('liveChat').style.display = 'block';
    document.getElementById('chatBtn').style.display = 'none';
  }
  
  function closeChat() {
    document.getElementById('liveChat').style.display = 'none';
    document.getElementById('chatBtn').style.display = 'block';
  }
  
  document.getElementById('chatForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('chatMessage').value;
    const chatBody = document.querySelector('.chat-body');
    chatBody.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    chatBody.innerHTML += `<p><strong>Support:</strong> Thanks for your message! We’ll assist you soon.</p>`;
    document.getElementById('chatMessage').value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
  });
  
  // Room Comparison Tool (Continued)
  function compareRooms() {
    const room1 = document.getElementById('room1').value;
    const room2 = document.getElementById('room2').value;
    const rooms = {
      deluxe: { name: 'Deluxe Room', price: 250, features: 'Wi-Fi, Smart TV, Mini-Bar, Room Service', rating: '4.5/5', capacity: 2 },
      suite: { name: 'Grand Suite', price: 450, features: 'Wi-Fi, Smart TV, Mini-Bar, Jacuzzi, Private Balcony', rating: '5/5', capacity: 4 }
    };
  
    if (room1 === room2) {
      document.getElementById('comparisonResult').innerHTML = '<p>Please select two different rooms to compare.</p>';
      return;
    }
  
    const comparison = `
      <h3>Room Comparison</h3>
      <table>
        <tr><th>Feature</th><th>${rooms[room1].name}</th><th>${rooms[room2].name}</th></tr>
        <tr><td>Price</td><td>$${rooms[room1].price}/night</td><td>$${rooms[room2].price}/night</td></tr>
        <tr><td>Features</td><td>${rooms[room1].features}</td><td>${rooms[room2].features}</td></tr>
        <tr><td>Rating</td><td>${rooms[room1].rating}</td><td>${rooms[room2].rating}</td></tr>
        <tr><td>Capacity</td><td>${rooms[room1].capacity} Guests</td><td>${rooms[room2].capacity} Guests</td></tr>
      </table>
    `;
    document.getElementById('comparisonResult').innerHTML = comparison;
  }
  
  // Cart Management
  let cart = [];
  
  function addToCart(name, price, button) {
    const quantity = parseInt(button.previousElementSibling.value);
    const existingItem = cart.find(item => item.name === name && !item.customInstructions);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }
    updateCart();
  }
  
  function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = cart.map((item, index) => `
      <p>${item.quantity}x ${item.name} ${item.customInstructions ? `(${item.customInstructions})` : ''} - $${(item.price * item.quantity).toFixed(2)}
      <button class="btn" onclick="removeFromCart(${index})">Remove</button></p>
    `).join('');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }
  
  function clearCart() {
    cart = [];
    updateCart();
  }
  
  // Menu Filtering
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      filterMenu();
    });
  });
  
  document.querySelectorAll('.dietary-filter input').forEach(checkbox => {
    checkbox.addEventListener('change', filterMenu);
  });
  
  document.getElementById('menuSearch').addEventListener('input', filterMenu);
  document.getElementById('priceSort').addEventListener('change', sortMenu);
  
  function filterMenu() {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const searchTerm = document.getElementById('menuSearch').value.toLowerCase();
    const dietaryFilters = Array.from(document.querySelectorAll('.dietary-filter input:checked')).map(cb => cb.dataset.dietary);
  
    document.querySelectorAll('.menu-item').forEach(item => {
      const category = item.dataset.category;
      const dietary = item.dataset.dietary.split(' ');
      const name = item.querySelector('h4').textContent.toLowerCase();
      const matchesCategory = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = name.includes(searchTerm);
      const matchesDietary = dietaryFilters.length === 0 || dietaryFilters.every(filter => dietary.includes(filter));
  
      item.classList.toggle('hidden', !(matchesCategory && matchesSearch && matchesDietary));
    });
  }
  
  function sortMenu() {
    const sortValue = document.getElementById('priceSort').value;
    const menuItems = Array.from(document.querySelectorAll('.menu-item'));
  
    menuItems.sort((a, b) => {
      const priceA = parseFloat(a.dataset.price);
      const priceB = parseFloat(b.dataset.price);
      if (sortValue === 'low-to-high') return priceA - priceB;
      if (sortValue === 'high-to-low') return priceB - priceA;
      return 0;
    });
  
    const menuList = document.getElementById('menuList');
    menuItems.forEach(item => menuList.appendChild(item));
  }
  
  // Toggle Menu Item Availability
  function toggleItemAvailability(itemName) {
    const item = document.querySelector(`.menu-item h4:contains("${itemName}")`).parentElement.parentElement;
    const availability = item.querySelector('.availability');
    const isAvailable = availability.classList.contains('available');
    availability.classList.toggle('available', !isAvailable);
    availability.classList.toggle('out-of-stock', isAvailable);
    availability.textContent = isAvailable ? 'Out of Stock' : 'In Stock';
    item.dataset.available = !isAvailable;
  }
  
  // Loyalty Points
  let loyaltyPoints = 0;
  
  function updateLoyaltyPoints(points) {
    loyaltyPoints += points;
    document.getElementById('pointsDisplay').textContent = `Current Points: ${loyaltyPoints}`;
  }
  
  function redeemPoints() {
    if (loyaltyPoints >= 100) {
      loyaltyPoints -= 100;
      document.getElementById('pointsDisplay').textContent = `Current Points: ${loyaltyPoints}`;
      alert('100 points redeemed! You’ve earned a $10 discount on your next booking.');
    } else {
      alert('You need at least 100 points to redeem.');
    }
  }
  
  // Clock
  function updateClock() {
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    document.getElementById('timeDisplay').textContent = now;
  }
  setInterval(updateClock, 1000);
  updateClock();
  
  // Review Submission
  document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('reviewName').value;
    const text = document.getElementById('reviewText').value;
    const sentiment = text.toLowerCase().includes('bad') ? 'negative' : 'positive';
    
    const testimonial = document.createElement('div');
    testimonial.className = 'testimonial';
    testimonial.dataset.sentiment = sentiment;
    testimonial.innerHTML = `
      <img src="./images/guest-default.jpg" alt="Guest" class="guest-img">
      <p>"${text}"</p>
      <h4>- ${name}</h4>
      <p class="sentiment">Sentiment: ${sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}</p>
    `;
    document.getElementById('testimonialContainer').appendChild(testimonial);
    
    alert('Thank you for your review!');
    this.reset();
  });
  
  // Custom :contains selector for older browsers
  jQuery.expr[':'].contains = jQuery.expr.createPseudo(function(arg) {
    return function(elem) {
      return jQuery(elem).text().toLowerCase().indexOf(arg.toLowerCase()) >= 0;
    };
  });