// Format currency in Yemeni Rial
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} YER`;
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Format time for display
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format date and time for display
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return `${formatDate(dateString)} ${formatTime(dateString)}`;
};

// Format phone number for display
export const formatPhoneNumber = (phoneNumber: string): string => {
  // This is a simple formatter that assumes Yemeni phone numbers
  // For a production app, use a more sophisticated library
  return phoneNumber;
};

// Get transaction icon name based on type
export const getTransactionIconName = (type: string): string => {
  switch (type) {
    case 'transfer':
      return 'send';
    case 'payment':
      return 'credit-card';
    case 'deposit':
      return 'download';
    case 'withdrawal':
      return 'upload';
    default:
      return 'activity';
  }
};

// Get abbreviated name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Get bill icon name based on type
export const getBillIconName = (type: string): string => {
  switch (type) {
    case 'electricity':
      return 'zap';
    case 'water':
      return 'droplet';
    case 'internet':
      return 'wifi';
    case 'mobile':
      return 'phone';
    case 'tv':
      return 'tv';
    default:
      return 'file-text';
  }
};