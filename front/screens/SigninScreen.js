
import React, { useState, useEffect } from "react";
import { Button, Animated, ImageBackground, TouchableOpacity, StyleSheet, Text, TextInput, ScrollView, View, Platform, Alert } from 'react-native';
import { Image, SocialIcon } from "react-native-elements";
import * as Localization from "expo-localization";
import DatePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import i18next, { languageResources } from "../configLng/i18next";
import { useTranslation } from "react-i18next";

const SigninScreen = () => {

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
  
  const [nomPrenom, setNomPrenom] = useState('');
  const [nomPrenomVerify, setNomPrenomVerify] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameVerify, setUsernameVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const navigation = useNavigation();

  
  const handleNomPrenomChange = (e) => {
    const nomPrenomVar = e.nativeEvent.text;
    setNomPrenom(nomPrenomVar);
    setNomPrenomVerify(false);

    if (nomPrenomVar.length > 1){
      setNomPrenomVerify(true);
    }
  };

 
  const handleEmailChange = (e) => {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);

    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
    setEmail(emailVar);
    setEmailVerify(true);
    }
  };

  const handleUsernameChange = (e) => {
    const usernameVar = e.nativeEvent.text;
    setUsername(usernameVar);
    setUsernameVerify(false);

    if (usernameVar.length > 1){
      setUsernameVerify(true);
    }
  };
  
  const handlePasswordChange = (e) => {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);

    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
      }
  };  

  const handleSignIn = async () => {

    const userData = {
      nomPrenom,
      email,
      username,
      password
    };

    axios
    .post("http://192.168.1.26:5001/signin", userData)
    .then((res) => console.log(res.data))
    .catch(e => console.log(e));

      Alert.alert(t("signinAlert"));
      navigation.navigate("Login");
      
    
  }

  return (
    <ScrollView style={styles.scrollViewContainer}>
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <Image
            source={require('../assets/loading.gif')}
            style={styles.imageLoading}
          />
        </View>
      ):(
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
          placeholder={t('SigninScreen.fullNameField')}
          onChange={e => handleNomPrenomChange(e)}
        />
        <TextInput
          style={styles.input}
          placeholder={t('SigninScreen.mailField')}
          onChange={e =>handleEmailChange(e)}
        />
        <TextInput
          style={styles.input}
          placeholder={t('SigninScreen.usernameField')}
          onChange={e =>handleUsernameChange(e)}
        />
        <TextInput
          style={styles.input}
          placeholder={t('SigninScreen.passwordField')}
          onChange={e =>handlePasswordChange(e)}
          secureTextEntry={true}
        />
        <Text>{ '\n' }</Text>
        <TouchableOpacity style={styles.button} onPress={()=>handleSignIn()}>
        <Text style={styles.buttonText}>{t('SigninScreen.buttonSignin')}</Text>
        </TouchableOpacity>
        <View style={styles.social_icon} >
          
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text style={styles.msgNacct}>{t('SigninScreen.orText')}</Text>
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
      )}
  </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
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

export default SigninScreen
