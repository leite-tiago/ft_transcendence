# Próximos Passos - Módulos ft_transcendence

## 🎯 Após Completar a Parte Mandatória

Agora que tens a base sólida implementada, podes adicionar módulos para aumentar a tua nota e aprender novas tecnologias!

---

## 📚 Módulos Sugeridos (Ordem de Implementação)

### 1. 🔐 Standard User Management (Major Module)

**O que faz**: Sistema de registo e login de utilizadores

**Tecnologias**: Database + Backend API

**Passos**:
1. Adicionar PostgreSQL ao docker-compose
2. Criar tabela `users` (id, username, email, password_hash)
3. Implementar endpoints de registo/login no backend
4. Hash passwords com bcrypt/argon2
5. Criar páginas de login/register no frontend
6. Guardar sessão (cookies ou tokens)
7. Modificar torneio para usar users em vez de aliases

**Ficheiros a criar/modificar**:
- `backend/database.php` - Conexão DB
- `backend/api/auth.php` - Endpoints auth
- `backend/api/users.php` - User management
- `frontend/src/pages/LoginPage.ts`
- `frontend/src/pages/RegisterPage.ts`
- `docker-compose.yml` - Adicionar PostgreSQL

**Dificuldade**: ⭐⭐⭐

---

### 2. 🌐 Remote Players (Major Module)

**O que faz**: Jogar contra outros jogadores online

**Tecnologias**: WebSockets

**Passos**:
1. Adicionar WebSocket server (Node.js ou PHP)
2. Implementar sincronização de game state
3. Criar lobby/matchmaking
4. Modificar PongGame para suportar input remoto
5. Adicionar latency compensation

**Ficheiros a criar/modificar**:
- `websocket-server/` - Novo serviço
- `frontend/src/game/RemoteGame.ts`
- `frontend/src/services/WebSocketService.ts`
- `docker-compose.yml` - Adicionar WS server

**Dificuldade**: ⭐⭐⭐⭐

---

### 3. 🎨 Use a Framework as Backend (Minor Module)

**O que faz**: Substituir PHP puro por framework

**Opções**: Laravel (PHP), Django (Python), NestJS (TypeScript)

**Recomendação**: NestJS (mantém TypeScript)

**Passos**:
1. Criar projeto NestJS
2. Migrar endpoints existentes
3. Adicionar ORM (TypeORM/Prisma)
4. Configurar CORS
5. Atualizar Dockerfile do backend

**Ficheiros a modificar**:
- `backend/` - Reescrever tudo
- `docker-compose.yml` - Atualizar backend service

**Dificuldade**: ⭐⭐

---

### 4. 🗄️ Use a Database (Minor Module)

**O que faz**: Persistência de dados

**Tecnologia**: PostgreSQL

**Passos**:
1. Adicionar PostgreSQL ao docker-compose
2. Criar schema (users, games, tournaments)
3. Implementar migrations
4. Conectar backend à DB
5. Guardar histórico de jogos

**Ficheiros a criar**:
- `backend/migrations/`
- `backend/models/`
- `.env` - Adicionar DB credentials

**Dificuldade**: ⭐⭐

---

### 5. 🔒 Implement WAF/ModSecurity (Minor Module)

**O que faz**: Web Application Firewall

**Tecnologia**: ModSecurity + OWASP Core Rule Set

**Passos**:
1. Adicionar ModSecurity ao nginx
2. Configurar OWASP CRS
3. Customizar regras
4. Testar proteções

**Ficheiros a modificar**:
- `nginx/Dockerfile`
- `nginx/conf/modsecurity.conf`

**Dificuldade**: ⭐⭐

---

### 6. 🤖 Implement an AI Opponent (Major Module)

**O que faz**: Jogar contra IA

**Algoritmos**: Pathfinding, Minimax, ou ML

**Passos**:
1. Criar `AIController` class
2. Implementar algoritmo de decisão
3. Adicionar dificuldades (easy/medium/hard)
4. Garantir mesma velocidade que humanos
5. Adicionar opção "Play vs AI"

**Ficheiros a criar**:
- `frontend/src/game/AIController.ts`
- `frontend/src/pages/AIGamePage.ts`

**Dificuldade**: ⭐⭐⭐

---

### 7. 💬 Live Chat (Major Module)

**O que faz**: Chat em tempo real

**Tecnologias**: WebSockets + Database

**Passos**:
1. WebSocket server para chat
2. Tabela de mensagens na DB
3. UI de chat no frontend
4. Private messages
5. Block users
6. Moderação

**Ficheiros a criar**:
- `frontend/src/components/Chat.ts`
- `backend/api/chat.php`
- `websocket-server/chat.js`

**Dificuldade**: ⭐⭐⭐

---

### 8. 🎮 Game Customization Options (Minor Module)

**O que faz**: Personalizar jogo

**Features**:
- Power-ups
- Mapa com obstáculos
- Bola especial
- Diferentes modos

**Passos**:
1. Criar página de settings
2. Adicionar power-ups ao game logic
3. Guardar preferences do user
4. Diferentes game modes

**Ficheiros a modificar**:
- `frontend/src/game/PongGame.ts`
- `frontend/src/pages/SettingsPage.ts`

**Dificuldade**: ⭐⭐⭐

---

### 9. 🎨 Use a Frontend Framework (Minor Module)

**O que faz**: Substituir Vanilla JS por framework

**Opções**: React, Vue, Angular

**Recomendação**: React (mais popular) ou Vue (mais fácil)

**Passos**:
1. Setup React/Vue
2. Migrar componentes
3. Adicionar state management (Redux/Vuex)
4. Manter TypeScript

**Dificuldade**: ⭐⭐⭐

---

### 10. 🔐 Implement Two-Factor Authentication (Major Module)

**O que faz**: 2FA com JWT

**Tecnologias**: JWT + TOTP (Google Authenticator)

**Passos**:
1. Implementar JWT tokens
2. Adicionar 2FA com TOTP
3. QR code para setup
4. Verificação de código

**Ficheiros a criar**:
- `backend/services/jwt.php`
- `backend/services/totp.php`
- `frontend/src/pages/TwoFactorPage.ts`

**Dificuldade**: ⭐⭐⭐⭐

---

### 11. 🎨 Use Advanced 3D Techniques (Major Module)

**O que faz**: Pong em 3D

**Tecnologia**: Three.js

**Passos**:
1. Setup Three.js
2. Criar cena 3D
3. Modelos 3D dos paddles e bola
4. Câmera e lighting
5. Manter mesma gameplay

**Ficheiros a criar**:
- `frontend/src/game/Pong3D.ts`
- Assets 3D

**Dificuldade**: ⭐⭐⭐⭐⭐

---

### 12. 📊 Stats & Leaderboards (Custom)

**O que faz**: Estatísticas e rankings

**Passos**:
1. Guardar resultados de jogos na DB
2. Calcular stats (wins, losses, win rate)
3. Global leaderboard
4. User profile com stats
5. Histórico de jogos

**Ficheiros a criar**:
- `backend/api/stats.php`
- `frontend/src/pages/LeaderboardPage.ts`
- `frontend/src/pages/ProfilePage.ts`

**Dificuldade**: ⭐⭐

---

## 🎯 Estratégia Recomendada

### Path 1: Full-Stack Developer
1. Standard User Management
2. Database
3. Backend Framework (NestJS)
4. Stats & Leaderboards
5. Remote Players

**Total**: ~3 Major + 2 Minor = Boa nota

---

### Path 2: Game Developer
1. AI Opponent
2. Game Customization
3. 3D Graphics
4. Remote Players
5. Stats

**Total**: ~4 Major + 1 Minor = Excelente nota

---

### Path 3: Security Focus
1. Standard User Management
2. Two-Factor Authentication
3. WAF/ModSecurity
4. Database
5. Backend Framework

**Total**: ~3 Major + 2 Minor = Boa nota

---

### Path 4: Balanced
1. Standard User Management (Major)
2. Database (Minor)
3. AI Opponent (Major)
4. Live Chat (Major)
5. Stats & Leaderboards (Custom)

**Total**: ~3 Major + 1 Minor + Custom = Muito boa nota

---

## 📝 Notas Importantes

### Compatibilidade de Módulos

**Conflitos**:
- Backend Framework ↔️ API (cuidado ao migrar)
- Frontend Framework ↔️ Código existente (reescrever tudo)
- 3D Graphics ↔️ Canvas atual (substituir)

**Sinergias**:
- User Management + Database (quase obrigatórios juntos)
- Remote Players + Chat (usam WebSockets)
- Stats + Database (precisas de persistência)
- 2FA + User Management (depende de users)

---

## 🎓 Aprendizagem

Cada módulo ensina skills valiosas:

- **User Management**: Auth, segurança, hashing
- **Database**: SQL, ORM, migrations
- **Remote Players**: Networking, real-time sync
- **AI**: Algoritmos, machine learning
- **3D Graphics**: WebGL, Three.js
- **Chat**: WebSockets, real-time communication
- **2FA/JWT**: Segurança avançada
- **WAF**: Cybersecurity

---

## ⚠️ Avisos

1. **Não adicionar módulos antes da base estar 100% funcional**
2. **Cada módulo adiciona complexidade** - escolher bem
3. **Alguns módulos requerem reescrever código** - planear
4. **Testar bem após cada módulo** - não quebrar o existente
5. **Docker deve continuar a funcionar** - um comando

---

## 📊 Sistema de Pontos (Estimativa)

- **Mandatory Part**: ~40%
- **Major Module**: ~10-15% cada
- **Minor Module**: ~5-7% cada
- **2-3 Major + alguns Minor**: ~80-100%

**Objetivo**: 100% = ~3 Major + 2-3 Minor

---

## 🚀 Como Começar um Módulo

1. **Ler o subject** do módulo específico
2. **Criar branch no git**: `git checkout -b feature/user-management`
3. **Planejar arquitetura** (desenhar diagrama)
4. **Implementar incrementalmente** (pequenos commits)
5. **Testar constantemente**
6. **Merge quando 100% funcional**

---

## 🎯 Recomendação Final

Para a primeira iteração:
1. **Focar na parte mandatória** até estar perfeita
2. **Escolher 1 Major Module** simples (User Management)
3. **Adicionar 1-2 Minor Modules** (Database + WAF)
4. **Testar exaustivamente**
5. **Só depois** adicionar mais

**Qualidade > Quantidade**

Melhor ter 2 módulos perfeitos que 5 módulos bugados!

---

**Boa sorte com os módulos! 🎮🚀**
