import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import SplitDisplay from './SplitDisplay';

export default function App() {
  const [content, setContent] = useState('');
  const [value, setValue] = useState('');
  const [tags, setTags] = useState('');
  const [tableData, setTableData] = useState([]);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [tipPercentage, setTipPercentage] = useState(10);
  const [counter, setCounter] = useState(1); // Initialize counter with 1

  const handleAddRow = () => {
    const floatValue = parseFloat(value);
    if (!isNaN(floatValue)) {
      const newRow = { id: counter, content, value: floatValue, tags: tags.split(',') };
      setCounter(counter + 1); // Increment the counter for the next row
      setTableData([...tableData, newRow]);
    }
  };

  const handleRemoveRow = (id) => {
    const updatedTableData = tableData.filter((row) => row.id !== id);
    setTableData(updatedTableData);
  };

  return (
    <View style={styles.container}>
      <Text>Content:</Text>
      <TextInput style={styles.input} value={content} onChangeText={setContent} />
      <Text>Value:</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />
      <Text>Tags:</Text>
      <TextInput style={styles.input} value={tags} onChangeText={setTags} />

      <Button title="Add Row" onPress={handleAddRow} />

      <FlatList
        data={tableData}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.content}</Text>
            <Text>${item.value.toFixed(2)}</Text>
            <Text>{item.tags.join(', ')}</Text>
            <Button title="Remove" onPress={() => handleRemoveRow(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <SplitDisplay tableData={tableData} tipPercentage={tipPercentage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    padding: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
