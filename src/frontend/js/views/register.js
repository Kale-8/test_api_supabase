import {addEntry} from '../services/storage.js';

export const renderRegister = (tag) => {

    tag.innerHTML = `
    <div class="login-page">
        <div class="login-container">
            <form class="form-register">
                <h2>Register New User</h2>
                
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                
                <div class="form-group">
                    <label for="confirm">Confirm Password</label>
                    <input type="password" id="confirm" name="confirm" required>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-save">Register</button>
                </div>
            </form>
            <br>
            <p>Already have an account? <a data-link href="/login">Login here <i class="fa-solid fa-right-to-bracket"></i></a></p>
        </div>
    </div>
    `;

    const form = document.querySelector('.form-register');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm');

    const confirmPasswords = () => {
        if (password.value !== confirmPassword.value) {
            alertify.error('Passwords do not match');
            password.value = '';
            confirmPassword.value = '';
            return false;
        }
        return true;
    }

    form.onsubmit = async (event) => {
        event.preventDefault();
        if (!confirmPasswords()) {
            return;
        }
        const formData = new FormData(form);

        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: 'visitor'
        };

        try {
            await addEntry(userData, 'users');
            alertify.success('User registered successfully');
            history.pushState(null, null, '/dashboard');
            window.dispatchEvent(new PopStateEvent('popstate'));
        } catch (error) {
            console.error('Error:', error);
        }
    };
};