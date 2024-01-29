# How to setup

## Node.js

Run the following command
```sh
npm i
```

## MySql

This project uses MySql as a dependency, so it must be set up

To set up, in the mysql shell create your user, host and database. 

Create database:
```sh
CREATE DATABASE <database>;
```

Set up user:
```sh
CREATE USER '<user>'@'<host>' IDENTIFIED BY '<password>';
GRANT ALL PRIVILEGES ON <database>.* TO '<user>'@'<host>';
```

Now add to `.env' file
```
DB_HOST="<host>"
DB_USERNAME="<user>"
DB_PASSWORD="<password>"
DATABASE="<database>"
```

In MySql shell, select the database and add the tables
```sh
CREATE TABLE posts (text TEXT, name CHAR(30), time_millis BIGINT);
```
