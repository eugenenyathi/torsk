FROM node:18-alpine

# Install dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget -qO- https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz | tar xz -C /usr/local/bin

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8385
CMD dockerize -wait tcp://torsk-db:27017 npm start
