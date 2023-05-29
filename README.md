<h1 align="center" id="title">Digi Bookshelf API</h1>

<p align="center"><img src="https://socialify.git.ci/NB071/DigiBookShelf_API/image?description=1&amp;descriptionEditable=API%20for%20%60Digi%20Bookshelf%60%20project.&amp;language=1&amp;logo=https%3A%2F%2Fi.ibb.co%2FyFfk1z4%2FLogo.png&amp;name=1&amp;owner=1&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>

<p id="description">This repository is the back-end side of the `Digi Bookshelf` project.</p>

<h2>🚀 Demo</h2>

[http://digibookshelf.com](http://digibookshelf.com)

<h2>Database Schema:</h2>

<img src="https://i.ibb.co/smyJZY3/DBschema.png" alt="project-screenshot" width="400" height="400/">

<h2>🕸️External API's :</h2>

*   [NYT API](https://developer.nytimes.com/get-started) ## (API-KEY REQ.)
*   [Pravatar](https://pravatar.cc) ## (API-KEY NOT REQ.)
*   [GoogleBooks](https://www.googleapis.com/books/v1/) ## (API-KEY NOT REQ.)
  
  
<h2>🧐 End-points:</h2>

Here're some of the project's best features:

*   GET     || /:videoName -> For login/sign-up short videos
*   GET     || /api/verify -> For verification of JWT tokens
*   POST    || /api/login -> For login
*   POST    || /api/register -> For sign-up
*   GET     || /api/nyt-best-seller -> Getting the list of Week's NYT bestseller from NYT API
*   GET     || /api/users -> Getting list of all users with all their info
*   GET     || /api/books/:BookId -> Getting info about a single book
*   GET     || /api/user/activities -> Getting info about the users activity used in some chart in website
*   GET     || /api/user -> Getting all info about the user
*   PATCH   || /api/user -> Change some info about the user
*   PATCH   || /api/user/password -> Change only password of the user
*   GET     || /api/user/books/genres -> Getting the list of all the books genre the user read
*   GET     || /api/user/:userId -> Getting all information about some user
*   GET     || /api/user/books -> Getting the list of all the book the user has on shelf
*   POST    || /api/user/books -> Creating a book for the user on shelf
*   DELETE  || /api/user/books -> Delete a book of the user from shelf
*   PATCH   || /api/user/books/:bookId -> Edit some info about a specific book for the user
*   POST    || /api/user/friends -> Add friend request from the user
*   DELETE  || /api/user/friends -> Remove friend request from the user
*   POST    || /api/user/friends/accept -> Accept the pending friend request
*   POST    || /api/user/friends/reject -> Reject the pending friend request

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repo</p>

```
$ git clone https://github.com/NB071/DigiBookShelf_API
```

<p>2. Navigate to the project's folder</p>

```
$ cd DigiBookShelf_API
```

<p>3. Install dep packages</p>

```
$ npm i
```

<p>4. Edit .env-sample with db url api keys and ...</p>

```
SERVER_URL=
PORT=
DB_HOST=
DB_LOCAL_USER=
DB_LOCAL_PASSWORD=
DB_LOCAL_DBNAME=digibookshelf
NYT_API_KEY=
JWT_SIGN_KEY= 
```

<p>5. Migration of the db</p>

```
$ npm run migrate
```

<p>6. Seeding the db</p>

```
$ npm run seed
```

<p>7. Run</p>

```
$ npm start
```

<p>[-] Rolling back</p>

```
$ npm run rollback
```

<h2>🍰 Contribution Guidelines:</h2>

1\. Fork the repository\. <br>
2\. Create a new branch: ```git checkout -b feature-name``` <br>
3\. Make your changes\. <br>
4\. Commit your changes: ```git commit -m 'Add some feature'```  <br>
5\. Push to the branch: ```git push origin feature-name``` <br>
6\. Submit a pull request <br>

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Node.js / Express.js
*   Knex.js / MySQL
*   Socket-io
