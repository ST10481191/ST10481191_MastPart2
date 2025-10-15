import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Alert 
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import { Course } from '../types';

const COURSES: Course[] = ['Breakfast', 'Mains', 'Desserts'];

export default function AddItemScreen({ navigation }: any) {
  const { addItem } = useMenu();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Mains');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price.');
      return;
    }

    addItem({ 
      name: name.trim(), 
      description: description.trim(), 
      course,
      price: parseFloat(price).toFixed(0),
    });
    
    Alert.alert('Success!', `${name} has been added to your menu.`, [
      { 
        text: 'OK', 
        onPress: () => {
          setName('');
          setDescription('');
          setPrice('');
          setCourse('Mains');
        }
      }
    ]);
  };

  const isFormValid = name.trim() && description.trim() && price.trim() && !isNaN(parseFloat(price));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <Text style={styles.title}>Create New Dish</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dish Name</Text>
            <TextInput 
              placeholder="Enter dish name" 
              value={name} 
              onChangeText={setName} 
              style={styles.input} 
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput 
              placeholder="Describe your dish..." 
              value={description} 
              onChangeText={setDescription} 
              style={[styles.input, styles.textArea]} 
              multiline
              numberOfLines={3}
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Course</Text>
            <View style={styles.courseContainer}>
              {COURSES.map((courseOption) => (
                <TouchableOpacity
                  key={courseOption}
                  style={[
                    styles.courseButton,
                    course === courseOption && styles.courseButtonActive
                  ]}
                  onPress={() => setCourse(courseOption)}
                >
                  <Text style={[
                    styles.courseText,
                    course === courseOption && styles.courseTextActive
                  ]}>
                    {courseOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price (R)</Text>
            <TextInput 
              placeholder="0" 
              value={price} 
              onChangeText={setPrice} 
              style={styles.input} 
              keyboardType="number-pad"
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!isFormValid}
            >
              <Text style={styles.saveButtonText}>Add to Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5EB' }, 
  scrollView: { flex: 1 },
  formCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FF7F50', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FF4500', 
    textAlign: 'center',
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#FF7F50',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: '#FFE4D6',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  courseButtonActive: {
    backgroundColor: '#FF7F50',
    borderColor: '#FF4500',
  },
  courseText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  courseTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#CCCCCC',
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    flex: 2,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FF4500',
    marginLeft: 10,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#999999',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

