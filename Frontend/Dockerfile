# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve with Node using 'serve' package
FROM node:18

WORKDIR /app

# Install `serve` to serve static files
RUN npm install -g serve

# Copy built files from previous stage
COPY --from=builder /app/dist ./dist

# Expose default Vite static port
EXPOSE 3000

# Serve the build
CMD ["serve", "-s", "dist", "-l", "3000"]

