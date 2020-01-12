import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import { Input, Item, Button, Label, Form, Header, Icon, Left, Body } from 'native-base'
import {Accounts} from "react-native-meteor"

export default class CreateUser extends Component {

  state = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    showErrorMessage: "",
    onSuccess: false
  }

  goHome = () =>{
    this.props.home()
  }

  register = () =>{
      console.log("Registering user")
      const {username, password, confirmPassword, email} = this.state;
      console.log(`username is ${username}`);
       
      if(!username || !password || !confirmPassword || !email){
        this.setState({showErrorMessage: "All fields are mandatory"});
        return;
      }
      if(password !== confirmPassword){
        this.setState({showErrorMessage: "The passwords do not match"});
        return;
      }

      Accounts.createUser({username: username, password: password, email:email}, (error) => {
        console.log("creating an account")
        if(error){
          this.setState({showErrorMessage: error.reason});
          return;
        }
        this.setState({username: "", password: "", confirmPassword: "", email: "", onSuccess: true})
      })
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Header
            style={{ marginTop: StatusBar.currentHeight }}
          >
            <Left>
              <TouchableOpacity onPress={this.goHome}>
                <Icon name='home' />
              </TouchableOpacity>
            </Left>

            <Body>
              <Text style={{ fontSize: 20 }}>Register user</Text>
            </Body>
          </Header>
          
        </View>
        <View style={styles.bodyViewStyle}>
          <Form>

            <Item 
              rounded 
              inlineLabel
              style={{margin: 10}}
            >
              <Input 
                placeholder="username"
                onChangeText={(username) => this.setState({username, showErrorMessage: ""})}
                value={this.state.username}
                />
            </Item> 
            
            <Item 
              rounded 
              inlineLabel
              style={{margin: 10}}
            >
              <Input 
                placeholder="password" 
                secureTextEntry
                onChangeText={(password) => this.setState({password, showErrorMessage: ""})}
                value={this.state.password}
              />
            </Item>

            <Item 
              rounded 
              inlineLabel
              style={{margin: 10}}
            >
              <Input
                placeholder="confirm password"
                secureTextEntry
                onChangeText={(confirmPassword) => this.setState({confirmPassword, showErrorMessage: ""})} 
                value={this.state.confirmPassword}
              />
            </Item>

            <Item 
              rounded 
              inlineLabel
              style={{margin: 10}}
            >
              <Input 
                placeholder="email" 
                onChangeText={(email) => this.setState({email})} 
                value={this.state.email}
              />
            </Item>

            <View style={{flex: 1, marginTop: 30}}>
                <Button
                  primary
                  rounded 
                  block
                  style={{margin: 10, backgroundColor: "white"}}
                  onPress={this.register}
                  >
                    <Text>Register</Text>
                </Button>
            </View>
          </Form>
        </View>
        <View style={styles.errorViewStyle }>
          <Text style={{color: "red"}}>
            {this.state.showErrorMessage? this.state.showErrorMessage: this.state.onSuccess? "Account created successfully": ""}
          </Text>
        </View>
      </View>
    );
  }
}


const styles = {
    bodyViewStyle: {
        flex: 1,
    },
    errorViewStyle: {
      flex: 1, 
      alignItems: "center",
      justifyContent: "center"
    }
}