# Official Node.js image (Alpine).
FROM node:18-alpine AS base
WORKDIR /usr/src/app

# --- Production: compile TypeScript, run compiled JS only ---
FROM base AS builder
COPY package.json package-lock.json* ./
RUN npm ci
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src
RUN npx prisma generate
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY prisma ./prisma
RUN npx prisma generate
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 4000
USER node
CMD ["node", "dist/server.js"]

# --- Development: full deps + nodemon; bind-mount ./src in compose for hot reload ---
FROM base AS development
ENV NODE_ENV=development
COPY package.json package-lock.json* ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate
COPY tsconfig.json ./
COPY src ./src
EXPOSE 4000
CMD ["npm", "run", "dev"]
