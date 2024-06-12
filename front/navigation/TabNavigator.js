import { Text } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RankingScreen from '../screens/RankingScreen';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import CompetitionScreen from '../screens/CompetitionScreen';
import EventScreen from '../screens/EventScreen';

const Tab = createBottomTabNavigator();



const TabNavigator = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator 
      screenOptions={({ route })  => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Event') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Competition') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          }  else if (route.name === 'Ranking') {
            iconName = focused ? 'medal' : 'medal-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />

        },
        
        tabBarLabel: ({ focused, color }) => {
          let label;

          if (route.name === 'Home') {
            label = t('TabNavigator.homeTabLabel');
          } else if (route.name === 'Event') {
            label = t('TabNavigator.eventTabLabel');
          } else if (route.name === 'Competition') {
            label = t('TabNavigator.competitionTabLabel');
          }  else if (route.name === 'Ranking') {
            label = t('TabNavigator.rankingTabLabel');
          } else if (route.name === 'Profile') {
            label = t('TabNavigator.profileTabLabel');
          }

          return <Text style={{ color }}>{label}</Text>;
        },
        tabBarActiveTintColor: "#22d24f"
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Event" component={EventScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Competition" component={CompetitionScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Ranking" component={RankingScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default TabNavigator