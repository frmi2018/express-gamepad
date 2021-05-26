require("dotenv").config();

const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(cors());

app.get("/games", async (req, res) => {
  const page = req.query.page;
  const ordering = req.query.ordering;
  const page_size = req.query.pagesize;
  const search = req.query.search;
  console.log(search, page);

  try {
    if (search === undefined) {
      await axios
        .get(
          `https://api.rawg.io/api/games?key=${process.env.APIKEY}&page_size=${page_size}&page=${page}&ordering=${ordering}`
        )
        .then((response) => {
          const data = response.data;
          res.status(200).json(data);
        })
        .catch((error) => {
          res.status(400).json({ message: error.message });
        });
    } else {
      await axios
        .get(
          `https://api.rawg.io/api/games?key=${process.env.APIKEY}&page_size=${page_size}&page=${page}&search=${search}`
        )
        .then((response) => {
          const data = response.data;
          res.status(200).json(data);
        })
        .catch((error) => {
          res.status(400).json({ message: error.message });
        });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server has started, listening on ${port}`);
});
