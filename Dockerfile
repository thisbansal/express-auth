# Stage 1: Bun installation
FROM oven/bun:1 as bun-installer

# Stage 2: Final image
FROM python:3.12-slim

# Update and install dependencies
RUN apt-get update && \
    apt-get install -y curl build-essential gcc g++ clang git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy Bun from the installer stage
COPY --from=bun-installer /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /app

# Copy package.json and bun.lockb (if it exists)
# COPY package.json bun.lockb* ./

# Copy application files
# COPY . .

# RUN bun install

# Set the command to run the application
# CMD [ "bun", "dev" ]