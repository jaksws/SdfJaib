/*
  # Sample Data Migration

  This migration adds sample data to the database for testing purposes.
  It uses conditional inserts to avoid duplicate key violations.

  1. Users and Profiles
    - Creates test users in auth.users if they don't exist
    - Creates corresponding profiles with sample data
  
  2. Sample Data
    - Beneficiaries for money transfers
    - Transaction history
    - Bills and payments
    - System notifications
*/

-- Insert users into auth.users if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = 'd7bed83c-882c-4764-a6b0-8fdf36d47917') THEN
    INSERT INTO auth.users (id, email)
    VALUES
      ('d7bed83c-882c-4764-a6b0-8fdf36d47917', 'mohammed@example.com'),
      ('f5b8c480-89d2-4757-863d-85934db119f8', 'ahmed@example.com'),
      ('a2e9d3b1-7c54-4f6a-9b2e-8d1c6f4e5d3a', 'fatima@example.com');
  END IF;
END $$;

-- Insert sample profiles
INSERT INTO profiles (id, name, phone_number, email, profile_image, balance)
VALUES
  ('545ffe5b-6470-4635-848c-1acd10883707', 'Mohammed Ahmed', '+96777' || LPAD((FLOOR(RANDOM() * 10000000))::TEXT, 7, '0'), 'mohammed@jaksws.com', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', 125000.00);

-- Insert sample beneficiaries
INSERT INTO beneficiaries (id, user_id, name, type, phone_number, account_number, bank_name, image, frequent)
VALUES
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'Ahmed Ali', 'user', '+96777' || LPAD((FLOOR(RANDOM() * 10000000))::TEXT, 7, '0'), NULL, NULL, 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', true),
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'Fatima Hassan', 'user', '+96777' || LPAD((FLOOR(RANDOM() * 10000000))::TEXT, 7, '0'), NULL, NULL, 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', true),
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'Yemen Bank', 'bank', NULL, '1234-5678-9012', 'Yemen Bank', NULL, false),
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'Ali Grocery', 'merchant', '+96777' || LPAD((FLOOR(RANDOM() * 10000000))::TEXT, 7, '0'), NULL, NULL, 'https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg', true);

-- Insert sample transactions
INSERT INTO transactions (id, user_id, type, amount, recipient_id, description, status, created_at)
VALUES
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'transfer', 5000.00, (SELECT id FROM beneficiaries WHERE name = 'Ahmed Ali' AND user_id = (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com')), 'Loan repayment', 'completed', '2025-02-15 09:24:00+00'),
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'payment', 2500.00, (SELECT id FROM beneficiaries WHERE name = 'Ali Grocery' AND user_id = (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com')), 'Mobile recharge', 'completed', '2025-02-13 15:30:00+00'),
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'deposit', 50000.00, (SELECT id FROM beneficiaries WHERE name = 'Yemen Bank' AND user_id = (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com')), 'Salary deposit', 'completed', '2025-02-10 11:15:00+00');

-- Insert sample bills
INSERT INTO bills (id, user_id, type, provider, account_number, amount, due_date, status)
VALUES
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'electricity', 'Public Electricity Corp', '12345-6789', 7500.00, '2025-02-25', 'unpaid'),
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'water', 'National Water Company', '87654-3210', 3500.00, '2025-02-20', 'unpaid'),
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'internet', 'Yemen Net', '56789-1234', 5000.00, '2025-02-15', 'overdue'),
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'mobile', 'Yemen Mobile', (SELECT phone_number FROM profiles WHERE email = 'mohammed@jaksws.com'), 2000.00, '2025-03-01', 'unpaid');

-- Insert sample notifications
INSERT INTO notifications (id, user_id, type, title, message, action_link, read, created_at)
VALUES
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'transaction', 'Transfer Successful', 'You have successfully transferred 5,000 YER to Ahmed Ali', NULL, false, '2025-02-15 09:25:00+00'),
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'promotion', 'Special Offer', 'Get 50% off on transfer fees for international transfers this week!', 'transfer', true, '2025-02-14 10:00:00+00'),
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'security', 'Security Alert', 'Your account was accessed from a new device. Please verify this was you.', 'profile', false, '2025-02-12 15:30:00+00'),
  (gen_random_uuid(), (SELECT id FROM profiles WHERE email = 'mohammed@jaksws.com'), 'system', 'System Maintenance', 'Jaib will be under maintenance on Feb 20 from 12 AM to 2 AM.', NULL, true, '2025-02-10 09:00:00+00');