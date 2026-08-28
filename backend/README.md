# Awaaz Desk Backend

Node backend for AI intake summaries, starter call scripts, and email notifications for Awaaz Desk pilot leads.

## Local Setup

```sh
cd backend
cp .env.example .env
npm install
npm run dev
```

Health check:

```sh
curl http://localhost:8787/health
```

## Environment

- `OPENAI_API_KEY`: server-side OpenAI API key.
- `OPENAI_MODEL`: defaults to `gpt-5`.
- `BUSINESS_EMAIL`: sender address, for example `hello@awaazdesk.in`.
- `OWNER_EMAIL`: inbox that receives pilot leads.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`: email provider settings.
- `ALLOWED_ORIGINS`: comma-separated frontend origins allowed to call the API.

## Endpoints

`POST /api/leads`

Creates an AI intake summary and emails the owner.

```json
{
  "name": "Priya",
  "email": "priya@example.com",
  "phone": "+91 90000 00000",
  "city": "Hyderabad",
  "businessType": "Clinic",
  "callVolume": "15 missed calls per week",
  "message": "We miss appointment calls after 7 PM."
}
```

`POST /api/scripts`

Generates a starter receptionist script.

```json
{
  "businessType": "Clinic",
  "scenario": "Book appointment requests after business hours",
  "language": "English with a friendly Indian front-desk tone"
}
```

## Email Address Setup

This code is ready to send from `hello@awaazdesk.in`, but the mailbox itself must be created with a mail provider after owning/configuring the `awaazdesk.in` domain. Good practical options are Google Workspace, Zoho Mail, or Microsoft 365.

After the mailbox exists, create an app password or SMTP credential and add it to `backend/.env`. Do not commit real credentials.
