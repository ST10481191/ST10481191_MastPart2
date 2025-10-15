import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useMenu } from "../context/MenuContext";
import { Course } from "../types";

const MENU_ITEMS = [
  // Breakfast
  { name: "Avocado Toast", description: "Toasted sourdough with smashed avocado & feta", course: "Breakfast" as Course, price: "95" },
  { name: "English Breakfast", description: "Eggs, bacon, beans, tomato & sausage", course: "Breakfast" as Course, price: "160" },
  { name: "Smoothie Bowl", description: "Banana & berry blend with granola topping", course: "Breakfast" as Course, price: "120" },
  { name: "Pancakes", description: "Fluffy pancakes with maple syrup", course: "Breakfast" as Course, price: "140" },

  // Mains
  { name: "Grilled Salmon", description: "Served with lemon butter & roasted veggies", course: "Mains" as Course, price: "280" },
  { name: "Chicken Alfredo Pasta", description: "Creamy fettuccine with grilled chicken", course: "Mains" as Course, price: "240" },
  { name: "BBQ Ribs", description: "Slow cooked ribs with house-made BBQ sauce", course: "Mains" as Course, price: "310" },
  { name: "Veggie Burger", description: "Plant-based patty with caramelized onions", course: "Mains" as Course, price: "180" },

  // Desserts
  { name: "Red Velvet Cake", description: "Moist red velvet with cream cheese frosting", course: "Desserts" as Course, price: "95" },
  { name: "Chocolate Brownie", description: "Rich brownie with vanilla ice cream", course: "Desserts" as Course, price: "85" },
  { name: "Fruit Tart", description: "Seasonal fruit with vanilla custard base", course: "Desserts" as Course, price: "110" },
  { name: "Cheesecake", description: "Classic New York style cheesecake", course: "Desserts" as Course, price: "100" },
];

export default function HomeScreen() {
  const { addItem, getTotalItems } = useMenu();
  const [activeTab, setActiveTab] = useState<"All" | "Breakfast" | "Mains" | "Desserts">("All");

  const filteredItems =
    activeTab === "All" ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.course === activeTab);

  return (
    <View style={styles.container}>
      {/* HEADER with background image */}
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" }}
        style={styles.header}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <Text style={styles.headerTitle}>🍴 Christoffel's Cuisine</Text>
        <Text style={styles.counter}>Selected dishes: {getTotalItems()}</Text>
      </ImageBackground>

      {/* TABS */}
      <View style={styles.tabs}>
        {["All", "Breakfast", "Mains", "Desserts"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab as any)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MENU */}
      <ScrollView style={styles.menu}>
        {filteredItems.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardPrice}>{item.price} R</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => addItem(item)}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  header: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  counter: {
    marginTop: 8,
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFE5B4",
    paddingVertical: 10,
    borderRadius: 15,
    margin: 10,
  },
  tab: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },
  activeTab: {
    color: "#B83227",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  menu: { padding: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  cardDesc: { fontSize: 14, color: "#666", marginVertical: 5 },
  cardPrice: { fontSize: 16, fontWeight: "600", color: "#B83227" },
  addButton: {
    backgroundColor: "#B83227",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
