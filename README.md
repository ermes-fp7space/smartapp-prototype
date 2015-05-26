
The OpenShift `nodejs` cartridge documentation can be found at:

http://openshift.github.io/documentation/oo_cartridge_guide.html#nodejs
=======
#ERMES MOBILE APP NODE SERVER
Here i'm going to explain the steps followed to create and run the node server.
I'm using this three web-pages as reference:

* [Creating REST API](https://carlosazaustre.es/blog/como-crear-una-api-rest-usando-node-js/)

* [Configuring a Login Form.](https://carlosazaustre.es/blog/como-crear-una-api-rest-usando-node-js/)

* [For the future: MySQL and Node.js](https://carlosazaustre.es/blog/como-crear-una-api-rest-usando-node-js/)

###STEPS
1. [Install NodeJS.] (https://nodejs.org/)
2. [Install MongoDB.] (https://www.mongodb.org/)
3. Create *'package.json'* file, in it comes the modules and libraries needed.
4. Run command: *npm install*. It installs all packages needed (refeered in package.json)
5. Open three command prompts, I recomend [this one](http://git-scm.com/downloads)
6. Command Prompt 1: Navigate to project root. Run *mongod* it starts the DB system. You can track movements in there.
7. Command Prompt 2: Navigate to project root. Run *mongo* it allows you access te DB.
8. Command Prompt 3: Navigate to project root. Run *server.js*, it should start the server.
9. In the browser navigate to *http://localhost:3030/* You should see the login form.
10. Now you can access the services.

###PROBLEMS: 
Maybe the prompt doesn't run the commands *node, mongo or mongod*. If it happens you need to add them to the path.
###SERVICES:
####PARCEL SERVICES

* View all parcels: GET http://localhost:3030/api/parcels
* Add new parcel: POST http://localhost:3030/api/parcels With a json in the message, like this:

{
  "parcelId": "AAA",
  "ownerId": "Nacho Miralles",
  "water": 50,
  "phenology": 2500,
  "image": "mola"
}

* Get a parcel by parcelId (not internal id '_id'): GET http://localhost:3030/api/parcels/parcelId: for example:
http://localhost:3030/parcels/AAA
* Update a parcel by parcelId: PUT http://localhost:3030/api/parcels/parcelId With a JSON in the message, like this:

{
  "parcelId": "BBB",
  "ownerId": "Alberto",
  "water": 11,
  "phenology": 3213,
  "image": "Otra imagen"
}

* Delete a parcel by parcelId: DELETE http://localhost:3030/api/parcels/parcelId

####USER SERVICIES
* Get all users: GET http://localhost:3030/api/users
* Get a user by username: GET http://localhost:3030/api/users/username: for example:

http://localhost:3030/api/users/nacho

{
   "_id": "553a4e8bdf92d75c05000001",
   "email": "nacho@nacho.es",
   "password": "$2a$10$hCgiXR2nHV1oO9UQfG3CbugLO2XfZBzGiatzCI3bqKDqEk28/E7Wq",
   "username": "nacho",
   "__v": 0
}
