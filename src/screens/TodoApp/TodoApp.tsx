import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import React from 'react'
import type { RootState } from '../../../store'

import { useDispatch, useSelector } from 'react-redux'
import Notes from '../../components/Notes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TodoApp = () => {
  const notes = useSelector((state: RootState) => state.notes);
  console.log(notes);
  const { top } = useSafeAreaInsets()
  const dispatch = useDispatch()
  return (
    <View>
      <FlatList 
        data={notes}
        renderItem={({item}) => <Notes note={item} />}
        ListEmptyComponent={<View style={styles.empty}><Text>No notes found</Text></View>}
      />
    </View>
  )
}

const styles = StyleSheet.create({

  empty: {
    flex: 1,
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default TodoApp