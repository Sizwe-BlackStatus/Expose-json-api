require("dotenv").config();
var fs = require("fs");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

const addNewVisitor = (req, res) => {
  const {
    visitorname,
    visitorage,
    dateofvisit,
    timeofvisit,
    assistantsname,
    comments,
  } = req.body;

  pool.query(
    `INSERT INTO VISITORS (visitorname, visitorage, dateofvisit, timeofvisit, assistantsname, comments) 
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`,
    [
      visitorname,
      visitorage,
      dateofvisit,
      timeofvisit,
      assistantsname,
      comments,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      let JSONobj = JSON.stringify(results.rows[0]);
      fs.writeFile(`visitor_${visitorname}.json`, JSONobj, function (err) {
        if (err) throw err;
        console.log("JSON file saved");
      });
      res.status(200).json(results.rows[0]);
    }
  );
};

const listAllVisitors = (req, res) => {
  pool.query(`SELECT id,visitorname FROM visitors;`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const deleteVisitor = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    `DELETE FROM visitors WHERE id = $1 RETURNING *;`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

const updateVisitor = (req, res) => {
  const id = parseInt(req.params.id);
  const { assistantsname } = req.body;
  pool.query(
    `UPDATE visitors
     SET assistantsname = $2
     WHERE id = $1
     RETURNING *;`,
    [id, assistantsname],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

const viewVisitor = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    `SELECT * FROM visitors
     WHERE id = $1;`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

const deleteAllVisitor = (req, res) => {
  pool.query(`DELETE FROM visitors;`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows[0]);
  });
};

module.exports = {
  pool,
  addNewVisitor,
  listAllVisitors,
  deleteVisitor,
  deleteAllVisitor,
  viewVisitor,
  updateVisitor,
};
