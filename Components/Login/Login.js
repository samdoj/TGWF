// jscs:disable 'super' outside of function or class (10
import React, { Component } from 'react';
import { Text, TextInput, View, Button, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, } from 'redux';
import * as Actions from '../../redux/actions/user';
import * as Animatable from 'react-native-animatable';
import TouchableItem from 'react-navigation/lib-rn/views/TouchableItem';

const TRIES = 3;
const SECONDS = 30;
const ANIMATION_TIME  = 100;

function mapStateToProps(state) {
  let { userReducer } = state;
  console.log('STATE IS ');
  console.dir(state);
  return { userName: userReducer.userName,
      password: userReducer.password, validUser:
      userReducer.isValidUser, secondsToWait: userReducer.secondsToWait, interval: userReducer.interval, };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class LoginComponent extends Component {

  inputUserName = '';
  inputPassword = '';

  sendMail() {
    return;
  }

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
  }

  tryUserLogin()
  {
    this.props.setUserName(this.inputUserName);
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
    if (this.props.validUser === TRIES && !this.props.interval)
    {
      this.props.createLoginTimer(SECONDS, setInterval(()=> this.props.updateLoginTimer(this.props.secondsToWait - 1), 1000));
    }

    const { validUser, } = this.props;
    console.log('Valid user: ' + validUser);
    if (validUser === 'reset')
    {
      this.refs.LoginView.setNativeProps({ style: { zIndex: 1 }, duration: ANIMATION_TIME });
      this.refs.LoginView.fadeIn();
      this.refs.WaitView.setNativeProps({ style: { zIndex: -1 }, duration: ANIMATION_TIME });
      this.refs.WaitView.fadeOut();
    }

    if (!validUser || typeof validUser === 'number' && !this.props.interval)
    {
      this.refs.LoginView.setNativeProps({ style: { animation: Animatable.shake, duration: 10 } });
      this.refs.LoginView.shake();
      if (validUser === TRIES)
      {
        this.refs.LoginView.setNativeProps({ style: { duration: ANIMATION_TIME } });
        this.refs.LoginView.fadeOut();
        this.refs.WaitView.setNativeProps({ style: { zIndex: 1 }, duration: ANIMATION_TIME });
        this.refs.WaitView.fadeIn();
      }

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
        <ImageBackground style = {{ flex: 1, zIndex: 1 }} source={require('../../assets/images/iceberg.jpg')}>
      <Animatable.View style={{ flex: 3, paddingVertical: 20, paddingHorizontal: 20,  justifyContent: 'center', backgroundColor:'transparent' }}
        ref = "LoginView"  >

            <View style = {{ height: 20, marginBottom: 10, flexDirection: 'row', backgroundColor:'transparent' }}>
            <Text style={{ flex: 1, fontSize: 20, backgroundColor: 'transparent' }}>Username: </Text>
            <TextInput style={{ flex: 2, alignSelf: 'stretch', maxHeight: 30, backgroundColor: 'white' }}
                       onChangeText = {(text)=>this.changeText(text, 'userName')}/>
            </View>
            <View style = {{ height: 20, flexDirection: 'row' }}>
                <Text style = {{ flex: 1, fontSize: 20, backgroundColor: 'transparent' }}>Password: </Text>
                <TextInput style={{ flex: 2, alignSelf: 'stretch', maxHeight: 30, backgroundColor: 'white' }}
                         onChangeText = {(text)=>this.changeText(text, 'password')}
                             secureTextEntry={true}/>


            </View>
            <Button onPress = {()=> {this.tryUserLogin();}
          } title="Login" style = {{ color : 'black' }}/>
          <Text style = {{ color: 'red', fontSize: 20, backgroundColor: 'transparent', }}>
              {!(validUser === 'initial' || validUser === 'reset') ? 'Invalid username or password.  Please try again.  You have' +
                  ` ${TRIES - (typeof this.props.validUser === 'number' ? this.props.validUser : 0)} attempts remaining` : null }
          </Text>
        </Animatable.View>
        <Animatable.View style = {{ paddingHorizontal:20, opacity: 0, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 11, zIndex: -1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} ref = "WaitView">
            <Text style = {{ fontSize: 20, color: 'red', backgroundColor: 'transparent',}}>
                You have made too many incorrect login attempts.  You must wait {this.props.secondsToWait} seconds before trying again or {' '}

                <TouchableItem style={{ width: 100, height: 20, alignContent: 'stretch', backgroundColor: 'transparent' } }>
                <Text style = {{ fontSize: 20, color: 'blue', textDecorationLine: 'underline', backgroundColor: 'transparent', alignContent: 'stretch' }}>
                     Click Here
                </Text>

            </TouchableItem>
                {'if you have forgotten your password'}
            </Text>


        </Animatable.View>
        </ImageBackground>

  );
  }

}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;

//Comment to test commit
