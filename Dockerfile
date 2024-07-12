###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:lts-alpine As development_api
WORKDIR /crm/src/api
COPY --chown=node:node api/package*.json ./
RUN npm ci
COPY --chown=node:node api/ .
USER node
###################
# BUILD FOR PRODUCTION
###################
FROM node:lts-alpine As build_api
WORKDIR /crm/src/api
COPY --chown=node:node api/package*.json ./
COPY --chown=node:node --from=development_api /crm/src/api/node_modules ./node_modules
COPY --chown=node:node api/ .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
COPY api/prisma dist/prisma
RUN npx prisma generate --schema dist/prisma/schema.prisma
RUN npx prisma migrate deploy --schema dist/prisma/schema.prisma
RUN npx prisma migrate status --schema dist/prisma/schema.prisma
USER node
###################
# BUILD PANEL
###################
FROM node:lts-alpine As build_panel
WORKDIR /crm/src/panel
COPY --chown=node:node panel/package*.json ./
RUN npm ci
COPY --chown=node:node panel/ .
RUN npm run build
RUN npm ci --only=production && npm cache clean --force
USER node
###################
# PRODUCTION
###################
FROM nginx:stable-alpine As production
RUN apk add --update nodejs npm
COPY --from=build_panel /crm/src/panel/dist /usr/share/nginx/html
COPY --from=build_api /crm/src/api/node_modules /crm/api/node_modules
COPY --from=build_api /crm/src/api/dist /crm/api/dist
EXPOSE 80
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY config/entrypoint.sh /crm/entrypoint.sh
RUN chmod +x /crm/entrypoint.sh
ENTRYPOINT [ "/crm/entrypoint.sh" ]