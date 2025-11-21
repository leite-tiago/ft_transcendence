# ft_transcendence

A web-based Pong game with multiplayer capabilities and tournament system, built as part of the 42 curriculum.

## 🎮 Features

- **Real-time Pong Game**: Classic Pong gameplay with two-player support on the same keyboard
- **Tournament System**: Organize tournaments with multiple players
- **Single Page Application**: Built with TypeScript for smooth navigation
- **Secure HTTPS**: SSL/TLS encryption for all connections
- **Responsive Design**: Modern UI with glassmorphism effects

## 🛠️ Technologies

- **Frontend**: TypeScript, Webpack, HTML5 Canvas
- **Backend**: PHP 8.2 (pure PHP, no frameworks)
- **Web Server**: Nginx with HTTPS
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- Docker
- Docker Compose
- Make (optional, for convenience)

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd ft_transcendence
```

2. **Create environment file**
```bash
cp .env.example .env
```

3. **Build and start the containers**
```bash
docker-compose up --build
```

4. **Access the application**
Open your browser and navigate to:
```
https://localhost
```

**Note**: You'll see a security warning because we use self-signed SSL certificates. This is normal for development. Click "Advanced" and proceed to the site.

## 📁 Project Structure

```
ft_transcendence/
├── frontend/               # TypeScript frontend application
│   ├── src/
│   │   ├── game/          # Pong game logic
│   │   ├── pages/         # SPA pages
│   │   ├── router/        # Client-side routing
│   │   ├── styles/        # CSS styles
│   │   ├── tournament/    # Tournament system
│   │   └── index.ts       # Entry point
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── webpack.config.js
├── backend/               # PHP backend
│   ├── index.php
│   └── Dockerfile
├── nginx/                 # Nginx configuration
│   ├── conf/
│   │   └── default.conf
│   ├── ssl/              # SSL certificates (auto-generated)
│   ├── generate-ssl.sh
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## 🎯 How to Play

### Single Game Mode
1. Navigate to "Play Game" from the home page
2. Click "Start Game"
3. **Player 1 Controls**: W (up) / S (down)
4. **Player 2 Controls**: Arrow Up / Arrow Down
5. First to 5 points wins!

### Tournament Mode
1. Navigate to "Tournament" from the home page
2. Add at least 2 players by entering their aliases
3. Click "Start Tournament"
4. Play through each match in sequence
5. View the tournament bracket and standings

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm install
npm run dev        # Development server with hot reload
npm run build      # Production build
```

### Rebuild Containers
```bash
docker-compose down
docker-compose up --build
```

### View Logs
```bash
docker-compose logs -f          # All services
docker-compose logs -f frontend # Specific service
```

## 🔒 Security Features

- ✅ HTTPS/TLS encryption
- ✅ Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- ✅ Input validation (form constraints)
- ✅ XSS protection
- ✅ CORS configuration

## 📝 Project Requirements (Mandatory Part)

This implementation satisfies the following mandatory requirements:

- ✅ Single-page application with TypeScript
- ✅ Browser back/forward button support
- ✅ Compatible with latest Firefox
- ✅ No unhandled errors or warnings
- ✅ Docker containerization with single command launch
- ✅ Live Pong game with two players
- ✅ Tournament system with player registration
- ✅ Matchmaking system
- ✅ Identical paddle speeds for all players
- ✅ Classic Pong gameplay (1972 style)
- ✅ HTTPS connection
- ✅ Form validation
- ✅ Secure routing

## 🎨 Customization

You can customize various aspects of the game:

- **Game Speed**: Edit `PongGame.ts` to adjust ball and paddle speeds
- **Winning Score**: Modify the win condition in `PongGame.ts`
- **Colors & Styles**: Update `main.css` for visual changes
- **Tournament Format**: Extend `Tournament.ts` for different tournament types

## 🧪 Testing

To test the application:

1. Check HTTPS is working: `https://localhost`
2. Test navigation: Use browser back/forward buttons
3. Test game: Play a full game to 5 points
4. Test tournament: Create tournament with 3+ players
5. Check security headers: Use browser DevTools Network tab

## 📚 Future Modules (Not Implemented Yet)

This is the base implementation. Future modules could include:

- User authentication & management
- Remote multiplayer
- Database integration
- AI opponent
- 3D graphics
- Live chat
- And more...

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Stop other services using ports 80/443
docker-compose down
sudo lsof -i :80
sudo lsof -i :443
```

### SSL Certificate Issues
```bash
# Regenerate certificates
docker-compose down
rm nginx/ssl/*.pem
docker-compose up --build
```

### Permission Issues (42 Campus)
If running on campus computers:
```bash
# Use /goinfre or /sgoinfre for Docker storage
export DOCKER_HOST=unix:///goinfre/$USER/docker.sock
```

## 👥 Contributors

- Your Name (@your-username)

## 📄 License

This project is part of the 42 school curriculum.

## 🙏 Acknowledgments

- Original Pong game by Atari (1972)
- 42 School for the project guidelines
- The open-source community

---

**Made with ❤️ at 42**
