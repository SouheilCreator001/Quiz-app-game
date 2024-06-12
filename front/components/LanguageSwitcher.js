/*
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useTransition } from 'react'
import i18n from '../configLng/i18n';
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  return (
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
  )
}

const styles = StyleSheet.create({
    social_icon: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
      },
      langText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
        color: '#ffffff'
      },
})

export default LanguageSwitcher
*/