# Node 20 slim. better-sqlite3 ships prebuilt binaries for linux/x64, so no
# compiler toolchain is needed here.
FROM node:20-slim

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY . .

# The SQLite file lives on the persistent volume so accounts/progress survive
# redeploys. The host must mount a volume at /data (see render.yaml).
ENV PORT=3000 \
    DB_PATH=/data/app.db \
    NODE_ENV=production
VOLUME ["/data"]

EXPOSE 3000

CMD ["node", "server.js"]
