# 1. Base Image
FROM node:20-slim AS base

# 2. Builder Stage: Install dependencies and build the project
FROM base AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 3. Runner Stage: Setup the production environment
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Telemetry is disabled for safety and performance reasons.
ENV NEXT_TELEMETRY_DISABLED 1

# Copy the standalone output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

# Start the server
CMD ["node", "server.js"] 