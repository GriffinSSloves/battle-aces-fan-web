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
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy nginx configuration if you have any custom settings
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]