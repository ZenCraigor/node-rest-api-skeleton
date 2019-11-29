
## Node / Express / MySQL REST API Skeleton


This is a project kick-starter for building a suite of role-based-access REST APIs

## Features

### All REST APIs - no UI
  * Build a web site on top using almost any template engine

### User Admin
  * Basic CRUD APIs
  * Multiple routes for fetching user data by username, id, email, all, etc.
  * Admin access only

### Role-based access to APIs
  * Sample roles are: admin, mgr, user. Create as needed
  * Users may have multiple roles
  * Routes may be restricted to one or multiple roles. Or none (like authenticating, or public APIs)

### Security
  * JSON Web Tokens (JWT)
  * Successful authentication returns the JWT to be used in subsequent API calls

---

## Getting Started
### Flow
  * Create a new user
  * The user makes an API call to the __/authenticate__ endpoint. A successful authentication will return a JWT in the body of the response.
  * The user replaces the __api-jwt__ header in the API examples with the one just received 
  * If one of the user's roles is allowed by the specific API then it will run, otherwise respond with **Not Authorized**. Users and APIs may have multiple roles; as long as one of the user's roles is allowed by one of the API roles access is allowed.
  * Role __admin__ has access to ALL APIs
  * Role __anon__ is assigned to every non-authenticated user and will be allowed to access any API not role-restricted 

### Routes and Access Roles
  * Routes can be assigned zero or more Access Roles
  * Some Examples:
    * Public (zero roles)
      * `router.post('/authenticate', login);`

    * Single Role - Admin Access Only
      * `router.get('/', authRole(['admin']), getAllUsers);`

    * Single Role - Manager (Blocks usage by __user__ role, but __admin__ can access)
      * `router.get('/', authRole(['mgr']), getUserByID);`

    * Multiple Roles
      * `router.get('/:username', authRole(['user', 'mgr']), getUserByUsername);`

---


## Installation
> Node 10+ and MySQL (MariaDB) should already be installed

### Set up the code
  * Clone this repo

  * From the clone directory, install dependencies
    ```
    $ npm install
    ```
  * Create the database
    * Run the MySQL script __/schema/users.sql__
    * This creates the DB (you can rename this before running) and users table
    * Create an "application user" in the DB with INSERT, UPDATE, DELETE, SELECT priviledges on this database
    * Delete the schema directory as it is no longer needed

  * Edit the MySQL connection script __/util/database.js__
    * Change the database name if you changed it in the creation script
    * Change the application user/pass to whatever you created in the DB 

### Create an ADMIN user.
Run the server
  ```
  $ node app.js
  ```
  * There is a default __admin__ user in the DB with a no-expiration JWT

  * Create your own ADMIN account
    * Change the Add User API call below to your preferred user credentials. 
    * For __role__ put `admin` 
    * Make sure the Content-length header and actual content length are the same

  * Authenticate the newly created user to get a JWT 

  * Change the __api-jwt__ header in the GetAllUsers API call and test -- should see the default __admin__ and the newly created user, both with *admin* role

  * Using the new JWT, do the same with DeleteUserByID and delete the default __admin__ account as a security precaution

### Ready to rock!

---


## API Reference

### ROUTES

Method | Route | Functionality                        |
|------|---------------------|------------------------|
GET    | /                   |   Home Page            |
POST   | /authenticate       |   Login                |
GET    | /users/             |   get All Users         |
GET    | /users/:username    |   get User By Username |
GET    | /users/id/:id       |   get User By ID       |
GET    | /users/email/:email |   get User By Email    |
POST   | /users/             |   add User             |
PUT    | /users/:id          |   update User By ID    |
DELETE | /users/:id          |   delete User By ID    |


### Descriptions

#### Home Page
  * Returns a "Welcome to Our Site" message. Could be whatever makes sense.

#### Login
  * Returns a JWT on success. 
> The JWT must be added to a custom __api-jwt__ header for all API calls which are not 'public' ( such as the routes __/__ and __/authenticate__ )

##### Fields Sent
Field | Value in the example
|-------|-------------------------|
username   | bobbybob
password   | asdfasdf

> Make sure the Content-Length is __exactly the same__ as the actual length (-d flag field). __username=bobbybob&password=asdfasdf__ is 35. If these lengths don't match the call will fail.

```cURL
 curl -X POST \
  http://localhost:3002/authenticate \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 35' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Host: localhost:3002' \
  -d 'username=bobbybob&password=asdfasdf'
```

#### Get All Users
```
curl -X GET \
  http://localhost:3002/users \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Host: localhost:3002' \
  -H 'api-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZmlyc3RuYW1lIjoiREVMRVRFIiwibGFzdG5hbWUiOiJNRSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE1Njg2NzM0NzYsImV4cCI6MjQzMjU4NzA3Nn0.uz0uKgpfFgSDX42QDTw131MR89vMp22Nv3MxROi37ws' \
```

#### Get User By Username
```
curl -X GET \
  http://localhost:3002/users/bobbybob \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Host: localhost:3002' \
  -H 'api-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZmlyc3RuYW1lIjoiREVMRVRFIiwibGFzdG5hbWUiOiJNRSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE1Njg2NzM0NzYsImV4cCI6MjQzMjU4NzA3Nn0.uz0uKgpfFgSDX42QDTw131MR89vMp22Nv3MxROi37ws' \
```

#### Get User By ID
```
curl -X GET \
  http://localhost:3002/users/id/4 \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Host: localhost:3002' \
  -H 'api-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZmlyc3RuYW1lIjoiREVMRVRFIiwibGFzdG5hbWUiOiJNRSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE1Njg2NzM0NzYsImV4cCI6MjQzMjU4NzA3Nn0.uz0uKgpfFgSDX42QDTw131MR89vMp22Nv3MxROi37ws' \
```


#### Get User By Email
```
curl -X GET \
  http://localhost:3002/users/email/bobbybob@example.com \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Host: localhost:3002' \
  -H 'api-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZmlyc3RuYW1lIjoiREVMRVRFIiwibGFzdG5hbWUiOiJNRSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE1Njg2NzM0NzYsImV4cCI6MjQzMjU4NzA3Nn0.uz0uKgpfFgSDX42QDTw131MR89vMp22Nv3MxROi37ws' \
```


#### Add User
> Users are added to the DB with a bcrypt-encrypted password, however __no salt is used__. It is __highly__ recommended that a unique salt be used per user and stored with the password.

##### Fields Sent
Field | Value in the example
|-------|-------------------------|
username   | bobbybob
firstname  | Robert
lastname   | Roberts
email      | bobbybob@example.com
password   | asdfasdf
role       | ['user', 'mgr']

> __role__ can take one or multiple roles. For single role use a string
`user`. For multiple roles use an array ` ['user', 'mgr'] `


```cURL
curl -X POST \
  http://localhost:3002/users/ \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 139' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Host: localhost:3002' \
   -H 'api-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZmlyc3RuYW1lIjoiREVMRVRFIiwibGFzdG5hbWUiOiJNRSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE1Njg2NzM0NzYsImV4cCI6MjQzMjU4NzA3Nn0.uz0uKgpfFgSDX42QDTw131MR89vMp22Nv3MxROi37ws'
  -d 'username=bobbybob&firstname=Robert&lastname=Roberts&email=bobbybob%40example.com&role=%5B'\''user'\''%2C%20'\''mgr'\''%5D&password=asdfasdf'
```
