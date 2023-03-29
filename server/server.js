require("dotenv").config();
require("express-async-errors");

const express = require("express");
//express app
const app = express();

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//db
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/auth");
const torskRouter = require("./routes/api");

//error routes
const notFound = require("./middleware/notFound");
const apiErrorHandler = require("./middleware/api-error-handler");

//auth middleware
const authenticateUser = require("./middleware/requireAuth");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Expose request methods and url hit
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.path}`);
  next();
});

//routes
app.get("/", (req, res) => res.send("Welcome home :)"));

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/torsk", authenticateUser, torskRouter);

//404 page - catch errors
app.use(notFound);
app.use(apiErrorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
