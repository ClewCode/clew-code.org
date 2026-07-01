# Clew API Docs

AI provider gateway — route requests through `api.clew-code.org` with usage tracking, API key authentication, and rate limiting.

*   **Base URL:** `https://api.clew-code.org`

---

## Introduction

Clew API provides unified access to multiple AI providers (DeepSeek, OpenAI, Groq, Mistral, etc.) through a single OpenAI-compatible endpoint. It handles authentication, rate limiting, usage tracking, and billing.

### Quick Start

```bash
# 1. Create account
curl -X POST https://api.clew-code.org/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"yourpassword"}'

# 2. Login to get token
TOKEN=$(curl -s -X POST https://api.clew-code.org/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"yourpassword"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

# 3. Call DeepSeek
curl -X POST https://api.clew-code.org/v1/chat/completions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4-pro","messages":[{"role":"user","content":"Hello!"}]}'
```

---

## Authentication

Two authentication methods are supported:

| Method | Header | Use Case |
| :--- | :--- | :--- |
| Bearer Token | `Authorization: Bearer <token>` | Dashboard & personal use (from login) |
| API Key | `X-API-Key: <key>` | Programmatic access (created in dashboard) |

### Sign Up
*   **Method:** `POST`
*   **Path:** `/v1/auth/signup`
*   **Description:** Create a new account (password must be 8+ characters).

### Login
*   **Method:** `POST`
*   **Path:** `/v1/auth/login`
*   **Description:** Login with email + password, returns session token.

### Get Profile
*   **Method:** `GET`
*   **Path:** `/v1/auth/me`
*   **Description:** Get current user profile and usage stats.
*   **Auth:** Requires Bearer token.

### Password Reset
*   **Method:** `POST`
*   **Path:** `/v1/auth/forgot` — Request password reset link.
*   **Path:** `/v1/auth/reset` — Reset password with token.

---

## Models

*   **Method:** `GET`
*   **Path:** `/v1/models`
*   **Description:** List all available AI models with pricing.

### Supported Models

| Model | Provider | Context | Pricing |
| :--- | :--- | :--- | :--- |
| `deepseek-v4-pro` | DeepSeek | 1M | $1.50 / $4.00 per 1M |
| `deepseek-v4` | DeepSeek | 1M | $0.50 / $1.50 per 1M |
| `gpt-5.5` | OpenAI | 1M | $10.00 / $40.00 per 1M |
| `groq/llama4` | Groq | 100K | $0.50 / $1.00 per 1M |
| `mistral/large` | Mistral | 128K | $2.00 / $6.00 per 1M |

---

## Chat Completions

*   **Method:** `POST`
*   **Path:** `/v1/chat/completions`
*   **Description:** Send a chat completion request to any supported model (OpenAI-compatible).
*   **Auth:** Requires Bearer token or API key.

### Request Body Fields

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `model` | string | **Yes** | Model ID from `/v1/models` |
| `messages` | array | **Yes** | Array of `{ role, content }` objects |
| `stream` | boolean | No | Enable Server-Sent Events (SSE) streaming |
| `max_tokens` | number | No | Maximum tokens in response |

### Response Headers
*   `X-RateLimit-Limit` — Max requests per minute.
*   `X-RateLimit-Remaining` — Requests remaining in current window.
*   `X-Cost-USD` — Cost of the request in USD.
*   `X-Tier` — Your account tier (`free`, `pro`, `enterprise`).
*   `X-Key-Source` — `pool` (our key) or `byok` (your key).

### Examples

#### Non-Streaming
```bash
curl -X POST https://api.clew-code.org/v1/chat/completions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4-pro","messages":[{"role":"user","content":"Hello!"}]}'
```

#### Streaming
```bash
curl -X POST https://api.clew-code.org/v1/chat/completions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4-pro","messages":[{"role":"user","content":"Hello!"}],"stream":true}'
```

#### Free Auto-Routing
Use `clew/free` to automatically route to the best available free model. Falls back if rate limited.
```bash
curl -X POST https://api.clew-code.org/v1/chat/completions \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"model":"clew/free","messages":[{"role":"user","content":"Hello!"}]}'
```

#### OCR — Extract Text from Images
Use `clew/ocr` to extract text from images. Supports Thai and English. Auto-routes through DeepSeek OCR, NVIDIA VL, or Groq Vision.
```bash
curl -X POST https://api.clew-code.org/v1/chat/completions \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"model":"clew/ocr","messages":[{"role":"user","content":[{"type":"image_url","image_url":{"url":"https://example.com/document.jpg"}}]}]}'
```

---

## Image Generation

*   **Method:** `POST`
*   **Path:** `/v1/images/generations`
*   **Description:** Generate images from text prompts.
*   **Auth:** Requires auth.
*   **Supported models:** `minimax-image-01`, `dall-e-3`

```bash
curl -X POST https://api.clew-code.org/v1/images/generations \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"model":"minimax-image-01","prompt":"a cute cat"}'
```

---

## Video Generation

*   **Method:** `POST`
*   **Path:** `/v1/video/generations`
*   **Description:** Generate videos from text prompts.
*   **Auth:** Requires auth.
*   **Supported models:** `minimax-hailuo-2.3`

```bash
curl -X POST https://api.clew-code.org/v1/video/generations \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"model":"minimax-hailuo-2.3","prompt":"a cat walking in the park"}'
```

---

## API Keys

*   **GET** `/v1/keys` — List your API keys.
*   **POST** `/v1/keys` — Create a new API key.
*   **DELETE** `/v1/keys/:id` — Revoke an API key.

---

## Usage Tracking

*   **GET** `/v1/usage` — Get usage summary and breakdown by provider.
*   **GET** `/v1/usage/daily?days=30` — Get daily usage chart data.

---

## Billing & Tiers

*   **POST** `/v1/billing/checkout` — Upgrade/downgrade tier or get Stripe checkout URL.
*   **GET** `/v1/billing/invoices` — Get monthly invoice history derived from usage logs.

### Subscription Pricing Tiers

| Tier | Price | Rate Limit | Token Limit/Month |
| :--- | :--- | :--- | :--- |
| **Free** | $0 | 10 req/min | 100K tokens |
| **Pro** | $10/mo | 100 req/min | 5M tokens |
| **Enterprise** | $100/mo | 1000 req/min | Unlimited |

---

## Telemetry

Anonymous endpoints for Clew Code CLI instances to report usage.

*   **POST** `/v1/telemetry/ping` — Instance heartbeat (no auth required).
*   **POST** `/v1/telemetry/event` — Record a single telemetry event.
*   **POST** `/v1/telemetry/batch` — Batch telemetry events.
*   **GET** `/v1/telemetry/stats` — Aggregated telemetry stats (admin/enterprise only).

---

## Webhooks

*   **GET** `/v1/webhooks` — List your webhooks.
*   **POST** `/v1/webhooks` — Create a webhook.
*   **DELETE** `/v1/webhooks/:id` — Delete a webhook.

---

## Plugins Marketplace

*   **GET** `/v1/plugins` — List marketplace plugins (optional: `?tag=` or `?q=`).
*   **GET** `/v1/plugins/:name` — Get plugin details.

---

## Updates API

*   **GET** `/v1/updates` — Get latest version.
*   **GET** `/v1/updates/check?current=0.1.0` — Check if update is available.

---

## Dashboard

Manage your account at [clew-code.org/app/](https://clew-code.org/app/) — view usage, create API keys, manage billing, and more.
