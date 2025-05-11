import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StatusBar 
} from 'react-native';
import { Bell } from 'lucide-react-native';
import colors from '@/utils/colors';
import BalanceCard from '@/components/home/BalanceCard';
import QuickActions from '@/components/home/QuickActions';
import FrequentContacts from '@/components/home/FrequentContacts';
import RecentTransactions from '@/components/home/RecentTransactions';

// Import mock data
import { currentUser, transactions, beneficiaries } from '@/utils/mockData';
import { useRouter } from 'expo-router';
import { Beneficiary } from '@/types';

export default function HomeScreen() {
  const router = useRouter();

  // Handlers
  const handleContactPress = (contact: Beneficiary) => {
    router.push('/transfer');
  };

  const handleAddContactPress = () => {
    router.push('/transfer');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={() => router.push('/profile')}>
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
            </TouchableOpacity>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.nameText}>{currentUser.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={22} color={colors.neutral[800]} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <BalanceCard balance={currentUser.balance} />
        
        <QuickActions />
        
        <FrequentContacts 
          contacts={beneficiaries}
          onContactPress={handleContactPress}
          onAddPress={handleAddContactPress}
        />
        
        <RecentTransactions transactions={transactions} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  profileImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitials: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: colors.primary[800],
  },
  welcomeContainer: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Roboto-Regular',
  },
  nameText: {
    fontSize: 16,
    color: colors.neutral[900],
    fontFamily: 'Roboto-Medium',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error[500],
  },
});