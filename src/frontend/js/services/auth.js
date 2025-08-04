import axios from 'axios';

export async function login(email, password) {
    try {
        const response = await axios.get('http://localhost:3000/authUsers');
        const users = response.data;
        const user = users.find(u => u.email === email.trim() && u.password === password);

        if (user) {
            localStorage.setItem('session', JSON.stringify({
                loggedIn: true,
                role: user.role,
                userId: user.id,
                email: user.email,
                username: user.name
            }));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error during login:', error);
        return false;
    }
}

export function logout() {
    localStorage.removeItem('session');
}

export function isAuthenticated() {
    const session = JSON.parse(localStorage.getItem('session'));
    return session && session.loggedIn;
}

export function isAdmin() {
    const session = JSON.parse(localStorage.getItem('session'));
    return session && session.loggedIn && session.role === 'admin';
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('session'));
}