import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { User, CreditCard, Settings, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import colors from '@/utils/colors';
import { currentUser, notifications } from '@/utils/mockData';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  
  const menuItems = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: <User size={20} color={colors.primary[500]} />,
      onPress: () => alert('Personal Information'),
    },
    {
      id: 'accounts',
      title: 'Linked Accounts',
      icon: <CreditCard size={20} color={colors.primary[500]} />,
      onPress: () => alert('Linked Accounts'),
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={20} color={colors.primary[500]} />,
      onPress: () => alert('Security'),
    },
    {
      id: 'settings',
      title: 'App Settings',
      icon: <Settings size={20} color={colors.primary[500]} />,
      onPress: () => alert('App Settings'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={20} color={colors.primary[500]} />,
      onPress: () => alert('Help & Support'),
    },
  ];

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" showNotification />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            {currentUser.profileImage ? (
              <Image 
                source={{ uri: currentUser.profileImage }} 
                style={styles.profileImage} 
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileInitials}>
                  {currentUser.name.charAt(0)}
                </Text>
              </View>
            )}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{currentUser.name}</Text>
              <Text style={styles.profilePhone}>{currentUser.phoneNumber}</Text>
              {currentUser.email && (
                <Text style={styles.profileEmail}>{currentUser.email}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.menuCard}>
          <TouchableOpacity style={styles.notificationItem}>
            <View style={styles.notificationIcon}>
              <Text style={styles.notificationCount}>{unreadCount}</Text>
            </View>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTitle}>Notifications</Text>
              <Text style={styles.menuItemSubtitle}>
                {unreadCount > 0 
                  ? `You have ${unreadCount} unread notifications` 
                  : 'No new notifications'}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.neutral[400]} />
          </TouchableOpacity>
        </Card>

        <Card style={styles.menuCard}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemIcon}>
                {item.icon}
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color={colors.neutral[400]} />
            </TouchableOpacity>
          ))}
        </Card>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => {
            // For demo purposes, we'll just navigate to the login screen
            router.push('/auth/login');
          }}
        >
          <LogOut size={20} color={colors.error[500]} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  profileCard: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInitials: {
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    color: colors.primary[800],
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    color: colors.neutral[900],
    fontFamily: 'Roboto-Bold',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Roboto-Regular',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Roboto-Regular',
  },
  editButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.primary[50],
  },
  editButtonText: {
    fontSize: 14,
    color: colors.primary[500],
    fontFamily: 'Roboto-Medium',
  },
  menuCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 0,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  notificationIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.error[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationCount: {
    fontSize: 12,
    color: colors.white,
    fontFamily: 'Roboto-Bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    color: colors.neutral[900],
    fontFamily: 'Roboto-Medium',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Roboto-Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.neutral[100],
  },
  logoutText: {
    fontSize: 16,
    color: colors.error[500],
    fontFamily: 'Roboto-Medium',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: colors.neutral[500],
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    marginBottom: 24,
  },
});