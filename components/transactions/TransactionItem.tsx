import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { 
  Send, 
  CreditCard, 
  Download, 
  Upload,
  ArrowRight
} from 'lucide-react-native';
import { primary, secondary, success, warning, error, neutral, white } from '@/utils/colors';
import { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
}

export default function TransactionItem({ 
  transaction, 
  onPress 
}: TransactionItemProps) {
  // Determine the icon based on transaction type
  const renderIcon = () => {
    const iconColor = white;
    const iconSize = 16;

    switch (transaction.type) {
      case 'transfer':
        return <Send size={iconSize} color={iconColor} />;
      case 'payment':
        return <CreditCard size={iconSize} color={iconColor} />;
      case 'deposit':
        return <Download size={iconSize} color={iconColor} />;
      case 'withdrawal':
        return <Upload size={iconSize} color={iconColor} />;
      default:
        return <Send size={iconSize} color={iconColor} />;
    }
  };

  // Determine the background color based on transaction type
  const getIconBackgroundColor = () => {
    switch (transaction.type) {
      case 'transfer':
        return primary[500];
      case 'payment':
        return secondary[500];
      case 'deposit':
        return success[500];
      case 'withdrawal':
        return warning[500];
      default:
        return primary[500];
    }
  };

  // Determine if the amount should be shown as positive or negative
  const isOutgoing = transaction.type === 'transfer' || 
                     transaction.type === 'payment' || 
                     transaction.type === 'withdrawal';

  // Get the display name (recipient for outgoing, sender for incoming)
  const getName = () => {
    if (isOutgoing && transaction.recipient) {
      return transaction.recipient.name;
    } else if (!isOutgoing && transaction.sender) {
      return transaction.sender.name;
    }
    return transaction.description || 'Unknown';
  };

  // Get transaction details
  const getDetails = () => {
    if (transaction.description) {
      return transaction.description;
    }
    return transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1);
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress && onPress(transaction)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconBackgroundColor() }]}>
        {renderIcon()}
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {getName()}
        </Text>
        <Text style={styles.details} numberOfLines={1}>
          {getDetails()}
        </Text>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={[
          styles.amount, 
          isOutgoing ? styles.outgoingAmount : styles.incomingAmount
        ]}>
          {isOutgoing ? '-' : '+'}{formatCurrency(transaction.amount)}
        </Text>
        <Text style={styles.date}>{formatDate(transaction.date)}</Text>
      </View>
      
      <ArrowRight size={16} color={neutral[400]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: neutral[200],
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    color: neutral[900],
    fontFamily: 'Roboto-Medium',
    marginBottom: 2,
  },
  details: {
    fontSize: 14,
    color: neutral[600],
    fontFamily: 'Roboto-Regular',
  },
  amountContainer: {
    marginRight: 8,
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    marginBottom: 2,
  },
  outgoingAmount: {
    color: error[500],
  },
  incomingAmount: {
    color: success[500],
  },
  date: {
    fontSize: 12,
    color: neutral[500],
    fontFamily: 'Roboto-Regular',
  },
});