import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, TextInput, ScrollView, View, ActivityIndicator, ImageBackground } from 'react-native';
import { Image } from "react-native-elements";
import UserContext, { UserProvider, useUser } from '../context/UserContext';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';


const ProfileScreen = () => {
  const {userData, setUserData} = useUser();
  const [isLoading, setIsLoading] = useState(false);
   
/*
  useEffect(() => {
    const fetchUserData = async () => {
      try {
      
       const response = await fetch(`http://192.168.100.14:5001/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch user data');
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId]);

  /*
   return (
  <View style={styles.container}>
    {userData ? (
      <Text>{userData.name}</Text>
      <Text>{userData.email}</Text>
      
    ) : (
      <View style={styles.loaderContainer}>
                  <Image
                    source={require('../assets/loading.gif')}
                    style={styles.imageLoading}
                  />
      </View>
    )}
  </View>
);

   */



  return (
 
    <View style={styles.container}>
            { isLoading ? (
                  <View style={styles.loaderContainer}>
                  <Image
                    source={require('../assets/loading.gif')}
                    style={styles.imageLoading}
                  />
              </View>
      ) : (
        <ImageBackground style={styles.backgroundImage} source={require('../assets/main/green.jpg')}>
        { userData && (
          <>
            <View style={styles.title}>
            <Text>Nom & prénom : {userData.nomPrenom}</Text>
        </View>
        <View style={styles.title}>
            <Text>Email : {userData.email}</Text>
        </View>
        </>
        )}
          
        </ImageBackground>
      )}
    </View>
  );
  
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    width: '200%',
    height: '200%',
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



export default ProfileScreen;