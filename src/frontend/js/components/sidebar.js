import {logout, isAdmin, getCurrentUser} from '../services/auth.js';

export const renderSidebar = () => {
    const user = getCurrentUser();
    const sidebar = document.querySelector('.sidebar');

    function capitalizeFirstLetter(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (!user) {
        sidebar.style.display = 'none';
        return;
    }

    sidebar.style.display = 'flex';
    sidebar.innerHTML = `
    <div class="sidebar-header">
            <h2>Events</h2>
            <img src="https://i.pravatar.cc/150?u=${user.username}" alt="User picture">
            <h3>${user.username}</h3>
            <span>${capitalizeFirstLetter(user.role)}</span>
        </div>
        <nav>
        ${isAdmin() ? '' : `<a href="/enrollments" data-link><i class="fa-solid fa-bookmark"></i>Enrollments</a>`}
            <a href="/dashboard" data-link><i class="fa-solid fa-graduation-cap"></i>Events</a>
            <a href="/login" id="logout">Logout<i class="fa-solid fa-right-from-bracket"></i></a>
        </nav>
        <br>
  `;

    const button = document.getElementById('logout');
    if (button) {
        button.onclick = () => {
            logout();
            history.pushState(null, null, button.href);
            window.dispatchEvent(new PopStateEvent('popstate'));
        };
    }

    const currentPath = location.pathname;
    const links = sidebar.querySelectorAll('[data-link]');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

}