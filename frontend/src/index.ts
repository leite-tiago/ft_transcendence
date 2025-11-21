import './styles/main.css';
import { Router } from './router/Router';

document.addEventListener('DOMContentLoaded', () => {
    const router = new Router();
    router.init();
});
