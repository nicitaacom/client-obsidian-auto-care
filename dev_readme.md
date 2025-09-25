### Checklist (Don't remove in order to have structure when copy-past)

1. Update project created for "business name"
2. Update robots.ts and sitemap.ts (if needed)
3. Update opengraph-image (create using photopea - save .psd as well)
4. Update package.json
5. Update logo
6. Update favicon
7. Update `css` and `UI` using AI according to design that client wants
8. Update businessInfo and consts
9. Update `contactUsAction` (with html) and `bookAppointmentFn` and `cancelAppointmentFn` - receive notification SMS or Email or both?
10. Update .env.local

### Execute this SQL and execute edge functions and update code (if it's SMS or email only)

```sql
-- 🔥 Allow running arbitrary SQL (careful with SECURITY DEFINER!)
CREATE OR REPLACE FUNCTION execute_any_sql(query TEXT) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN EXECUTE query; END $$;

-- ✅ Grant execution to authenticated users if not exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_roles
    WHERE rolname = 'authenticated'
    AND has_function_privilege('execute_any_sql(TEXT)', 'EXECUTE')
  ) THEN GRANT EXECUTE ON FUNCTION execute_any_sql(TEXT) TO authenticated;
  END IF;
END $$;

-- 🚀 Schema permissions & future-proofing
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.role_table_grants
    WHERE grantee = 'authenticated' AND table_schema = 'public'
    AND privilege_type = 'USAGE'
  ) THEN
    GRANT USAGE, CREATE ON SCHEMA public TO authenticated;
    GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
    GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
  END IF;
END $$;


```

---

This project created for "obsidian auto car" business
Agreement: teseimonial

This project specific TODO:
Test how appointment booking system work
TODO - implement sunday closed for example
TODO - send an email as well as SMS

Prompt

```

UI looks minimalistic in black&purple

tailwind.config.ts

```

Note: widgets it's something that you can copy paste and then adjust

### Supabase edge function `clever-handler`

```ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"
import { Resend } from "npm:resend"

console.info("email reminder started")

Deno.serve(async req => {
  // 1. Initialize Supabase client with service role
  const supabaseUrl = Deno.env.get("SUPABASE_URL")
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  if (!supabaseUrl || !supabaseKey) return new Response("Missing Supabase credentials", { status: 500 })
  const supabase = createClient(supabaseUrl, supabaseKey)

  // 2. Get Resend credentials
  const resendSecret = Deno.env.get("RESEND_SECRET")
  if (!resendSecret) return new Response("Missing Resend credentials", { status: 500 })

  const resend = new Resend(resendSecret)

  // 3. Find notifications
  const now = new Date()
  const inThirtyMinutes = new Date(now.getTime() + 30 * 60 * 1000)

  const { data, error } = await supabase
    .from("email_notifications")
    .select("id, email, message")
    .lte("scheduled_for", inThirtyMinutes.toISOString())
    .gte("scheduled_for", now.toISOString())

  if (error) {
    console.error("Supabase query error:", error)
    return new Response("Failed to fetch notifications", { status: 500 })
  }

  if (!data?.length) {
    return new Response(JSON.stringify({ message: "No notifications to send" }), {
      headers: { "Content-Type": "application/json" },
    })
  }

  // 4. Send Emails
  const results = await Promise.all(
    data.map(async ({ id, email, message }) => {
      try {
        await resend.emails.send({
          from: "reminder@yourdomain.com", // must be a verified sender
          to: email,
          subject: "Appointment Reminder",
          text: message,
        })

        await supabase.from("email_notifications").delete().eq("id", id)
        return { id, status: "Email sent successfully" }
      } catch (err) {
        console.error(`Resend error for notification ${id}:`, err)
        return { id, status: "Failed to send Email" }
      }
    }),
  )

  return new Response(JSON.stringify({ notifications: results }), {
    headers: { "Content-Type": "application/json" },
  })
})
```

sms-reminder

```ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"
import { Twilio } from "npm:twilio"

console.info("sms reminder started")

Deno.serve(async req => {
  // 1. Initialize Supabase client with service role
  const supabaseUrl = Deno.env.get("SUPABASE_URL")
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  if (!supabaseUrl || !supabaseKey) return new Response("Missing Supabase credentials", { status: 500 })
  const supabase = createClient(supabaseUrl, supabaseKey)

  // 2. Get Twilio credentials
  const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID")
  const authToken = Deno.env.get("TWILIO_ACCOUNT_TOKEN")
  const fromPhone = Deno.env.get("TWILIO_PHONE_NUMBER")
  if (!accountSid || !authToken || !fromPhone) return new Response("Missing Twilio credentials", { status: 500 })

  const twilioClient = new Twilio(accountSid, authToken)

  // 3. Find notifications
  const now = new Date()
  const inThirtyMinutes = new Date(now.getTime() + 30 * 60 * 1000)

  const { data, error } = await supabase
    .from("sms_notifications")
    .select("id, phone, message")
    .lte("scheduled_for", inThirtyMinutes.toISOString())
    .gte("scheduled_for", now.toISOString())

  if (error) {
    console.error("Supabase query error:", error)
    return new Response("Failed to fetch notifications", { status: 500 })
  }

  if (!data?.length) {
    return new Response(JSON.stringify({ message: "No notifications to send" }), {
      headers: { "Content-Type": "application/json" },
    })
  }

  // 4. Send SMS
  const results = await Promise.all(
    data.map(async ({ id, phone, message }) => {
      try {
        await twilioClient.messages.create({ body: message, from: fromPhone, to: phone })
        await supabase.from("sms_notifications").delete().eq("id", id)
        return { id, status: "SMS sent successfully" }
      } catch (err) {
        console.error(`Twilio error for notification ${id}:`, err)
        return { id, status: "Failed to send SMS" }
      }
    }),
  )

  return new Response(JSON.stringify({ notifications: results }), {
    headers: { "Content-Type": "application/json" },
  })
})
```

SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

TWILIO_ACCOUNT_SID
TWILIO_ACCOUNT_TOKEN
TWILIO_PHONE_NUMBER
