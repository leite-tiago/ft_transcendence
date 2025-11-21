# Quick Start Guide - ft_transcendence

## 🚀 Início Rápido (3 passos)

### 1. Executar o setup
```bash
./setup.sh
```
ou
```bash
make install
make up
```

### 2. Abrir o navegador
```
https://localhost
```

### 3. Jogar!
- Clique em "Play Now" ou "Start Tournament"

---

## 📝 Comandos Úteis

### Usando Make (Recomendado)
```bash
make install   # Setup inicial
make up        # Iniciar aplicação
make down      # Parar aplicação
make restart   # Reiniciar
make logs      # Ver logs
make clean     # Limpar tudo
```

### Usando Docker Compose
```bash
docker-compose up --build -d   # Build e iniciar
docker-compose down            # Parar
docker-compose logs -f         # Ver logs
docker-compose ps              # Ver status
```

---

## 🎮 Como Jogar

### Modo Jogo Normal
1. Ir para "Play Game"
2. Clicar "Start Game"
3. **Jogador 1**: W (cima) / S (baixo)
4. **Jogador 2**: Seta Cima / Seta Baixo
5. Primeiro a chegar aos 5 pontos ganha!

### Modo Torneio
1. Ir para "Tournament"
2. Adicionar pelo menos 2 jogadores (escrever alias e clicar "Add Player")
3. Clicar "Start Tournament"
4. Jogar cada partida na ordem apresentada
5. Ver o ranking final

---

## 🔧 Estrutura do Projeto

```
frontend/
├── src/
│   ├── game/          # Lógica do jogo Pong
│   ├── pages/         # Páginas da SPA
│   ├── router/        # Sistema de routing
│   ├── styles/        # CSS
│   ├── tournament/    # Sistema de torneio
│   └── index.ts       # Entry point

backend/
└── index.php          # Backend PHP básico

nginx/
├── conf/              # Configuração nginx
└── ssl/               # Certificados SSL (auto-gerados)
```

---

## ✅ Requisitos Implementados

- ✅ SPA com TypeScript
- ✅ Suporte para botões Back/Forward do browser
- ✅ Docker com um único comando
- ✅ Jogo Pong multiplayer (2 jogadores)
- ✅ Sistema de torneio
- ✅ Registo de aliases
- ✅ Matchmaking automático
- ✅ HTTPS com SSL/TLS
- ✅ Validação de formulários
- ✅ Velocidade idêntica para todos os jogadores

---

## 🛠️ Desenvolvimento

### Modificar Frontend
1. Editar ficheiros em `frontend/src/`
2. Rebuild: `docker-compose up --build -d`
3. Ou usar `npm run dev` dentro da pasta frontend

### Modificar Backend
1. Editar `backend/index.php`
2. As mudanças são automáticas (volume montado)

### Modificar Estilos
1. Editar `frontend/src/styles/main.css`
2. Rebuild frontend

---

## 🎨 Personalização

### Alterar Velocidade do Jogo
Editar `frontend/src/game/PongGame.ts`:
```typescript
speed: 5,        // Velocidade dos paddles
speedX: 4,       // Velocidade X da bola
speedY: 4,       // Velocidade Y da bola
```

### Alterar Pontuação Máxima
Em `PongGame.ts`:
```typescript
if (this.player1.score >= 5 || this.player2.score >= 5)
```

### Alterar Cores
Editar `frontend/src/styles/main.css`

---

## 🐛 Problemas Comuns

### Porta em uso
```bash
make down
sudo lsof -i :80
sudo lsof -i :443
```

### Certificado SSL
```bash
make clean
make install
```

### Permissões no 42
```bash
export DOCKER_HOST=unix:///goinfre/$USER/docker.sock
```

---

## 📚 Próximos Passos (Módulos)

Depois de ter a base a funcionar, podes adicionar:
- 🔐 Sistema de autenticação de users
- 🌐 Multiplayer remoto (WebSockets)
- 💾 Base de dados (PostgreSQL)
- 🤖 Adversário AI
- 🎨 Gráficos 3D (Three.js)
- 💬 Chat em tempo real
- 📊 Estatísticas e histórico
- 🏆 Sistema de rankings

---

## 📞 Suporte

Se encontrares problemas:
1. Verifica os logs: `make logs` ou `docker-compose logs -f`
2. Tenta rebuild: `make clean && make install`
3. Verifica se Docker está a correr: `docker ps`
4. Verifica portas: `sudo netstat -tlnp | grep -E '80|443'`

---

**Boa sorte com o projeto! 🎮**
