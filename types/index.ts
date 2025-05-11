export type User = {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  profileImage?: string;
  balance: number;
};

export type Transaction = {
  id: string;
  type: 'transfer' | 'payment' | 'deposit' | 'withdrawal';
  amount: number;
  fee?: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  recipient?: {
    id: string;
    name: string;
    phoneNumber?: string;
    accountNumber?: string;
  };
  sender?: {
    id: string;
    name: string;
    phoneNumber?: string;
  };
  description?: string;
  category?: string;
};

export type BillType = 'electricity' | 'water' | 'internet' | 'mobile' | 'tv' | 'other';

export type Bill = {
  id: string;
  type: BillType;
  provider: string;
  accountNumber: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
};

export type BeneficiaryType = 'user' | 'bank' | 'merchant';

export type Beneficiary = {
  id: string;
  name: string;
  type: BeneficiaryType;
  phoneNumber?: string;
  accountNumber?: string;
  bankName?: string;
  image?: string;
  frequent: boolean;
};

export type NotificationType = 'transaction' | 'promotion' | 'security' | 'system';

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionLink?: string;
};