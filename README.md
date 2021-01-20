# citiesQuiz
A guessing cities game.
Try it [here](https://cities-quiz.herokuapp.com/) 



## To start locally
###prerequisites
You must install Postgres on your computer to run this app locally. Make sure to edit `.env` file inside a root dir, to provide database Env Vars.
Not to forget to apply migrations to database, which are in `./db/migrations/migrations.sql`.

1. clone repo
   
   `git clone https://github.com/Anikram/citiesQuiz.git`
   
2. install server dependencies - run `yarn install` in the root dir and then run `yarn start` to launch server. Server will be launched at `https://localhost:5000/`.
It serves data for the client from Postgres database via json.
   
4. install client dependencies - go to `cd client` and run `yarn install`. After that launch app by `yarn start`. Client will start at `http://localhost:3000/`.
5. Go to http://localhost:3000/
6. Have fun! =)

## Technologies and packages
* yarn v 1.22.10
* dotenv
### client side
* react v17.0.1
* redux 
* react-bootstrap
* react-map-gl v5.2.11
* react-toastify
* redux-form
* redux-thunk
### server side
* node v15.4.0
* bcrypt 
* express
* express-validator
* jsonwebtoken
* pg 8.5.1
  

### remarks
In case of crashes please contact [me](https://vk.com/alexwave).

You can play the game on https://cities-quiz.herokuapp.com/

Deployed on Heroku

Anikram, december 2020


inspired by intSpirit company

