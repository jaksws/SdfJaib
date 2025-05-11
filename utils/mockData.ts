import { User, Transaction, Bill, Beneficiary, Notification } from '../types';

// Mock current user
export const currentUser: User = {
  id: 'user1',
  name: 'Mohammed Ahmed',
  phoneNumber: '+967 777 123 456',
  email: 'mohammed@example.com',
  profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  balance: 125000
};

// Mock transactions
export const transactions: Transaction[] = [
  {
    id: 't1',
    type: 'transfer',
    amount: 5000,
    date: '2025-02-15T09:24:00',
    status: 'completed',
    recipient: {
      id: 'user2',
      name: 'Ahmed Ali',
      phoneNumber: '+967 777 987 654',
    },
    description: 'Loan repayment',
  },
  {
    id: 't2',
    type: 'payment',
    amount: 2500,
    date: '2025-02-13T15:30:00',
    status: 'completed',
    recipient: {
      id: 'merchant1',
      name: 'Yemen Mobile',
      accountNumber: '12345678',
    },
    description: 'Mobile recharge',
    category: 'utilities',
  },
  {
    id: 't3',
    type: 'deposit',
    amount: 50000,
    date: '2025-02-10T11:15:00',
    status: 'completed',
    sender: {
      id: 'bank1',
      name: 'Yemen Bank',
    },
    description: 'Salary deposit',
  },
  {
    id: 't4',
    type: 'payment',
    amount: 7500,
    date: '2025-02-08T17:45:00',
    status: 'completed',
    recipient: {
      id: 'merchant2',
      name: 'Public Electricity Corp',
      accountNumber: '87654321',
    },
    description: 'Electricity bill',
    category: 'utilities',
  },
  {
    id: 't5',
    type: 'transfer',
    amount: 15000,
    date: '2025-02-05T08:20:00',
    status: 'completed',
    recipient: {
      id: 'user3',
      name: 'Fatima Hassan',
      phoneNumber: '+967 777 456 789',
    },
    description: 'Monthly allowance',
  }
];

// Mock bills
export const bills: Bill[] = [
  {
    id: 'b1',
    type: 'electricity',
    provider: 'Public Electricity Corp',
    accountNumber: '12345-6789',
    amount: 7500,
    dueDate: '2025-02-25',
    status: 'unpaid',
  },
  {
    id: 'b2',
    type: 'water',
    provider: 'National Water Company',
    accountNumber: '87654-3210',
    amount: 3500,
    dueDate: '2025-02-20',
    status: 'unpaid',
  },
  {
    id: 'b3',
    type: 'internet',
    provider: 'Yemen Net',
    accountNumber: '56789-1234',
    amount: 5000,
    dueDate: '2025-02-15',
    status: 'overdue',
  },
  {
    id: 'b4',
    type: 'mobile',
    provider: 'Yemen Mobile',
    accountNumber: '+967 777 123 456',
    amount: 2000,
    dueDate: '2025-03-01',
    status: 'unpaid',
  }
];

// Mock beneficiaries
export const beneficiaries: Beneficiary[] = [
  {
    id: 'ben1',
    name: 'Ahmed Ali',
    type: 'user',
    phoneNumber: '+967 777 987 654',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    frequent: true,
  },
  {
    id: 'ben2',
    name: 'Fatima Hassan',
    type: 'user',
    phoneNumber: '+967 777 456 789',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    frequent: true,
  },
  {
    id: 'ben3',
    name: 'Yemen Bank',
    type: 'bank',
    accountNumber: '1234-5678-9012',
    bankName: 'Yemen Bank',
    frequent: false,
  },
  {
    id: 'ben4',
    name: 'Ali Grocery',
    type: 'merchant',
    phoneNumber: '+967 777 111 222',
    image: 'https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    frequent: true,
  }
];

// Mock notifications
export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'transaction',
    title: 'Transfer Successful',
    message: 'You have successfully transferred 5,000 YER to Ahmed Ali',
    date: '2025-02-15T09:25:00',
    read: false,
  },
  {
    id: 'n2',
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 50% off on transfer fees for international transfers this week!',
    date: '2025-02-14T10:00:00',
    read: true,
    actionLink: 'transfer',
  },
  {
    id: 'n3',
    type: 'security',
    title: 'Security Alert',
    message: 'Your account was accessed from a new device. Please verify this was you.',
    date: '2025-02-12T15:30:00',
    read: false,
    actionLink: 'profile',
  },
  {
    id: 'n4',
    type: 'system',
    title: 'System Maintenance',
    message: 'Jaib will be under maintenance on Feb 20 from 12 AM to 2 AM.',
    date: '2025-02-10T09:00:00',
    read: true,
  }
];