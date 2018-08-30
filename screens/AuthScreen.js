import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import axios from 'axios';
// import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue';

class AuthScreen extends React.Component {

    state={
        err: "",
        text: "",
        borderColor: "#ccc",
        showLoadingIndicator: false
    }

    verifyPhone = async () => {
        this.setState({ showLoadingIndicator: !this.state.showLoadingIndicator })
        if(this.state.text.length !== 10) {
            this.setState({ 
                err: "Invalid phone number!", 
                borderColor: "red",
                showLoadingIndicator: false
            })
            return 0;
        }

        try {
            let response = await axios.post(`http://travel.integritydigital.in/api/MobileNoVerifyForVehicle?MobileNo=${this.state.text}`);
            let res = response.data
            if(res === 0) {
                this.setState({
                    err: "Invalid Phone",
                    borderColor: "red",
                    showLoadingIndicator: false
                })
                return 0;
            } else {
                this.setState({
                    showLoadingIndicator: false
                })
                this.props.navigation.navigate("register");
            }
        } catch(err) {
            this.setState({
                err: "Network Error!",
                borderColor: "red",
                showLoadingIndicator: false
            })
        }

    }

    callSubmit() {
        if(this.state.text.length === 0) {
            this.setState({ err: "Please enter your phone number!", borderColor: "red"})
        } else if(this.state.text.length > 10) {
            this.setState({ err: "This field can't be more than 10 digits!", borderColor: "red" })
        }
    }

    render() {

        return(
            <View
                style={{flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
            >

                <FormLabel
                    labelStyle={{ fontSize: 20, paddingBottom: 8, color: "#000" }}
                >
                    Phone 
                </FormLabel>

                <FormInput
                    placeholder="Enter phone number"
                    placeholderTextColor="#ccc"
                    underlineColorAndroid="transparent"
                    containerStyle={{ 
                        borderRadius: 2,
                        borderWidth: 1, 
                        borderColor: this.state.borderColor,
                        backgroundColor: "transparent",
                        overflow: "visible",
                        elevation: 2,
                        shadowOpacity: 1.0, 
                        shadowRadius: 2, 
                        shadowColor: "#007aff", 
                        shadowOffset: { width: 5, height: 10 }
                    }}
                    inputStyle={{ color: '#000', fontSize: 18, paddingLeft: 8 }}
                    // shake
                    keyboardType="phone-pad"
                    onFocus={ () => this.setState({ err: "", borderColor: "#ccc" }) }
                    onBlur={ () => this.callSubmit() }
                    keyboardAppearance="light"
                    // inlineImageLeft=""
                    // clearButtonMode
                    selectionColor="#000"
                    value={this.state.text}
                    onChangeText={ text => this.setState({ text }) }
                />

                <FormValidationMessage
                    labelStyle={{ fontWeight: "200", textAlign: "center" }}
                >
                    {this.state.err}
                </FormValidationMessage>

                <Button
                    raised
                    large
                    title="Verify Phone"
                    loading={ this.state.showLoadingIndicator }
                    loadingProps={{ size: "large" }}
                    icon={{ name: "smartphone", type: "feather", color: "#fff", size: 30 }}
                    color="#fff"
                    buttonStyle={{ backgroundColor: "#007aff" }}
                    textStyle={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}
                    onPress={ this.verifyPhone }
                />

                {/* <View style={{ alignItems: "center", paddingTop: 10 }}>

                    <AwesomeButtonRick
                        // this.props.navigation.navigate("auth")
                        progress
                        onPress={ (next) => { 
                            this.callSubmit
                            next()
                        }}
                        type="secondary"
                        activityColor="#007aff"
                    >
                        <Icon name="arrow-forward" type="materialicons" color="#007aff" />
                        <Text style={{color:"#007aff", fontSize: 18, fontWeight: "bold" }}>NEXT</Text>
                    </AwesomeButtonRick>

                </View> */}

            </View>
        )
    }
}

export default AuthScreen;