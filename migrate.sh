#!/bin/bash
cd /app
npx prisma migrate deploy
npx prisma db seed
node dummy.js
