import React, { useState, useEffect } from "react";
import { NavigationContainer, StackRouter, useNavigation } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import MainNavigator from "./navigation/MainNavigator";
import { EventProvider } from "./context/EventContext";


const App = () => {
 
  return (
    <NavigationContainer>
      <AuthProvider>
        <UserProvider>
            <MainNavigator />
        </UserProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App