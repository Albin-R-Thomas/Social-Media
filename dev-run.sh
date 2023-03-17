cd app


mv package.json package.json.bak
mv package-lock.yaml package-lock.yaml.bak
npm install prisma@4.8.0 --no-lockfile
npm install @prisma/client --no-lockfile
npm prisma generate --schema ./prisma/schema.prisma
mv package.json.bak package.json
mv npm-lock.yaml.bak npm-lock.yaml

npm install

npm concurrently -n nest,lint,tests "npm run start:dev" "npm run lint" "npm run test:watch"