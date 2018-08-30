import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import axios from 'axios';

class RegisterScreen extends React.Component {

    state={
        vehicleId: "",
        err: "",
        pin: "",
        borderColor: "#ccc",
        showLoadingIndicator: false
    }

    verifyMpin = async () => {
        this.setState({ showLoadingIndicator: !this.state.showLoadingIndicator })
        if(this.state.pin.length !== 4) {
            this.setState({
                err: "Invalid m-pin!",
                borderColor: "red",
                showLoadingIndicator: false
            });
            return 0;
        }

        try {
            let response = await axios.post(`http://travel.integritydigital.in/api/MpinVerifyByVehicle?Mpin=${this.state.pin}`);
            let res = response.data;
            if(res === 0) {
                this.setState({
                    err: "Invalid m-pin!",
                    borderColor: "red",
                    showLoadingIndicator: false
                });
                return 0;
            } else {
                this.setState({
                    showLoadingIndicator: false,
                    vehicleId: res
                });
                this.props.navigation.navigate("trace", { vehId: this.state.vehicleId })
            }
        } catch(err) {
            this.setState({
                err: "Network Error!",
                borderColor: "red",
                showLoadingIndicator: false
            })
        }
    }

    onUserBlur() {
        if(this.state.pin.length <= 3) {
            this.setState({
                err: "Invalid m-pin!",
                borderColor: "red",
            })
        } else if(this.state.pin.length >= 5) {
            this.setState({
                err: "Invalid m-pin!",
                borderColor: "red",
            })
        }
    }

    render() {

        return(
            <View
                style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
            >

                <FormLabel
                    labelStyle={{ fontSize: 20, paddingBottom: 8, color: "#000" }}
                >
                    MPIN
                </FormLabel>

                <FormInput 
                    placeholder="Enter mpin"
                    placeholderTextColor="#ccc"
                    underlineColorAndroid="transparent"
                    containerStyle={{ 
                        borderRadius: 2, 
                        borderWidth: 1, 
                        borderColor: this.state.borderColor,
                        backgroundColor: "transparent",
                        overflow: "scroll",
                        elevation: 2,
                        shadowOpacity: 1.0, 
                        shadowRadius: 2, 
                        shadowColor: "#007aff", 
                        shadowOffset: { width: 5, height: 10 }
                    }}
                    inputStyle={{ color: '#000', fontSize: 18, paddingLeft: 8 }}
                    // shake
                    onFocus={ () => { 
                        this.setState({
                            err: "",
                            borderColor: "#ccc",
                        })
                    }}
                    onBlur={ () => this.onUserBlur() }
                    keyboardType="phone-pad"
                    keyboardAppearance="dark"
                    // inlineImageLeft=""
                    // clearButtonMode
                    selectionColor="#007aff"
                    value={this.state.pin}
                    onChangeText={ pin => this.setState({ pin }) }
                />

                <Text>{this.state.vehicleId}</Text>

                <FormValidationMessage
                    labelStyle={{ fontWeight: "200", textAlign: "center" }}
                >
                    {this.state.err}
                </FormValidationMessage>

                <Button
                    raised
                    large
                    title="Submit"
                    loading={ this.state.showLoadingIndicator }
                    loadingProps={{ size: "large" }}
                    icon={{ name: "send", type: "font-awesome", color: "#fff", size: 30 }}
                    color="#fff"
                    buttonStyle={{ backgroundColor: "#007aff" }}
                    textStyle={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}
                    onPress={ this.verifyMpin }
                />

            </View>
        )
    }
}

export default RegisterScreen;