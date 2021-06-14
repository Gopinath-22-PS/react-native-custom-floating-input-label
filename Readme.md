
## **React Native Floating TextInput Label - customisable**

A React Native component that provides you to customise your TextInput. You can customise the label and other place holders. 


![Customisable floating input text](https://i.ibb.co/4WSsZPk/image.png)


We can replicate the same exactly. 

**Usage**

Use import in JS.


```
import FloatingTitleTextInputField from 'react-native-custom-floating-input-label'
```


Inside the class component:


```
<FloatingTitleTextInputField
                attrName='phoneNumber'
                value={this.state.aPhone}
                title={
                  this.state.textHolderPhoneFlag
                    ? 'Your mobile number'
                    : this.state.aPhone != ''
                    ? 'Your mobile number'
                    : 'Enter your mobile number'
                }
                keyboardType={'number-pad'}
                maxLength={10}
                updateMasterState={this._updateMasterState}
                focus={this._onFocus}
                blur={this._onBlur}
                textInputStyles={{
                  // here you can add additional TextInput styles
                  color: 'black',
                  fontSize: 15,
                  width: '100%'
                }}
                otherTextInputProps={{
                  // here you can add other TextInput props of your choice
                  maxLength: 10
                }}
              />
```


Hereby you can customize the label, active color, error color and changing the text will get reflected in the main thread which is similar to the native TextInput.

Version:

**1.0.1**

**Features and Updates:**

Customized border color and based on the keyboard type validations may occur. 

**List of Validations:**



*   Email ID
*   Phone number based on countries
*   PAN number
*   Aadhar number