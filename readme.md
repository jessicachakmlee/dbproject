
### Running the Project
Remember to first run `npm install` to install all dependencies
Run `yarn dev` in the dbproject folder

OR 

Run `npm start` in the frontend folder AND Run `nodemon server` in the server folder

### Other Environments

You can also access our app through https://car-rental-304-2019.herokuapp.com/.

### Setting up the database

#### Dropping all the tables
Run `node server/database/setUpFunctions dropTables`

#### Creating all the tables
Run `node server/database/setUpFunctions createTables`

#### Seeding all the tables with pre-set data
Run `node server/database/setUpFunctions seedTables`