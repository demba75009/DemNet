const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://donkey:dembaleboss@cluster0.m3r9p.mongodb.net/DemNet?retryWrites=true&w=majority"
  )
  .then((res) => console.log("ok"));
