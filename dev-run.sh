cd app


mv package.json package.json.bak
mv package-lock.json package-lock.json.bak
npm install prisma@4.8.0 --no-lockfile
npm install @prisma/client --no-lockfile
npm prisma generate --schema ./prisma/schema.prisma
mv package.json.bak package.json
mv package-lock.json.bak pakage-lock.json

npm install

npm concurrently -n nest,lint,tests "npm run start:dev" "npm run lint" "npm run test:watch"