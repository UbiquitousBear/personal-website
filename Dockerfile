FROM node:10.16

WORKDIR /app

COPY package.json .

RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN --mount=type=ssh npm install --production

ADD . .

EXPOSE 8080
CMD ["node", "run, "start:development"]
