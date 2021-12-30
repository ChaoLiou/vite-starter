# build stage
FROM node:lts-alpine3.12 as build-stage

ARG BUILD_ENV
ARG VER
ENV VITE_APP_VER=${VER}

RUN mkdir /app
WORKDIR /app
COPY package.json .npmrc .yarnrc ./
RUN yarn install
COPY . .
RUN yarn build

ENV http_proxy=
ENV https_proxy=

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

ENV http_proxy=
ENV https_proxy=

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
