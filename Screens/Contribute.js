import React, { Component } from 'react';
import { View, Button, Text, TextInput, ScrollView, Platform } from 'react-native';
import styles from '../AppStyles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import NicEditor from '../Components/NicEditor/nicEditor';

const DOMAIN = 'http://www.theglobalwarmingfoundation.org/make_post.php';
let interval;
let title = '';
let image = null;

export default class Contribute extends Component {

  doSubmit()
  {
    this.myEditor.postMessage('dump');
    interval = setInterval(()=>this.requestSubmit(), 50);
    console.log(global.editorText);
  }

  requestSubmit() {

    if (global.editorText)
    {
      let options = {};
      let post =
        {
            title: title,
            content: global.editorText ? global.editorText : 'test',
            email: this.props.email,
          };
      console.dir(post);
      var formBody = [];
      for (var property in post) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');
      console.log(formBody);

      options.headers = {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        accept: 'application/x-www-form-urlencoded',
      };
      options.method = 'POST';
      options.body = formBody;
      fetch(DOMAIN, options).then(async (response)=>
      {
          alert('Your article was submitted successfully');
          console.log('text ');
          text = await response.text().then(text=>text);
          console.dir(text);
        }).catch((err)=>alert(err));

      // return;
    }

    clearInterval(interval);
  }

  setTitle(theTitle)
  {
    title = theTitle;
    console.log(title);
  }

  constructor(props) {
    super(props);
    this.doSubmit = this.doSubmit.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.requestSubmit = this.requestSubmit.bind(this);
    console.dir(this.props);
  }

  componentDidMount()
  {
    if (Platform.OS === 'ios')
        this.myEditor.postMessage('dummy-message');
  }

  render() {

    if (global.inMemory === undefined) {
      global.inMemory = true;
      if (!__DEV__) alert('* Disclaimer:  We neither request nor encourage you to endanger your life, ' +
           'body or property to contribute to us.  Always ensure your safety above all else, and comply' +
           ' with any and all instructions from law enforcement or other emergency personnel.\n');
    }

    global.inMemory = true;
    console.log('Contribute component ostensibly loaded');
    return (

      <View style={styles.mainContainer}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 20 }} />
          <View style={styles.entryView}>
            <Text style={styles.entryText}>
                            Title:
            </Text>
            <TextInput style={styles.entry} onChangeText={(title)=>this.setTitle(title)}/>
          </View>
          <View>
            <Text style={{ fontSize: 20, backgroundColor: 'transparent' }}>
                            Article:
            </Text>
            <View>
              <ScrollView
                ref="ScrollView"
                style={{
      flex: 1,
      minHeight: 200,
      maxHeight: 250,
      minWidth: 100,
      marginVertical: 10,
    }}
              >
           <NicEditor ref = {(myEditor)=>this.myEditor = myEditor}
                      source = {{ uri: 'http://www.tgwf.org/rninterface.html' }}>

           </NicEditor>
                         </ScrollView>

            </View>
              <View style={{ flex: 1, marginTop: 0, marginBottom: 30 }}>
                  <Icon.Button
                      name="camera"
                      backgroundColor="#0000ffaf"
                      onPress={() => {}}

                      iconStyle={{
                          opacity: 1,
                          zIndex: -91,
                        }}
                      size={30}
                      style={{
                          opacity: 1,
                          backgroundColor: 0x00000000,
                          zIndex: 1,
                          justifyContent: 'center',
                          padding: 8,
                          marginRight: -10,
                          flexDirection: 'column',
                          right: 0,
                        }}
                  />
              </View>
            <Text style={{
      fontSize: 18,
      marginBottom: 5,
      color: 'black',
    }}
            >
                            * We reserve the right to edit any content for brevity or clarity.
            </Text>
            <View style={
                            {
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    }}
            >


            </View>
            <Button
                style={{ flex: 1 }}
              title="Submit"
              color={Platform.OS === 'android' ? 0x0000ffaf : 'blue'}
              onPress={this.doSubmit}
            >
            </Button>
          </View>

          <View />
        </ScrollView>
      </View>

    );
  }
}
