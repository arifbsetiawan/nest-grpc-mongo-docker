FROM node:12 as builder

WORKDIR /app

COPY package*.json tsconfig*.json ./
COPY tools/ ./tools
COPY protos/ ./protos

RUN mkdir protobuf

RUN ls

RUN npm ci && npm run build && npm run build:proto

COPY . .

FROM node:12-alpine as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i pm2 -g && npm ci --only=production && npm cache clean --force --loglevel=error

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/protos ./protos
COPY --from=builder /app/protobuf ./protobuf

USER node

CMD ["pm2-runtime", "./dist/main.js", "-i", "-1"]