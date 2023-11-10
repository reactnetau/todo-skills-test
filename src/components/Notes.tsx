import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { INote } from '../interfaces/INotes'
import { useNavigation } from '@react-navigation/native'
import { HomeStackNavigationProp } from '../types/navigationTypes'


const Notes = ({ note }: INote) => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const editNote = () => {
    navigation.navigate('NewNote', { note });
  }
  return (
    <View style={styles.container}>
      <View style={{ width: '80%'}}> 
      <Text style={styles.text}>Note: {note?.note}</Text>
      <Text style={styles.text}>Category: {note?.category}</Text>
      <Text style={styles.text}>Client: {note?.client}</Text>
      </View>
      <View style={styles.btn}>
        <Button title="Edit" onPress={() => editNote()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'space-between',
    width: '95%',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderColor: 'green',
    borderRadius: 5,
  },
  btn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    color: 'green',
    fontSize: 15,
  }
})

export default Notes