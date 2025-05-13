import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CreditCard, Phone, Zap, FileText, Smartphone, ShoppingBag } from 'lucide-react-native';
import { secondary, neutral } from '@/utils/colors';

type QuickActionItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

export default function QuickActions() {
  const actions: QuickActionItem[] = [
    {
      id: 'mobile',
      icon: <Phone size={22} color={neutral[100]} />,
      label: 'Mobile',
      onPress: () => {},
    },
    {
      id: 'electricity',
      icon: <Zap size={22} color={neutral[100]} />,
      label: 'Electricity',
      onPress: () => {},
    },
    {
      id: 'internet',
      icon: <FileText size={22} color={neutral[100]} />,
      label: 'Internet',
      onPress: () => {},
    },
    {
      id: 'tv',
      icon: <Smartphone size={22} color={neutral[100]} />,
      label: 'TV',
      onPress: () => {},
    },
    {
      id: 'shopping',
      icon: <ShoppingBag size={22} color={neutral[100]} />,
      label: 'Shopping',
      onPress: () => {},
    },
    {
      id: 'bills',
      icon: <CreditCard size={22} color={neutral[100]} />,
      label: 'Bills',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {actions.map((action) => (
          <TouchableOpacity 
            key={action.id} 
            style={styles.actionItem}
            onPress={action.onPress}
          >
            <View style={styles.iconContainer}>
              {action.icon}
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: neutral[900],
    marginBottom: 16,
  },
  scrollContainer: {
    paddingRight: 16,
  },
  actionItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 68,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: neutral[800],
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
});