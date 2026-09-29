const statusBar = document.querySelector('.status-bar');
const bottomNav = document.getElementById('bottom-nav');
const loadingOverlay = document.getElementById('loading-overlay');

// Simulated App State
const state = {
    isLoggedIn: false,
    permissionsGranted: false
};

// Navigation Core
function navigate(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const target = document.getElementById(pageId);
    target.classList.add('active');

    // Bottom Nav Visibility Logic
    if (target.classList.contains('has-nav')) {
        bottomNav.classList.remove('hidden');
        bottomNav.classList.add('visible');
    } else {
        bottomNav.classList.remove('visible');
        setTimeout(() => bottomNav.classList.add('hidden'), 300);
    }

    // Status Bar Color logic based on background
    if (pageId === 'page-splash') {
        statusBar.classList.add('light');
    } else {
        statusBar.classList.remove('light');
    }
}

// Bottom Tab Navigation
function navTab(pageId, element) {
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    element.classList.add('active');
    navigate(pageId);
}

// Splash Screen Logic
window.addEventListener('DOMContentLoaded', () => {
    // Simulate App Load
    setTimeout(() => {
        if (!state.isLoggedIn) {
            navigate('page-onboarding');
        } else {
            navigate('page-home');
        }
    }, 2500);
    
    updateClock();
    setInterval(updateClock, 1000);
});

// Auth Logic
function handleLogin() {
    const email = document.getElementById('email-input').value;
    const pass = document.getElementById('pass-input').value;
    
    if (email === '' || pass === '') {
        alert("Please enter both email and password.");
        return;
    }

    loadingOverlay.classList.add('show');
    
    setTimeout(() => {
        loadingOverlay.classList.remove('show');
        state.isLoggedIn = true;
        navigate('page-permissions');
    }, 1500);
}

function handleLogout() {
    loadingOverlay.classList.add('show');
    setTimeout(() => {
        loadingOverlay.classList.remove('show');
        state.isLoggedIn = false;
        
        // Reset Inputs
        document.getElementById('email-input').value = '';
        document.getElementById('pass-input').value = '';
        
        navigate('page-login');
    }, 1000);
}

// Permissions Logic
function showPermissionAlert() {
    document.getElementById('mock-alert').classList.add('show');
}

function acceptPermissions() {
    document.getElementById('mock-alert').classList.remove('show');
    state.permissionsGranted = true;
    
    loadingOverlay.classList.add('show');
    setTimeout(() => {
        loadingOverlay.classList.remove('show');
        navigate('page-home');
    }, 800);
}

// In-App Interactions
function processPayment() {
    const btn = document.getElementById('pay-installment-btn');
    const parentRow = btn.closest('.member-row');
    const dueText = parentRow.querySelector('.due');
    
    // Animate Button
    btn.innerHTML = '<div class="spinner" style="width: 20px; height: 20px; border-width: 2px; margin: 0 auto;"></div>';
    
    setTimeout(() => {
        // Change UI to Paid Status
        dueText.textContent = 'Paid Just Now';
        dueText.style.color = 'var(--success)';
        
        const successCheck = document.createElement('div');
        successCheck.className = 'member-status check';
        successCheck.textContent = '✓';
        
        btn.replaceWith(successCheck);
        
        // Update Score visually
        document.querySelector('.score-ring').textContent = '795';
        document.querySelector('.score-ring').style.transform = 'scale(1.2)';
        document.querySelector('.score-ring').style.transition = 'transform 0.3s';
        
        setTimeout(() => {
            document.querySelector('.score-ring').style.transform = 'scale(1)';
        }, 300);
        
    }, 1500);
}

// OS Clock Simulation
function updateClock() {
    const now = new Date();
    const timeString = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');
    document.querySelector('.time').textContent = timeString;
}
