FROM node:11-slim

RUN apt-get update && apt-get install -yq build-essential dumb-init

# where our app will live in container
WORKDIR /app

# backend
COPY  package.json package.json


RUN yarn

# copy whatever is here into container
# copy everything except packages
COPY . .

ENTRYPOINT ["/usr/bin/dumb-init", "--"]