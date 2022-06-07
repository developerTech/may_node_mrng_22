const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require('body-parser');

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const db = admin.firestore();

exports.addCiti = functions.https.onRequest(async (req,res) => {
    const citisRef = db.collection('maynode22');
    await citisRef.doc('Amsterdam').set({
        "name":'Amsterdam',"country":'Netherlands',"population":867676
    })
    res.send('Data Added')
})

exports.getCiti = functions.https.onRequest(async (req,res) =>{
    const citisRef = db.collection('maynode');
    const snapshot = await citisRef.get();
    const out = [];
    snapshot.forEach(doc => {
        out.push(doc.data())
    }) 

    res.send(out)
})