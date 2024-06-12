import React, { useEffect, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { Image } from 'react-native-elements';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
}, []); 

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

          </ImageBackground>
    )
    }
    </View>

  )
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

export default HomeScreen