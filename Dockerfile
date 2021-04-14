FROM node:14

EXPOSE 3000/tcp
RUN npm install mineflayer && \
  npm install prismarine-viewer

RUN mkdir  /katai

WORKDIR /katai

COPY index.js /katai 

CMD ["node", "index.js"]

