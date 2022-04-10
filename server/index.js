var express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

app.post("/user/login", async (req, res, next) => {
  await new Promise(r => setTimeout(r, Math.floor(Math.random() * (2000 - 1000) ) + 1000))
  res.json({
    token: '1234'
  });
});

app.get("/user/me", (req, res, next) => {
  res.json({
    id: '1234'
  });
});

app.get("/list", async (req, res, next) => {
  await new Promise(r => setTimeout(r, Math.floor(Math.random() * (2000 - 1000) ) + 1000))

  res.json([
    {
      attr1: 'Attr1',
      attr2: 'Attr2',
      attr3: 'Attr3',
      attr4: 'Attr4'
    },
    {
      attr1: 'Attr1',
      attr2: 'Attr2',
      attr3: 'Attr3',
      attr4: 'Attr4'
    },
    {
      attr1: 'Attr1',
      attr2: 'Attr2',
      attr3: 'Attr3',
      attr4: 'Attr4'
    },
    {
      attr1: 'Attr1',
      attr2: 'Attr2',
      attr3: 'Attr3',
      attr4: 'Attr4'
    }
  ]);
});

app.post("/save", async (req, res, next) => {
  console.log('body ' , req.body)
  await new Promise(r => setTimeout(r, Math.floor(Math.random() * (2000 - 1000) ) + 1000))

  if(req.body.username === '1234') {
    res.status(500)
    .send('Error');
  } else {
    res.json({
      message: 'Saved'
    });
  }
});

app.get("/search/:sku", async (req, res, next) => {  
  console.log(req.params)
  await new Promise(r => setTimeout(r, Math.floor(Math.random() * (2000 - 1000) ) + 1000))
  if (req.params.sku === '1234') {
    res.status(404)
      .send('Not found');
  } else {
    console.log('sending result')
    res.json({      
      "retailPrice": {
        "tax": 1,
        "shipping": 2,
        "savings": 35,
        "value": 25
      },
      "productInfo": {
        "name": "Name 1",
        "sku": "123",
        "description": "description"
      },           
      "employeePrice": {
        "tax": 2,
        "shipping": 3,
        "savings": 35,
        "value": 25
      }
    });
  }
});

app.post("/save/:sku", async (req, res, next) => {  
  console.log(req.params)
  await new Promise(r => setTimeout(r, Math.floor(Math.random() * (2000 - 1000) ) + 1000))
  if (req.params.sku === '1234') {
    res.status(500)
      .send('Error');
  } else {
    console.log('sending result')
    res.status(201).json(req.body);
  }
});