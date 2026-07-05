# Implementation Plan

## Goal

Route the contact form through a Next.js API route instead of posting directly from the browser to the n8n webhook.

## Tasks

1. Find the existing `QuoteFormSection` component.
2. Keep all existing fields, validation, UI, and success/error behavior unchanged.
3. Replace the direct client-side webhook `fetch(...)` with a POST request to `/api/contact`.
4. Create a new file at `app/api/contact/route.ts`.
5. In that API route, accept the incoming JSON body from the form.
6. Forward that payload to the existing n8n webhook URL with a POST request.
7. Return JSON success and error responses from the API route.
8. Output the full updated component file.
9. Output the full new `app/api/contact/route.ts` file.
10. State exactly which existing file to replace and where to create the new file.
