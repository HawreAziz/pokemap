import { Meteor } from 'meteor/meteor';
import { Pokemon } from "../imports/Pokemon";

var fs = Npm.require("fs");

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  "pokemon.addPokemon": function(region){
    console.log("meteor server: addPokemon");
    let range = 0.035;
    let latRange = Math.random() > 0.5 ? range : -range;
    let longRange = Math.random() > 0.5 ? range : -range;

    let lat = region.latitude;
    let long = region.longitude;

    let min = Math.ceil(0);
    let max = Math.ceil(250);
    lat = lat + Math.random() * latRange;
    long = long + Math.random() * longRange;
    randomPoke = Math.floor(Math.random()*(max-min)) + min;
    let iconPath = process.env.PWD + "/public";
    let icons = fs.readdirSync(iconPath);
    console.log(`Calculated ${lat} ${long}`)
    return Pokemon.insert({ latitude: lat, longitude: long, image: icons[randomPoke]})
  },
  "pokemon.removePokemon": function(regionID){
    Pokemon.remove(regionID);
  },
  "pokemon.removeMarkedPokemon": function(id){
    Pokemon.remove(id)
  },
});
