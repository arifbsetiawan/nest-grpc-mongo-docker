# HOW TO RUN THE APPLICATION:

1. copy .env.example to .env
2. run: ```npm install```
3. run: ```make start-dev``` or ```npm run start:dev```


# HOT TO DOCKERIZE THE APPLICATION:

1. copy .env.example to docker.env
2. change pubished ports on docker-compose.yml
3. run: ```make docker``` or ```docker-compose up --build```