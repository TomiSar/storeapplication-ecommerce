# Expense Manager Application (Spring Boot + React)

## Stack

- Spring Boot 3
- Java (version 17)
- MySQL
- React
- TypeScript
- Postman

## **Create env.properties file in restapi folder Add personal env.properties values in file**

- **DATABASE_URL=jdbc:mysql://localhost:3306**
- **DATABASE={DATABASE}**
- **USER={USER}**
- **PASSWORD={PASSWORD}**

## **Import env.properties in application.properties**

- **_spring.config.import=file:env.properties_**

## Start backend (localhost:8080) backend folder

- cd backend
- mvn spring-boot:run

## Start frontend (localhost:3000) frontend folder

- cd frontend
- npm i (install dependencies)
- npm run dev

## API endpoints (Expenses)

- http://localhost:8080/api/v1/products (GET all Products)

## Docs

- [Vite](https://vite.dev/guide/)
- [Font Awesome](https://docs.fontawesome.com/)
- [Tailwind](https://tailwindcss.com/docs/installation/using-vite)
- [Vite](https://vite.dev/guide/)

## Back-end Development

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Initializr](https://start.spring.io/)

## Front-end Development

- [React](https://react.dev/)
