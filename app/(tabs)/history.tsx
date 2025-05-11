import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { Calendar, ArrowDown, ArrowUp, Filter } from 'lucide-react-native';
import Header from '@/components/common/Header';
import colors from '@/utils/colors';
import { transactions } from '@/utils/mockData';
import TransactionItem from '@/components/transactions/TransactionItem';
import { Transaction } from '@/types';

export default function HistoryScreen() {
  const [filter, setFilter] = useState<string | null>(null);
  
  // Apply filters to transactions
  const filteredTransactions = filter
    ? transactions.filter(transaction => transaction.type === filter)
    : transactions;

  const handleTransactionPress = (transaction: Transaction) => {
    // Navigate to transaction details
    // For demo purposes, we'll just simulate this
    alert(`Transaction details for: ${transaction.id}`);
  };

  // Render filters
  const renderFilters = () => (
    <View style={styles.filterContainer}>
      <TouchableOpacity 
        style={[styles.filterButton, filter === null && styles.activeFilterButton]}
        onPress={() => setFilter(null)}
      >
        <Text style={[styles.filterText, filter === null && styles.activeFilterText]}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.filterButton, filter === 'transfer' && styles.activeFilterButton]}
        onPress={() => setFilter('transfer')}
      >
        <ArrowUp size={16} color={filter === 'transfer' ? colors.white : colors.neutral[600]} />
        <Text style={[styles.filterText, filter === 'transfer' && styles.activeFilterText]}>Sent</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.filterButton, filter === 'deposit' && styles.activeFilterButton]}
        onPress={() => setFilter('deposit')}
      >
        <ArrowDown size={16} color={filter === 'deposit' ? colors.white : colors.neutral[600]} />
        <Text style={[styles.filterText, filter === 'deposit' && styles.activeFilterText]}>Received</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.filterButton, filter === 'payment' && styles.activeFilterButton]}
        onPress={() => setFilter('payment')}
      >
        <Filter size={16} color={filter === 'payment' ? colors.white : colors.neutral[600]} />
        <Text style={[styles.filterText, filter === 'payment' && styles.activeFilterText]}>Bills</Text>
      </TouchableOpacity>
    </View>
  );

  // Render date header
  const renderDateHeader = () => (
    <TouchableOpacity style={styles.dateHeaderContainer}>
      <Calendar size={20} color={colors.neutral[600]} />
      <Text style={styles.dateHeaderText}>February 2025</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Transaction History" showNotification />
      
      {renderFilters()}
      {renderDateHeader()}
      
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem 
            transaction={item}
            onPress={handleTransactionPress}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: colors.neutral[100],
  },
  activeFilterButton: {
    backgroundColor: colors.primary[500],
  },
  filterText: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Roboto-Medium',
    marginLeft: 4,
  },
  activeFilterText: {
    color: colors.white,
  },
  dateHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  dateHeaderText: {
    fontSize: 16,
    color: colors.neutral[800],
    fontFamily: 'Roboto-Medium',
    marginLeft: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyText: {
    fontSize: 16,
    color: colors.neutral[600],
    fontFamily: 'Roboto-Regular',
  },
});