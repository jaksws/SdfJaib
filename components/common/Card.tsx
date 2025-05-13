import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { neutral, white } from '@/utils/colors';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export default function Card({ 
  children, 
  style, 
  variant = 'default',
  padding = 'medium'
}: CardProps) {
  return (
    <View style={[
      styles.card, 
      styles[`${variant}Card`],
      styles[`${padding}Padding`],
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: white,
    overflow: 'hidden',
  },
  defaultCard: {
    backgroundColor: white,
    shadowColor: neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  elevatedCard: {
    backgroundColor: white,
    shadowColor: neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  outlinedCard: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: neutral[200],
  },
  nonePadding: {
    padding: 0,
  },
  smallPadding: {
    padding: 8,
  },
  mediumPadding: {
    padding: 16,
  },
  largePadding: {
    padding: 24,
  }
});