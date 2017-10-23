// jscs:disable 'super' outside of function or class (10
import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, } from 'redux';
import * as Actions from '../../redux/actions/user';
import * as Animatable from 'react-native-animatable';

function mapStateToProps(state) {
  let { userReducer } = state;
  console.log('STATE IS ');
  console.dir(state);
  return { userName: userReducer.userName,
      password: userReducer.password, validUser:
      userReducer.isValidUser, };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class LoginComponent extends Component {

  inputUserName = '';
  inputPassword = '';

  changeText(text, type)
  {
    if (type === 'userName')
    {
      this.inputUserName = text;
    }

    if (type === 'password')
    {
      this.inputPassword = text;
    }

    console.log('changeText Called!!!!!!');
  }

  tryUserLogin()
  {
    this.props.setUserName(this.inputUserName);
    console.log('IUN: ' + this.inputUserName);
    this.props.setHashedPassword(this.inputPassword);
    this.props.isValidUser(this.inputUserName, this.inputPassword);

  }

  constructor(props)
  {

    super(props);
    this.changeText = this.changeText.bind(this);
    this.tryUserLogin = this.tryUserLogin.bind(this);
  }

  componentWillMount() {
    console.log('Trying to mount');
  }

  render() {
    const { validUser, } = this.props;
    console.log("Valid user: " + validUser)
    if (!validUser || typeof validUser === 'number')
    {
      this.refs.LoginView.setNativeProps({ style: { animation: Animatable.shake, duration: 10 } });
      this.refs.LoginView.shake();
      console.log('SHAKING************************');
    }

    console.log("I'm running!");
    console.dir(this.props);
    console.dir(this.state);
    if (validUser === true) {
      return (
          <View style={{ flex: 1, backgroundColor: 0x5bf1e9ff }}>

                  <Text>Hello world!</Text>
              </View>
      );
    }

    return (
      <Animatable.View style={{ flex: 3, paddingVertical: 20, paddingHorizontal: 20, backgroundColor: 0x5bf1e9ff, justifyContent:'center' }}
        ref = "LoginView" >
            <View style = {{ height: 20, marginBottom: 10, flexDirection: 'row' }}>
            <Text style={{flex:1, fontSize:20}}>Username: </Text>
            <TextInput style={{flex:2, alignSelf: 'stretch', maxHeight: 30, backgroundColor: 'white' }}
                       onChangeText = {(text)=>this.changeText(text, 'userName')}/>
            </View>
            <View style = {{ height: 20, flexDirection: 'row' }}>
                <Text style = {{flex:1, fontSize:20}}>Password: </Text>
                <TextInput style={{ flex:2, alignSelf: 'stretch', maxHeight: 30, backgroundColor: 'white' }}
                         onChangeText = {(text)=>this.changeText(text, 'password')}
                             secureTextEntry={true}/>


            </View>
            <Button onPress = {()=> {this.tryUserLogin();}
          } title="Login" />
        </Animatable.View>
  );
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;
