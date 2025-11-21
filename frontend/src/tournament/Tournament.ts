interface Match {
    player1: string;
    player2: string;
    winner?: string;
}

export class Tournament {
    private players: string[] = [];
    private matches: Match[] = [];
    private currentMatchIndex: number = 0;

    public addPlayer(alias: string): void {
        if (!this.players.includes(alias)) {
            this.players.push(alias);
        }
    }

    public removePlayer(index: number): void {
        this.players.splice(index, 1);
    }

    public getPlayers(): string[] {
        return [...this.players];
    }

    public startTournament(): void {
        if (this.players.length < 2) {
            throw new Error('At least 2 players are required');
        }

        this.matches = this.generateMatches();
        this.currentMatchIndex = 0;
    }

    private generateMatches(): Match[] {
        const matches: Match[] = [];
        const playersCopy = [...this.players];

        // Round-robin tournament: each player plays against every other player
        for (let i = 0; i < playersCopy.length; i++) {
            for (let j = i + 1; j < playersCopy.length; j++) {
                matches.push({
                    player1: playersCopy[i],
                    player2: playersCopy[j],
                });
            }
        }

        return matches;
    }

    public getMatches(): Match[] {
        return [...this.matches];
    }

    public getCurrentMatch(): Match | null {
        if (this.currentMatchIndex < this.matches.length) {
            return this.matches[this.currentMatchIndex];
        }
        return null;
    }

    public recordMatchWinner(winner: string): void {
        if (this.currentMatchIndex < this.matches.length) {
            this.matches[this.currentMatchIndex].winner = winner;
            this.currentMatchIndex++;
        }
    }

    public getStandings(): { player: string; wins: number }[] {
        const standings: { [player: string]: number } = {};

        // Initialize all players with 0 wins
        this.players.forEach(player => {
            standings[player] = 0;
        });

        // Count wins
        this.matches.forEach(match => {
            if (match.winner) {
                standings[match.winner]++;
            }
        });

        // Convert to array and sort
        return Object.entries(standings)
            .map(([player, wins]) => ({ player, wins }))
            .sort((a, b) => b.wins - a.wins);
    }

    public isComplete(): boolean {
        return this.currentMatchIndex >= this.matches.length;
    }

    public reset(): void {
        this.players = [];
        this.matches = [];
        this.currentMatchIndex = 0;
    }
}
