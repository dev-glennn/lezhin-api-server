var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

router.get('/comics/:type', function (req, res) {
  const { type } = req.params;
  let { page } = req.query;
  const fileDir = path.join(
    __dirname + `/../public/mock/${type}/page_${page}.json`
  );
  const isExist = fs.existsSync(fileDir);
  if (isExist) {
    return res.status(200).json(require(fileDir));
  }
  return res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
