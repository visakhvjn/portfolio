/** docker-compose.yml for the PDF RAG stack. */
export const pdfRagDockerCompose = `services:
  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - qdrant-storage:/qdrant/storage
    healthcheck:
      test: ["CMD", "bash", "-c", "echo > /dev/tcp/127.0.0.1/6333"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 10s
    restart: unless-stopped

  backend:
    image: vjnvisakh/rag-backend:latest
    ports:
      - "3000:3000"
    environment:
      PORT: 3000
      QDRANT_URL: http://qdrant:6333
      QDRANT_COLLECTION: pdf_chunks
    env_file:
      - ./backend/.env
    volumes:
      - backend-uploads:/app/uploads
    depends_on:
      qdrant:
        condition: service_healthy
    healthcheck:
      test:
        [
          "CMD",
          "node",
          "-e",
          "fetch('http://localhost:3000/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))",
        ]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 10s
    restart: unless-stopped

  frontend:
    image: vjnvisakh/rag-frontend:latest
    ports:
      - "5173:80"
    depends_on:
      backend:
        condition: service_healthy
    restart: unless-stopped

volumes:
  backend-uploads:
  qdrant-storage:
`;
