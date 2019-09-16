# NEM-RAS
## Node / Express / MySQL REST API Skeleton


This is a project kick-starter for building a suite of role-based access REST APIs

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



## NEM-RAS API Reference

### ROUTES

Method | Route | Functionality                        |
|------|---------------------|------------------------|
GET    | /                   |   Home Page            |
POST   | /authenticate       |   Login                |
GET    | /users/             |   get AllUsers         |
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
> The JWT must be added to a custom __api-jwt__ header for all API calls which are not 'public' such as the routes __/__ and __/authenticate__ 

##### Fields Sent
Field | Value in the example
|-------|-------------------------|
username   | bobbybob
password   | asdfasdf

```cURL
 curl -X POST \
  http://localhost:3002/authenticate \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 32' \
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
  -H 'api-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNyYWlnIiwicm9sZSI6ImFkbWluIiwiZmlyc3RuYW1lIjoiQ3JhaWciLCJsYXN0bmFtZSI6Ik1jRWx3ZWUiLCJlbWFpbCI6ImNyYWlnbWNlbHdlZUBnbWFpbC5jb20iLCJpYXQiOjE1Njg1ODg5MDQsImV4cCI6MTU2ODY3NTMwNH0.hhT6UuvD7PI15fBRc_GDCnn4O8O-aE0S7nqIxg_Lzas' \
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
  -H 'api-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNyYWlnIiwicm9sZSI6ImFkbWluIiwiZmlyc3RuYW1lIjoiQ3JhaWciLCJsYXN0bmFtZSI6Ik1jRWx3ZWUiLCJlbWFpbCI6ImNyYWlnbWNlbHdlZUBnbWFpbC5jb20iLCJpYXQiOjE1Njg1ODg5MDQsImV4cCI6MTU2ODY3NTMwNH0.hhT6UuvD7PI15fBRc_GDCnn4O8O-aE0S7nqIxg_Lzas' \
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
  -H 'api-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNyYWlnIiwicm9sZSI6ImFkbWluIiwiZmlyc3RuYW1lIjoiQ3JhaWciLCJsYXN0bmFtZSI6Ik1jRWx3ZWUiLCJlbWFpbCI6ImNyYWlnbWNlbHdlZUBnbWFpbC5jb20iLCJpYXQiOjE1Njg1ODg5MDQsImV4cCI6MTU2ODY3NTMwNH0.hhT6UuvD7PI15fBRc_GDCnn4O8O-aE0S7nqIxg_Lzas' \
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
  -H 'api-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNyYWlnIiwicm9sZSI6ImFkbWluIiwiZmlyc3RuYW1lIjoiQ3JhaWciLCJsYXN0bmFtZSI6Ik1jRWx3ZWUiLCJlbWFpbCI6ImNyYWlnbWNlbHdlZUBnbWFpbC5jb20iLCJpYXQiOjE1Njg1ODg5MDQsImV4cCI6MTU2ODY3NTMwNH0.hhT6UuvD7PI15fBRc_GDCnn4O8O-aE0S7nqIxg_Lzas' \
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
  -d 'username=bobbybob&firstname=Robert&lastname=Roberts&email=bobbybob%40example.com&role=%5B'\''user'\''%2C%20'\''mgr'\''%5D&password=asdfasdf'
```

## Installation
> Node, npm, and MySQL should already be installed

### Clone this repo

### npm initialize (?????)

### edit MySQL script
...../schema/users.sql....run it.... you can delete the schema directory as it is no longer needed.

### edit the MySQL connection script
/util/database.js ... fields to match schema script....

### Create an ADMIN user.

Run the server
```
node app.js
```

* Default user/pass is admin admin
* authenticate - 
* Change the Add User cURL call above to your preferred user credentials. For __role__ put `admin`. Change the __api-jwt__ header to the JWT from authenticating


