const express = require('express')
const app = express()
require('dotenv').config();
app.use(express.static('public'))


const multer = require('multer');

const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, 'storage');
    },
    filename (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({storage});


const bodyParser = require("body-parser");
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('<image src="https://plamoscale.com/images/fog1labs1/fulls/85.jpg">')
})


app.post('/upload', upload.single('image'), (req, res) => {
    if(req.file) {
        // I can access req.body from here if I want
        res.json(req.file);
    }
    else throw 'error';
});


app.get('/redir', (req, res) => {
    res.status(301).location('http://www.x-codec.net');
    res.end()
  })

  app.post('/redir', (req, res) => {
    res.status(400)
    res.end()
  })

  app.put('/redir', (req, res) => {
    res.status(500)
    res.end()
  })


app.get('/requerimiento', (req, res) => {
    let info = req.query;
    console.log(info.nombre)
    console.log(info.apellido)
    res.send('Hola desde el req')
  })

  app.post('/requerimiento', upload.any(), (req, res) => {
    console.log('data', req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(req.body);
  });

  app.put('/requerimiento', (req, res) => {
    console.log('data', req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(req.body);
  });
  app.patch('/requerimiento', (req, res) => {
    let data = req.body;
    console.log(data);
res.send(data)
  });



app.get('/img', (req, res) => {
    var image1 = '49.jpg';

  var base64Img = require('base64-img');
  var imageData1 = base64Img.base64Sync(image1);
  var base64Data = imageData1.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  var img = Buffer.from(base64Data, 'base64');

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  });
  res.end(img);
  })
app.post('/', (req, res) => {
    res.send('Hello World desde el post!')
})
app.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, (req, res)=>{
    var from = req.params[0]
  var to = req.params[1] || 'HEAD'
  res.send('commit range ' + from + '..' + to)
})
app.put('/', (req, res) => {
    res.send('Hello World desde el post!')
})

app.patch('/', (req, res) => {
    res.send('Hello World desde el post!')
})

app.delete('/', (req, res) => {
    res.send('Hello World desde el post!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})