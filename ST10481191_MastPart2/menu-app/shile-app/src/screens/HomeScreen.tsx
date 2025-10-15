import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

const PREDEFINED_ITEMS = [
  // Breakfast
  { name: 'French Toast', description: 'Golden brown toast with maple syrup', course: 'Breakfast' as Course, price: '79.90' },
  { name: 'Pancake', description: 'Fluffy pancakes with butter and syrup', course: 'Breakfast' as Course, price: '129.99' },
  { name: 'Omelette', description: 'Three-egg omelette with cheese and herbs', course: 'Breakfast' as Course, price: '150.00' },
  { name: 'Casserole', description: 'Breakfast casserole with eggs and sausage', course: 'Breakfast' as Course, price: '149.99' },

  // Mains
  { name: 'Filet Mignon', description: '8oz beef tenderloin with red wine sauce', course: 'Mains' as Course, price: '380' },
  { name: 'Lobster Ravioli', description: 'Homemade pasta with lobster filling', course: 'Mains' as Course, price: '290' },
  { name: 'Duck Confit', description: 'Slow-cooked duck with potato gratin', course: 'Mains' as Course, price: '320' },
  { name: 'Sea Bass', description: 'Pan-seared with lemon butter', course: 'Mains' as Course, price: '340' },

  // Desserts
  { name: 'Molten Lava Cake', description: 'Warm chocolate cake with vanilla ice cream', course: 'Desserts' as Course, price: '110' },
  { name: 'Tiramisu', description: 'Classic Italian coffee dessert', course: 'Desserts' as Course, price: '90' },
  { name: 'Berry Cheesecake', description: 'New York style with mixed berries', course: 'Desserts' as Course, price: '120' },
  { name: 'Crème Brûlée', description: 'Vanilla custard with caramelized sugar', course: 'Desserts' as Course, price: '100' },
];

export default function HomeScreen({ navigation }: any) {
  const { items, addItem, getTotalItems } = useMenu();
  const [activeTab, setActiveTab] = useState<'All' | 'Breakfast' | 'Mains' | 'Desserts'>('All');

  const handleAddItem = (item: any) => {
    addItem(item);
  };

  const isItemAdded = (itemName: string) => {
    return items.some(item => item.name === itemName);
  };

  const filteredItems = activeTab === 'All' 
    ? PREDEFINED_ITEMS 
    : PREDEFINED_ITEMS.filter(item => item.course === activeTab);

  const tabs = ['All', 'Breakfast', 'Mains', 'Desserts'];

  // Fonction pour les noms courts des tabs
  const getShortTabName = (tab: string) => {
    const shortNames: {[key: string]: string} = {
      'All': 'All',
      'Breakfast': 'Breakfast',
      'Mains': 'Mains', 
      'Desserts': 'Desserts'
    };
    return shortNames[tab];
  };

  return (
    <View style={styles.container}>
      <Header />
      
      {/* Chef Section */}
      <View style={styles.chefSection}>
        <Image 
          source={require('../assets/images/chef.webp')}
          style={styles.chefImage}
        />
        <View style={styles.chefInfo}>
          <Text style={styles.chefName}>Executive Chef</Text>
          <Text style={styles.chefWelcome}>Welcome!</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{getTotalItems()}</Text>
          <Text style={styles.statLabel}>Dishes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{PREDEFINED_ITEMS.length}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
      </View>

      {/* Tabs - Version compacte avec largeur fixe */}
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.tabActive
              ]}
              onPress={() => setActiveTab(tab as any)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive
              ]}>
                {getShortTabName(tab)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {filteredItems.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <View style={styles.itemContent}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={styles.itemMeta}>
                  <Text style={styles.itemCourse}>{item.course}</Text>
                  <Text style={styles.itemPrice}>R {item.price}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.addButton,
                  isItemAdded(item.name) && styles.addedButton
                ]}
                onPress={() => handleAddItem(item)}
                disabled={isItemAdded(item.name)}
              >
                <Text style={styles.addButtonText}>
                  {isItemAdded(item.name) ? '✓' : '+'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('AddMenu')}
        >
          <Text style={styles.createButtonText}>➕ New Dish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chefSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    padding: 15,
    margin: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  chefImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000000',
  },
  chefInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chefName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  chefWelcome: {
    fontSize: 12,
    color: '#000000',
    opacity: 0.8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#000000',
    margin: 12,
    borderRadius: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFD700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // NOUVEAUX STYLES POUR TABS COMPACTES
  tabContainer: {
    height: 50, // Hauteur fixe pour le container des tabs
    paddingHorizontal: 12,
  },
  tabScrollContent: {
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 16, // Moins large
    paddingVertical: 8,
    borderRadius: 20, // Plus arrondi
    backgroundColor: '#F5F5F5',
    marginHorizontal: 4, // Espacement réduit entre les tabs
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 80, // Largeur minimale fixe
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: '#FFD700',
    borderColor: '#000000',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666666',
  },
  tabTextActive: {
    color: '#000000',
  },
  itemsList: {
    flex: 1,
    padding: 12,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 16,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCourse: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000000',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000000',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  addedButton: {
    backgroundColor: '#00AA00',
  },
  addButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '800',
  },
  bottomBar: {
    padding: 12,
    backgroundColor: '#000000',
  },
  createButton: {
    backgroundColor: '#FFD700',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  createButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
  },
});