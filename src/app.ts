import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import njuck from "nunjucks";
import bluebird from "bluebird";
import DotEnv from "./lib/class-dotenv";
import config from "./config/settings";
import session from "express-session";
import sessionStore from "connect-mongo";
import bodyParser from "body-parser";
import * as io from "socket.io";
import path from "path";
import webRoutes from "./routes";
import apiRoutes from "./api/routes";
import { minuteToMiliseconds } from "./utils/helpers";
DotEnv.loader();

const {
    PORT,
    NODE_ENV,
    DB_URI,
    SECRET_KEY
} = process.env;


const app = express();
const httpServer = createServer(app);
const socketio = new io.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const MongoStore = sessionStore(session);

// Express configuration
app.set("port", PORT || 3000);
app.set("env", NODE_ENV);
app.set("views", path.join(__dirname, "./views"));
app.set("static", path.join(__dirname, "./static"));
app.set("view engine", "html");

// Nunjuck configuration
njuck.configure(app.get("views"), {
    autoescape: true,
    noCache: false,
    express: app
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(config.staticPath, express.static(app.get("static")));

// Middlewares
app.use(session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: minuteToMiliseconds(30) },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));



// Web Routes
webRoutes(app);
// Api Routes
apiRoutes(app);


//Handle connection
socketio.on("connection", function (socket) {
    //console.log("User connected");

    //Brodcast Message
    socket.on('chat message', (msg:any) => {
        socketio.emit('chat message', msg);
    });

    //UserStatus Message
    socket.on('chat userStatus', (data:any) => {
        socketio.emit('chat userStatus', data);
    });


    socket.on('disconnect', function () {
        //console.log('User disconnected');
    });
});

mongoose.Promise = bluebird;
// Connect to MongoDB
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.info("mongoose -> Connected to server successfully!");
    },
).catch(e => {

    console.error(`mongoose -> Unable to connect to the server. Please start the server. Error is ${e.message}`);

    console.error(`mongoose -> Unable to connect to the server. Stack is ${e.stack}`);

    process.exit();
});

export { httpServer, app };
