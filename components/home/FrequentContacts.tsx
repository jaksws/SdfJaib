import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Plus } from 'lucide-react-native';
import colors from '@/utils/colors';
import { Beneficiary } from '@/types';
import { getInitials } from '@/utils/formatters';

interface FrequentContactsProps {
  contacts: Beneficiary[];
  onContactPress: (contact: Beneficiary) => void;
  onAddPress: () => void;
}

export default function FrequentContacts({
  contacts,
  onContactPress,
  onAddPress,
}: FrequentContactsProps) {
  const frequentContacts = contacts.filter((contact) => contact.frequent);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Send Again</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableOpacity style={styles.addContainer} onPress={onAddPress}>
          <View style={styles.addButton}>
            <Plus size={24} color={colors.primary[500]} />
          </View>
          <Text style={styles.contactName}>New</Text>
        </TouchableOpacity>

        {frequentContacts.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            style={styles.contactContainer}
            onPress={() => onContactPress(contact)}
          >
            {contact.image ? (
              <Image source={{ uri: contact.image }} style={styles.contactImage} />
            ) : (
              <View style={styles.contactInitials}>
                <Text style={styles.initialsText}>{getInitials(contact.name)}</Text>
              </View>
            )}
            <Text style={styles.contactName} numberOfLines={1}>
              {contact.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: colors.neutral[900],
    marginBottom: 16,
  },
  scrollContainer: {
    paddingRight: 16,
  },
  addContainer: {
    alignItems: 'center',
    marginRight: 16,
    width: 64,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.primary[500],
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: colors.primary[50],
  },
  contactContainer: {
    alignItems: 'center',
    marginRight: 16,
    width: 64,
  },
  contactImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  contactInitials: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  initialsText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
  contactName: {
    fontSize: 12,
    color: colors.neutral[800],
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
});