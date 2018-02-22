import React, { Component } from 'react';
import { Text, TextInput, View, Button, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/actions/user';
import styles from '../Login/Styles/Styles';

function mapStateToProps(state) {
  const { userReducer } = state;
  return {
    userName: userReducer.userName,
    password: userReducer.password,
    validUser: userReducer.isValidUser,
    secondsToWait: userReducer.secondsToWait,
    interval: userReducer.interval,
    loginAttempts: userReducer.loginAttempts,
    errorMessage: userReducer.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class MakeNewUser extends Component {
  // TODO: Trigger the login action
  // with the new username and password upon successful creation of a user.

  networkSuccess() {
    alert('User created successfully!');
  }

  shouldShowConfirm() {
    this.setState({ shouldShowConfirm: this.form.password.length > 0 });
  }

  changeText(text, field) {
    switch (field) {
      case 'first':
        {
          Object.assign(this.form, { first: text });
        }

        break;

      case 'last':
        {
          Object.assign(this.form, { last: text });
        }

        break;

      case 'email':
        {
          Object.assign(this.form, { email: text });
        }

        break;
      case 'password':
        {
          Object.assign(this.form, { password: text });
          this.shouldShowConfirm();
        }

        break;
      case 'bio':
        {
          Object.assign(this.form, { bio: text });
        }

        break;
    }
  }

  shouldComponentUpdate(nextProps, newState) {
    return this.state.status !== newState.status
        || this.state.shouldShowConfirm
        !== newState.shouldShowConfirm;
  }

  createUser() {
    const formData = new FormData();
    for (const key in Object.keys(this.form)) {
      formData.append(key, this.form[Object.keys(this.form)[key]]);
    }

    let formBody = [];
    for (const property in this.form) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(this.form[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }

    formBody = formBody.join('&');

    console.dir(formBody);

    const options = {};

    options.body = formBody;
    options.headers = {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      accept: 'application/x-www-form-urlencoded',
    };
    options.method = 'POST';
    fetch('http://www.theglobalwarmingfoundation.org/newuser1.php', options)
      .then((msg) => {
        console.log(msg.status);
        switch (msg.status) {
          case 200:
            {
              this.networkSuccess();
            }

            break;

          case 404:
            {
              alert('The file could not be found.' +
                ' This probably our server is temporarily down.  Please try again later.');
            }

            break;
          case 401:
            {
              alert('You already seem to have a user account.' +
                ' Email jtmason@tgwfoundation.org for a password reset if you have forgotten your password');
            }

            break;
          case 403:
            {
              alert('There seems to be a problem with the server. Please try again later.');
            }

            break;
          default:
          {
            alert('An unknown error occurred.  Please try again later.');
          }
        }
      }).catch(() => alert('A network error occured.' +
        ' You seem to be unconnected to the Internet.' +
    ' Please make sure either your WiFi or mobile data connection is turned on.'));
  }

  constructor() {
    global.runCount = 0;
    super();
    this.form =
        {
          first: '',
          last: '',
          password: '',
          email: '',
          name: '',
          bio: '',
        };
    this.state = {
      shouldShowConfirm: false,
      status: null,
    };
    this.changeText = this.changeText.bind(this);
    this.shouldShowConfirm = this.shouldShowConfirm.bind(this);
    this.networkSuccess = this.networkSuccess.bind(this);
  }

  render() {
    return (

      <View style={styles.mainContainer}>
        <View style={styles.entryView}>
          <Text style={styles.entryText}>
                *First name
          </Text>
          <TextInput
            style={styles.entry}
            onChangeText={text => this.changeText(text, 'first')}
          />
        </View>
        <View style={styles.entryView}>
          <Text style={styles.entryText}>
                    *Last name
          </Text>
          <TextInput
            style={styles.entry}
            onChangeText={text => this.changeText(text, 'last')}
          />

        </View>
        <View style={styles.entryView}>
          <Text style={styles.entryText}>
                    *Email
          </Text>
          <TextInput
            style={styles.entry}
            onChangeText={text => this.changeText(text, 'email')}
          />
        </View>
        <View style={styles.entryView}>
          <Text style={styles.entryText}>
                    Password
          </Text>
          <TextInput
            style={styles.entry}
            onChangeText={text => this.changeText(text, 'password')}
          />
        </View>
        {this.state.shouldShowConfirm ? <View style={styles.entryView} ref="confirmView">
          <Text style={styles.entryText} ref="confirmText">
                    Confirm
          </Text>
          <TextInput
            style={styles.entry}
            onChangeText={text => this.changeText(text, 'password_confirm')}
          />
                                        </View> : null}

        <View style={styles.entryView}>
          <Text style={styles.entryText}>
                    Nickname
          </Text>
          <TextInput
            style={styles.entry}
            onChangeText={text => this.changeText(text, 'name')}
          />
        </View>
        <View style={styles.entryView}>
          <Text style={styles.entryText}>
                    Bio
          </Text>
          <TextInput
            style={styles.entry}
            multiline={true}
            onChangeText={text => this.changeText(text, 'bio')}
          />
        </View>
        <Button
          onPress={() => { this.createUser(); }
            }
          title="Create user"
          color={Platform.OS === 'android' ? 0x0000ffaf : 'blue'}
        />
        <Text>If you do not provide a password we will generate one for you and email it.</Text>


      </View>
    );
  }
}
const NewUser = connect(mapStateToProps, mapDispatchToProps)(MakeNewUser);
export default NewUser;
