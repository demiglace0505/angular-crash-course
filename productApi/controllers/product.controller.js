const dbcon = require("../config/db_connection");
const express = require("express");

const connection = dbcon.getConnection();

connection.connect();
const router = express.Router();

router.get("/", (req, res) => {
  connection.query("select * from product", (err, records, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.send(records);
    }
  });
});

router.get("/:id", (req, res) => {
  connection.query(
    `select * from product where id=${req.params.id}`,
    (err, records, fields) => {
      if (err) {
        console.error(err);
      } else {
        res.send(records);
      }
    }
  );
});

router.post("/", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  connection.query(
    `insert into product values(${id}, '${name}', '${description}', ${price})`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send({ insert: "success" });
      }
    }
  );
});

router.put("/", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  connection.query(
    `update product set name='${name}', price=${price} where id=${id}`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send({ update: "success" });
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  connection.query(
    `delete from product where id=${req.params.id}`,
    (err, records, fields) => {
      if (err) {
        console.error(err);
      } else {
        res.send({ delete: "success" });
      }
    }
  );
});

module.exports = router;
