import React, { useState, useEffect } from "react";
import { Button, Animated, ImageBackground, TouchableOpacity, StyleSheet, Text, TextInput, ScrollView, View, ActivityIndicator, Alert } from 'react-native';
import { Image, SocialIcon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import i18next, { languageResources } from "../configLng/i18next";
import { useTranslation } from "react-i18next";


const LoginScreen = () => {

        const { t } = useTranslation();
        const [currentLanguage, setCurrentLanguage] = useState(i18next.language);

        const changeLanguage = (newLanguage) => {
          i18next.changeLanguage(newLanguage);
          setCurrentLanguage(newLanguage);
        }
        const [scaleValue1] = useState(new Animated.Value(1));
        const [scaleValue2] = useState(new Animated.Value(1));

        const handlePressIn1 = () => {
        
            Animated.spring(scaleValue1, {
            toValue: 0.8,
            useNativeDriver: true,
            }).start();
        };

        const handlePressIn2 = () => {
        
            Animated.spring(scaleValue2, {
            toValue: 0.8,
            useNativeDriver: true,
            }).start();
        };

        const handlePressOut1 = () => {

            Animated.spring(scaleValue1, {
            toValue: 1,
            useNativeDriver: true,
            }).start();
        };

        const handlePressOut2 = () => {
            Animated.spring(scaleValue2, {
            toValue: 1,
            useNativeDriver: true,
            }).start();
        };

        const handlePress1 = () => {
        
            console.log('Button 1 pressed!');
        };

        const handlePress2 = () => {
            console.log('Button 2 pressed!');
        };

        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            setTimeout(() => {
              setIsLoading(false);
            }, 3000);
        }, []); 

        const {setIsLoggedIn} = useAuth();
  
        const [username, setUsername] = useState('');
        const [usernameVerify, setUsernameVerify] = useState(false);
        const [password, setPassword] = useState('');
        const [passwordVerify, setPasswordVerify] = useState(false);
        const navigation = useNavigation();
        

        const handleUsernameChange = (text) => {
          
          setUsername(text);
          setUsernameVerify(false);
      
          if (text.length > 1){
            setUsernameVerify(true);
          }
          
        };
        
        const handlePasswordChange = (text) => {
          setPassword(text);
          setPasswordVerify(false);
      
          if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(text)) {
            setPassword(text);
            setPasswordVerify(true);
            }
        };  
        
        const handleLogin = async () => {

          const userData = {
            username,
            password
          }

          try {
            const response = await axios.post("http://192.168.1.117:5001/login", userData);
            const responseData = response.data;
    
            if (responseData.status === "OK") {
                setIsLoggedIn(true);
                Alert.alert(t("LoginScreen.loginAlert"));
                navigation.navigate("Main");
            } else {

              Alert.alert(
                "Error",
                t("LoginScreen.loginAlert2"),
                [
                  {
                    text: "OK",
                    style: "cancel"
                  }
                ],
                { cancelable: true }
              );
                
                //Alert.alert(t("LoginScreen.loginAlert2"));
            }
        } catch (error) {
            console.error("Login failed:", error);

            Alert.alert(
              "Error",
              t("LoginScreen.loginAlert2"),
              [
                {
                  text: "OK",
                  style: "cancel"
                }
              ],
              { cancelable: true }
            );
            
            //Alert.alert(t("LoginScreen.loginAlert2"));
        }

        };

  return (
    
    <View style={styles.container}>
      {isLoading ? (
          <View style={styles.loaderContainer}>
              <Image
                source={require('../assets/loading.gif')}
                style={styles.imageLoading}
              />
          </View>
      ) : (
        
        <ImageBackground style={styles.backgroundImage} source={require('../assets/login/homeapp.jpg')}>

              <View style={styles.social_icon}>
                <TouchableOpacity onPress={() => changeLanguage('en')}>
                <Text style={styles.langText}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeLanguage('ar')}>
                <Text style={styles.langText}>AR</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeLanguage('fr')}>
                <Text style={styles.langText}>FR</Text>
                </TouchableOpacity>
              </View>
        
        <TextInput
          style={styles.input}
          placeholder={t('LoginScreen.usernameField')}
          onChangeText={e => handleUsernameChange(e)}
        />
        <TextInput
          style={styles.input}
          placeholder={t('LoginScreen.passwordField')}
          onChangeText={e => handlePasswordChange(e)}
          secureTextEntry={true}
        />
        <TouchableOpacity>
        <Text style={styles.passTxt}>{t('LoginScreen.passFgt')}</Text>
        </TouchableOpacity>
        <Text>{ '\n' }</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()} >
          <Text style={styles.buttonText}>{t('LoginScreen.buttonLogin')}</Text>
        </TouchableOpacity>
        <Text>{ '\n' }</Text>
        <Text style={styles.msgNacct}>{t('LoginScreen.msgNewAccount')}</Text>
        <View style={styles.social_icon} >
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.buttonText}>{t('LoginScreen.buttonSignin')}</Text>
        </TouchableOpacity>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text style={styles.msgNacct}>{t('LoginScreen.orText')}</Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handlePress1}
            onPressIn={handlePressIn1}
            onPressOut={handlePressOut1}
          >
            <Animated.View style={[styles.buttonIcon, { transform: [{ scale: scaleValue1 }] }]}>
              <SocialIcon type='facebook' />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handlePress2}
            onPressIn={handlePressIn2}
            onPressOut={handlePressOut2}
          >
            <Animated.View style={[styles.buttonIcon, { transform: [{ scale: scaleValue2 }] }]}>
              <SocialIcon type='google' />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      )
      }
  </View>
  
  )
}

const styles = StyleSheet.create({

    container: {
      flexGrow: 5,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '60%',
      height: 40,
      borderColor: '#ffffff',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor: '#f0f0f0'
    },
    button: {
      backgroundColor: '#b1bfc9',
      borderWidth: 1, // Add a border
      borderColor: '#e9dede',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#134f5c',
      fontSize: 18,
      fontWeight: 'bold',
    },
    backgroundImage: {
      flex: 1,
      width: '130%',
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#ffffff', 
      fontSize: 20, 
      fontWeight: 'bold', 
      fontStyle: 'italic', 
    },
    social_icon: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
    },
    buttonIcon: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    langText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      margin: 5,
      color: '#ffffff'
    },
    passTxt: {
      textDecorationLine: 'underline',
      fontSize: 15,
      fontWeight: 'bold',
      color: '#6fa8dc'
    },
    msgNacct: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#ffffff'
    },
    loaderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageLoading: {
      width: 50,
      height: 50
    }
  
  
  });

export default LoginScreen