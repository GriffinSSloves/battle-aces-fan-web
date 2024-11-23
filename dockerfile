# Build stage
FROM node:lts as builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Enable pnpm
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build with increased memory limit
ENV NODE_OPTIONS=--max-old-space-size=8192
# Force x64 architecture for the build
ENV npm_config_arch=x64
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]