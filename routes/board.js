var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var conStr = {
  url:"localhost",
  user:"root",
  password:"1234",
  database:"nodejs"
};

/* GET users listing. */
router.get('/list', function(request, response, next) {
  var sql = "select * from board";
  var client = mysql.createConnection(conStr);

  client.query(sql, function (error, result, fields) {
    if (error) {
      console.log(error);
    } else {
      //console.log(result);
      response.writeHead(200, {"Content-Type":"text/json;charset=utf-8"});
      response.end(JSON.stringify(result));
    }
    client.end(function (e) {
      console.log("end..");
    });
  });
});

//글 등록 요청 처리
router.post("/regist", function (request, response, next) {
  var title = request.body.title;
  var writer = request.body.writer;
  var content = request.body.content;

  var sql = "insert into board(title, writer, content) values(?, ?, ?)";

  var client = mysql.createConnection(conStr);
  client.query(sql, [title, writer, content], function (error, fields) {
    if (error) {
      console.log(error);
    } else {
      response.writeHead(200, {"Content-Type":"text/html;"});
      response.end("1");
    }
    client.end(function (e) {
      console.log("end..");
    });
  });
});

router.get("/detail", function (request, response, next) {
  var board_id = request.query.board_id;
  var sql = "select * from board where board_id=?";
  var client = mysql.createConnection(conStr);

  client.query(sql, [board_id], function (error, result, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log("결과 : ", result);
      //response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
      response.render("board/detail", {
        board:result[0]
      });
    }
    client.end(function (e) {
      console.log("end..");
    });
  });
});

module.exports = router;