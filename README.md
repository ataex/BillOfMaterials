#Bill Of materials restful API
Hello Sila Data Systems Team! Thank you for taking the time to look over my solution to your coding challenge. Below you will find all the information necessary to start, interact, and understand my solution.

##Starting and Instantiating the Service
1. Clone the repo down on to a local machine
2. Navigate in to the root of the directory
3. $ npm install
4. $ npm start
5. In an other terminal window, navigate back to the root of the directory
6. $ cd shell_scripts
7. $ sh executeInstantiationScripts.sh

Explanation of startup:
Steps 1 through 3 will ensure that the service is locally installed on your machine with all of the necessary dependencies installed.
Step 4 will start the service and the api will be listening on your local machine at port 3000.
Steps 5 through 7 will instantiate sample data for four different variations of pens. The shell script in step 7 initally runs the shell script createParts.sh, waits for that to finish, then runs createSubAssem.sh and createCompletePens.sh in parallel. The last two shell scripts can be run in parallel since the service is agnostic with regards to how sub-assemblies and top-level-assemblies are constructed.

##API Reference
###### POST Requests
1. POST /parts
  - Body: {"id":"partIdNumber","name":"namePart"}
    - Creates the specified part if does not already exist
###### PUT Requests
1. PUT /assemblies/:parentId
  - Body: {"child":{"id":"childPartId"}}
    - Adds the part specified in the body as a child of the part specified in the request parameter
###### GET Requests
1. GET /parts
  - Returns all of parts
2. GET /parts/components
  - Returns all component parts
3. GET /parts/orphans
  - Returns all orphan parts
4. GET /assemblies
  - Returns all assemblies
5. GET /assemblies/top
  - Returns all top level assemblies
6. GET /assemblies/sub
  - Returns all sub-assemblies
7. GET /assemblies/:assemblyId/components
  - Returns all parts that make up a specified assembly
8. GET /assemblies/:assemblyId/components/top
  - Returns all first level (direct children) of a specified assembly
9. GET /parts/:partId/assemblies
  - Returns a list of all assemblies that the specified part
###### DELETE Requests

