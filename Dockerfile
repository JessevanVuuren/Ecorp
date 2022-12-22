#https://developer.okta.com/blog/2020/06/17/angular-docker-spring-boot


# for in package.json
# "docker": "docker build -t ng-notes .",
# "ng-notes": "docker run -p 4200:80 ng-notes"

# build docker -> $ docker build -t ecorp .
# run docker   -> $ docker run -p 4200:80 ecorp


# MySuper98Ecorp

FROM node:16 AS builder

WORKDIR /opt/web
COPY package.json ./
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN ng build

FROM nginx:1.17-alpine
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/web/dist/ecorp /usr/share/nginx/html
