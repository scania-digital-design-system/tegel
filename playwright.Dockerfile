# Use the official Playwright image with Playwright 1.62.1 and Ubuntu 22.04 (Jammy)
FROM mcr.microsoft.com/playwright:v1.62.1-jammy AS base

# Set /app as the working directory inside the container
WORKDIR /app

# Configure pnpm home directory
ENV PNPM_HOME=/pnpm

# Enable Corepack so that pnpm can be used
RUN corepack enable

# Copy the project into the container
# Files and directories excluded by .dockerignore are not copied
COPY ./ ./

# Install the core package dependencies
RUN --mount=type=cache,target=/pnpm/store pnpm filter:core install --frozen-lockfile

# Copy the Playwright entrypoint script to a directory on the system PATH
COPY scripts/playwright-entrypoint.sh /usr/local/bin/playwright-entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/playwright-entrypoint.sh

# Use the entrypoint script to run the Playwright tests
ENTRYPOINT ["playwright-entrypoint.sh"]

# Build the core Playwright image
FROM base AS core

# Build the core package
RUN pnpm build

# Build the tegel-lite Playwright image
FROM base AS tegel-lite

# Install the tegel-lite package dependencies
RUN --mount=type=cache,target=/pnpm/store pnpm filter:tegel-lite install --frozen-lockfile

# Build the tegel-lite package
RUN pnpm build:tegel-lite
