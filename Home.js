import React, { useState } from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { datasource as initialDatasource } from './Data';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#444',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#333',
    },
    bottomContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    buttonContainer: {
        marginVertical: 10,
    },
});

const Home = ({ navigation }) => {
    // Manage datasource with state
    const [datasource, setDatasource] = useState(initialDatasource);

    // Function to calculate the total number of events
    const getTotalEvents = () => {
        let totalEvents = 0;
        datasource.forEach(section => {
            totalEvents += section.data.length;
        });
        return totalEvents;
    };

    // Function to calculate the summary and show an alert
    const showSummaryAlert = () => {
        const completedTasks = datasource[0].data.length;
        const incompleteTasks = datasource[1].data.length;
        const totalTasks = completedTasks + incompleteTasks;
        const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

        Alert.alert(
            'Summary',
            `Completed Tasks: ${completedTasks}\nIncomplete Tasks: ${incompleteTasks}\n${completionRate}% of tasks complete`,
            [{ text: 'OK' }]
        );
    };

    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    navigation.navigate('Edit', {
                        index: index,
                        type: section.title,
                        key: item.key,
                        updateDatasource: (updatedItem) => {
                            // Update the datasource and re-render
                            const updatedDatasource = [...datasource];
                            const sectionIndex = section.title === 'Completed' ? 0 : 1;
                            updatedDatasource[sectionIndex].data[index] = updatedItem;
                            setDatasource(updatedDatasource);
                        },
                        deleteItem: () => {
                            // Delete the item from the datasource and re-render
                            const updatedDatasource = [...datasource];
                            const sectionIndex = section.title === 'Completed' ? 0 : 1;
                            updatedDatasource[sectionIndex].data.splice(index, 1);
                            setDatasource(updatedDatasource);
                        },
                    });
                }}
            >
                <Text style={styles.textStyle}>{item.key}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />

            {/* Title */}
            <Text style={styles.titleText}>Event Planning</Text>

            {/* Section List */}
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>{title}</Text>
                )}
            />

            {/* Bottom Section */}
            <View style={styles.bottomContainer}>
                {/* Total Event Count */}
                <Text style={styles.totalText}>Total Events: {getTotalEvents()}</Text>

                {/* Add Task Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Add Task"
                        onPress={() => navigation.navigate('Add')}
                    />
                </View>

                {/* Show Summary Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Show Summary"
                        onPress={showSummaryAlert}
                        color="green"
                    />
                </View>
            </View>
        </View>
    );
};

export default Home;
