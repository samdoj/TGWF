// jscs:disable
import React, { Component }from 'react';
import { Text, TextInput, View, Button, Platform } from 'react-native';
import styles from '../AppStyles/Styles';

const fields =
    ['Full name: ',
        'Address: ',
        'Unit #: ',
        'Zip Code:',
        'City:',
        'State:',
        'Amount: ',
        'Button',];

const TextFields =
         fields.map((field)=>
    {
        if (field === 'Button')
             {
          return (

                 Platform.OS ==='ios' ? <Button title="Donate" key = "Button" color="blue" onPress={()=> {}} style={{ alignSelf: 'flex-start' }}/> :

                         <Button title="Donate" key="Button" color={0x0000ffaf} onPress={()=>{}} style={{alignSelf:'flex-start'}}/> : null



          );
        }

        return (
            <View style = {styles.entryView}
                    key = {field}>
                <Text style = {styles.entryText}>
                    {field}
                </Text>
                <TextInput style = {styles.entry} ></TextInput>

            </View>
        );
      });

class Donation extends Component
{
  render() {
    return (
        


<View style = {styles.mainContainer}>
            {TextFields}
        </View>

    );
  }
}

export default Donation;
