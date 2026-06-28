import type { ProjectRunStep } from "@/types";

export const pdfRagRunSteps: ProjectRunStep[] = [
  {
    title: "Prerequisites",
    description: "Install Docker and Docker Compose on your machine.",
  },
  {
    title: "Create the compose file",
    description:
      "Save the Docker Compose configuration below as docker-compose.yml in an empty project folder.",
  },
  {
    title: "Configure API keys",
    description:
      "Create a backend/.env file next to docker-compose.yml with the credentials your backend needs (for example, an OpenAI API key for embeddings and chat).",
    code: `# backend/.env — add the variables required by rag-backend
OPENAI_API_KEY=your_key_here`,
  },
  {
    title: "Start the stack",
    description:
      "From the folder containing docker-compose.yml, pull images and start all services. Compose waits for Qdrant and the backend health checks before starting the frontend.",
    code: "docker compose up -d",
  },
  {
    title: "Open the app",
    description:
      "When all containers are healthy, open the UI at http://localhost:5173. The API is available at http://localhost:3000 and Qdrant at http://localhost:6333.",
  },
  {
    title: "Upload and chat",
    description:
      "Upload one or more PDFs from the sidebar, then ask questions in the chat. Answers are grounded in your documents with source citations.",
  },
  {
    title: "Stop the stack",
    description: "Uploaded files and vector data persist in Docker volumes between runs.",
    code: "docker compose down",
  },
];
