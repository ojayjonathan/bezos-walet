FROM node:17-alpine
WORKDIR /usr/src/app
COPY package*.json ./
# for seeding the database
RUN npm install -g ts-node
RUN npm install --no-progress
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start:server"]