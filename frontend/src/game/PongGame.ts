interface Paddle {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    score: number;
}

interface Ball {
    x: number;
    y: number;
    radius: number;
    speedX: number;
    speedY: number;
}

export class PongGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private animationId: number | null = null;
    private isRunning: boolean = false;

    private player1: Paddle;
    private player2: Paddle;
    private ball: Ball;

    private keys: { [key: string]: boolean } = {};

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const context = canvas.getContext('2d');

        if (!context) {
            throw new Error('Could not get canvas context');
        }

        this.ctx = context;

        // Initialize paddles
        this.player1 = {
            x: 20,
            y: this.canvas.height / 2 - 50,
            width: 10,
            height: 100,
            speed: 5,
            score: 0,
        };

        this.player2 = {
            x: this.canvas.width - 30,
            y: this.canvas.height / 2 - 50,
            width: 10,
            height: 100,
            speed: 5,
            score: 0,
        };

        // Initialize ball
        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            radius: 8,
            speedX: 4,
            speedY: 4,
        };

        this.setupEventListeners();
        this.draw();
    }

    private setupEventListeners(): void {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    public start(): void {
        if (!this.isRunning) {
            this.isRunning = true;
            this.gameLoop();
        }
    }

    public reset(): void {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        this.player1.score = 0;
        this.player2.score = 0;
        this.resetBall();
        this.draw();
    }

    private resetBall(): void {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;

        // Random direction
        const angle = (Math.random() * Math.PI / 2) - Math.PI / 4;
        const direction = Math.random() < 0.5 ? 1 : -1;

        this.ball.speedX = direction * 4 * Math.cos(angle);
        this.ball.speedY = 4 * Math.sin(angle);
    }

    private gameLoop(): void {
        if (!this.isRunning) return;

        this.update();
        this.draw();

        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    private update(): void {
        // Move paddles
        if (this.keys['w'] && this.player1.y > 0) {
            this.player1.y -= this.player1.speed;
        }
        if (this.keys['s'] && this.player1.y < this.canvas.height - this.player1.height) {
            this.player1.y += this.player1.speed;
        }
        if (this.keys['ArrowUp'] && this.player2.y > 0) {
            this.player2.y -= this.player2.speed;
        }
        if (this.keys['ArrowDown'] && this.player2.y < this.canvas.height - this.player2.height) {
            this.player2.y += this.player2.speed;
        }

        // Move ball
        this.ball.x += this.ball.speedX;
        this.ball.y += this.ball.speedY;

        // Ball collision with top and bottom
        if (this.ball.y - this.ball.radius < 0 || this.ball.y + this.ball.radius > this.canvas.height) {
            this.ball.speedY = -this.ball.speedY;
        }

        // Ball collision with paddles
        if (this.checkCollision(this.ball, this.player1)) {
            this.ball.speedX = Math.abs(this.ball.speedX);
            this.ball.speedX *= 1.05; // Slight speed increase
        }

        if (this.checkCollision(this.ball, this.player2)) {
            this.ball.speedX = -Math.abs(this.ball.speedX);
            this.ball.speedX *= 1.05; // Slight speed increase
        }

        // Score points
        if (this.ball.x - this.ball.radius < 0) {
            this.player2.score++;
            this.resetBall();
        }

        if (this.ball.x + this.ball.radius > this.canvas.width) {
            this.player1.score++;
            this.resetBall();
        }

        // Check for winner
        if (this.player1.score >= 5 || this.player2.score >= 5) {
            this.isRunning = false;
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        }
    }

    private checkCollision(ball: Ball, paddle: Paddle): boolean {
        return (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y
        );
    }

    private draw(): void {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw center line
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([10, 10]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Draw paddles
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height);
        this.ctx.fillRect(this.player2.x, this.player2.y, this.player2.width, this.player2.height);

        // Draw ball
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw scores
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.player1.score.toString(), this.canvas.width / 4, 60);
        this.ctx.fillText(this.player2.score.toString(), (this.canvas.width * 3) / 4, 60);

        // Draw winner message
        if (!this.isRunning && (this.player1.score >= 5 || this.player2.score >= 5)) {
            this.ctx.font = '36px Arial';
            const winner = this.player1.score >= 5 ? 'Player 1' : 'Player 2';
            this.ctx.fillText(`${winner} Wins!`, this.canvas.width / 2, this.canvas.height / 2);
        }
    }
}
