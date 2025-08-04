import {router} from './router.js';
import {renderSidebar} from './components/sidebar.js';
import {isAuthenticated} from './services/auth.js';

renderSidebar();
document.querySelector('.sidebar').style.display = isAuthenticated() ? 'flex' : 'none';
(async () => await router())();
window.addEventListener('popstate', router);
document.body.addEventListener('click', (event) => {
    const link = event.target.closest('[data-link]');
    if (link) {
        event.preventDefault();
        history.pushState(null, null, link.href);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }
});