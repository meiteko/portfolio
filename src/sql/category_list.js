const express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  res.send("this page is home");
});

app.listen(40012, function() {
  require('date-utils');
  var dt = new Date();
  var formatted = dt.toFormat("YYYY/MM/DD HH24時MI分SS秒");
  console.log(formatted);
});

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "150.95.144.212",
  user: "root",
  password: "Kamihiko1@",
  database: "gamewalk"
});

app.get("/categories", function(req, res) {
  connection.query("select * from category;", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/article/:article_id", (req, res) => {
  let id = req.params.article_id;
  let sql = `SELECT
              aa.id as article_id,aa.article_url,aa.title,aa.title,aa.img_src,aa.article_xpath_id,ms.name,ax.media_site_id,ax.lazy_tag_attr,ax.article_contents_xpath
             FROM
              article_all as aa
             LEFT JOIN
              media_site as ms ON aa.media_site_id = ms.id
             LEFT JOIN
              article_xpath as ax
             ON
              aa.media_site_id = ax.media_site_id
             AND
              aa.category_id = ax.category_id
             WHERE
              aa.title != '' and aa.img_src != '' and aa.contents != '\x00' and aa.category_id = ? and aa.media_site_id = 1 ORDER BY aa.insert_time DESC LIMIT 10;`;
  connection.query(sql, id, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/article_contents/:article_id", (req, res) => {
  let id = req.params.article_id;
  let sql = "SELECT article_all.contents,media_site.sp_css FROM article_all LEFT JOIN media_site ON article_all.media_site_id = media_site.id WHERE article_all.id = ?;";
  connection.query(sql, id, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/media_info", function(req, res) {
  connection.query("select * from media_site;", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});
