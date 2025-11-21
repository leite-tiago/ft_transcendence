import { HomePage } from '../pages/HomePage';
import { GamePage } from '../pages/GamePage';
import { TournamentPage } from '../pages/TournamentPage';

interface Route {
    path: string;
    view: () => any;
}

export class Router {
    private routes: Route[] = [
        { path: '/', view: () => new HomePage() },
        { path: '/game', view: () => new GamePage() },
        { path: '/tournament', view: () => new TournamentPage() },
    ];

    constructor() {
        this.navigateTo = this.navigateTo.bind(this);
    }

    public init(): void {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.matches('[data-link]')) {
                e.preventDefault();
                const href = target.getAttribute('href');
                if (href) {
                    this.navigateTo(href);
                }
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.router();
        });

        // Initial route
        this.router();
    }

    public navigateTo(url: string): void {
        history.pushState(null, '', url);
        this.router();
    }

    private async router(): Promise<void> {
        // Find matching route
        const potentialMatches = this.routes.map(route => ({
            route,
            isMatch: route.path === location.pathname,
        }));

        let match = potentialMatches.find(match => match.isMatch);

        // Default to home page if no match
        if (!match) {
            match = {
                route: this.routes[0],
                isMatch: true,
            };
        }

        const view = match.route.view();
        const content = document.getElementById('content');
        
        if (content) {
            content.innerHTML = '';
            await view.render(content);
        }
    }
}
