# reacktor-assignment
The live demo is available here: https://damp-woodland-60966.herokuapp.com/

A web aplication that renders all the software packages that the Debian and Ubuntu systems knows about 
#### Features
- The index page lists installed packages alphabetically with package names as links.
- When following each link, you arrive at a piece of information about a single package. The following information are included:
   - Name
   - Description
   - The names of the packages the current package depends on
   - Reverse dependencies
 - Feature to add notes and tags to individual packages
 - Lists all the tags and notes
 - Filter the packages according to the tag
 
 #### Stack and Working Methodology
 The application uses NodeJS and ReactJs for the development and MongoDB for database management. 
- There is a data.txt file in the root of the Application which contains all the packages informantion. 
- With the help of Nodejs fs the application reads all the data and change it into array of objects and save to the database
 The server contains various services to get and update the packages
- In the front-end React queries the data from the server with the help of Axios and render it in the page.

## Quick start

#### 1. Clone the Repo
` git clone https://github.com/pbohora/reaktor-assignment.git`

#### 2. Install all packages
```
cd reaktor-assignment/
npm install
```
Then, navigate to the client directory and again run the following command:
```
cd client/
npm install
```
#### 3. Add .env
At the root of the application add a file with name `.env`. Inside that file add the following:
```
MONGODB_URI=<your database link>
PORT=<give your Port>
```
#### 4. Run the application 
To run the application, use the following command from the root of the project:
```
npm start
```
Your site is now running at `http://localhost:3001`

or you can also run the backend and frontend separately with the following commands,
form the root of the project run
```
npm run dev
```
this will run the server at `http://localhost:3001`

To run the front end :
```
cd client 
npm start
``` 
this will run the forntend at `http://localhost:3000`

For production:
- From the root of the application run:

```
npm start 
```
*This will run the production node app*  
- For the front-end build, run the following command
```
cd client
npm run build
```


