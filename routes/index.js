var express = require('express');
var router = express.Router();
const entitySchema = require("../models/Entity");
/* GET home page. */

function stub() {
  var ret = [];
  var val = [];
  for (i = 0; i < 20; i ++) {
    val[i] = [];
    val[i]['value'] = [];
    val[i]['id'] = i + 1;
    for (j = 0; j < 5; j ++)
      val[i]['value'].push((Math.random() * (-1 - 1) + 1).toFixed(4));
  }
  ret['data'] = val;
  val['sum'] = [];
  for (i = 0; i < 5; i ++) {
    sum = 0;
    for (j = 0; j < 20; j ++)
      sum += parseFloat(val[j]['value'][i]);
    val['sum'].push(sum.toFixed(4));
  }
  ret['total'] = val['sum'];

  return ret;
}

router.get('/', function(req, res, next) {
  // entitySchema.find((error, response) => {
  //   if (error) {
  //       return next(error)
  //   } else {
  //     res.render('index', { data: response });
  //   }
  // })
  ret = stub();
  res.render('index', { data: ret });
});

// api for getting datas from service
router.get('/getData', function(req, res, next) {
  entitySchema.find((error, response) => {
    if (error) {
        return next(error)
    } else {
      ret = stub();
      total = [];
      if (ret['data'].length != 0)
        total = ret['total'];

      response.forEach(function(v) {
        val_string = '';
        for (j = 0; j < 5; j ++) {
          if (j < 4)
          val_string += (Math.random() * (-1 - 1) + 1).toFixed(4) + '_';
          else
          val_string += (Math.random() * (-1 - 1) + 1).toFixed(4);
        }
        v.value = val_string;
      })

      res.status(200).json({
        message: "Entity successfully created!",
        result: {
          arr: response,
          total: total,
        }
      });

      // res.render('index', { data: response });
    }
  })
});

module.exports = router;
