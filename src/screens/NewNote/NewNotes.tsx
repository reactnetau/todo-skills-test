import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import categories from '../../data/categories.json';
import clients from '../../data/clients.json'
import { useDispatch } from 'react-redux';
import { addNote, deleteNote, editNote } from '../../slices/notesSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackNavigationProp } from '../../types/navigationTypes';
import { NewNoteRouteProp } from '../../types/routeProps';
import uuid from 'react-native-uuid';
import { INote } from '../../interfaces/INotes';

const NewNotes = () => {
  const dispatch = useDispatch();
  const route = useRoute<NewNoteRouteProp>();
  const routeNote = route?.params?.note; 

  const navigation = useNavigation<HomeStackNavigationProp>();
  const [openCategory, setOpenCategory] = useState(false);
  const [openClients, setOpenClients] = useState(false);

  const [noteText, setNoteText] = useState('');
  const [category, setCategory] = useState<string>('');

  const [client, setClient] = useState<string>('')

  const categoriesData = categories.map(category => {  return { label: category.name, value: category.name} })
  const [categoryItems, setCategoryItems] = useState(categoriesData);

  
  const clientsData = clients.map(client => {  return { label: client.name, value: client.name} })
  const [clientItems, setClientsItems] = useState(clientsData);
  useEffect(() => {
    if (routeNote) {
      setNoteText(routeNote.note.note);
      setCategory(routeNote.note.category || '');
      setClient(routeNote.note.client || '');
    }
  }, [])
  const saveNote = () => {
    if (routeNote) {
      dispatch(editNote({ note: { id: routeNote.note.id, note: noteText, category, client }}))
    } else {
      dispatch(addNote({ note: { id: uuid.v4() as string, note: noteText, category, client }}))
    }

    navigation.navigate('Home');
  }

  const removeNote = () => {
    if (routeNote) {
      dispatch(deleteNote({ note: { id: routeNote.note.id, note: noteText, category, client }}));
      navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Note</Text>
      <TextInput placeholderTextColor="black" value={noteText} placeholder='Add your note...' style={styles.input} onChangeText={(v) => setNoteText(v)} />
      <Text style={styles.header}>Category</Text>
  
        <DropDownPicker
      placeholder='Select a category'
      open={openCategory}
      value={category}
      items={categoryItems}
      setOpen={setOpenCategory}
      setValue={setCategory}
      setItems={setCategoryItems}
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
      setItems={setClientsItems}
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