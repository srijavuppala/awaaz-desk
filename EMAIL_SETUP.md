# Awaaz Desk Email Setup

Target public inbox:

```text
hello@awaazdesk.in
```

Forward important lead notifications to:

```text
founder@awaazdesk.in
```

## Create the Mailbox

Choose a domain email provider:

- Google Workspace
- Zoho Mail
- Microsoft 365

Create these addresses:

- `hello@awaazdesk.in` for public customer contact.
- `founder@awaazdesk.in` for owner notifications.

## Configure DNS

In the DNS settings for `awaazdesk.in`, add the provider's required records:

- MX records for receiving mail.
- SPF TXT record for sender authorization.
- DKIM TXT/CNAME records for signed email.
- DMARC TXT record for domain protection.

Use the exact values from the email provider. DNS values differ by provider.

## Connect Backend SMTP

After the mailbox exists, create an app password or SMTP credential and add these values to the backend deployment environment:

```sh
BUSINESS_EMAIL=hello@awaazdesk.in
OWNER_EMAIL=founder@awaazdesk.in
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=hello@awaazdesk.in
SMTP_PASS=
```

Do not commit real passwords or API keys.
