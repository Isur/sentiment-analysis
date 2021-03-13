FROM node:15
COPY package*.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
COPY . .
ENV NODE_ENV dockerized
RUN npx prisma generate
RUN npm run dockerbuild
EXPOSE $PORT
CMD npx prisma migrate deploy --preview-feature && npx prisma db seed --preview-feature && npm start
