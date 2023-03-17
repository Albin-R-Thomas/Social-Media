FROM node:16 as builder

WORKDIR /app

RUN npm install prisma
RUN npm install @prisma/client
RUN npm install concurrently

COPY prisma prisma

RUN npx prisma generate --schema ./prisma/schema.prisma

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . /app

RUN npm run test

RUN npx nest build
RUN ls dist
FROM node:16 as runner
WORKDIR /app

RUN mkdir -p /app/dist/

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/package-lock.json /app/
COPY --from=builder /app/dist/ /app/dist/
COPY --from=builder /app/prisma/ /app/prisma
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY  migrate.sh /app/migrate.sh

CMD ["node", "dist/main.js"]