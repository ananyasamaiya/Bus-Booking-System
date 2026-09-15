document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        
        
        const isRoot = !window.location.pathname.includes('/passenger/');
        const rootPrefix = isRoot ? '' : '../';
        const passengerPrefix = isRoot ? 'passenger/' : '';

        const navbarHTML = `
        <nav class="passenger-navbar">
            <div class="container d-flex justify-content-between align-items-center py-3">
                <a href="${rootPrefix}index.html" class="passenger-brand">
                    <img src="https://t3.ftcdn.net/jpg/02/14/29/22/360_F_214292295_dsMiBAa83bToIrvyKXeXDJyZtaK0S2bv.jpg" alt="Logo" class="brand-logo-img">
                    <div class="text-dark fw-bold fs-4">GoBus</div>
                </a>
                
                <div class="passenger-nav-links d-none d-md-flex align-items-center" id="passengerNavMenu">
                    <a href="${rootPrefix}searchResults.html" data-page="searchResults.html">Search Buses</a>
                    <a href="${passengerPrefix}dashboard.html" data-page="dashboard.html">My Bookings</a>
                    <a href="${passengerPrefix}profile.html" data-page="profile.html">Profile/Settings</a>
                    <button class="logout-btn ms-2" onclick="localStorage.removeItem('isLoggedIn'); window.location.href='${rootPrefix}index.html'">Logout</button>
                </div>
                
                <button class="btn d-md-none border-0 fs-4 text-secondary">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>
        </nav>
        `;

        navbarContainer.innerHTML = navbarHTML;

        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        
        const links = document.querySelectorAll('#passengerNavMenu a');
        
        links.forEach(link => {
            const dataPage = link.getAttribute('data-page');

            if (currentPage === dataPage || 
               (currentPage === 'seat-selection.html' && dataPage === 'searchResults.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});
