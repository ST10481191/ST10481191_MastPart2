import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ItemDetailsScreen({ route, navigation }: any) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.courseBadge}>
            <Text style={styles.courseText}>{item.course}</Text>
          </View>
          
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>R {item.price}</Text>
          </View>
        </View>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5EB' }, // fond homepage
  scrollView: { flex: 1 },
  content: {
    padding: 20,
  },
  courseBadge: {
    backgroundColor: '#FF7F50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF4500',
  },
  courseText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  name: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#FF4500',
    marginBottom: 15,
    lineHeight: 32,
  },
  description: { 
    fontSize: 16, 
    color: '#555555',
    lineHeight: 24,
    marginBottom: 30,
  },
  priceContainer: {
    backgroundColor: '#FF7F50',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF4500',
  },
  priceLabel: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 5,
  },
  price: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: '#FFF',
  },
  backButton: {
    backgroundColor: '#FF4500',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF7F50',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
