FROM node:20.3 as build

ARG environment

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

# Copy the entire app directory to the build image
COPY . .

# Install the Angular CLI globally
RUN npm install -g @angular/cli

# Build the Angular app in the specified configuration
RUN ng build --configuration development

# Switch to the Nginx image
FROM nginx:1.17.0-alpine

# Copy the compiled Angular app from the build image to the Nginx image
COPY --from=build /usr/src/app/dist/cognito-frontend /usr/share/nginx/html

# Copy the Nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf
