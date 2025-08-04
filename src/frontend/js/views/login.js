import { login } from '../services/auth.js';

export const renderLogin = (tag) => {
    tag.innerHTML = `<div class="login-page">
        <div class="login-container">
            <form class="form-login">
                <h2>Login</h2>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter email" required>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter password" required>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-save">Login</button>
                </div>
            </form>
            <br>
            <p>Don't have an account? <a data-link href="/register">Register here <i class="fas fa-user-plus"></i></a></p>
        </div>
    </div>`;

    document.querySelector('.form-login').onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const success = await login(formData.get('email'), formData.get('password'));
        if (success) {
            history.pushState(null, null, '/dashboard');
            window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
            alertify.error('Invalid credentials');
        }
    };
}