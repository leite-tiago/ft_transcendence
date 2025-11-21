#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}   ft_transcendence Setup${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker is not installed!${NC}"
    echo "Please install Docker first: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker Compose is not installed!${NC}"
    echo "Please install Docker Compose first: https://docs.docker.com/compose/install/"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}📝 Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
else
    echo -e "${YELLOW}⚠️  .env file already exists, skipping...${NC}"
fi
echo ""

# Build and start containers
echo -e "${BLUE}🔨 Building Docker containers...${NC}"
echo -e "${YELLOW}This may take a few minutes on first run...${NC}"
echo ""

docker-compose build

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Build successful!${NC}"
    echo ""
    echo -e "${BLUE}🚀 Starting containers...${NC}"
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}================================${NC}"
        echo -e "${GREEN}✅ Setup Complete!${NC}"
        echo -e "${GREEN}================================${NC}"
        echo ""
        echo -e "${BLUE}📱 Application is running at:${NC}"
        echo -e "   ${GREEN}https://localhost${NC}"
        echo ""
        echo -e "${YELLOW}⚠️  You will see a security warning because we use self-signed SSL certificates.${NC}"
        echo -e "${YELLOW}   This is normal for development. Click 'Advanced' and proceed.${NC}"
        echo ""
        echo -e "${BLUE}📊 Useful commands:${NC}"
        echo -e "   ${GREEN}docker-compose logs -f${NC}      - View logs"
        echo -e "   ${GREEN}docker-compose down${NC}         - Stop containers"
        echo -e "   ${GREEN}docker-compose up -d${NC}        - Start containers"
        echo -e "   ${GREEN}make help${NC}                   - See all available commands"
        echo ""
    else
        echo -e "${YELLOW}⚠️  Failed to start containers${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  Build failed${NC}"
    exit 1
fi
