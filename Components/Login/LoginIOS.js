// jscs:disable maximumLineLength
// jscs:disable 'super' outside of function or class (10
import React, { Component } from 'react';
import { Text, TextInput, View, Button, AsyncStorage, TouchableOpacity, Platform} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, } from 'redux';
import * as Actions from '../../redux/actions/user';
import * as Animatable from 'react-native-animatable';
import styles from'../Login/Styles/Styles.js';
import Checkbox from 'react-native-checkbox';
import { setUserValid } from '../../redux/actions/user';
import Contribute from "../../Screens/Contribute";
import {isValidUser} from "../../redux/actions/user";

const TRIES = 3;
const SECONDS = 10;
const ANIMATION_TIME  = 100;
const COLOR =  Platform.OS === 'ios' ? 'blue' : 0x0000ffaf;
function mapStateToProps(state) {
  let { userReducer } = state;
  return { userName: userReducer.userName,
      password: userReducer.password,
      validUser: userReducer.isValidUser,
      secondsToWait: userReducer.secondsToWait,
      interval: userReducer.interval,
      loginAttempts: userReducer.loginAttempts,
      errorMessage: userReducer.errorMessage, };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class LoginComponent extends Component {

  inputUserName = this.props.userName;
  inputPassword = '';

  sendMail() {

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

  checkRememberMe(checked)
  {
    this.props.checked = checked;
    console.log(`The box is${!checked  ? 'unchecked' : 'checked'}`);
  }

  tryUserLogin()
  {
    this.props.setUserValid('initial');
    this.props.setUserName(this.inputUserName);
    this.props.setHashedPassword(this.inputPassword);
    this.props.isValidUser(this.inputUserName, this.inputPassword);

  }

  screenShaker()
  {
    this.refs.LoginView.setNativeProps({ style: { animation: Animatable.shake, duration: 10 } });
    this.refs.LoginView.shake();
    if (this.props.loginAttempts === TRIES)
    {
      this.refs.LoginView.setNativeProps({ style: { duration: ANIMATION_TIME } });
      this.refs.LoginView.fadeOut();
      this.refs.WaitView.setNativeProps({ style: { zIndex: 1 }, duration: ANIMATION_TIME });
      this.refs.WaitView.fadeIn();
    }

  }

  constructor(props)
  {

    super(props);
    this.changeText = this.changeText.bind(this);
    this.tryUserLogin = this.tryUserLogin.bind(this);
    this.checkRememberMe = this.checkRememberMe.bind(this);
    this.screenShaker = this.screenShaker.bind(this);
    this.props.checked = true;
  }

  componentDidUpdate()
  {
    const { validUser, } = this.props;

    if (!(validUser && this.props.loginAttempts < TRIES) && !this.props.interval) {
      setTimeout(() =>
      {
          try {
            this.screenShaker();
          }
          catch (err)
          {
            console.log(err); //Usually the ref can't be defined because the screen has disappeared.
          }
        }, 1);
    };
  }

  render() {
     if(global.token)
         this.props.isValidUser('', '', global.token);
    const { validUser, } = this.props;
    if (this.refs.LoginView)
    {
      if (this.props.loginAttempts === TRIES && !this.props.interval) {
        this.props.createLoginTimer
        (SECONDS, setInterval(() => this.props.updateLoginTimer(this.props.secondsToWait - 1), 1000));
      }

      if (validUser === 'reset') {
        this.refs.LoginView.setNativeProps({ style: { zIndex: 1 }, duration: ANIMATION_TIME });
        this.refs.LoginView.fadeIn();
        this.refs.WaitView.setNativeProps({ style: { zIndex: -1 }, duration: ANIMATION_TIME });
        this.refs.WaitView.fadeOut();
      }

      if (validUser === true) {
        return (
            <Contribute/>
        );
      }
    }

    return (
        <View style={{ flex: 1 }}>
      <Animatable.View style={styles.mainContainer}
        ref = "LoginView"  >

            <View style = {styles.entryView}>
            <Text style={styles.entryText}>Username: </Text>
            <TextInput style={styles.entry} autoCapitalize="none"
                       onChangeText = {(text)=>this.changeText(text, 'userName')}/>
            </View>
            <View style = {styles.entryView}>
                <Text style = {styles.entryText}>Password: </Text>
                <TextInput style={styles.entry}
                         onChangeText = {(text)=>this.changeText(text, 'password')}
                           onEndEdit = {()=> {this.tryUserLogin();}}

                             secureTextEntry={true}/>


            </View>

            <Checkbox label="Remember me" containerStyle={
                { flex: -3,
                    alignSelf: 'center',
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    marginVertical: 10, }} labelStyle={{ color: 'black', fontSize: 20 }}
                      onChange={(status) => this.checkRememberMe(status)}
            />
            <Button onPress = {()=> {this.tryUserLogin();}}

                    title="Login" color= {COLOR}/>
          <Text style = {styles.errorText}>
              {!(validUser === 'initial' || validUser === 'reset' || validUser) ?
                  'Invalid username or password.  Please try again.  You have' +
                  ` ${TRIES - this.props.loginAttempts} attempts remaining`
                  : this.props.errorMessage }
          </Text>
        </Animatable.View>
        <Animatable.View style = {styles.noMoreTries} ref = "WaitView">
            <Text style={ styles.errorText } >
                You have entered an incorrect username and password combination too many times. You must wait{' ' + this.props.secondsToWait + ' seconds '}
                or reset your password.
            </Text>
            <View style={{ padding: 20 }}>
                <Button onPress = {()=> {this.sendMail();}
                }
                        title="Reset Password"
                        color={0x0000ffaf}
                />
            </View>


        </Animatable.View>
        </View>

  );
  }

}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;

//Comment to test commit
