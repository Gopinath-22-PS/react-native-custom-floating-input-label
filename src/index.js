
import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number } from 'prop-types';
import { Dimensions } from 'react-native';

export class FloatingTitleTextInputField extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    updateMasterState: func.isRequired,
    focus:func.isRequired,
    animDuration:number,
    blur:func.isRequired,
    keyboardType: string,
    titleActiveSize: number, // to control size of title when field is active
    titleInActiveSize: number, // to control size of title when field is inactive
    titleActiveColor: string, // to control color of title when field is active
    titleInactiveColor: string, // to control color of title when field is active
    textInputStyles: object,
    otherTextInputProps: object,  
  }

  
  static defaultProps = {
    keyboardType: 'default',
    titleActiveSize: 13,
    titleInActiveSize: 15,
    titleActiveColor: 'black',
    titleInactiveColor: 'dimgrey',
    textInputStyles: {}, 
    otherTextInputAttributes: {},
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
      textCheck:""
    }
  }

  _handleFocus = () => {
    const { focus,animDuration } = this.props; 
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true },()=>{
          focus()
      });
      Animated.timing(this.position, {
        toValue: 1,
        duration: animDuration!=0&& animDuration<2000?animDuration:150,
      }).start();
    }
  }

  _handleBlur = () => {
    const { blur,animDuration } = this.props;
    if(this.state.isFieldActive && this.props.value){
        this.setState({isFieldActive:false},()=>{
            blur()
        });
    }
    else if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false },()=>{
        blur()
      });
      Animated.timing(this.position, {
        toValue: 0,
        duration: animDuration!=0&& animDuration<2000,
      }).start();
    }
  }

  _onChangeText = (updatedValue) => {
    const { attrName, updateMasterState } = this.props; 
    this.setState({textCheck:updatedValue});
    updateMasterState(attrName, updatedValue);
  }

  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    const {
      titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize
    } = this.props;
  
    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
    }
  }

  render() {
      const{isFieldActive,textCheck}=this.state;
      const {title}=this.props;
      let titleText=" "+title+" "
    return (
      <View style = {{
      borderRadius: 4,
      borderStyle: "solid",
      borderWidth: isFieldActive? 2 :1,
      borderColor:isFieldActive? "#FFBB00" :"dimgrey",
      height: 56,
      marginVertical: 4,}}>
        <Animated.Text
          style = {[{position: 'absolute',
          marginTop:!isFieldActive && this.props.value?-10: isFieldActive && this.props.value?-10:isFieldActive && !this.props.value?-10:!isFieldActive?0:-8,
          fontFamily: 'Muli-Bold',
          fontSize:13,
          backgroundColor:"#FFFFFF",
          marginLeft:10,
          fontWeight:"bold",
          left: 3,
          left: 4,}, this._returnAnimatedTitleStyles()]}
        >
          {titleText}
        </Animated.Text>
        <TextInput
          value = {this.props.value}
          style = {[Styles.textInput, this.props.textInputStyles]}
          underlineColorAndroid = 'transparent'
          onFocus = {this._handleFocus}
          onBlur = {this._handleBlur}
          onChangeText = {this._onChangeText}
          keyboardType = {this.props.keyboardType}
          {...this.props.otherTextInputProps}
        />
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 50,
    marginVertical: 4,
  },
  textInput: {
    fontSize: 15,
    paddingVertical:15,
    paddingHorizontal:10,
    fontFamily: 'Muli-Regular',
    color: 'black',
    width:Dimensions.get("screen").width
  },
  titleStyles: {
    position: 'absolute',
    marginTop:-15,
    fontFamily: 'Avenir-Medium',
    left: 3,
    left: 4,
  }
})