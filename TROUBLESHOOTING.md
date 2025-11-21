# Troubleshooting Guide - ft_transcendence

## 🐛 Problemas Comuns e Soluções

### 1. Portas 80/443 já em uso

**Sintoma**: Erro ao iniciar containers - "port is already allocated"

**Solução**:
```bash
# Ver o que está a usar as portas
sudo lsof -i :80
sudo lsof -i :443

# Ou
sudo netstat -tlnp | grep -E ':80|:443'

# Parar outros serviços (exemplo: apache)
sudo systemctl stop apache2
sudo systemctl stop nginx  # Se tiveres nginx instalado localmente

# Depois reiniciar os containers
make down
make up
```

---

### 2. Docker não encontrado ou permission denied

**Sintoma**: "docker: command not found" ou "permission denied"

**Solução**:
```bash
# Verificar se Docker está instalado
docker --version

# Se não estiver, instalar:
# Ubuntu/Debian:
sudo apt update
sudo apt install docker.io docker-compose

# Adicionar user ao grupo docker (evitar sudo)
sudo usermod -aG docker $USER
newgrp docker

# Ou fazer logout/login
```

---

### 3. Containers não iniciam

**Sintoma**: Containers param imediatamente após iniciar

**Solução**:
```bash
# Ver logs detalhados
docker-compose logs

# Ou para um serviço específico
docker-compose logs frontend
docker-compose logs backend
docker-compose logs nginx

# Rebuild completo
make clean
make install
```

---

### 4. Certificado SSL inválido

**Sintoma**: Browser bloqueia acesso ou erro SSL

**Solução**:
```bash
# Regenerar certificados
docker-compose down
rm -rf nginx/ssl/*.pem
docker-compose up --build -d

# No browser:
# Firefox: Click "Advanced" > "Accept Risk and Continue"
# Chrome: Click "Advanced" > "Proceed to localhost (unsafe)"
```

**Nota**: Self-signed certificates são normais em desenvolvimento!

---

### 5. Frontend não carrega / Página em branco

**Sintoma**: HTTPS abre mas página está vazia ou erro 404

**Solução**:
```bash
# Verificar se build do frontend funcionou
docker-compose logs frontend

# Rebuild frontend
docker-compose down
docker-compose up --build frontend

# Verificar se ficheiros foram gerados
docker exec transcendence_frontend ls -la /app/dist

# Se não existir dist/, problema no build
# Entrar no container e debugar
docker exec -it transcendence_frontend sh
cd /app
npm run build
```

---

### 6. npm install falha (frontend)

**Sintoma**: Erro durante build do container frontend

**Solução**:
```bash
# Limpar cache do npm
docker-compose down
docker system prune -a

# Rebuild com --no-cache
docker-compose build --no-cache frontend
docker-compose up -d

# Se persistir, verificar package.json
cd frontend
cat package.json  # Verificar syntax
```

---

### 7. Jogo não responde aos controlos

**Sintoma**: Jogo inicia mas teclado não funciona

**Solução**:
1. Verificar que o canvas está em foco (clicar nele)
2. Abrir DevTools Console (F12) - verificar erros JavaScript
3. Verificar se event listeners estão registados:
```javascript
// No console do browser:
window.addEventListener('keydown', (e) => console.log(e.key));
// Testar teclas W, S, Arrow Up, Arrow Down
```

---

### 8. Torneio não inicia

**Sintoma**: Botão "Start Tournament" não funciona

**Solução**:
1. Verificar que tem pelo menos 2 jogadores adicionados
2. Abrir DevTools Console - verificar erros
3. Verificar se aliases são válidos (não vazios)

---

### 9. Navegação SPA não funciona (404)

**Sintoma**: Ao navegar para /game ou /tournament dá 404

**Solução**:
```bash
# Verificar configuração do nginx
cat nginx/conf/default.conf

# Deve ter:
# location / {
#     try_files $uri $uri/ /index.html;
# }

# Se não tiver, corrigir e rebuild
docker-compose restart nginx
```

---

### 10. Browser Back/Forward não funciona

**Sintoma**: Botões do browser não navegam entre páginas

**Solução**:
- Verificar que links têm `data-link` attribute
- Verificar que router está a usar `history.pushState`
- Verificar que event listener de `popstate` está registado

Abrir DevTools Console:
```javascript
// Verificar history
console.log(window.history.length);

// Testar manualmente
history.back();
history.forward();
```

---

### 11. Docker em 42 Campus (Rootless mode)

**Sintoma**: Problemas de permissões ou bind-mount

**Solução**:
```bash
# Usar /goinfre ou /sgoinfre
export DOCKER_HOST=unix:///goinfre/$USER/docker.sock

# Ou mover runtime
mkdir -p /goinfre/$USER/docker
export DOCKER_TMPDIR=/goinfre/$USER/docker

# Adicionar ao .bashrc ou .zshrc para persistir
echo 'export DOCKER_HOST=unix:///goinfre/$USER/docker.sock' >> ~/.zshrc
```

---

### 12. Containers usam muito espaço

**Sintoma**: Disco cheio, muitas imagens Docker

**Solução**:
```bash
# Ver espaço usado
docker system df

# Limpar tudo que não está em uso
docker system prune -a --volumes

# Remover apenas imagens não usadas
docker image prune -a

# Remover apenas containers parados
docker container prune
```

---

### 13. Hot reload não funciona (desenvolvimento)

**Sintoma**: Mudanças no código não aparecem

**Solução**:
```bash
# Rebuild container
docker-compose up --build -d

# Ou desenvolvimento local (sem Docker)
cd frontend
npm install
npm run dev
# Abrir http://localhost:8080
```

---

### 14. TypeError no console do browser

**Sintoma**: Erros JavaScript no console

**Soluções comuns**:
```javascript
// 1. Elemento não encontrado
const element = document.getElementById('...');
if (element) {
    // usar elemento
}

// 2. Event listener em null
const btn = document.querySelector('button');
btn?.addEventListener('click', ...);  // Optional chaining

// 3. Verificar que DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    // código aqui
});
```

---

### 15. CORS errors

**Sintoma**: "CORS policy blocked" no console

**Solução**:
- Verificar que backend tem headers CORS corretos
- Verificar em `backend/index.php`:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, ...');
```

---

## 🔍 Debug Workflow Geral

1. **Ver logs**:
   ```bash
   make logs
   # ou
   docker-compose logs -f
   ```

2. **Verificar status dos containers**:
   ```bash
   docker-compose ps
   ```

3. **Entrar num container**:
   ```bash
   docker exec -it transcendence_frontend sh
   docker exec -it transcendence_nginx sh
   ```

4. **Verificar networking**:
   ```bash
   docker network ls
   docker network inspect ft_transcendence_transcendence_network
   ```

5. **Rebuild limpo**:
   ```bash
   make clean
   make install
   ```

---

## 📞 Ainda com problemas?

### Checklist de Debug

- [ ] Docker está instalado e a correr?
- [ ] Portas 80/443 estão livres?
- [ ] Todos os containers estão UP? (`docker-compose ps`)
- [ ] Há erros nos logs? (`make logs`)
- [ ] .env existe? (`ls -la .env`)
- [ ] Browser está actualizado?
- [ ] Já tentaste `make clean && make install`?
- [ ] Cache do browser limpo? (Ctrl+Shift+R)

### Informação útil para reportar bugs

```bash
# Recolher informação do sistema
echo "=== System Info ==="
uname -a
docker --version
docker-compose --version

echo "=== Container Status ==="
docker-compose ps

echo "=== Container Logs ==="
docker-compose logs --tail=50

echo "=== Network Info ==="
docker network ls
```

---

**Dica**: A maioria dos problemas resolve-se com `make clean && make install` 🎯
