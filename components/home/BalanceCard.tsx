import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Eye, EyeOff, Plus, ArrowRight } from 'lucide-react-native';
import Card from '../common/Card';
import { primary, neutral } from '@/utils/colors';
import { formatCurrency } from '@/utils/formatters';

interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  const [showBalance, setShowBalance] = React.useState(true);

  return (
    <Card style={styles.container} variant="elevated">
      <View style={styles.header}>
        <Text style={styles.title}>Available Balance</Text>
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={() => setShowBalance(!showBalance)}
        >
          {showBalance ? (
            <Eye size={20} color={neutral[600]} />
          ) : (
            <EyeOff size={20} color={neutral[600]} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceAmount}>
          {showBalance ? formatCurrency(balance) : '• • • • • •'}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Plus size={20} color={primary[500]} />
          </View>
          <Text style={styles.actionText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <ArrowRight size={20} color={primary[500]} />
          </View>
          <Text style={styles.actionText}>Send Money</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: neutral[600],
    fontFamily: 'Roboto-Medium',
  },
  eyeButton: {
    padding: 4,
  },
  balanceContainer: {
    marginBottom: 16,
  },
  balanceAmount: {
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    color: neutral[900],
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  actionButton: {
    alignItems: 'center',
    padding: 8,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: neutral[800],
    fontFamily: 'Roboto-Medium',
  },
});