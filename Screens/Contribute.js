import React, { Component } from 'react';
import { View, Button, Text, TextInput, ScrollView, Platform } from 'react-native';
import styles from '../AppStyles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Contribute extends Component
{
  doSubmit() {
    alert('Your article was submitted successfully');

    //return;
  }

  constructor(props)
  {
    super(props);
    this.doSubmit = this.doSubmit.bind(this);
  }

  render()
  {
    return (

<View style = {styles.mainContainer}>
            <ScrollView style={{ flex: 1 }}>
                <Text style={styles.errorText}>
                    * Disclaimer:  We neither request nor encourage you to endanger your life, body or property to contribute to us.  Always ensure your safety above all else, and comply with any and all instructions from law enforcement or other emergency personel.
                </Text>
                <View style={{ height: 20 }}/>
                <View style = {styles.entryView }>
                <Text style={styles.entryText}>
                    Title:
                </Text>
                    <TextInput style={styles.entry} ></TextInput>
                </View>
            <View>
                <Text style = {{ fontSize: 20, backgroundColor: 'transparent' }}>
                    Article:
                </Text>
            <TextInput
                style={
                    { flex: 1,
                        minHeight: 200,
                        maxHeight: 250,
                        minWidth: 100,
                        backgroundColor: 0xffffffff,
                        marginVertical: 10,
                        fontSize: 20,
                        textAlignVertical: 'top',
                        alignContent: 'flex-start', }}
                multiRow={true}
                clearTextOnFocus={true}
            >

            </TextInput>
                <Text style = {{ fontSize: 18,
                    marginBottom: 5, }}>
                    * We reserve the right to edit any content for brevity or clarity.
                    Your article will not be submitted if it contains any HTML.
                </Text>
                <View style={
                    { marginVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'center', }}>
                    <Icon.Button name = "camera"
                                 backgroundColor="#0000ffaf"
                                 onPress={()=> {}}

                                 iconStyle={{ opacity: 1,
                                    zIndex: -91, }} size={30}
                                 style={{ opacity: 1,
                                    backgroundColor: 0x00000000,
                                    zIndex: 1,
                                    justifyContent: 'center',
                                    padding: 8, marginRight: -10,
                                    flexDirection: 'column',
                                    right: 0, }}/>
                    <Icon.Button name = "video-camera"
                                 backgroundColor="#0000ffaf"
                                 onPress={()=> {}}

                                 iconStyle={{ opacity: 1,
                                    zIndex: -91, }}
                                 size={30}
                                 style={{ opacity: 1,
                                    backgroundColor: 0x00000000,
                                    zIndex: 1,
                                    justifyContent: 'center',
                                    padding: 8,
                                    marginRight: -10,
                                    flexDirection: 'column',
                                    right: 0, }}/>
                </View>
                    <Button
                        title = "Submit"
                        color = {Platform.OS === 'android' ? 0x0000ffaf : 'blue'}
                        onPress = {this.doSubmit}/>
            </View>

                <View>

                </View>
            </ScrollView>
        </View>

    );
  }

}
