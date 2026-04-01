document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. KIT FILTERING LOGIC ---
    const filterButtons = document.querySelectorAll('#kit-selector button');
    const kitCards = document.querySelectorAll('#kit-selector [style*="grid-template-columns"] > div');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active styling from all buttons
            filterButtons.forEach(btn => {
                btn.style.background = 'transparent';
                btn.style.color = '#4a5568';
            });

            // Add active styling to clicked button
            button.style.background = '#3182ce';
            button.style.color = 'white';

            const category = button.textContent.trim();

            kitCards.forEach(card => {
                const cardCategory = card.querySelector('span[style*="text-transform: uppercase"]').textContent.trim();
                
                if (category === 'All Kits' || cardCategory.toLowerCase() === category.toLowerCase()) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 2. SIMPLE CART LOGIC ---
    let cartCount = 0;
    const cartDisplay = document.querySelector('a[href="cart"]');
    const addButtons = document.querySelectorAll('button:contains("Add Tray to Cart"), .kit-btn');

    // Helper to handle "Add to Cart" clicks
    document.querySelectorAll('button').forEach(btn => {
        if(btn.textContent.includes('Add') || btn.textContent.includes('Tray')) {
            btn.addEventListener('click', (e) => {
                cartCount++;
                updateCartUI();
                
                // Visual feedback on button
                const originalText = btn.textContent;
                btn.textContent = '✓ Added';
                btn.style.background = '#48bb78';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '#2d3748';
                }, 1500);
            });
        }
    });

    function updateCartUI() {
        if (cartDisplay) {
            cartDisplay.textContent = `Cart (${cartCount})`;
        }
    }

    // --- 3. FORM SUBMISSION ---
    const procurementForm = document.querySelector('form');
    if (procurementForm) {
        procurementForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = procurementForm.querySelector('input[type="email"]').value;
            alert(`Thank you! A catalog and bulk pricing guide has been sent to: ${email}`);
            procurementForm.reset();
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. KIT FILTERING LOGIC ---
    // This allows users to click "Diagnostic" or "Restorative" to filter the kits
    const filterButtons = document.querySelectorAll('#kit-selector button');
    const kitCards = document.querySelectorAll('#kit-selector div[style*="border: 1px solid"]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Reset styles for all buttons
            filterButtons.forEach(btn => {
                btn.style.background = 'transparent';
                btn.style.color = '#4a5568';
                btn.style.borderColor = '#e2e8f0';
            });

            // Set active style for clicked button
            button.style.background = '#3182ce';
            button.style.color = 'white';
            button.style.borderColor = '#3182ce';

            const category = button.textContent.trim();

            kitCards.forEach(card => {
                const cardCategory = card.querySelector('span[style*="text-transform: uppercase"]').textContent.trim();
                
                if (category === 'All Kits' || cardCategory.toLowerCase() === category.toLowerCase()) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => card.style.opacity = '1', 10); // Simple fade-in effect
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 2. CART & NOTIFICATION SYSTEM ---
    let cartCount = 0;
    const cartText = document.querySelector('a[href="cart"]');

    const addToCartButtons = document.querySelectorAll('button');
    
    addToCartButtons.forEach(btn => {
        if (btn.textContent.includes('Add Tray') || btn.className === 'kit-btn') {
            btn.addEventListener('click', () => {
                cartCount++;
                if (cartText) cartText.textContent = ` Cart (${cartCount})`;
                
                // Visual feedback on the button
                const originalText = btn.textContent;
                btn.textContent = "✓ Added to Tray";
                btn.style.background = "#48bb78"; // Green for success
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = "#2d3748";
                }, 1500);
            });
        }
    });

    // --- 3. CUSTOM CURSOR LOGIC ---
    // Creates the "dot and ring" effect seen in modern medical/tech sites
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // --- 4. SCROLL REVEAL ANIMATION ---
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
});
document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    let cart = [];
    const cartDisplay = document.querySelector('a[href="cart"]');
    
    // Create Modal Elements dynamically if they don't exist in HTML
    const modalList = document.getElementById('cart-items-list');
    const modalTotal = document.getElementById('cart-total');

    // --- 1. SEARCH FUNCTIONALITY ---
    const searchForm = document.querySelector('form[role="search"]');
    const searchInput = searchForm.querySelector('input');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching inventory for: "${query}"...`);
            // In a live app, you would filter your product grid here
        }
    });

    // --- 2. NAVBAR & HERO NAVIGATION (Smooth Scroll) ---
    document.querySelectorAll('.nav-link, .hero-section a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // --- 3. KIT SELECTOR FILTERING ---
    const filterButtons = document.querySelectorAll('#kit-selector button');
    const productCards = document.querySelectorAll('#kit-selector div[style*="border: 1px solid"]');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset button styles (Using the colors from your HTML)
            filterButtons.forEach(b => {
                b.style.background = 'transparent';
                b.style.color = '#4a5568';
            });
            // Highlight active
            btn.style.background = '#3182ce';
            btn.style.color = 'white';

            const category = btn.textContent.trim();

            productCards.forEach(card => {
                const cardCategory = card.querySelector('span[style*="text-transform: uppercase"]').textContent.trim();
                if (category === 'All Kits' || cardCategory.toLowerCase() === category.toLowerCase()) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 4. CART LOGIC (Targeting your "Add Tray to Cart" buttons) ---
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.textContent.includes('Add Tray')) {
            const card = e.target.closest('div[style*="padding: 20px"]');
            const itemName = card.querySelector('h4').textContent;
            const itemPrice = card.querySelector('span[style*="font-weight: bold"]').textContent;
            
            addToCart(itemName, itemPrice);

            // Button Feedback
            const originalText = e.target.textContent;
            e.target.textContent = "✓ Added";
            e.target.style.background = "#48bb78";
            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.style.background = "#2d3748";
            }, 1000);
        }
    });

    function addToCart(name, priceStr) {
        const price = parseFloat(priceStr.replace('$', ''));
        cart.push({ name, price });
        updateCartUI();
    }

    function updateCartUI() {
        // Update Navbar Link
        if (cartDisplay) cartDisplay.textContent = `Cart (${cart.length})`;

        // Update Modal Content (If modal exists)
        if (modalList) {
            modalList.innerHTML = cart.length === 0 
                ? '<p class="text-center">Your tray is empty.</p>' 
                : cart.map((item, i) => `
                    <div class="d-flex justify-content-between mb-2">
                        <span>${item.name}</span>
                        <strong>$${item.price.toFixed(2)}</strong>
                    </div>`).join('');
            
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            modalTotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    // --- 5. INSTITUTIONAL FORM SUBMISSION ---
    const bulkForm = document.querySelector('section form');
    if (bulkForm) {
        bulkForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = bulkForm.querySelector('button');
            submitBtn.textContent = "Processing...";
            
            setTimeout(() => {
                alert("Bulk pricing request sent! Our DSO team will email you shortly.");
                submitBtn.textContent = "Request Bulk Pricing";
                bulkForm.reset();
            }, 1500);
        });
    }

    // --- 6. FLOATING WHATSAPP LOGIC ---
    const whatsappBtn = document.querySelector('.floating-chat');
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'scale(1.1) translateY(-5px)';
    });
    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'scale(1) translateY(0)';
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MAKE "EXPLORE CATALOG" WORK ---
    // This finds the "Explore Catalog" button and scrolls to the products
    const heroBtn = document.querySelector('.hero-section aria');
    // We manually target the kit section since it needs an ID
    const kitSection = document.querySelector('#kit-selector');
    
    document.querySelector('a[href="#shop"]').addEventListener('click', (e) => {
        e.preventDefault();
        kitSection.scrollIntoView({ behavior: 'smooth' });
    });

    // --- 2. MAKE CATEGORY FILTERS WORK ---
    const filterBtns = document.querySelectorAll('#kit-selector button');
    const kits = document.querySelectorAll('#kit-selector div[style*="border: 1px solid"]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Update: Change button colors
            filterBtns.forEach(b => {
                b.style.background = 'transparent';
                b.style.color = '#4a5568';
            });
            btn.style.background = '#3182ce';
            btn.style.color = 'white';

            const category = btn.textContent.trim();
            
            // Hide/Show Logic
            kits.forEach(kit => {
                const type = kit.querySelector('span[style*="text-transform: uppercase"]').textContent.trim();
                if (category === 'All Kits' || type.toLowerCase() === category.toLowerCase()) {
                    kit.style.display = 'block';
                } else {
                    kit.style.display = 'none';
                }
            });
        });
    });

    // --- 3. MAKE "ADD TRAY" BUTTONS WORK ---
    let count = 0;
    const cartLink = document.querySelector('a[href="cart"]');

    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('Add Tray')) {
            button.addEventListener('click', () => {
                count++;
                // Update the Cart text in your Navbar
                if (cartLink) cartLink.textContent = `Cart (${count})`;
                
                // Animation Feedback
                button.textContent = "✓ Added";
                button.style.background = "#48bb78";
                setTimeout(() => {
                    button.textContent = "Add Tray to Cart";
                    button.style.background = "#2d3748";
                }, 1000);
            });
        }
    });

    // --- 4. MAKE THE SEARCH BUTTON WORK ---
    const searchBtn = document.querySelector('.btn-outline-success');
    const searchInput = document.querySelector('input[type="search"]');

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchInput.value) {
            alert("Searching for: " + searchInput.value);
        } else {
            alert("Please enter a tool name to search.");
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- NAVBAR SMOOTH SCROLLING ---
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the ID from the href (e.g., #shop)
            const targetId = this.getAttribute('href');
            
            // If it's an internal link (starts with #)
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Stop the instant "jump"
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Smoothly slide to the section
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- ACTIVE STATE TOGGLE ---
    // This makes the clicked link look "selected"
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});
const searchForm = document.querySelector('form[role="search"]');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stops the page from refreshing
    const query = searchForm.querySelector('input').value;
    if(query) {
        alert("Searching for: " + query);
        // Here you would normally filter your products
    }
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SMOOTH SCROLL FOR ALL NAV LINKS ---
    document.querySelectorAll('.nav-link, .hero-section a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // 70px offset for fixed navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 2. SEARCH BAR LOGIC ---
    const searchForm = document.querySelector('form[role="search"]');
    const searchInput = searchForm.querySelector('input');
    const searchBtn = searchForm.querySelector('button');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents page refresh
        const term = searchInput.value.trim();
        if (term) {
            alert(`Searching for ${term} in our database...`);
        } else {
            alert("Please enter a product name.");
        }
    });

    // --- 3. EQUIPMENT "REQUEST QUOTE" BUTTONS ---
    document.querySelectorAll('#equipment button').forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.parentElement.querySelector('h4').textContent;
            alert(`Our sales team will contact you regarding the ${productName} pricing.`);
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for ALL internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate the position with a 70px offset for the fixed navbar
                const offsetPosition = targetElement.offsetTop - 70;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Make the "Service" links show a message for now
    document.querySelectorAll('#support-section a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Our Technical Portal is opening... please wait.");
        });
    });
});
// --- ACCOUNT MANAGEMENT ---

// 1. Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateAccountUI(isLoggedIn);
});

// 2. Function to update the UI based on auth state
function updateAccountUI(isLoggedIn) {
    const guestOptions = document.getElementById('guest-options');
    const userOptions = document.getElementById('user-options');
    const accountLink = document.getElementById('accountDropdown');

    if (isLoggedIn) {
        guestOptions.style.display = 'none';
        userOptions.style.display = 'block';
        accountLink.innerText = ' Dr. Smith'; // Example name
    } else {
        guestOptions.style.display = 'block';
        userOptions.style.display = 'none';
        accountLink.innerText = ' Account';
    }
}

// 3. Simulating a Login (You can trigger this from a login form)
function handleLogin() {
    // In a real app, you'd validate credentials with a server here
    localStorage.setItem('isLoggedIn', 'true');
    updateAccountUI(true);
    alert("Welcome back to TeethCare!");
}

// 4. Handle Logout
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    updateAccountUI(false);
    window.location.reload(); // Refresh to clear any sensitive data
}

// Optional: Placeholder for the login modal trigger
function showLoginModal() {
    // If you have a Bootstrap modal with id="loginModal"
    // var myModal = new bootstrap.Modal(document.getElementById('loginModal'));
    // myModal.show();
    
    // For now, let's just simulate it with a prompt for testing:
    const confirmLogin = confirm("Would you like to log in to your TeethCare account?");
    if(confirmLogin) handleLogin();
}
// --- UPDATED ACCOUNT LOGIC ---

// Function to trigger the modal (Update your HTML Account dropdown to call this)
function showLoginModal() {
    const authModal = new bootstrap.Modal(document.getElementById('authModal'));
    authModal.show();
}

// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate successful login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', 'Dr. Smith'); // Mock data
    
    // Close modal
    const modalElement = document.getElementById('authModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    
    // Refresh UI
    updateAccountUI(true);
});

// Update the updateAccountUI function from the previous step
function updateAccountUI(isLoggedIn) {
    const guestOptions = document.getElementById('guest-options');
    const userOptions = document.getElementById('user-options');
    const accountLink = document.getElementById('accountDropdown');
    const storedName = localStorage.getItem('userName') || 'Account';

    if (isLoggedIn) {
        guestOptions.style.display = 'none';
        userOptions.style.display = 'block';
        accountLink.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${storedName}`;
    } else {
        guestOptions.style.display = 'block';
        userOptions.style.display = 'none';
        accountLink.innerHTML = `Account`;
    }
}
// Toggle between Login and Forgot Password view
function toggleForgotPass(showForgot) {
    const loginSec = document.getElementById('loginSection');
    const forgotSec = document.getElementById('forgotPassSection');
    
    if(showForgot) {
        loginSec.style.display = 'none';
        forgotSec.style.display = 'block';
    } else {
        loginSec.style.display = 'block';
        forgotSec.style.display = 'none';
    }
}

// Optional: Reset view whenever the modal is closed/opened
const authModalElement = document.getElementById('authModal');
authModalElement.addEventListener('hidden.bs.modal', function () {
    toggleForgotPass(false); // Reset to login view for next time
});
// --- PROFILE SETTINGS LOGIC ---

function openSettings() {
    // Hide main landing sections
    document.querySelector('.hero-section').style.display = 'none';
    document.getElementById('kit-selector').style.display = 'none';
    document.getElementById('equipment').style.display = 'none';
    
    // Show settings section
    const settingsSec = document.getElementById('profile-settings');
    settingsSec.style.display = 'block';
    
    // Pre-fill fields with current data
    document.getElementById('settingsName').value = localStorage.getItem('userName') || 'Dr. Smith';
    document.getElementById('settingsEmail').value = localStorage.getItem('userEmail') || 'clinic@example.com';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeSettings() {
    // Hide settings and show main sections again
    document.getElementById('profile-settings').style.display = 'none';
    document.querySelector('.hero-section').style.display = 'block';
    document.getElementById('kit-selector').style.display = 'block';
    document.getElementById('equipment').style.display = 'block';
}

// Handle Form Submission
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newName = document.getElementById('settingsName').value;
    const newEmail = document.getElementById('settingsEmail').value;
    
    // Save to local storage
    localStorage.setItem('userName', newName);
    localStorage.setItem('userEmail', newEmail);
    
    // Update Navbar UI
    updateAccountUI(true);
    
    alert("Profile updated successfully!");
    closeSettings();
});