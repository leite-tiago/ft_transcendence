import { AbstractView } from './AbstractView';
import { Tournament } from '../tournament/Tournament';

export class TournamentPage extends AbstractView {
    private tournament: Tournament | null = null;

    public async render(container: HTMLElement): Promise<void> {
        this.setTitle('Tournament');

        container.innerHTML = `
            <div class="page tournament-container">
                <h2>Tournament Mode</h2>

                <div id="tournament-setup">
                    <h3>Add Players</h3>
                    <form id="add-player-form" class="tournament-form">
                        <div class="form-group">
                            <label for="player-alias">Player Alias:</label>
                            <input
                                type="text"
                                id="player-alias"
                                name="alias"
                                placeholder="Enter player name"
                                required
                                maxlength="20"
                            />
                        </div>
                        <button type="submit" class="btn">Add Player</button>
                    </form>

                    <div id="players-container">
                        <h3>Registered Players (<span id="player-count">0</span>)</h3>
                        <div id="players-list" class="players-list"></div>
                    </div>

                    <button id="start-tournament" class="btn btn-primary" disabled>
                        Start Tournament (min. 2 players)
                    </button>
                </div>

                <div id="tournament-matches" style="display: none;">
                    <h3>Tournament Matches</h3>
                    <div id="current-match"></div>
                    <div id="matches-list" class="matches-container"></div>
                </div>
            </div>
        `;

        this.tournament = new Tournament();
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        const form = document.getElementById('add-player-form') as HTMLFormElement;
        const startBtn = document.getElementById('start-tournament') as HTMLButtonElement;

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('player-alias') as HTMLInputElement;
            const alias = input.value.trim();

            if (alias && this.tournament) {
                this.tournament.addPlayer(alias);
                input.value = '';
                this.updatePlayersList();
            }
        });

        startBtn?.addEventListener('click', () => {
            if (this.tournament) {
                this.tournament.startTournament();
                this.showMatches();
            }
        });
    }

    private updatePlayersList(): void {
        if (!this.tournament) return;

        const players = this.tournament.getPlayers();
        const listContainer = document.getElementById('players-list');
        const countSpan = document.getElementById('player-count');
        const startBtn = document.getElementById('start-tournament') as HTMLButtonElement;

        if (countSpan) {
            countSpan.textContent = players.length.toString();
        }

        if (listContainer) {
            listContainer.innerHTML = players.map((player, index) => `
                <div class="player-tag">
                    <span>${player}</span>
                    <button onclick="window.removePlayer(${index})">×</button>
                </div>
            `).join('');
        }

        if (startBtn) {
            startBtn.disabled = players.length < 2;
            startBtn.textContent = players.length < 2
                ? `Start Tournament (min. 2 players)`
                : `Start Tournament with ${players.length} players`;
        }

        // Setup remove player function
        (window as any).removePlayer = (index: number) => {
            this.tournament?.removePlayer(index);
            this.updatePlayersList();
        };
    }

    private showMatches(): void {
        const setupDiv = document.getElementById('tournament-setup');
        const matchesDiv = document.getElementById('tournament-matches');

        if (setupDiv) setupDiv.style.display = 'none';
        if (matchesDiv) matchesDiv.style.display = 'block';

        this.displayMatches();
    }

    private displayMatches(): void {
        if (!this.tournament) return;

        const matches = this.tournament.getMatches();
        const matchesList = document.getElementById('matches-list');

        if (matchesList) {
            matchesList.innerHTML = matches.map((match, index) => `
                <div class="match-card">
                    <div class="match-players">
                        <strong>Match ${index + 1}:</strong> ${match.player1} vs ${match.player2}
                    </div>
                    <a href="/game" data-link class="btn">Play Match</a>
                </div>
            `).join('');
        }
    }
}
