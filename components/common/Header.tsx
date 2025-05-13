import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { neutral } from '@/utils/colors';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
  rightComponent?: React.ReactNode;
  onNotificationPress?: () => void;
}

export default function Header({
  title,
  showBack = false,
  showNotification = false,
  rightComponent,
  onNotificationPress,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft color={neutral[800]} size={24} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        {rightComponent}
        {showNotification && (
          <TouchableOpacity 
            style={styles.notificationButton} 
            onPress={onNotificationPress}
          >
            <Bell color={neutral[800]} size={22} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: neutral[200],
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: neutral[900],
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: error[500],
  },
});