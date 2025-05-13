/*
  # Insert sample data

  1. Sample Data
    - Create auth.users entries
    - Insert user profiles
    - Add beneficiaries
    - Create transactions
    - Add bills
    - Add notifications

  2. Data Relationships
    - Users are created in auth.users first
    - Profiles reference auth.users
    - All other tables reference profiles
*/

-- Conflicting sample data insertion commented out.
-- This file should primarily contain RLS policies.

-- Insert users into auth.users
-- INSERT INTO auth.users (id, email)
-- VALUES
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'mohammed@example.com'),
--   ('f5b8c480-89d2-4757-863d-85934db119f8', 'ahmed@example.com'),
--   ('a2e9d3b1-7c54-4f6a-9b2e-8d1c6f4e5d3a', 'fatima@example.com');

-- Insert sample profiles
-- INSERT INTO profiles (id, name, phone_number, email, profile_image, balance)
-- VALUES
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'Mohammed Ahmed', '+967777123456', 'mohammed@example.com', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', 125000.00),
--   ('f5b8c480-89d2-4757-863d-85934db119f8', 'Ahmed Ali', '+967777987654', 'ahmed@example.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 75000.00),
--   ('a2e9d3b1-7c54-4f6a-9b2e-8d1c6f4e5d3a', 'Fatima Hassan', '+967777456789', 'fatima@example.com', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', 50000.00);

-- Insert sample beneficiaries
-- INSERT INTO beneficiaries (id, user_id, name, type, phone_number, account_number, bank_name, image, frequent)
-- VALUES
--   ('b1d9e4c2-6f3a-5e2b-9c8d-7a4b3f2e1d0c', 'd7bed83c-882c-4764-a6b0-8fdf36d47917', 'Ahmed Ali', 'user', '+967777987654', NULL, NULL, 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', true),
--   ('c3f8g7h6-4d2e-1a9b-8c7d-6e5f4d3a2b1c', 'd7bed83c-882c-4764-a6b0-8fdf36d47917', 'Fatima Hassan', 'user', '+967777456789', NULL, NULL, 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', true),
--   ('e5d4c3b2-1a9b-8c7d-6e5f-4d3a2b1c9e8d', 'd7bed83c-882c-4764-a6b0-8fdf36d47917', 'Yemen Bank', 'bank', NULL, '1234-5678-9012', 'Yemen Bank', NULL, false),
--   ('g7f6e5d4-3c2b-1a9b-8c7d-6e5f4d3a2b1c', 'd7bed83c-882c-4764-a6b0-8fdf36d47917', 'Ali Grocery', 'merchant', '+967777111222', NULL, NULL, 'https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg', true);

-- Insert sample transactions
-- INSERT INTO transactions (user_id, type, amount, recipient_id, description, status, created_at)
-- VALUES
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'transfer', 5000.00, 'b1d9e4c2-6f3a-5e2b-9c8d-7a4b3f2e1d0c', 'Loan repayment', 'completed', '2025-02-15 09:24:00+00'),
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'payment', 2500.00, 'g7f6e5d4-3c2b-1a9b-8c7d-6e5f4d3a2b1c', 'Mobile recharge', 'completed', '2025-02-13 15:30:00+00'),
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'deposit', 50000.00, 'e5d4c3b2-1a9b-8c7d-6e5f-4d3a2b1c9e8d', 'Salary deposit', 'completed', '2025-02-10 11:15:00+00');

-- Insert sample bills
-- INSERT INTO bills (user_id, type, provider, account_number, amount, due_date, status)
-- VALUES
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'electricity', 'Public Electricity Corp', '12345-6789', 7500.00, '2025-02-25', 'unpaid'),
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'water', 'National Water Company', '87654-3210', 3500.00, '2025-02-20', 'unpaid'),
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'internet', 'Yemen Net', '56789-1234', 5000.00, '2025-02-15', 'overdue'),
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'mobile', 'Yemen Mobile', '+967777123456', 2000.00, '2025-03-01', 'unpaid');

-- Insert sample notifications
-- INSERT INTO notifications (user_id, type, title, message, action_link, read, created_at)
-- VALUES
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'transaction', 'Transfer Successful', 'You have successfully transferred 5,000 YER to Ahmed Ali', NULL, false, '2025-02-15 09:25:00+00'),
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'promotion', 'Special Offer', 'Get 50% off on transfer fees for international transfers this week!', 'transfer', true, '2025-02-14 10:00:00+00'),
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'security', 'Security Alert', 'Your account was accessed from a new device. Please verify this was you.', 'profile', false, '2025-02-12 15:30:00+00'),
--   ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'system', 'System Maintenance', 'Jaib will be under maintenance on Feb 20 from 12 AM to 2 AM.', NULL, true, '2025-02-10 09:00:00+00');

-- Add RLS policies below if they are not already in this file or another migration file.