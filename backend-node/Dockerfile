# Trippy Trail: API + website in one small image. Works on any Docker host.
FROM node:22-slim
WORKDIR /app
COPY backend-node/package*.json ./
RUN npm ci --omit=dev
COPY backend-node/src ./src
COPY backend-node/admin ./admin
COPY website ./public
ENV NODE_ENV=production PORT=3000 SITE_DIR=./public DATABASE_PATH=/data/trippy-trail.db TRUST_PROXY=1
# Mount a persistent volume at /data or bookings are lost when the container restarts.
VOLUME /data
EXPOSE 3000
USER node
CMD ["node", "--disable-warning=ExperimentalWarning", "src/server.js"]
