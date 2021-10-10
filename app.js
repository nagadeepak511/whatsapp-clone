var express = require('express')
var app = express()
var port = process.env.PORT||8080

var cors = require('cors')
app.use(cors())

var ejs = require('ejs')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/assets', express.static('assets'))

var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
var mongoUrl = 'mongodb+srv://naga:test123@edumato.1t9ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
var db;

// crypto
const crypto = require('crypto');

const alice = crypto.createECDH('secp256k1');
alice.generateKeys();

const bob = crypto.createECDH('secp256k1');
bob.generateKeys();

console.log(alice.getPrivateKey().toString('hex'));
console.log(bob.getPrivateKey().toString('hex'));

const alicePublicKeyBase64 = alice.getPublicKey().toString('base64');
const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');

const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64, 'base64', 'hex');
const bobSharedKey = bob.computeSecret(alicePublicKeyBase64, 'base64', 'hex');

const MESSAGE = 'this is some random message...';

const IV = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(
  'aes-256-gcm',
  Buffer.from(aliceSharedKey, 'hex'),
  IV
);

let encrypted = cipher.update(MESSAGE, 'utf8', 'hex');
encrypted += cipher.final('hex');

const auth_tag = cipher.getAuthTag().toString('hex');

const payload = IV.toString('hex') + encrypted + auth_tag;

const payload64 = Buffer.from(payload, 'hex').toString('base64');

//Bob will do from here
const bob_payload = Buffer.from(payload64, 'base64').toString('hex');

const bob_iv = bob_payload.substr(0, 32);
const bob_encrypted = bob_payload.substr(32, bob_payload.length - 32 - 32);
const bob_auth_tag = bob_payload.substr(bob_payload.length - 32, 32);


try {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(bobSharedKey, 'hex'),
    Buffer.from(bob_iv, 'hex')
  );

  decipher.setAuthTag(Buffer.from(bob_auth_tag, 'hex'));

  let decrypted = decipher.update(bob_encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  console.table({ DecyptedMessage: decrypted });
} catch (error) {
  console.log(error.message);
}

// home
app.get('/chats', (req, res)=>{
    res.render('chats.ejs')
})

// connect client
MongoClient.connect(mongoUrl, (err, client)=>{
    if(err) console.log('error while connecting')
    db = client.db('whatsapp')
})


// run on port
app.listen(port, ()=>{
    console.log(`listening to ${port}`)
})