import express from 'express';
import exphbs from 'express-handlebars';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import postRouter from './postRouter/postRouter.js';
import buildingRouter from './postRouter/buildingRouter.js';
import userRouter from './postRouter/userRouter.js';
import authRouter from './postRouter/authRouter/authRouter.js';
import toastr from 'toastr';
import path from 'path';
import {fileURLToPath} from 'url';
const t = toastr;

const app = express();
dotenv.config();
const port = process.env.PORT;
const db_string = process.env.DB_STRING;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = mongoose.connect(db_string, (err) =>{
if(err) throw err
console.log(`mongoose is connected`)
});

// Register custom helper functions
const customHelpers = {
    // Define your custom helpers here
    ifCond: function(v1, operator, v2, options) {

        switch (operator) {
            case '==':
                return (JSON.stringify(v1) === JSON.stringify(v2)) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            case '%':
                return (v1 % v2 == 0) ? options.fn(this) : options.inverse(this);
            case 'includes':
                return (v1.includes(v2)) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    }
    // Add more helpers as needed
};

app.use( express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(session({
    secret: 'your_secret_key', // Change this to a secret key for better security
    resave: false,
    saveUninitialized: true
  }));
app.use(express.urlencoded({ extended: true}));
app.engine('hbs', engine({extname:'hbs',helpers: customHelpers}));
app.set('view engine','hbs');

// var handlebars = Handlebars.create({
//     helpers: {}
// });
app.set('views', 'views')
app.get('/', (req, res)=>{
    /* res.send(`Home Pge`); */
        res.render('home');
});

app.use('/post', postRouter);
app.use('/buildings', buildingRouter);
app.use('/users', userRouter);
app.use('/admin', authRouter);


app.listen(port, () =>{
    console.log(`server is running on http://localhost:${port}`);
});

