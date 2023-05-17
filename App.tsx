import React from 'react';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import QuotesScreen from './src/screens/QuotesScreen';
import AboutScreen from './src/screens/AboutScreen';

import { RootStackParamList } from './src/types/navigation';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="About"
        screenOptions={({ route }) => ({
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            // There;s a ts error, but it's ok
            let iconName: Ionicons.glyphMap = 'ios-information-circle-outline';

            if (route.name === 'Quotes') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'About') {
              iconName = focused ? 'ios-list-circle' : 'ios-list';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Quotes"
          component={QuotesScreen}
          options={{ title: 'Котировки' }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'About' }}
        />
      </Tab.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
