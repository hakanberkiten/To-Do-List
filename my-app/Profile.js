import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Profile = ({ navigation, completedTasks, deletedTasks }) => {
    const [activeTaskType, setActiveTaskType] = useState(null);

    const tasks =
        activeTaskType === 'completed'
            ? completedTasks
            : activeTaskType === 'deleted'
                ? deletedTasks
                : [];

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity
                    style={[styles.box, { backgroundColor: '#6C5CE7' }]}
                    onPress={() => setActiveTaskType('completed')}
                >
                    <Text style={styles.boxText}>✅ Completed Tasks</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.box, { backgroundColor: '#E17055' }]}
                    onPress={() => setActiveTaskType('deleted')}
                >
                    <Text style={styles.boxText}>🗑️ Deleted Tasks</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={activeTaskType !== null}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>
                            {activeTaskType === 'completed'
                                ? '✅ Completed Tasks'
                                : '🗑️ Deleted Tasks'}
                        </Text>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            {tasks.length > 0 ? (
                                tasks.map((task, index) => (
                                    <View key={index} style={styles.taskItem}>
                                        <Text style={styles.taskText}>{task}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={{ textAlign: 'center', marginVertical: 10 }}>
                                    No tasks available.
                                </Text>
                            )}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setActiveTaskType(null)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.bottomNavBar}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Ionicons name="home" size={28} color="#6C5CE7" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Ionicons name="person" size={28} color="#E17055" />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    box: {
        width: '85%',
        padding: 20,
        borderRadius: 12,
        marginVertical: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    boxText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#6C5CE7',
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    taskItem: {
        backgroundColor: '#DFF9FB',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    taskText: {
        fontSize: 16,
        color: '#2D3436',
    },
    closeButton: {
        backgroundColor: '#6C5CE7',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    closeButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomNavBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 12,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
});

export default Profile;
