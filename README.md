# Task-manager-app #

Learning NodeJS-Docker-Kubernetes project

## How to run application ##

- Clone repository to your local machine
- Get inside folder you copied
- Run npm install command to install all dependencies application requires
- Run ```  npm run dev  ``` to start application
- Open localhost:8080 in browser

## Run application in Docker containers ##

- Open terminal in the root of cloned folder
- Create tagged NodeJS application image with command ``` docker build -t 'yourUsername'/node-app:version```
- Push image to DockerHub repository with command ``` docker push 'yourUsername'/node-app:version```
- Make sure your DB_URL begins with mongodb://mongodb/, cause you have to specify we are connecting to service
- Run ``` docker-compose up ``` to start the application in container
- Open localhost:8080

## Run application in single node Kubernetes claster, Minikube ##

- Open terminal in the root of cloned folder
- Run ``` cd k8s ``` to get into folder that has all required Kubernetes files
- Run commands: ``` kubectl apply -f app-cm.yml, kubectl apply -f app.yml and kubectl apply -f mongo.yml```
- Run command ``` minikube service nodejs``` so minikube can redirect you to the deployed application url
