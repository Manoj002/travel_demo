import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

class WelcomeScreen extends React.Component {

    render() {

        return(
            <View
                style={{ flex: 1, backgroundColor: "#fff", justifyContent: "space-around" }}
            >

                <Text 
                    style={[
                        styles.textStyle, {
                        fontSize: 24,
                        color: '#000',
                        fontWeight: 'bold'
                        }
                    ]}
                >
                    WELCOME TO,
                </Text>

                <Text 
                    style={[
                        styles.textStyle, {
                            fontSize: 34,
                            color: '#007aff',
                            fontWeight: 'bold',
                            marginBottom: 10
                        }
                    ]}
                >
                    travel_demo
                </Text>

                <View>

                    <Button
                        rounded
                        large
                        title="NEXT"
                        iconRight={{ name: "arrow-forward", type: "materialicons", color: "#fff", size: 30 }}
                        // icon={{ name:"navigate-next", type:"materialicons", color:'#fff', size: 30 }}
                        buttonStyle={{ backgroundColor:"#007aff", borderWidth: 1, borderColor: "#007aff" }}
                        textStyle={{color: '#fff', fontSize: 22, fontWeight: "bold"}}
                        onPress={() => this.props.navigation.navigate("auth")}
                    />

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'center'
    },
});

export default WelcomeScreen;