import { View, Text } from 'react-native'
import React, { createContext, useContext, useState } from 'react'

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [eventData, setEventData] = useState([]);
  return (
    <EventContext.Provider value={{ eventData, setEventData }}>
        { children }
    </EventContext.Provider>
  )
}

export const useEvent = () => useContext(EventContext);