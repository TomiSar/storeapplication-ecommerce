# Expense Manager Application (Spring Boot + React)

## Stack

- Spring Boot 3
- Java (version 17)
- MySQL
- React
- TypeScript
- Postman

## **Create env.properties file in backend folder Add personal env.properties values in file**

- **DATABASE_URL=jdbc:mysql://localhost:3306**
- **DATABASE={DATABASE}**
- **USER={USER}**
- **PASSWORD={PASSWORD}**
- **JWT_SECRET={JWT_SECRET}**

## **Import env.properties in application.properties**

- **_spring.config.import=file:env.properties_**

## Start backend (localhost:8080) backend folder

- cd backend
- mvn spring-boot:run
- mvn spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=\*:5005" -Dspring-boot.run.fork=true

## Start frontend (localhost:3000) frontend folder

- cd frontend
- npm i (install dependencies)
- npm run dev

## Frontend format files (Prettier)

- cd frontend
- npm run format

## API endpoints (Contacts)

- http://localhost:8080/api/v1/contacts (POST add Contacts)
- http://localhost:8080/api/v1/contacts (GET all Contacts)

## API endpoints (Products)

- http://localhost:8080/api/v1/products (GET all Products)

## API endpoints (Login)

- http://localhost:8080/api/v1/auth/login (POST Login)

## API endpoints (Register)

- http://localhost:8080/api/v1/auth/register (POST Register User)

## API Spring boot actuator

- http://localhost:8080/backend/actuator

## API Swagger

- http://localhost:8080/swagger-ui.html

## Docs

- [Vite](https://vite.dev/guide/)
- [Font Awesome](https://docs.fontawesome.com/)
- [Tailwind](https://tailwindcss.com/docs/installation/using-vite)
- [Vite](https://vite.dev/guide/)

## Back-end Development

- [Spring Security](https://docs.spring.io/spring-security/reference/index.html)
- [SpringDoc -openapi](https://springdoc.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Initializr](https://start.spring.io/)

## Front-end Development

- [React](https://react.dev/)

## Dev tool helpers

- [Bcrypt Generator](https://bcrypt-generator.com/)
