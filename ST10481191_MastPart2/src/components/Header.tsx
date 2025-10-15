import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Text style={styles.logoIcon}>🍳</Text>
        <Text style={styles.logoText}>KitchenPro</Text>
      </View>
      <Text style={styles.tagline}>Professional Menu Builder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 130,
    backgroundColor: '#1A237E',
    paddingTop: 45,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  logoIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  logoText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFC107',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: '#E8EAF6',
    fontWeight: '500',
    marginLeft: 40,
  },
});