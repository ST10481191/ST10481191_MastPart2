import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

const PREDEFINED_ITEMS = [
  // Appetizers
  { name: 'Mediterranean Mezze', description: 'Hummus, baba ganoush, pita bread', course: 'Appetizers' as Course, price: '15.99' },
  { name: 'Tuna Tartare', description: 'Fresh tuna with avocado and citrus', course: 'Appetizers' as Course, price: '18.99' },
  { name: 'Burrata Caprese', description: 'Creamy burrata with heirloom tomatoes', course: 'Appetizers' as Course, price: '16.99' },
  { name: 'Duck Liver Mousse', description: 'Silky mousse with berry compote', course: 'Appetizers' as Course, price: '17.99' },

  // Entrees
  { name: 'Miso Black Cod', description: 'Marinated cod with ginger rice', course: 'Entrees' as Course, price: '34.99' },
  { name: 'Lamb Rack', description: 'Herb-crusted rack with mint jus', course: 'Entrees' as Course, price: '42.99' },
  { name: 'Wild Mushroom Risotto', description: 'Arborio rice with truffle oil', course: 'Entrees' as Course, price: '26.99' },
  { name: 'Sea Scallops', description: 'Pan-seared with cauliflower purée', course: 'Entrees' as Course, price: '32.99' },

  // Desserts
  { name: 'Lavender Crème Brûlée', description: 'Infused with organic lavender', course: 'Desserts' as Course, price: '12.99' },
  { name: 'Chocolate Fondant', description: 'Warm cake with molten center', course: 'Desserts' as Course, price: '11.99' },
  { name: 'Pistachio Baklava', description: 'Layered pastry with rose syrup', course: 'Desserts' as Course, price: '10.99' },
  { name: 'Saffron Panna Cotta', description: 'Creamy dessert with cardamom', course: 'Desserts' as Course, price: '13.99' },

  // Beverages
  { name: 'Signature Mocktails', description: 'House-crafted non-alcoholic drinks', course: 'Beverages' as Course, price: '9.99' },
  { name: 'Craft Beer Flight', description: 'Four local craft beer samples', course: 'Beverages' as Course, price: '16.99' },
  { name: 'Organic Wine Selection', description: 'Biodynamic and organic wines', course: 'Beverages' as Course, price: '14.99' },
  { name: 'Artisan Coffee', description: 'Single-origin pour over coffee', course: 'Beverages' as Course, price: '6.99' },
];

export default function HomeScreen({ navigation }: any) {
  const { items, addItem, getTotalItems } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Course | 'All'>('All');

  const handleAddItem = (item: any) => {
    addItem(item);
  };

  const isItemAdded = (itemName: string) => {
    return items.some(item => item.name === itemName);
  };

  const filteredItems = PREDEFINED_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.course === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: (Course | 'All')[] = ['All', 'Appetizers', 'Entrees', 'Desserts', 'Beverages'];

  const getCategoryShortName = (category: string) => {
    const shortNames: {[key: string]: string} = {
      'All': 'All',
      'Appetizers': 'App',
      'Entrees': 'Ent',
      'Desserts': 'Des',
      'Beverages': 'Bev'
    };
    return shortNames[category];
  };

  return (
    <View style={styles.container}>
      <Header />
      
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search dishes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9FA8DA"
        />
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{getTotalItems()}</Text>
          <Text style={styles.statLabel}>Your Items</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{PREDEFINED_ITEMS.length}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
      </View>

      {/* Category Filter - COMPACT VERSION */}
      <View style={styles.categoryCompact}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryCompactItem,
              activeCategory === category && styles.categoryCompactItemActive
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text style={[
              styles.categoryCompactText,
              activeCategory === category && styles.categoryCompactTextActive
            ]}>
              {getCategoryShortName(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Menu Items Grid */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {filteredItems.map((item, index) => (
            <View key={index} style={styles.menuCard}>
              <View style={styles.cardHeader}>
                <View style={styles.courseTag}>
                  <Text style={styles.courseTagText}>{item.course}</Text>
                </View>
                {isItemAdded(item.name) && (
                  <View style={styles.addedBadge}>
                    <Text style={styles.addedBadgeText}>✓</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.cardBody}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.dishDescription}>{item.description}</Text>
              </View>
              
              <View style={styles.cardFooter}>
                <Text style={styles.dishPrice}>${item.price}</Text>
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    isItemAdded(item.name) && styles.addButtonDisabled
                  ]}
                  onPress={() => handleAddItem(item)}
                  disabled={isItemAdded(item.name)}
                >
                  <Text style={styles.addButtonText}>
                    {isItemAdded(item.name) ? 'Added' : 'Add +'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Custom Item Button */}
        <TouchableOpacity 
          style={styles.customItemButton}
          onPress={() => navigation.navigate('AddMenu')}
        >
          <Text style={styles.customItemIcon}>+</Text>
          <Text style={styles.customItemText}>Create Custom Dish</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Your Added Items Floating Panel */}
      {items.length > 0 && (
        <View style={styles.floatingPanel}>
          <Text style={styles.panelTitle}>Your Menu ({items.length})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {items.map((item, index) => (
              <View key={item.id} style={styles.panelItem}>
                <Text style={styles.panelItemName}>{item.name}</Text>
                <Text style={styles.panelItemPrice}>${item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchSection: {
    padding: 20,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 25,
    fontSize: 16,
    color: '#1A237E',
    borderWidth: 2,
    borderColor: '#E8EAF6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginVertical: 10,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A237E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#5C6BC0',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E8EAF6',
    marginHorizontal: 10,
  },
  // CATEGORIES COMPACT STYLES
  categoryCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoryCompactItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: '#E8EAF6',
    minWidth: 50,
    alignItems: 'center',
  },
  categoryCompactItemActive: {
    backgroundColor: '#1A237E',
  },
  categoryCompactText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5C6BC0',
  },
  categoryCompactTextActive: {
    color: '#FFFFFF',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
  menuCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E8EAF6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  courseTag: {
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  courseTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1A237E',
    textTransform: 'uppercase',
  },
  addedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addedBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  cardBody: {
    marginBottom: 15,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 6,
    lineHeight: 20,
  },
  dishDescription: {
    fontSize: 12,
    color: '#5C6BC0',
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF9800',
  },
  addButton: {
    backgroundColor: '#1A237E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#9FA8DA',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  customItemButton: {
    flexDirection: 'row',
    backgroundColor: '#FFC107',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  customItemIcon: {
    color: '#1A237E',
    fontSize: 20,
    fontWeight: '800',
    marginRight: 10,
  },
  customItemText: {
    color: '#1A237E',
    fontSize: 16,
    fontWeight: '700',
  },
  floatingPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1A237E',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  panelTitle: {
    color: '#FFC107',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  panelItem: {
    backgroundColor: '#283593',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 10,
    minWidth: 120,
  },
  panelItemName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  panelItemPrice: {
    color: '#FFC107',
    fontSize: 12,
    fontWeight: '700',
  },
});