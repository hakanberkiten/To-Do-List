import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Home(props) {
  const navigation = useNavigation();
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() !== "") {
      props.setTasks([...props.tasks, text.trim()]);
      setText("");
    }
  };

  const handleDelete = index => {
    const taskToDelete = props.tasks[index];
    props.setDeletedTasks([...props.deletedTasks, taskToDelete]);
    props.setTasks(props.tasks.filter((_, i) => i !== index));
  };

  const handleCheck = index => {
    const taskToComplete = props.tasks[index];
    props.setCompletedTasks([...props.completedTasks, taskToComplete]);
    props.setTasks(props.tasks.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>📋 To Do List</Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter your task..."
            placeholderTextColor="#aaa"
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSend}>
            <Text style={styles.addButtonText}>Add </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.taskList}>
          {props.tasks.map((msg, index) => (
            <View key={index} style={styles.taskItem}>
              <Text style={styles.text}>{msg}</Text>
              <View style={styles.taskRow}>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Icon name="delete" size={24} color="#E74C3C" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCheck(index)} style={styles.iconSpacing}>
                  <Icon name="check-circle" size={24} color="#2ECC71" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

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
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 15,
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C5CE7',
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskList: {
    marginTop: 10,
  },
  taskItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
  },
  iconSpacing: {
    marginLeft: 15,
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
