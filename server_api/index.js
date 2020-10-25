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

router.get('/url-1', jsonParser, function(req, res, next) {
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

router.post('/url-2', jsonParser, function(req, res, next) {
  res.set({
    'custom-header-1': 'hello-frontend-app!!!',
  });

  res.json(successResponse);
});

const testApiUrl = '/test-api';

router.get(testApiUrl, jsonParser, function(req, res, next) {
  res.json(successResponse);
});

const newSuccessToken = 'new-auth-token-007';

function getAuthErrorOrSuccess(req, res) {
  if (req && req.headers && req.headers['auth-token'] === newSuccessToken) {
    res.json(successResponse);
  } else {
    res.status(401).json({
      code: 747,
      text: `Auth error`,
    });
  }
}

router.post(testApiUrl, jsonParser, function(req, res, next) {
  getAuthErrorOrSuccess(req, res);
});

router.put(testApiUrl, jsonParser, function(req, res, next) {
  getAuthErrorOrSuccess(req, res);
});

router.delete(testApiUrl, jsonParser, function(req, res, next) {
  getAuthErrorOrSuccess(req, res);
});

router.post('/token/refresh', jsonParser, function(req, res, next) {
  setTimeout(() => {
    res.send('new-auth-token-007');
  }, 3000);
});

module.exports = router;
