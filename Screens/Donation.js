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

              <View style={{marginVertical:"10%"}} key = "Button">{
              Platform.OS ==='ios' ? <Button title="Donate"  color="blue" onPress={()=> {}} style={{ alignSelf: 'flex-start' }}/> :

                         <Button title="Donate" key="Button" color={0x0000ffaf} onPress={()=>{}} style={{ alignSelf:'flex-start'}}/> }
              </View>



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
    <Text style={{marginVertical:'10%', color: 'black'}}>
        *None of this information is collected or required.  However, if you are a US citizen, we can use it to issue you a tax receipt.
    </Text>
            {TextFields}
        </View>

    );
  }
}

export default Donation;
