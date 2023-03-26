FROM node:18-alpine as frontend
WORKDIR upgrad-eshop/frontend
COPY package.json ./
COPY ./src ./src
COPY ./public ./public
COPY .gitignore .gitignore
COPY .eslintrc.js .eslintrc.js
COPY .prettierrc .prettierrc
RUN npm ci
EXPOSE 3000
CMD ["npm","start"]