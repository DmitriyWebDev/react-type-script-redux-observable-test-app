const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const successResponse = { status: 200 };

// Get dynamic param from url example
// Url - '/article/:id'
// Get id code:
// req.params.id

// Get GET - params from request url
// const {mailType, mailCtg} = req.query

// Get POST, PUT - request data example
// const body = req.body;

// Return server error example
// res.status(404).json({error: "not found"});

router.get('/url-1', function(req, res, next) {
  const showError = false;

  if (showError) {
    res.status(500).json({
      code: 1,
      text: `Ошибка бекенда`,
    });
    return null;
  }

  res.json({
    data: [1, 2, 3],
  });
});

router.post('/url-2', function(req, res, next) {
  res.set({
    'custom-header-1': 'hello-frontend-app!!!',
  });

  res.json(successResponse);
});

module.exports = router;
