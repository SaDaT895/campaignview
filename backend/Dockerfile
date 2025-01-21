FROM node:22

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

ENV PORT=3000

ENV DATABASE_URL="mysql://root:password@host.docker.internal:3307/campaignview"

EXPOSE 3000

RUN npx prisma migrate dev

RUN npx prisma db seed

CMD [ "nest", "start" ]
