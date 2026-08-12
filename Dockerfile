# Multi-stage Dockerfile for AI Government Scheme Finder

# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Python Backend Environment
FROM python:3.9-slim
WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend source code
COPY backend/ ./backend/

# Copy compiled frontend production assets from Stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose server port
EXPOSE 5000

ENV PORT=5000
ENV FLASK_DEBUG=False

# Launch Unified Server
CMD ["python", "backend/app.py"]
