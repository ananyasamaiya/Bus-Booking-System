document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {

        const sidebarHTML = `
        <aside class="dashboard-sidebar">
            <div class="sidebar-logo d-flex align-items-center fs-20">
                <img src="https://t3.ftcdn.net/jpg/02/14/29/22/360_F_214292295_dsMiBAa83bToIrvyKXeXDJyZtaK0S2bv.jpg" alt="Logo" class="sidebar-brand-img">
                GoBus Operator
            </div>
            <ul class="sidebar-menu" id="sidebarMenu">
                <li><a href="dashboard-home.html" data-page="dashboard-home.html"><i class="fa-solid fa-house"></i> Dashboard</a></li>
                <li><a href="routes.html" data-page="routes.html"><i class="fa-solid fa-route"></i> Route Planning</a></li>
                <li><a href="bus-record.html" data-page="bus-record.html"><i class="fa-solid fa-list"></i> List Bus Record</a></li>
                <li><a href="scheduling.html" data-page="scheduling.html"><i class="fa-regular fa-calendar-alt"></i> Scheduling</a></li>
                <li><a href="booking-management.html" data-page="booking-management.html"><i class="fa-solid fa-ticket"></i> Booking Management</a></li>
            </ul>
        </aside>
        `;

        sidebarContainer.innerHTML = sidebarHTML;

        const currentPage = window.location.pathname.split('/').pop() || 'dashboard-home.html';
        
        const links = document.querySelectorAll('#sidebarMenu a');
        
        links.forEach(link => {
            const dataPage = link.getAttribute('data-page');

            if (currentPage === dataPage || 
               (currentPage === 'add-route.html' && dataPage === 'routes.html') ||
               (currentPage === 'route-stops.html' && dataPage === 'routes.html') ||
               (currentPage === 'select-route.html' && dataPage === 'routes.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});
