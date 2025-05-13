import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjxiadaqhbotrknoiezm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqeGlhZGFxaGJvdHJrbm9pZXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNjM3OTEsImV4cCI6MjA2MjczOTc5MX0.xyBXMxd66jbfi7Qlx1hhpKF-0KXa7EwaxMtlgJN11bQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});