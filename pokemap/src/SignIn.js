import React, {Component} from "react";
import {View, Text, ImageBackground, Dimensions, TouchableOpacity} from "react-native";
import {Form, Item, Input, Button, Label} from "native-base";
import Meteor from "react-native-meteor"
import CreateUser from "./CreateUser";
import PokeMap from "./pokemap";



const HEIGHT = Dimensions.height 
const WIDTH  = Dimensions.width

export default class SignIn extends Component{
    state = {
        username: "",
        password: "",
        showErrorMessage: "",
        toRegister: false,
        goHome: true,
        logIn: true
    }

    goHome = () => {
      this.setState({goHome: true, toRegister: false})
    }
    
    logIn = () =>{
      console.log("login")
      const {username, password} = this.state
      if(this.state.username.length === 0){
        this.setState({showErrorMessage: "Username not entered"});
        return;
      }
      
      else if(this.state.password.length === 0){
        this.setState({showErrorMessage: "Password not entered"});
        return;
      }
      Meteor.loginWithPassword(username, password, (error, data) => {
        if(error){
          this.setState({showErrorMessage: error.reason});
          return;
        }
        this.setState({logIn: false});
        this.props.flipScreen(true);
      })
    }

    render(){
        return (
            <View style={styles.container}>
             {this.state.logIn && this.state.goHome && <ImageBackground 
              source={require("../assets/landing.jpg")}
              style={{flex: 1, width: WIDTH, height: HEIGHT, resizeMode: "cover"}}
              >

                <View 
                  style={{flex: 1, flexDirection: "column", justifyContent: "center", margin: 10}}
                  >

                  <Form>
                    <Item floatingLabel>
                      <Label>Username</Label>
                      <Input 
                        onChangeText={(username) => this.setState({username, showErrorMessage: ""})}
                      />

                    </Item>
                    <Item floatingLabel>
                      <Label>Password</Label>
                      <Input 
                        secureTextEntry
                        onChangeText={(password) => this.setState({password, showErrorMessage: ""})}
                        />
                    </Item>

                  </Form>
                  <View style={{marginTop: 30}}>
                    <TouchableOpacity>
                    <Button 
                      block
                      rounded
                      style={styles.buttonStyle}
                      onPress={this.logIn}
                    >

                    <Text style={styles.buttonTextStyle}>Sign in</Text></Button>
                    </TouchableOpacity>
                 </View>
                 <View style={{marginTop: 10}}>
                   <TouchableOpacity>
                     <Button
                       block
                       rounded
                       style={styles.buttonStyle}
                       onPress={() => this.setState({toRegister: true, goHome: false})}
                     >
                       <Text style={styles.buttonTextStyle}>Sign up</Text>
                     </Button>
                  </TouchableOpacity>
                 </View>
                 <View style={{alignItems: "center"}}>
                   <Text style={{justifyContent: "center", color: "red"}}>
                     {this.state.showErrorMessage}
                   </Text>
                 </View>
                </View>
              </ImageBackground>}
              { this.state.toRegister && <CreateUser home={this.goHome} /> }
              {! this.state.logIn && <PokeMap flipScreen={this.props.flipScreen} />}
            </View>
        );
    }
}


const styles = {
    container: {
        flex: 1,
    },
    usernameStyle: {
    },
    signinButtonStyle: {
        backgroundColor: "sliver"
    },
    buttonStyle: {
      backgroundColor: "white",
      fontSize: 18
    },
    buttonTextStyle: {
      fontSize: 18
    }
}