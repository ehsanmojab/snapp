const express = require("express");
const mysql = require("mysql");

const app = express();

// create mysql connection
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "snapp",
});

// connect to mysql
db.connect((err) => {
  if (err) {
    if (err.sqlState === "42000") {
      return;
    }
    throw err;
  }
  console.log("Connected to MySQL");
});

let q = "";
// api endpoint on path
app.get("/api/passenger", (req, res) => {
  db.query(q, (err, results) => {
    if (err) {
      if (err.sqlState === "42000") {
        return;
      }
      throw err;
    }
    res.json(results);
  });
});
//driver query
app.get("/api/drivers", (req, res) => {
  db.query("SELECT * FROM driver", (err, results) => {
    if (err) {
      if (err.sqlState === "42000") {
        return;
      }
      throw err;
    }
    res.json(results);
  });
});

app.get("/api/trips", (req, res) => {
  db.query(
    "SELECT t.*, p.passenger_name, p.passenger_last_name, d.driver_name, d.driver_last_name FROM trip as t join passenger as p on t.passenger_id = p.passenger_id join driver as d on d.driver_id=t.driver_id",
    (err, results) => {
      if (err) {
        if (err.sqlState === "42000") {
          return;
        }
        throw err;
      }
      res.json(results);
    }
  );
});

app.get("/api/donetrips", (req, res) => {
  db.query(
    "SELECT t.*,d.driver_name,d.driver_last_name FROM done_trip as t join driver as d on t.driver_id = d.driver_id ",
    (err, results) => {
      if (err) {
        if (err.sqlState === "42000") {
          return;
        }
        throw err;
      }
      res.json(results);
    }
  );
});

app.get("/api/discounttrip", (req, res) => {
  db.query(q, (err, results) => {
    if (err) {
      if (err.sqlState === "42000") {
        return;
      }
      throw err;
    }
    res.json(results);
  });
});

app.get("/api/mostreq", (req, res) => {
  db.query(
    //????????????????????????????????????????????????????????????????????????????????????????????
    ` select *,count(request_id) as count from request as r join passenger as p on p.passenger_id = r.passenger_id where request_date between '2017-07-20' and '2026-07-25' group by p.passenger_id order by count desc limit 10;`,
    (err, results) => {
      if (err) {
        if (err.sqlState === "42000") {
          return;
        }
        throw err;
      }
      res.json(results);
    }
  );
});

//_____________to get data from client
app.use(express.json()); // Enable JSON parsing middleware

app.post("/api/drivertrip", (req, res) => {
  const receivedData = req.body;
  q = `select * from trip as t join driver as d on d.driver_id = t.driver_id where trip_date between \"${receivedData._value[0]}\" and \"${receivedData._value[1]}\" and t.driver_id = ${receivedData._value[2]} ;`;
});

app.get("/api/drivertrip", (req, res) => {
  db.query(q, (err, results) => {
    if (err) {
      if (err.sqlState === "42000") {
        return;
      }
      throw err;
    }
    res.json(results);
  });
});
//_____________
app.post("/api/discounttrip", (req, res) => {
  const receivedData = req.body;
  q = `select passenger_name, passenger_last_name, pm.trip_id, trip_date, cost, discount_price, (cost - discount_price) as discount from payment as pm join passenger as p on p.passenger_id=pm.passenger_id join trip as t on t.trip_id = pm.trip_id join discount_code as d on d.discount_code_id = pm.discount_code_id where t.trip_date between "${receivedData._value[0]}" and "${receivedData._value[1]}";`;
});
app.post("/api/passenger", (req, res) => {
  const receivedData = req.body;
  q = `select * from trip as t join passenger as p on t.passenger_id = p.passenger_id where t.passenger_id = ${receivedData._value[2]} and trip_date between "${receivedData._value[0]}" and "${receivedData._value[1]}";`;
});
app.get("/api/avgdriver", (req, res) => {
  db.query(
    "select * from driver order by avg_rate limit 10;",
    (err, results) => {
      if (err) {
        if (err.sqlState === "42000") {
          return;
        }
        throw err;
      }
      res.json(results);
    }
  );
});

app.post("/api/notactive", (req, res) => {
  const receivedData = req.body;
  q = `select distinct * from membership join trip on membership.driver_id = trip.driver_id join driver on driver.driver_id = membership.driver_id where membership_status = 'Active' and (trip_date not between '2016-01-01' and '2021-01-01');`;
});
app.get("/api/notactive", (req, res) => {
  db.query(q, (err, results) => {
    if (err) {
      if (err.sqlState === "42000") {
        return;
      }
      throw err;
    }
    res.json(results);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
