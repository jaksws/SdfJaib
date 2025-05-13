import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Search, X, ChevronRight } from 'lucide-react-native';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { primary, secondary, neutral } from '@/utils/colors';
import { beneficiaries, currentUser } from '@/utils/mockData';
import { formatCurrency, getInitials } from '@/utils/formatters';

export default function TransferScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('jaib');

  // Filter beneficiaries based on search query
  const filteredBeneficiaries = beneficiaries.filter(beneficiary => 
    beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tab, selectedTab === 'jaib' && styles.activeTab]}
        onPress={() => setSelectedTab('jaib')}
      >
        <Text style={[styles.tabText, selectedTab === 'jaib' && styles.activeTabText]}>
          Jaib Users
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, selectedTab === 'bank' && styles.activeTab]}
        onPress={() => setSelectedTab('bank')}
      >
        <Text style={[styles.tabText, selectedTab === 'bank' && styles.activeTabText]}>
          Bank Transfer
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Money Transfer" showNotification />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceValue}>{formatCurrency(currentUser.balance)}</Text>
          </Card>

          {renderTabs()}

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color={neutral[500]} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a recipient"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={neutral[500]}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <X size={20} color={neutral[500]} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.recipientsContainer}>
            <Text style={styles.sectionTitle}>Recent Recipients</Text>
            {filteredBeneficiaries.length === 0 ? (
              <Text style={styles.emptyText}>No recipients found</Text>
            ) : (
              filteredBeneficiaries.map(beneficiary => (
                <TouchableOpacity 
                  key={beneficiary.id} 
                  style={styles.recipientItem}
                  onPress={() => {
                    // Navigate to transfer amount screen
                    // For demo purposes, we'll just simulate this
                    alert(`Send money to ${beneficiary.name}`);
                  }}
                >
                  {beneficiary.image ? (
                    <Image source={{ uri: beneficiary.image }} style={styles.recipientImage} />
                  ) : (
                    <View style={styles.recipientInitials}>
                      <Text style={styles.initialsText}>{getInitials(beneficiary.name)}</Text>
                    </View>
                  )}
                  <View style={styles.recipientInfo}>
                    <Text style={styles.recipientName}>{beneficiary.name}</Text>
                    <Text style={styles.recipientDetails}>
                      {beneficiary.phoneNumber || beneficiary.accountNumber || 'Jaib User'}
                    </Text>
                  </View>
                  <ChevronRight size={20} color={neutral[400]} />
                </TouchableOpacity>
              ))
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button 
              title="Send to New Recipient" 
              onPress={() => {
                // Navigate to add new recipient screen
                // For demo purposes, we'll just simulate this
                alert('Add new recipient');
              }} 
              variant="primary"
              fullWidth
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: neutral[50],
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  balanceCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: primary[500],
  },
  balanceLabel: {
    fontSize: 14,
    color: neutral.white,
    opacity: 0.8,
    fontFamily: 'Roboto-Regular',
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 24,
    color: neutral.white,
    fontFamily: 'Roboto-Bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: neutral[200],
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: neutral.white,
  },
  tabText: {
    fontSize: 14,
    color: neutral[600],
    fontFamily: 'Roboto-Medium',
  },
  activeTabText: {
    color: primary[500],
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: neutral.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: neutral[300],
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: neutral[900],
    fontFamily: 'Roboto-Regular',
  },
  recipientsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: neutral[900],
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: neutral[600],
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    marginVertical: 24,
  },
  recipientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: neutral[200],
  },
  recipientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  recipientInitials: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initialsText: {
    color: neutral.white,
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    color: neutral[900],
    fontFamily: 'Roboto-Medium',
    marginBottom: 2,
  },
  recipientDetails: {
    fontSize: 14,
    color: neutral[600],
    fontFamily: 'Roboto-Regular',
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
});