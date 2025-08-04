export const renderNotFound = (tag) => {
    tag.innerHTML = `<div class="not-found">
            <h1>404</h1>
            <p>¡Oops! This page doesn't exist</p>
            <img 
                src="https://illustrations.popsy.co/white/crashed-error.svg" 
                alt="404 Illustration" 
                class="illustration"
            >
            <a href="/" class="btn-home">
                <i class="fas fa-home"></i>
                Go back to home
            </a>
        </div>`;
}