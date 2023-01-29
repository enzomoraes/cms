FROM node:16 as builder

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:16

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /home/node/app/build ./build

CMD ["node", "build/src/index.js"]
