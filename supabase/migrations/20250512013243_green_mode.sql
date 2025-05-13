/*
  # Initial Schema Setup for Banking App

  1. New Tables
    - `profiles`
      - Extends auth.users with additional user information
      - Stores user profile data, balance, and settings
    
    - `transactions`
      - Stores all financial transactions
      - Includes transfers, payments, deposits, and withdrawals
    
    - `beneficiaries`
      - Stores recipient information for transfers and payments
      - Includes both users and external bank accounts
    
    - `bills`
      - Stores utility and service bills
      - Tracks payment status and due dates
    
    - `notifications`
      - Stores user notifications
      - Includes transaction alerts, promotions, and system messages

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read their own profile
      - Read/write their own transactions
      - Read/write their own beneficiaries
      - Read/write their own bills
      - Read their own notifications
*/

-- Create custom types
CREATE TYPE transaction_type AS ENUM ('transfer', 'payment', 'deposit', 'withdrawal');
CREATE TYPE transaction_status AS ENUM ('completed', 'pending', 'failed');
CREATE TYPE bill_type AS ENUM ('electricity', 'water', 'internet', 'mobile', 'tv', 'other');
CREATE TYPE bill_status AS ENUM ('paid', 'unpaid', 'overdue');
CREATE TYPE beneficiary_type AS ENUM ('user', 'bank', 'merchant');
CREATE TYPE notification_type AS ENUM ('transaction', 'promotion', 'security', 'system');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone_number text UNIQUE,
  email text UNIQUE,
  profile_image text,
  balance decimal(12,2) DEFAULT 0.00 CHECK (balance >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create beneficiaries table
CREATE TABLE IF NOT EXISTS beneficiaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  type beneficiary_type NOT NULL,
  phone_number text,
  account_number text,
  bank_name text,
  image text,
  frequent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type transaction_type NOT NULL,
  amount decimal(12,2) NOT NULL CHECK (amount > 0),
  fee decimal(12,2) DEFAULT 0.00,
  recipient_id uuid REFERENCES beneficiaries(id),
  description text,
  category text,
  status transaction_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bills table
CREATE TABLE IF NOT EXISTS bills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type bill_type NOT NULL,
  provider text NOT NULL,
  account_number text NOT NULL,
  amount decimal(12,2) NOT NULL CHECK (amount > 0),
  due_date date NOT NULL,
  status bill_status DEFAULT 'unpaid',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  action_link text,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view own beneficiaries"
  ON beneficiaries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own beneficiaries"
  ON beneficiaries FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own bills"
  ON bills FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own bills"
  ON bills FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, phone_number)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', new.email), -- Use email as a fallback for name
    new.email,
    new.phone -- new.phone can be null, profiles.phone_number allows null
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();