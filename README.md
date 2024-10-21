following are the project setupt instructions

1. download and install postgresql 16.4 
    refer information at the time of installation
    DB_HOST=localhost
    DB_USER=postgres
    DB_PORT=5432
    DB_NAME=UserAdminSystem
    DB_PASSWORD=postgres
2. if the postgre installation skip pgAdmin then install it manually  // password postgres

3. clone the project using the given url
    run the following commands in the project root dir
    npm i
    npm i --save
    // npm i nodemon --global to skip for prod purpose
    npm start or npm run dev to run
4. eslint command to check 
    npx eslint .


Note: on starting server two role(User and Admin) and one admin user will be seeded

    seeded admin details
    email: admin@gmail.com
    name: Admin
    password: Admin

    login with admin email and password to start with admin based authorization

*Please reach out to me for any help


