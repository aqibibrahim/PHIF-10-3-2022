import React, { Component } from 'react';
import {  View, Text  } from 'react-native';
import AppRoutes from "./src/navigation"
import { NavigationContainer } from '@react-navigation/native';

function App() {

    return (
        <>
        <NavigationContainer >
          <AppRoutes/>
          </NavigationContainer >
        </>
    );
}

export default App;
