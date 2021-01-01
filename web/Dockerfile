FROM node:14
COPY package*.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
COPY . .
ENV NODE_ENV dockerized
RUN npm run dockerbuild
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "start"]
