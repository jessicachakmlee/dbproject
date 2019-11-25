
### Running the Project
Run `yarn dev` in the dbproject folder

OR 

Run `npm start` in the frontend folder AND Run `nodemon server` in the server folder

### Setting up the database

#### Dropping all the tables
Run `node server/database/setUpFunctions dropTables`

#### Creating all the tables
Run `node server/database/setUpFunctions createTables`

#### Seeding all the tables with pre-set data
Run `node server/database/setUpFunctions seedTables`