import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

export default function MenuListScreen({ navigation }: any) {
  const { items, getTotalItems, getItemsByCourse } = useMenu();

  const COURSES: Course[] = ['Appetizers', 'Main Courses', 'Desserts', 'Beverages'];

  const renderCourseSection = (course: Course) => {
    const courseItems = getItemsByCourse(course);
    
    if (courseItems.length === 0) return null;

    return (
      <View key={course} style={styles.courseSection}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle}>{course}</Text>
          <Text style={styles.courseCount}>{courseItems.length} items</Text>
        </View>
        
        {courseItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => navigation.navigate('ItemDetails', { item })}
          >
            <View style={styles.itemContent}>
              <View style={styles.itemMain}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <View style={styles.itemSide}>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <View style={styles.addedIndicator}>
                  <Text style={styles.addedText}>✓</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Your Complete Menu</Text>
        <Text style={styles.summaryCount}>{getTotalItems()} dishes added</Text>
      </View>

      {getTotalItems() === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No dishes added yet</Text>
          <Text style={styles.emptyText}>
            Start building your menu by adding dishes from the catalog!
          </Text>
        </View>
      ) : (
        <FlatList
          data={COURSES}
          renderItem={({ item }) => renderCourseSection(item)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  summary: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2D3436',
    textAlign: 'center',
  },
  summaryCount: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
  listContent: {
    padding: 15,
    paddingBottom: 20,
  },
  courseSection: {
    marginBottom: 25,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D3436',
  },
  courseCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#00B894',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemMain: {
    flex: 1,
    marginRight: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#636E72',
    lineHeight: 18,
  },
  itemSide: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#00B894',
    marginBottom: 8,
  },
  addedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00B894',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#636E72',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
});