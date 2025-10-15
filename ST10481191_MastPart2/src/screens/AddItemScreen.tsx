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
import Header from '../components/Header';
import { Course } from '../types';

const COURSES: Course[] = ['Appetizers', 'Entrees', 'Desserts', 'Beverages'];

export default function AddItemScreen({ navigation }: any) {
  const { addItem } = useMenu();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Entrees');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Missing Information', 'Please fill in all fields to continue.');
      return;
    }

    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price amount.');
      return;
    }

    addItem({ 
      name: name.trim(), 
      description: description.trim(), 
      course,
      price: parseFloat(price).toFixed(2),
    });
    
    Alert.alert('Success!', `"${name}" has been added to your menu.`, [
      { 
        text: 'Continue', 
        onPress: () => {
          setName('');
          setDescription('');
          setPrice('');
          setCourse('Entrees');
        }
      }
    ]);
  };

  const isFormValid = name.trim() && description.trim() && price.trim() && !isNaN(parseFloat(price));

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Create New Dish</Text>
          <Text style={styles.formSubtitle}>Design your culinary masterpiece</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Dish Name</Text>
            <TextInput 
              placeholder="Enter dish name" 
              value={name} 
              onChangeText={setName} 
              style={styles.textInput} 
              placeholderTextColor="#9FA8DA"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput 
              placeholder="Describe your dish..." 
              value={description} 
              onChangeText={setDescription} 
              style={[styles.textInput, styles.textArea]} 
              multiline
              numberOfLines={4}
              placeholderTextColor="#9FA8DA"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Course Type</Text>
            <View style={styles.courseGrid}>
              {COURSES.map((courseOption) => (
                <TouchableOpacity
                  key={courseOption}
                  style={[
                    styles.courseCard,
                    course === courseOption && styles.courseCardActive
                  ]}
                  onPress={() => setCourse(courseOption)}
                >
                  <Text style={[
                    styles.courseCardText,
                    course === courseOption && styles.courseCardTextActive
                  ]}>
                    {courseOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Price</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput 
                placeholder="0.00" 
                value={price} 
                onChangeText={setPrice} 
                style={styles.priceInput} 
                keyboardType="decimal-pad"
                placeholderTextColor="#9FA8DA"
              />
            </View>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.cancelBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.saveBtn, !isFormValid && styles.saveBtnDisabled]}
              onPress={handleSave}
              disabled={!isFormValid}
            >
              <Text style={styles.saveBtnText}>Add to Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollView: { flex: 1 },
  formCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A237E',
    textAlign: 'center',
    marginBottom: 5,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#5C6BC0',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#E8EAF6',
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
    color: '#1A237E',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  courseCard: {
    width: '48%',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  courseCardActive: {
    backgroundColor: '#1A237E',
    borderColor: '#FFC107',
  },
  courseCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5C6BC0',
    textAlign: 'center',
  },
  courseCardTextActive: {
    color: '#FFFFFF',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8EAF6',
    borderRadius: 15,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A237E',
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#1A237E',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: 18,
    borderRadius: 15,
    backgroundColor: '#9FA8DA',
    marginRight: 12,
    alignItems: 'center',
  },
  saveBtn: {
    flex: 2,
    padding: 18,
    borderRadius: 15,
    backgroundColor: '#1A237E',
    marginLeft: 12,
    alignItems: 'center',
    shadowColor: '#1A237E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveBtnDisabled: {
    backgroundColor: '#C5CAE9',
    shadowColor: '#9FA8DA',
  },
  cancelBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});