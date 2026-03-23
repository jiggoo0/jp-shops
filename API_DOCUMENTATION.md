# JP Visual Docs API Documentation (v1)

## 1. Overview

The JP Visual Docs API provides endpoints for payment processing, document verification, and automated partner support via LINE Messaging. It follows RESTful principles and primarily uses JSON for request and response payloads.

- **Base URL**: `https://www.jpvisouldocs.shop/api`
- **Current Version**: v1.0.0
- **Format**: JSON
- **Auth**: Supabase Auth (SSR) & LINE Signature

---

## 2. Authentication

### Partner/User Authentication

Most endpoints require a valid Supabase session cookie. The API uses Next.js 15 cookies to identify the user.

- **Method**: Cookie-based session
- **Requirement**: User must be logged in via `/login`

### LINE Webhook Authentication

The LINE webhook endpoint requires a signature verification to ensure requests originate from LINE servers.

- **Header**: `x-line-signature`
- **Method**: HMAC-SHA256 using `LINE_CHANNEL_SECRET`

---

## 3. Endpoints

### 3.1 Get My Profile

**Method**: `GET`  
**Path**: `/api/v1/partners/me`  
**Description**: Returns the profile details of the currently authenticated user.

**Authentication Required**: Yes (Supabase Cookie)

**Response**:

- **Status Code**: 200 OK

```json
{
  "status": "success",
  "data": {
    "id": "uuid-here",
    "attributes": {
      "full_name": "Alongkorn Yomkerd",
      "phone_number": "0812345678",
      "subscription_status": "active",
      "subscription_end_date": "2026-04-23T00:00:00Z"
    }
  },
  "meta": {
    "timestamp": "2026-03-23T15:00:00Z"
  }
}
```

---

### 3.2 Create Checkout Session

**Method**: `POST`  
**Path**: `/api/checkout`  
**Description**: Creates a Stripe Checkout session for service or subscription payments.

**Authentication Required**: No (but recommended for production tracking)

**Request Body**:
| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| serviceName | string | Yes | Name of service | "Subscription: 30 Days" |
| amount | number | Yes | Price in THB | 2500 |
| returnUrl | string | Yes | Base URL for redirection | "https://jpvisouldocs.shop" |
| planId | string | No | Internal plan ID | "30_days" |

**Response**:

- **Status Code**: 200 OK

```json
{
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

---

### 3.3 LINE Webhook

**Method**: `POST`  
**Path**: `/api/line/webhook`  
**Description**: Handles incoming messages and events from LINE Official Account.

**Authentication Required**: Yes (LINE Signature)

**Event Types Supported**:

- `message` (text)

**Example Logic**:

- Keywords like "ที่ปรึกษาสินเชื่อ" trigger automated loan advisory responses.
- Keywords like "Vifily QR" trigger digital trust info.

**Response**:

- **Status Code**: 200 OK

```json
{ "status": "success" }
```

---

## 4. Data Models

### Profile

```typescript
interface Profile {
  id: string; // UUID
  email: string;
  full_name: string | null;
  phone_number: string | null;
  role: "partner" | "admin";
  subscription_status: "none" | "active" | "expired";
  subscription_end_date: Date | null;
}
```

### Document

```typescript
interface Document {
  id: string; // UUID
  partner_id: string; // Owner
  owner_name: string;
  document_type: string;
  issued_date: string;
  expiry_date: string;
  status: string;
  issuer: string;
}
```

---

## 5. Error Handling

The API returns errors in the following format:

```json
{
  "status": "error",
  "message": "Error description here"
}
```

**Common Codes**:

- `401`: Unauthorized (Login required)
- `404`: Resource not found
- `500`: Internal Server Error (Database or Config issue)

---

## 6. Changelog

- **v1.0.0 (2026-03-23)**: Initial release with Stripe Integration, LINE Webhook, and Partner Profile API.
