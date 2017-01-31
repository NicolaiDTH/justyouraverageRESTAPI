'use strict';

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function(err) {
 console.error("Connection Error", err);
});

db.once('open', function(){
 console.log("DB Connection Successful");
 // All DB communication goes here

 var Schema = mongoose.Schema;
 var AnimalSchema = new Schema({
  type:   { type: String, default: "Goldfish"},
  size:   { type: String, default: "Small"},
  color:  { type: String, default: "Golden"},
  mass:   { type: Number, default: 0.007},
  name:   { type: String, default: "Angela"}
 });

 var Animal = mongoose.model('Animal', AnimalSchema);

 var elephant = new Animal({
  type: 'elephant',
  size: 'big',
  color: 'gray',
  mass: 6000,
  name: 'Lawrence'
 });

 var animal = new Animal({}); //Goldfish

 var whale = new Animal({
  type: 'whale',
  size: 'big',
  mass: '190500',
  name: 'Fig'
 })

 Animal.remove({}, function(err) {
  if (err) console.error(err);
  elephant.save(function(err) {
   if (err) console.error(err);
   animal.save(function(err) {
    if (err) console.error(err);
    whale.save(function(err){
     if (err) console.error(err);
     Animal.find({size: 'big'}, function(err, animals){
      animals.forEach(function(animal){
       console.log(animal.name + ' the ' + animal.color + ' ' + animal.type)
      });
      db.close(function() {
       console.log("db connection close");
      });
     });
    });
   });
  });
 });
});
