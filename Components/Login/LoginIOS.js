// jscs:disable 'super' outside of function or class (10
import React, { Component } from 'react';
import { Text, TextInput, View, Button, AsyncStorage, } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, } from 'redux';
import * as Actions from '../../redux/actions/user';
import * as Animatable from 'react-native-animatable';
import TouchableItem from 'react-navigation/lib-rn/views/TouchableItem';
import styles from'../Login/Styles/Styles.js';
import Checkbox from 'react-native-checkbox';
import { setUserValid } from '../../redux/actions/user';

const TRIES = 3;
const SECONDS = 10;
const ANIMATION_TIME  = 100;

function mapStateToProps(state) {
  let { userReducer } = state;
  console.log('STATE IS ');
  console.dir(state);
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
    const { validUser, } = this.props;
    if (this.refs.LoginView)
    {
      if (this.props.loginAttempts === TRIES && !this.props.interval) {
        this.props.createLoginTimer
        (SECONDS, setInterval(() => this.props.updateLoginTimer(this.props.secondsToWait - 1), 1000));
      }

      console.log('Valid user: ' + validUser);
      if (validUser === 'reset') {
        this.refs.LoginView.setNativeProps({ style: { zIndex: 1 }, duration: ANIMATION_TIME });
        this.refs.LoginView.fadeIn();
        this.refs.WaitView.setNativeProps({ style: { zIndex: -1 }, duration: ANIMATION_TIME });
        this.refs.WaitView.fadeOut();
      }

      console.log("I'm running!");
      console.dir(this.props);
      console.dir(this.state);
      if (validUser === true) {
        return (
            <View style={{ flex: 1, backgroundColor: 0x5bf1e903 }}>

                  <Text style={{ fontSize: 50, alignSelf: 'center' }}>Hello world!</Text>
              </View>
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

                    title="Login" style = {{ color: 'black' }}/>
          <Text style = {styles.errorText}>
              {!(validUser === 'initial' || validUser === 'reset' || validUser) ?
                  'Invalid username or password.  Please try again.  You have' +
                  ` ${TRIES - this.props.loginAttempts} attempts remaining`
                  : this.props.errorMessage }
          </Text>
        </Animatable.View>
        <Animatable.View style = {styles.noMoreTries} ref = "WaitView">
            <Text style = { styles.errorText }>
                You have made too many incorrect login attempts.  You must wait {this.props.secondsToWait}
                <Text style = { styles.errorText }>
                    {` second${this.props.secondsToWait > 1 ? 's' : ''}` } before trying again or {' '}
                    </Text>
                {/*TODO: show an emailer screen.*/}
                <TouchableItem style={ styles.linkContainer} onPress={()=>alert('You forgot!')}>
                <Text style = {styles.linkText}>
                     Click Here
                </Text>

            </TouchableItem>
                {'if you have forgotten your password'}
            </Text>


        </Animatable.View>
        </View>

  );
  }

}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;

//Comment to test commit
