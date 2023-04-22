const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('upload'));

const cors = require("cors");
app.use(cors());

const auth = require("./routes/Auth");
const book = require("./routes/book");

app.listen(3000, "localhost", () => {
    console.log("server is runing");
})

app.use("/auth", auth);
app.use("/book", book);
