
import React from 'react'
import TodoApp from '../screens/TodoApp/TodoApp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import NewNotes from '../screens/NewNote/NewNotes';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigationProp } from '../types/navigationTypes';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TodoApp} options={{ headerTitle: 'Note Taker 3000', headerRight: () => <Button title='New note' onPress={() => navigation.navigate('NewNote')} />}} />
      <Stack.Screen name="NewNote" component={NewNotes} options={{ headerTitle: 'Add/Edit Note'}} />
    </Stack.Navigator>
  )
}

export default Navigation