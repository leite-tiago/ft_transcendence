.PHONY: help build up down restart clean logs install fclean

help:
	@echo "Available commands:"
	@echo "  make build    - Build Docker containers"
	@echo "  make up       - Start the application"
	@echo "  make down     - Stop the application"
	@echo "  make restart  - Restart the application"
	@echo "  make clean    - Remove containers, volumes, and images"
	@echo "  make fclean   - Deep clean (removes everything including build files)"
	@echo "  make logs     - Show container logs"
	@echo "  make install  - Initial setup (copy .env and build)"

install:
	@echo "🚀 Setting up ft_transcendence..."
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "✅ Created .env file"; \
	else \
		echo "⚠️  .env file already exists"; \
	fi
	@echo "🔨 Building containers..."
	@docker-compose build
	@echo "✅ Setup complete! Run 'make up' to start the application."

build:
	@echo "🔨 Building containers..."
	@docker-compose build

up:
	@echo "🚀 Starting application..."
	@docker-compose up -d
	@echo "✅ Application is running!"
	@echo "📱 Access: https://localhost"

down:
	@echo "🛑 Stopping application..."
	@docker-compose down
	@echo "✅ Application stopped"

restart: down up

clean:
	@echo "🧹 Cleaning up..."
	@docker-compose down -v --rmi all
	@echo "✅ Cleanup complete"

fclean: clean
	@echo "🧹 Deep cleaning (removing build files)..."
	@if [ -d frontend/dist ]; then sudo rm -rf frontend/dist; fi
	@if [ -d frontend/node_modules ]; then sudo rm -rf frontend/node_modules; fi
	@sudo rm -f nginx/ssl/*.pem 2>/dev/null || true
	@echo "✅ Deep cleanup complete"

logs:
	@docker-compose logs -f
