import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import categories from '../../../data/categories.json';
import clients from '../../../data/clients.json'
import { useDispatch } from 'react-redux';
import { addNote, deleteNote, editNote } from '../../../slices/notesSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackNavigationProp } from '../../types/navigationTypes';
import { NewNoteRouteProp } from '../../types/routeProps';
import uuid from 'react-native-uuid';

const NewNotes = () => {
  const dispatch = useDispatch();
  const route = useRoute<NewNoteRouteProp>();
  const routeNote = route?.params?.note;  const navigation = useNavigation<HomeStackNavigationProp>();
  const [openCategory, setOpenCategory] = useState(false);
  const [openClients, setOpenClients] = useState(false);

  const [note, setNote] = useState('');
  const [category, setCategory] = useState<string>(null);
  const [client, setClient] = useState<string>(null)

  const categoryItems = categories.map(category => {  return { label: category.name, value: category.name} })
  const clientItems = clients.map(client => {  return { label: client.name, value: client.name} })

  useEffect(() => {
    if (routeNote) {
      setNote(routeNote.note);
      setCategory(routeNote?.category);
      setClient(routeNote?.client);
    }
  }, [])
  const saveNote = () => {
    if (routeNote) {
      dispatch(editNote({ id: routeNote.id, note, category, client }))
      console.log("EDIT")
    } else {
      dispatch(addNote({ id: uuid.v4(), note, category, client }))
    }

    navigation.navigate('Home');
  }

  const removeNote = () => {
    if (note) {
      dispatch(deleteNote(note));
      navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Note</Text>
      <TextInput placeholderTextColor="black" value={note} placeholder='Add your note...' style={styles.input} onChangeText={(v) => setNote(v)} />
      <Text style={styles.header}>Category</Text>
  
        <DropDownPicker
      placeholder='Select a category'
      open={openCategory}
      value={category}
      items={categoryItems}
      setOpen={setOpenCategory}
      setValue={setCategory}
      setItems={categoryItems}
      zIndex={2}
    />
    <Text style={styles.header}>Client</Text>

     <DropDownPicker
      placeholder='Select a client'
      zIndex={1}
      open={openClients}
      value={client}
      items={clientItems}
      setOpen={setOpenClients}
      setValue={setClient}
      setItems={clientItems}
    />
    <View style={styles.button} >
      <Button title="Save" color="white" onPress={() => saveNote()}/>

    </View>
    { routeNote && (
      <View style={styles.buttonRed} >
      <Button title="Delete" color="white" onPress={() => removeNote()}/>

    </View>
    )}
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginVertical: 5,
  },
  header: {
    padding: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    marginVertical: 15,
    backgroundColor: 'blue',
    width: '100%',
    zIndex:0,
  },
  buttonRed: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: 'maroon',
    width: '100%',
    zIndex:0,
  }
});
export default NewNotes