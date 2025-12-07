# Expense Manager Application (Spring Boot + React)

## Stack

- Spring Boot 3
- Java (version 17)
- MySQL
- React
- TypeScript
- Postman

## **Create env.properties file in restapi folder Add personal env.properties values in file**

- **DB_URL=jdbc:mysql://localhost:3306**
- **DB={DB}**
- **DB_USER={DATABASE_USERNAME}**
- **DB_PASSWORD={DATABASE_PASSWORD}**

## **Import env.properties in application.properties**

- **_spring.config.import=file:env.properties_**

### H2 database

- http://localhost:8080/h2-console
- JDBC_URL: jdbc:h2:file:~/store-application;

## Start backend (localhost:8080) backend folder

- cd backend
- mvn spring-boot:run

## Start frontend (localhost:3000) frontend folder

- cd frontend
- npm i (install dependencies)
- npm run dev

## API endpoints (Expenses)

- http://localhost:8080/api/v1/expenses (GET all Expenses)

## Docs

- [Vite](https://vite.dev/guide/)
- [Font Awesome](https://docs.fontawesome.com/)
- [Vite](https://vite.dev/guide/)

## Back-end Development

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Initializr](https://start.spring.io/)

## Front-end Development

- [React](https://react.dev/)
