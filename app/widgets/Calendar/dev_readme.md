You might need:

- update notification server action `sendEmailAction` according to client needs

Supabase SQL:

```sql
-- Create a function to execute arbitrary SQL (restricted to authorized roles)
CREATE OR REPLACE FUNCTION execute_any_sql(query TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to the service_role (used by server-side actions)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_roles
    WHERE rolname = 'service_role'
    AND has_function_privilege('execute_any_sql(TEXT)', 'EXECUTE')
  ) THEN
    GRANT EXECUTE ON FUNCTION execute_any_sql(TEXT) TO service_role;
  END IF;
END $$;

-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant usage on cron schema to service_role
GRANT USAGE ON SCHEMA cron TO service_role;


CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  timezone VARCHAR(50) NOT NULL,
  first_name VARCHAR(32) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(64) NULL,
  channel VARCHAR(50) NOT NULL,
  note TEXT,
  notification_to VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 🔐 RLS Policies for Users
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

 -- Don't allow to select because it should be on server only because in that way hacker can access public supabase keys
 -- and select all then .delete .eq some selected id
CREATE POLICY "Allow insert for everyone" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update for everyone" ON appointments FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow delete for everyone" ON appointments FOR DELETE USING (true);






CREATE TABLE sms_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  phone text NOT NULL,
  appointment_id uuid NOT NULL,
  message text NOT NULL,
  scheduled_for timestamp with time zone NOT NULL
);


-- 🔐 RLS Policies for Users
ALTER TABLE sms_notifications ENABLE ROW LEVEL SECURITY;
 -- Don't allow to select because it should be on server only because in that way hacker can access public supabase keys
 -- and select all then .delete .eq some selected id
CREATE POLICY "Allow insert for everyone" ON sms_notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update for everyone" ON sms_notifications FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow delete for everyone" ON sms_notifications FOR DELETE USING (true);
```
