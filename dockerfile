FROM node:12.16.1-alpine as builder

WORKDIR /opt/shopmate

RUN apk add --no-cache -t build-dependencies git make gcc g++ python libtool autoconf automake \
    && cd $(npm root -g)/npm \
    && npm config set unsafe-perm true \
    && npm install -g node-gyp

RUN mkdir frontend
RUN mkdir backend
COPY backend/package.json backend/package-lock.json* /opt/shopmate/backend/
COPY frontend/package.json frontend/package-lock.json* /opt/shopmate/frontend/

RUN cd backend && npm ci

RUN cd frontend && npm ci

RUN apk del build-dependencies

COPY backend backend/
COPY frontend frontend/

RUN cd frontend && npm run build

RUN cd backend && npm run build
RUN export NODE_ENV=production

WORKDIR /opt/shopmate/backend

CMD ["npm", "start"]