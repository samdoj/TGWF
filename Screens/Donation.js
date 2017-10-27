import React, { Component }from 'react';
import { Text, TextInput, View, Button } from 'react-native';
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

                  <Button title="Donate" key = "Button"  onPress={()=> {}} style={{ alignSelf: 'flex-start' }}/>

          );
        }

        return (
            <View style = {styles.entryView}
                    key = {field}>
                <Text style = {styles.entryText}>
                    {field}
                </Text>
                <TextInput style = {styles.droidInput} ></TextInput>

            </View>
        );
      });

class Donation extends Component
{
  render() {
    return (
        


<View style = {styles.mainContainer}>
            {TextFields}
            <Button title="Donate"  color='transparent' onPress={()=> {} }/>
        </View>

    );
  }
}

export default Donation;
