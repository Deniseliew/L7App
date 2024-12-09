import React, { useState } from 'react';
import { datasource } from "./Data";
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const Add = ({ navigation }) => {
    const [Task, setTask] = useState('');
    const [type, setType] = useState('Completed');

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Event Planning:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTask(text)}
                    placeholder="Enter task"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Select Type:</Text>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: "Completed", value: "Completed" },
                        { label: "Incomplete", value: "Incomplete" }
                    ]}
                    style={{
                        inputAndroid: styles.pickerInput,
                        inputIOS: styles.pickerInput,
                    }}
                />
            </View>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                    if (!Task.trim()) {
                        alert('Task cannot be empty!');
                        return;
                    }
                    let item = { key: Task };
                    let indexNum = 1;
                    if (type === 'Completed') {
                        indexNum = 0;
                    }
                    datasource[indexNum].data.push(item);
                    navigation.navigate("Home");
                }}
            >
                <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
    pickerInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Add;
