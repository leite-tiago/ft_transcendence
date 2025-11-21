import { AbstractView } from './AbstractView';

export class HomePage extends AbstractView {
    public async render(container: HTMLElement): Promise<void> {
        this.setTitle('Home');
        
        container.innerHTML = `
            <div class="page">
                <h2>Welcome to ft_transcendence</h2>
                <p>The ultimate Pong gaming experience!</p>
                <br>
                <p>Play the classic Pong game against your friends in real-time multiplayer matches or compete in exciting tournaments.</p>
                <br>
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <a href="/game" data-link class="btn btn-primary">Play Now</a>
                    <a href="/tournament" data-link class="btn">Start Tournament</a>
                </div>
            </div>
        `;
    }
}
