import React from 'react';
import { View } from 'react-native';
import SignIn from './src/SignIn';
import PokeMap from "./src/pokemap";
import Meteor from 'react-native-meteor';

class App extends React.Component {
  state = {
    userHasLoggedIn: false
  };


  flipScreen = (state) => {
    console.log(`flipscreen state ${state}`)
    this.setState({userHasLoggedIn: state});
  }
  renderScreen = () => {
    console.log("render the screen")
    if (this.state.userHasLoggedIn){
      return <PokeMap flipScreen={this.flipScreen} />
    }
    console.log("log into pokemap");
    return <SignIn flipScreen={this.flipScreen} />
  };

  componentDidMount () {
    Meteor.connect('ws://192.168.0.14:3000/websocket')
    if(Meteor.userId()){
      this.setState({userHasLoggedIn: true})
    }
  }
  
  render () {
    return (
      <View style={{ flex: 1 }}>
        {this.renderScreen()}
      </View>
    )
  }
}

export default App;