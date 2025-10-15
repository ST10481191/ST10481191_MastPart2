import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useMenu } from '../context/MenuContext';
import { Course } from '../types';

export default function MenuListScreen({ navigation }: any) {
  const { items, getTotalItems, getItemsByCourse } = useMenu();
  const COURSES: Course[] = ['Breakfast', 'Mains', 'Desserts'];

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
              <Text style={styles.itemPrice}>R {item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Menu</Text>
        <Text style={styles.count}>{getTotalItems()} dishes</Text>
      </View>

      {getTotalItems() === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No dishes added yet</Text>
          <Text style={styles.emptyText}>Start by adding dishes from the home screen!</Text>
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
  container: { flex: 1, backgroundColor: '#FFF5EB' }, // fond homepage
  header: {
    backgroundColor: '#FF7F50',
    padding: 20,
    alignItems: 'center',
    margin: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FF4500',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 5,
  },
  count: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  listContent: {
    padding: 15,
  },
  courseSection: {
    marginBottom: 25,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF4500',
  },
  courseCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    backgroundColor: '#FF7F50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  menuItem: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FF7F50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemMain: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF4500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#555555',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 22,
  },
});
