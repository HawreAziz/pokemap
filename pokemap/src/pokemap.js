import React, {Component} from "react";
import {
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Text,
} from "react-native";

import {Fab, Icon, Header, Right, Left, Body, Title } from "native-base";
import MapView from "react-native-maps";
import Meteor, {withTracker} from "react-native-meteor";
import App from "../app"


class PokeMap extends Component {

    state = {
        region: {
            latitude: 57.712630,
            longitude: 11.892260,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        isLoggedOut: true 
    };

    addPokemon = () => {
        console.log("addPokemon");
        Meteor.call("pokemon.addPokemon", this.state.region, (error, res) => {
            if (error) {
                console.log(error.reason);
            }
            console.log(`Add Poke ${error} ${res}`);
        });
    };

    removePokemon = () => {
        if (this.props.pokemon.length === 0) {
            return;
        }
        console.log("removePokemon");
        Meteor.call("pokemon.removePokemon", this.props.pokemon[0]._id, (error, res) => {
        })
    };


    renderPokemon = () => {
        if (!this.props.pokemon || this.props.pokemon.length === 0) return;
        console.log(`${this.props.pokemon[0].latitude} ${this.props.pokemon[0].longitude}`);
        return this.props.pokemon.map(p => {
                let lat = p.latitude;
                let long = p.longitude;
                let img = p.image;
                let key = p._id;
                console.log(lat, long, img);
                return (
                    <MapView.Marker
                        coordinate={{latitude: lat, longitude: long}}
                        styles={{height: 100, width: 100}}
                        key={key}
                    >
                          <Image 
                            style={{height: 50, width: 50}}
                            source={{uri: "http://192.168.0.14:3000/" + img}}
                          />
                    </MapView.Marker>
                )
            }
        )
    };


    signOut = () => {
       Meteor.logout((error) => {
           if(error){
               console.log(error.reason);
           }
       });
       this.props.flipScreen(false);
    };

    render() {
        return (
                    <View style={{flex: 1}}>
                        <Header style={{marginTop: StatusBar.currentHeight, backgroundColor: "silver" }}>
                          <Body style={{ alignItems: "center", marginLeft: 100}}>
                              <Text style={{color: "white", fontWeight: "bold"}}>Pokemap</Text>
                          </Body>
                          <Right>
                            <TouchableOpacity  onPress={this.signOut} >
                              <Icon name="ios-power" style={{ color: "white" }}/>
                            </TouchableOpacity>
                          </Right>
                        </Header>
                        <MapView
                            style={{flex: 1}}
                            initialRegion={this.state.region}
                            onRegionChangeComplete={(region) => this.setState({region})}
                        >
                            {this.renderPokemon()}
                        </MapView>
                        <Fab
                            direction="left"
                            position="bottomRight"
                            style={styles.fabStyle}
                            onPress={this.addPokemon}
                        >
                            <Icon name="add"/>
                        </Fab>

                        <Fab
                            direction="right"
                            position="bottomLeft"
                            style={styles.fabStyle}
                            onPress={this.removePokemon}
                        >
                            <Icon name="remove"/>
                    </Fab>
                    </View>
            );
    }
}

const styles = {
    fabStyle: {
        backgroundColor: "silver"
    }
};


export default withTracker(params => {
    Meteor.subscribe("pokemon");
    console.log("withTracker");
    return {
        pokemon: Meteor.collection('pokemon').find({}),
    };
})(PokeMap);