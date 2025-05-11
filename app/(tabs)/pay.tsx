import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { Zap, Wifi, Droplet, Phone, Tv, ShoppingBag, ChevronRight } from 'lucide-react-native';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import colors from '@/utils/colors';
import { bills } from '@/utils/mockData';
import { formatCurrency, getBillIconName } from '@/utils/formatters';

export default function PayScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: null },
    { id: 'electricity', label: 'Electricity', icon: <Zap size={20} color={colors.white} /> },
    { id: 'internet', label: 'Internet', icon: <Wifi size={20} color={colors.white} /> },
    { id: 'water', label: 'Water', icon: <Droplet size={20} color={colors.white} /> },
    { id: 'mobile', label: 'Mobile', icon: <Phone size={20} color={colors.white} /> },
    { id: 'tv', label: 'TV', icon: <Tv size={20} color={colors.white} /> },
    { id: 'shopping', label: 'Shopping', icon: <ShoppingBag size={20} color={colors.white} /> },
  ];

  // Filter bills based on selected category
  const filteredBills = selectedCategory === 'all' 
    ? bills 
    : bills.filter(bill => bill.type === selectedCategory);

  // Icon mapping for bill types
  const getBillIcon = (type: string) => {
    const iconName = getBillIconName(type);
    switch (iconName) {
      case 'zap':
        return <Zap size={20} color={colors.white} />;
      case 'wifi':
        return <Wifi size={20} color={colors.white} />;
      case 'droplet':
        return <Droplet size={20} color={colors.white} />;
      case 'phone':
        return <Phone size={20} color={colors.white} />;
      case 'tv':
        return <Tv size={20} color={colors.white} />;
      default:
        return <ShoppingBag size={20} color={colors.white} />;
    }
  };

  // Get background color for bill type
  const getBillIconBackground = (type: string) => {
    switch (type) {
      case 'electricity':
        return colors.warning[500];
      case 'internet':
        return colors.primary[500];
      case 'water':
        return colors.secondary[500];
      case 'mobile':
        return colors.success[500];
      case 'tv':
        return colors.error[500];
      default:
        return colors.neutral[500];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Pay Bills" showNotification />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={styles.scanCard}>
          <TouchableOpacity style={styles.scanButton}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/278430/pexels-photo-278430.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} 
              style={styles.qrImage} 
            />
            <Text style={styles.scanText}>Scan to Pay</Text>
          </TouchableOpacity>
        </Card>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.selectedCategoryItem
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              {category.icon && (
                <View style={styles.categoryIconContainer}>
                  {category.icon}
                </View>
              )}
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.billsContainer}>
          <Text style={styles.sectionTitle}>Upcoming Bills</Text>
          
          {filteredBills.length === 0 ? (
            <Text style={styles.emptyText}>No bills found</Text>
          ) : (
            filteredBills.map(bill => (
              <TouchableOpacity 
                key={bill.id}
                style={styles.billItem}
                onPress={() => {
                  // Navigate to bill payment screen
                  // For demo purposes, we'll just simulate this
                  alert(`Pay ${bill.provider} bill: ${formatCurrency(bill.amount)}`);
                }}
              >
                <View style={[
                  styles.billIconContainer, 
                  { backgroundColor: getBillIconBackground(bill.type) }
                ]}>
                  {getBillIcon(bill.type)}
                </View>
                <View style={styles.billInfo}>
                  <Text style={styles.billProvider}>{bill.provider}</Text>
                  <Text style={styles.billAccountNumber}>{bill.accountNumber}</Text>
                  <Text style={[
                    styles.billStatus,
                    bill.status === 'overdue' && styles.overdueStatus
                  ]}>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </Text>
                </View>
                <View style={styles.billAmountContainer}>
                  <Text style={styles.billAmount}>{formatCurrency(bill.amount)}</Text>
                  <Text style={styles.billDueDate}>Due: {new Date(bill.dueDate).toLocaleDateString()}</Text>
                  <ChevronRight size={16} color={colors.neutral[400]} />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          
          <View style={styles.servicesGrid}>
            {[
              { id: 'mobile', label: 'Mobile', icon: <Phone size={24} color={colors.white} />, color: colors.primary[500] },
              { id: 'electricity', label: 'Electricity', icon: <Zap size={24} color={colors.white} />, color: colors.warning[500] },
              { id: 'internet', label: 'Internet', icon: <Wifi size={24} color={colors.white} />, color: colors.secondary[500] },
              { id: 'water', label: 'Water', icon: <Droplet size={24} color={colors.white} />, color: colors.success[500] },
              { id: 'tv', label: 'TV', icon: <Tv size={24} color={colors.white} />, color: colors.error[500] },
              { id: 'shopping', label: 'Shopping', icon: <ShoppingBag size={24} color={colors.white} />, color: colors.neutral[700] },
            ].map(service => (
              <TouchableOpacity 
                key={service.id}
                style={styles.serviceItem}
                onPress={() => {
                  // Navigate to service payment screen
                  // For demo purposes, we'll just simulate this
                  alert(`Pay for ${service.label} service`);
                }}
              >
                <View style={[styles.serviceIconContainer, { backgroundColor: service.color }]}>
                  {service.icon}
                </View>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  scanCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 0,
  },
  scanButton: {
    alignItems: 'center',
    padding: 16,
  },
  qrImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  scanText: {
    fontSize: 16,
    color: colors.primary[500],
    fontFamily: 'Roboto-Medium',
  },
  categoryScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    marginRight: 8,
    backgroundColor: colors.white,
  },
  selectedCategoryItem: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  categoryIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: colors.neutral[800],
    fontFamily: 'Roboto-Medium',
  },
  selectedCategoryText: {
    color: colors.white,
  },
  billsContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: colors.neutral[900],
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    marginVertical: 24,
  },
  billItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  billIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  billInfo: {
    flex: 1,
  },
  billProvider: {
    fontSize: 16,
    color: colors.neutral[900],
    fontFamily: 'Roboto-Medium',
    marginBottom: 2,
  },
  billAccountNumber: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Roboto-Regular',
    marginBottom: 2,
  },
  billStatus: {
    fontSize: 12,
    color: colors.neutral[600],
    fontFamily: 'Roboto-Medium',
  },
  overdueStatus: {
    color: colors.error[500],
  },
  billAmountContainer: {
    alignItems: 'flex-end',
  },
  billAmount: {
    fontSize: 16,
    color: colors.neutral[900],
    fontFamily: 'Roboto-Bold',
    marginBottom: 2,
  },
  billDueDate: {
    fontSize: 12,
    color: colors.neutral[600],
    fontFamily: 'Roboto-Regular',
    marginBottom: 4,
  },
  servicesContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceLabel: {
    fontSize: 14,
    color: colors.neutral[800],
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
});