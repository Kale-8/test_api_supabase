import {isAdmin, isAuthenticated} from './services/auth.js';
import {renderDashboard} from './views/dashboard.js';
import {renderFormModal} from './components/formModal.js';
import {renderLogin} from './views/login.js';
import {renderSidebar} from './components/sidebar.js';
import {renderRegister} from './views/register.js';
import {renderNotFound} from "./views/not-found.js";
import {renderEnrollments} from "./views/enrollments.js";

export const router = async () => {
    const path = location.pathname;
    const view = document.getElementById('view');

    renderSidebar();

    if (isAuthenticated() && (path === '/login' || path === '/register')) {
        history.replaceState(null, null, '/dashboard');
        await renderDashboard(view);
        return;
    }

    if (!isAuthenticated() && (path !== '/login' && path !== '/register')) {
        history.replaceState(null, null, '/login');
        renderLogin(view);
        return;
    }

    switch (path) {
        case '/':
        case '/dashboard':
            await renderDashboard(view);
            break;
        case '/register':
            renderRegister(view);
            break;
        case '/login':
            renderLogin(view);
            break;
        case '/enrollments':
            if (!isAdmin()) {
                await renderEnrollments(view);
            } else {
                history.replaceState(null, null, '/dashboard');
                await renderDashboard(view);
            }
            break;
        default:
            if (path.startsWith('/event/edit')) {
                if (isAdmin()) {
                    const id = path.split('/').pop();
                    await renderFormModal(view, id);
                } else {
                    history.replaceState(null, null, '/dashboard');
                    await renderDashboard(view);
                }
            } else if (path === '/event/create') {
                if (isAdmin()) {
                    await renderFormModal(view);
                } else {
                    history.replaceState(null, null, '/dashboard');
                    await renderDashboard(view);
                }
            } else renderNotFound(view);
    }
};