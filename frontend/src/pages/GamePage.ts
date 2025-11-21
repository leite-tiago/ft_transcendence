import { AbstractView } from './AbstractView';
import { PongGame } from '../game/PongGame';

export class GamePage extends AbstractView {
    private game: PongGame | null = null;

    public async render(container: HTMLElement): Promise<void> {
        this.setTitle('Play Game');

        container.innerHTML = `
            <div class="page">
                <h2>Pong Game</h2>
                <p>Player 1: W/S keys | Player 2: Arrow Up/Down keys</p>
                <br>
                <div style="text-align: center;">
                    <canvas id="pong-canvas" width="800" height="600"></canvas>
                </div>
                <div style="text-align: center; margin-top: 1rem;">
                    <button id="start-game" class="btn btn-primary">Start Game</button>
                    <button id="reset-game" class="btn">Reset</button>
                </div>
            </div>
        `;

        // Initialize game
        const canvas = document.getElementById('pong-canvas') as HTMLCanvasElement;
        if (canvas) {
            this.game = new PongGame(canvas);

            const startBtn = document.getElementById('start-game');
            const resetBtn = document.getElementById('reset-game');

            startBtn?.addEventListener('click', () => {
                this.game?.start();
            });

            resetBtn?.addEventListener('click', () => {
                this.game?.reset();
            });
        }
    }
}
