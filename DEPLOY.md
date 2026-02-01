# Deploying to Vercel

Since your project is now on GitHub, deploying to Vercel is very easy.

## Prerequisites

1.  **GitHub Repository**: Your code is already pushed to GitHub.
2.  **Vercel Account**: You need an account at [vercel.com](https://vercel.com).

## Step-by-Step Guide

1.  **Log in to Vercel**: Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  **Add New Project**:
    - Click the **"Add New..."** button.
    - Select **"Project"**.
3.  **Import Repository**:
    - You should see your `online-shopping` repository in the list (if you connected your GitHub account).
    - Click **"Import"** next to it.
4.  **Configure Project**:
    - **Framework Preset**: It should automatically detect `Next.js`.
    - **Root Directory**: Leave as `./`.
    - **Build & Output Settings**: Leave default.
5.  **Environment Variables** (Important!):
    - Expand the **"Environment Variables"** section.
    - Copy these values from your `.env.local` file and add them one by one:
      - `NEXT_PUBLIC_SUPABASE_URL`
      - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
      - `NEXT_PUBLIC_RAZORPAY_KEY_ID` (if you have it)
      - `RAZORPAY_KEY_ID` (if you have it)
      - `RAZORPAY_KEY_SECRET` (if you have it)
6.  **Deploy**:
    - Click the **"Deploy"** button.

## After Deployment

Vercel will build your project. Once finished, you will get a live URL (e.g., `https://online-shopping-xyz.vercel.app`).
