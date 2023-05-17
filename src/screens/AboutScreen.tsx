import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../types/navigation';

type AboutScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  'About'
>;

const AboutScreen = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Quotes')}
      >
        <Text style={styles.buttonText}>Перейти к котировкам</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});
