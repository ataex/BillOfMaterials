# Bill Of materials restful API
Hello Sila Data Systems Team! Thank you for taking the time to look over my solution to your coding challenge. Below you will find all the information necessary to start, interact, and understand my solution.

## Starting and Instantiating the Service
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

## Querying the Data
I highly recommend using postman to query the data. It provides the information back in a format that is much easier to read than on a terminal. I have provided a link to a workspace that I have already set up with some sample queries. 
###### PostMan Link
https://app.getpostman.com/join-team?invite_code=df27f4afcfa882b6e3fe323dbf5e23e8

## API Reference

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
    - Returns all parts
2. GET /parts/id/:partId
    - Returns information on specified part
3. GET /parts/components
    - Returns all component parts
4. GET /parts/orphans
    - Returns all orphan parts
5. GET /assemblies
    - Returns all assemblies
6. GET /assemblies/top
    - Returns all top level assemblies
7. GET /assemblies/sub
    - Returns all sub-assemblies
8. GET /assemblies/:assemblyId/components
    - Returns all parts that make up a specified assembly
9. GET /assemblies/:assemblyId/components/top
    - Returns all first level (direct children) of a specified assembly
10. GET /parts/:partId/assemblies
    - Returns a list of all assemblies that the specified part
###### DELETE Requests
1. DELETE /parts/:partId
    - Deletes the specified part. It also will delete all the part from all of the assemblies it is included in. It also will update all of it's children accordingly.
2. DELETE /assemblies/:parentId
    - Body: {"child":{"id":"partId"}}
        - This will remove the specified part from the parent assembly

## Bonus Enhancement
The bonus feature that I implemented to enhance funcitonality was denormalizing the data. If you look at the file model/model.js you can see that there is an object nodes and then nodesOrg. Nodes is library that holds all of the parts, their information, and their children. NodesOrg is a seperate object that holds essentially copies of these parts except that they are all categorizied based upon what type of part they are. This way when a user wants to get all components, or orphans, or top level assemblies they can do so in constant time.

This does however come at a cost. For one their is an increase in memory now that we have the data living in multiple places. Also, updating the data takes longer to process becuase it has to ensure that it is updated correctly in all locations. When thinking about the use case I figured that it would be much more important to get users information quickly and was worth the sacrifice of a bit more time necessary for anyone making changes to the Bill of Materials.
