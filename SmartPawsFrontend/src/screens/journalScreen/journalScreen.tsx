import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const JournalScreen = () => {
    const [entry, setEntry] = useState('');

    const handleSaveEntry = () => {
        // Here you can save the entry to a database or perform any other action
        console.log('Entry saved:', entry);
        // Clear the input field after saving
        setEntry('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Journal</Text>
            <TextInput
                style={styles.input}
                multiline
                placeholder="Write your journal entry here..."
                value={entry}
                onChangeText={setEntry}
            />
            <Button title="Save Entry" onPress={handleSaveEntry} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 200,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
});

export default JournalScreen;
