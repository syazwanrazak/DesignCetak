# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Design & Cetak** (`designcetak-next`) is the Next.js 14 rewrite of a Malaysian print shop e-commerce site. It uses the App Router, TypeScript, Tailwind CSS, and Firebase (Firestore + Storage) as its backend.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint via next lint
```

Environment variables are in `.env.local` — all prefixed `NEXT_PUBLIC_`. Firebase config and WhatsApp number live there.

## Architecture

### Routing (App Router)

| Route | File | Rendering |
|---|---|---|
| `/` | `src/app/page.tsx` | Server (ISR, `revalidate = 60`) |
| `/products` | `src/app/products/page.tsx` | Server (ISR) |
| `/products/[id]` | `src/app/products/[id]/page.tsx` | Server (ISR + `generateStaticParams`) |
| `/admin` | `src/app/admin/page.tsx` | Client-only (`'use client'`) |
| `/about`, `/contact` | respective page files | Server |

Server pages fetch from Firestore directly (no API routes). The admin page is fully client-side and calls Firestore from the browser.

### Data layer

All Firestore operations go through `src/lib/firestore.ts`:
- `getAllProducts()` — fetches the `products` collection; falls back to `DEFAULT_PRODUCTS` if empty or on error.
- `getProductById(id)` — calls `getAllProducts()` then filters in-memory.
- `saveProduct(product)` — upserts by `product.id` (string-cast).
- `deleteProduct(id)` — deletes by id.
- `saveAllProducts(products)` — batch write.

Firebase Storage helpers for product images are in `src/lib/storage.ts`. Images are stored at `products/{id}/main.{ext}` and choice images at `products/{id}/choices/{label}_{choice}.jpg`. `next.config.mjs` whitelists `firebasestorage.googleapis.com` for `next/image`.

### Types

Central types in `src/types/index.ts`:
- `Product` — the main entity. `options: ProductOption[]` drives the configurable choices on the order form.
- `ProductOption` — has `label`, `choices[]`, and optional `choiceImages` (keyed by choice name → URL).
- `OrderFormValues` — name, phone, quantity, notes.
- `SelectedOptions` — `{ [optionLabel]: chosenValue }` map.

### Order flow

1. `ProductDetailPage` (server) fetches the product and renders `<OrderSection product={product} />`.
2. `OrderSection` (client) manages option selection and form state.
3. "Preview Order" opens `OrderSummaryModal`.
4. WhatsApp button opens a `wa.me` deep-link built by `src/lib/whatsapp.ts` → `buildWaUrl()`.

### Admin panel

- Route: `/admin` — client-only page with session-based auth (`sessionStorage` key `dc_admin`).
- Password is `ADMIN_PASSWORD` from `src/constants/index.ts` (hardcoded; no server-side auth).
- `AdminDashboard` manages local `products` state and calls Firestore on every mutation.
- `EditProductModal` handles create/edit including image upload via `src/lib/storage.ts`.

### Styling

Tailwind with two custom palettes (`brand` = amber/yellow, `ink` = dark gray) defined in `tailwind.config.ts`. Dynamic color classes (e.g., `text-red-500`, `bg-blue-50` from product data) are safelisted via a pattern to survive Tailwind's purge. Font Awesome 6 is loaded from CDN in `layout.tsx`. The `.yellow-rule` and `upload-zone` / `page-header` classes are defined in `src/app/globals.css`.

### Constants

`src/constants/index.ts` holds `WHATSAPP_NUMBER` (falls back to `601110528685`), `ADMIN_PASSWORD`, and `DEFAULT_PRODUCTS` (the seed data used when Firestore is empty).
