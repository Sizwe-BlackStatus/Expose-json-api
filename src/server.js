const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const {
  addNewVisitor,
  deleteVisitor,
  listAllVisitors,
  viewVisitor,
  updateVisitor,
  deleteAllVisitor,
} = require("./node_file_io");

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addNewVisitor", addNewVisitor);

app.delete("/deleteVisitor:id", deleteVisitor);

app.get("/viewVisitors", listAllVisitors);

app.get("/viewVisitor:id", viewVisitor);

app.put("/updateVisitor:id", updateVisitor);

app.delete("/deleteAllVisitors", deleteAllVisitor);

const server = app.listen(4000, () => {
  console.log("Server is running");
});
server
module.exports = server