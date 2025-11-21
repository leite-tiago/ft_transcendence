# Technical Decisions - ft_transcendence

## 🏗️ Arquitetura

### Escolha: Arquitetura Simples (Frontend-Heavy)
**Decisão**: Implementar a maior parte da lógica no frontend, com backend PHP minimal.

**Razões**:
- Requisitos mínimos satisfeitos apenas com frontend
- Backend pode ser expandido mais tarde com módulos
- Mais fácil de desenvolver e testar inicialmente
- Reduz complexidade inicial

**Trade-offs**:
- Menos seguro para funcionalidades avançadas (adicionar autenticação depois)
- Estado do jogo apenas no cliente
- Sem persistência de dados (adicionar database module depois)

---

## 🎨 Frontend

### TypeScript + Vanilla JS (sem frameworks)
**Decisão**: Usar TypeScript puro sem React/Vue/Angular

**Razões**:
- Requisito do subject (TypeScript como base)
- Maior controle e aprendizagem
- Menos dependências
- Mais leve e rápido

**Implementação**:
- Webpack para bundling
- Sistema de routing custom (SPA)
- HTML5 Canvas para o jogo

### Single Page Application (SPA)
**Decisão**: Implementar SPA com routing do lado do cliente

**Razões**:
- Requisito obrigatório do subject
- Melhor UX (sem reloads)
- Suporta browser back/forward buttons

**Implementação**:
- Router custom em TypeScript
- History API para navegação
- Event delegation para links

---

## 🎮 Game Logic

### Canvas HTML5
**Decisão**: Usar Canvas API nativo para o jogo

**Razões**:
- Leve e performático
- Controle total sobre rendering
- Sem necessidade de game engines
- Clássico Pong não precisa de complexidade extra

**Implementação**:
- RequestAnimationFrame para game loop
- Collision detection simples (AABB)
- Keyboard events para controles

### Game State Management
**Decisão**: Estado do jogo gerido localmente no PongGame class

**Razões**:
- Simples para jogo local (2 jogadores no mesmo teclado)
- Pode ser expandido para multiplayer remoto depois
- Sem necessidade de sincronização complexa

---

## 🔒 Security

### HTTPS com Self-Signed Certificates
**Decisão**: Gerar certificados SSL automaticamente no startup

**Razões**:
- Requisito obrigatório (HTTPS para tudo)
- Automático para desenvolvimento
- Self-signed é OK para dev/avaliação
- Fácil de substituir para produção

**Implementação**:
- OpenSSL no nginx container
- Script de geração automática
- Configuração TLS 1.2/1.3

### Input Validation
**Decisão**: Validação no frontend com HTML5 e JavaScript

**Razões**:
- Primeira linha de defesa
- UX melhor (feedback imediato)
- Suficiente para a parte mandatória
- Backend validation será adicionada com módulos

### XSS Protection
**Decisão**: Security headers no nginx + innerHTML sanitization

**Razões**:
- Proteção em múltiplas camadas
- Headers são fáceis de configurar
- Cuidado com template strings

---

## 🐳 Docker

### Multi-Container Setup
**Decisão**: 3 containers separados (nginx, frontend, backend)

**Razões**:
- Separação de responsabilidades
- Fácil de escalar
- Pode substituir componentes individualmente
- Boa prática de microservices

### Docker Compose
**Decisão**: Orquestração com docker-compose

**Razões**:
- Requisito: "single command line"
- Fácil gerenciamento de múltiplos containers
- Networking automático
- Volumes para desenvolvimento

---

## 🏆 Tournament System

### Round-Robin Format
**Decisão**: Todos jogam contra todos

**Razões**:
- Mais justo que eliminação simples
- Mais jogos = mais diversão
- Fácil de implementar
- Pode adicionar outros formatos depois

### Client-Side Tournament Logic
**Decisão**: Gestão de torneio no frontend

**Razões**:
- Suficiente para requisitos mínimos
- Aliases são temporários (reset por torneio)
- Pode migrar para backend com user management module

---

## 📦 Build System

### Webpack
**Decisão**: Webpack para bundling do frontend

**Razões**:
- Industry standard
- Suporta TypeScript nativamente
- Hot reload para desenvolvimento
- Tree shaking e optimizações

### Two-Stage Docker Build (Frontend)
**Decisão**: Build stage + runtime stage

**Razões**:
- Imagem final mais leve
- Separação de build dependencies
- Melhor para produção

---

## 🎯 Design Patterns

### MVC-like Structure
**Decisão**: Separação Pages (Views) / Game Logic (Model) / Router (Controller)

**Razões**:
- Organização clara
- Fácil de entender e expandir
- Boa prática de software engineering

### Abstract View Pattern
**Decisão**: Classe base AbstractView para todas as páginas

**Razões**:
- Reutilização de código
- Interface consistente
- Facilita adição de novas páginas

---

## 🚀 Future Considerations

### Expansibilidade para Módulos

**Database Module**: 
- Backend já está preparado para adicionar endpoints
- Docker compose pode adicionar container PostgreSQL
- ORM ou queries raw PHP

**User Management**:
- Sistema de torneio pode ser estendido
- Aliases podem ser ligados a users
- Auth pode ser adicionado como middleware

**Remote Players**:
- WebSocket endpoint já está no nginx
- Game state pode ser sincronizado
- Adicionar servidor WebSocket (Node.js ou PHP)

**AI Opponent**:
- PongGame pode receber AI controller
- Implementar algoritmo (e.g., seguir bola)
- Manter mesma velocidade (requisito)

---

## 📊 Performance Considerations

### Client-Side Rendering
- SPA evita full page reloads
- Canvas rendering é eficiente
- RequestAnimationFrame optimiza FPS

### Image Optimization
- Sem imagens pesadas
- CSS puro para UI
- Gradients e efeitos via CSS

### Bundle Size
- Code splitting pode ser adicionado
- Minimal dependencies
- Tree shaking ativo

---

## 🧪 Testing Strategy (Future)

### Frontend Tests
- Unit tests para game logic
- Integration tests para routing
- E2E tests para user flows

### Backend Tests
- API endpoint tests
- Integration tests com database
- Security tests

---

## 📝 Code Style

### TypeScript Strict Mode
**Decisão**: Usar strict mode

**Razões**:
- Catch more errors at compile time
- Better type safety
- Industry best practice

### Naming Conventions
- camelCase para variáveis e funções
- PascalCase para classes
- UPPER_CASE para constantes
- Descritivo e auto-documentado

---

## 🎓 Learning Objectives

Este projeto foi estruturado para:
1. **Aprender Docker**: Multi-container orchestration
2. **TypeScript**: Type-safe frontend development
3. **SPA Architecture**: Client-side routing
4. **Game Development**: Canvas API, game loops
5. **Security**: HTTPS, headers, validation
6. **System Design**: Scalable architecture para módulos futuros

---

**Nota**: Estas decisões são para a parte MANDATÓRIA. Módulos futuros podem requerer mudanças significativas (e.g., framework, database, etc.)
