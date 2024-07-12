# CRM Docker Manager

Simple light-weight web UI for Docker container management that support manifests to easily start containers with predefined environment variables. built with NestJS, Prisma, SQLite for the backend, Vue.js, Tailwind CSS for the frontend and Nginx for webserver. it uses host's docker socket to access docker API.

## Features

- User-friendly UI for managing Docker containers

- Backend API built with NestJS for handling Docker operations

- Frontend interface developed with Vue.js and Tailwind CSS

- Swagger integration for API documentation

- Support for manifests to start containers with predefined environment variables

## Sections

- Dashboard: A dashboard that provides an overview of all running containers, their status, resource usage, and other relevant information.

- Container Management: The ability to start, stop, restart, and remove containers directly from the web interface.

- Image Management: The option to pull, push, and manage Docker images, as well as build new images from Dockerfiles.

- Network Configuration: Tools to manage network settings for containers, including creating custom networks and configuring port mappings.

- Logs and Monitoring: Access to container logs and monitoring tools to track resource usage, performance metrics, and health checks.

## Installation

1. Clone the repository: `git clone https://github.com/omid-aghaei/crm-docker-manager.git`

2. Navigate to the backend directory: `cd api`

3. Install backend dependencies: `npm install`

4. Start the backend server: `npm start`

5. Navigate to the frontend directory: `cd ../panel`

6. Install frontend dependencies: `npm install`

7. Start the frontend server: `npm run dev`

## Usage

1. Access the application through your web browser.

2. Use the user-friendly UI to manage Docker containers.

3. Utilize manifests to easily start containers with predefined environment variables.

4. Refer to the Swagger documentation for API endpoints and usage.

## Deployment

To deploy this project :

```bash
docker  build  -t  dockermanager/crm:1.0.0  .
docker  container  run  -d  -p  9100:80  -p  9101:3000  -v  /var/run/docker.sock:/var/run/docker.sock  -e  backend=0.0.0.0:9101  dockermanager/crm:1.0.0
```
- frontend port : 9100
- backend port : 9101

## Swagger

Access swagger to test api's : http://0.0.0.0:9101/swagger/

## Technologies Used

- NestJS
- Vue.js
- Tailwind CSS
- Docker

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature`
3. Make your changes and commit them: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature`
5. Submit a pull request


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.