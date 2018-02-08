import React, { Component } from 'react';
import { Text, TextInput, View, Button, } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, } from 'redux';
import * as Actions from '../../redux/actions/user';
import * as Animatable from 'react-native-animatable';
import TouchableItem from 'react-navigation/lib-rn/views/TouchableItem';
import styles from'../Login/Styles/Styles.js';
export default class NewUser extends Component
{

  networkSuccess()
  {
    alert('Success!');
  }

  shouldShowConfirm() {
    this.setState({ shouldShowConfirm: this.form.password.length > 0 });
  }

  changeText(text, field)
  {
    switch (field)
    {
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

  shouldComponentUpdate(nextProps, newState)
  {
   return this.state.status != newState.status || this.state.shouldShowConfirm != newState.shouldShowConfirm;
  }

  createUser()
  {
    let formData = new FormData();
    for (key in Object.keys(this.form))
    {
      formData.append(key, this.form[Object.keys(this.form)[key]]);
    }

    let formBody = [];
    for (let property in this.form) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(this.form[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    console.dir(formBody);

    let options = {};

    options.body =  formBody;
    options.headers = {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        accept: 'application/x-www-form-urlencoded',
      };
    options.method = 'POST';
    fetch('http://www.theglobalwarmingfoundation.org/newuser1.php', options).
    then((msg)=> {
        console.log(msg.status);
      if (msg.status != 200) {
        alert('There was a network error.  Please try again.' + global.runCount);
        this.setState({ status: msg.status })

      }
      else
      {
          this.networkSuccess();
      }
    });

  }

  constructor()
  {
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

  render()
  {

    return (



<View style={styles.mainContainer}>
            <View style={styles.entryView}>
            <Text style = {styles.entryText}>
                *First name
            </Text>
                <TextInput style={styles.entry}
                           onChangeText = {(text)=>this.changeText(text, 'first')}/>
            </View>
            <View style={styles.entryView}>
                <Text style = {styles.entryText}>
                    *Last name
                </Text>
                <TextInput style={styles.entry}
                           onChangeText = {(text)=>this.changeText(text, 'last')}/>

            </View>
            <View style={styles.entryView}>
                <Text style = {styles.entryText}>
                    *Email
                </Text>
                <TextInput style={styles.entry}
                           onChangeText = {(text)=>this.changeText(text, 'email')}/>
            </View>
            <View style={styles.entryView}>
                <Text style = {styles.entryText}>
                    Password
                </Text>
                <TextInput style={styles.entry}
                           onChangeText = {(text)=>this.changeText(text, 'password')}/>
            </View>
    {this.state.shouldShowConfirm ? <View style={styles.entryView} ref="confirmView">
                <Text style = {styles.entryText} ref="confirmText">
                    Confirm
                </Text>
                <TextInput style={styles.entry}
                           onChangeText = {(text)=>this.changeText(text, 'password_confirm')}/>
            </View> : null}

            <View style={styles.entryView}>
                <Text style = {styles.entryText}>
                    Nickname
                </Text>
                <TextInput style={styles.entry}
                           onChangeText = {(text)=>this.changeText(text, 'name')}/>
            </View>
            <View style={styles.entryView}>
                <Text style = {styles.entryText}>
                    Bio
                </Text>
                <TextInput style={styles.entry}
                           onChangeText = {(text)=>this.changeText(text, 'bio')}/>
            </View>
            <Button onPress = {()=> {this.createUser();}} title="Create user"></Button>
            <Text>If you do not provide a password we will generate one for you and email it.</Text>


        </View>
    );
  }

}
