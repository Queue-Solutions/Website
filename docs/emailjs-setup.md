# Automatic "download link" email (EmailJS)

When a dentist signs up for the MolarBear trial, the website can email them the installer link
automatically, from the Queue Solutions Gmail. Until this is set up, the page shows a one-tap
"Email the link" button instead.

Free plan: 200 emails per month.

## 1. Create the account and connect Gmail
1. Sign up at https://www.emailjs.com with queuesolutions25@gmail.com.
2. **Email Services → Add New Service → Gmail → Connect Account**, allow access, then **Create Service**.
3. Copy the **Service ID** (looks like `service_xxxxxxx`).

## 2. Create the email template
**Email Templates → Create New Template**, then fill in:

- **Subject:** `Your MolarBear download link | رابط تحميل MolarBear`
- **To Email:** `{{to_email}}`
- **From Name:** `Queue Solutions`
- **Reply To:** `queuesolutions25@gmail.com`
- **Content:**

```
Hello {{to_name}},

Thank you for signing up for the MolarBear {{trial_days}}-day free trial.

Open this link on your clinic's Windows computer (Windows 10 or 11) to download MolarBear:
{{download_link}}

Your free trial starts the first time you open the app.
Need help installing? Reply to this email or message us on WhatsApp: +20 112 743 5060

————————————

أهلًا {{to_name}}،

شكرًا لتسجيلك في التجربة المجانية لبرنامج MolarBear لمدة {{trial_days}} يومًا.

افتح هذا الرابط على كمبيوتر العيادة (ويندوز 10 أو 11) لتحميل البرنامج:
{{download_link}}

تبدأ فترة التجربة من أول مرة تفتح فيها البرنامج.
تحتاج مساعدة في التثبيت؟ رد على هذا البريد أو راسلنا على واتساب: ‎+20 112 743 5060

Queue Solutions
```

Save, and copy the **Template ID** (looks like `template_xxxxxxx`).

## 3. Get the public key and lock it to the website
1. **Account → General**: copy the **Public Key**.
2. **Account → Security**: under allowed origins, add `https://queuesolutions.org` so the key only works from the website.

## 4. Turn it on
Put the three values in `src/lib/trialLink.js`:

```js
export const EMAILJS = {
  serviceId: "service_xxxxxxx",
  templateId: "template_xxxxxxx",
  publicKey: "xxxxxxxxxxxxxxx",
};
```

Then build and push. These are public keys, safe to keep in the website code.
