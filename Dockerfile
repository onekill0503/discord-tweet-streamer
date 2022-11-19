FROM node:latest
WORKDIR /usr/ibex
COPY package.json .
RUN yarn install\
        && yarn global add typescript
COPY . .
RUN tsc
CMD ["yarn" , "start"]