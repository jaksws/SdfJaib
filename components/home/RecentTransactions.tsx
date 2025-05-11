import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import colors from '@/utils/colors';
import { Transaction } from '@/types';
import TransactionItem from '../transactions/TransactionItem';
import { useRouter } from 'expo-router';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const router = useRouter();
  // Only show the most recent 3 transactions
  const recentTransactions = transactions.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => router.push('/history')}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <ArrowRight size={16} color={colors.primary[500]} />
        </TouchableOpacity>
      </View>

      {recentTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recent transactions</Text>
        </View>
      ) : (
        <FlatList
          data={recentTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          scrollEnabled={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: colors.neutral[900],
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary[500],
    marginRight: 4,
    fontFamily: 'Roboto-Medium',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Roboto-Regular',
  },
});