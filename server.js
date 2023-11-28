const express = require ('express')
const routes = require ('./routes')
const config = require('./config/connection')
const path = require('path')

const helpers = require ('./utils/helpers');

const exphb = require ('express-handlebars');

const esession = require ('express-session')

const app = express();
const PORT = process.env.PORT || 3001;

const sqlStore = require('connect-session-sequelize')(esession.Store)

const mainSession = {
    secret: 'Pahhhn',
    cookie: {
     expires: 5 * 60 * 1000
    },
    resave:true,
    rolling:true,
    saveUninitialized: true,
    store: new sqlStore({
        db:config
    })

};

app.use(esession(mainSession));

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

config.sync({ force:false }).then(()=>{
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  });
  