import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, Alert, ToastAndroid, Platform, StyleSheet } from 'react-native';

const Edit = ({ navigation, route }) => {
    const [Task, setTask] = useState(route.params.key);

    // Function to show toast messages for Android (or use alerts as fallback for iOS)
    const showToast = (message) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            Alert.alert(message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Edit Task:</Text>
                <TextInput
                    value={Task}
                    style={styles.input}
                    onChangeText={(text) => setTask(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        if (!Task.trim()) {
                            Alert.alert('Invalid Input', 'Task cannot be empty.');
                            return;
                        }
                        const updatedItem = { key: Task };
                        route.params.updateDatasource(updatedItem);
                        showToast('Task updated successfully!');
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        Alert.alert(
                            'Confirm Delete',
                            `Are you sure you want to delete the task "${Task}"?`,
                            [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        route.params.deleteItem();
                                        showToast('Task deleted successfully!');
                                        navigation.goBack();
                                    },
                                },
                                { text: 'No', style: 'cancel' },
                            ]
                        );
                    }}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#f44336',
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Edit;
