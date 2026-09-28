# Deploying olympiadmath.xyz — click-by-click guide

This guide takes you from the code on your computer to a live website at
**https://olympiadmath.xyz**, with user accounts, saved progress, and Pro
checkout. No step is skipped. Budget ~45 minutes the first time.

You will create three free accounts along the way: **GitHub** (holds the code),
**Render** (runs the website), and optionally **Stripe** (takes Pro payments).

---

## Part 1 — Put the code on GitHub (10 min)

1. Open a terminal on your computer and go into the project folder:
   ```bash
   cd ~/workspace/olympiad-math-trainer
   ```
2. Turn it into a git repository and save everything:
   ```bash
   git init
   git add .
   git commit -m "Olympiad Math Trainer v1"
   ```
3. Go to **github.com** and sign up / log in.
4. Click the **+** (top right) → **New repository**. Name it
   `olympiad-math-trainer`. Leave it **Public** (or Private — both work).
   Do **NOT** check "Add a README". Click **Create repository**.
5. GitHub shows you a page with commands. Run the ones under
   *"…or push an existing repository from the command line"* — they look like:
   ```bash
   git remote add origin https://github.com/YOURNAME/olympiad-math-trainer.git
   git branch -M main
   git push -u origin main
   ```
   (Use your real GitHub username in place of `YOURNAME`.)
6. Refresh the GitHub page — you should see all the project files.

> ✅ Checkpoint: your code is on GitHub. Nothing is secret in the repo —
> `.env` is git-ignored, so keys can never leak this way.

---

## Part 2 — Run it on Render (15 min)

1. Go to **render.com** and sign up (the free tier is fine to start; the
   persistent disk below needs the **Starter** plan or higher — about $7/month
   — because free web services can't attach disks).
2. Click **New +** → **Web Service** → **Build and deploy from a Git repository**
   → connect your GitHub account if asked → pick `olympiad-math-trainer`.
3. Render reads `render.yaml` and prefills most settings. Check:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
4. **Add the persistent disk** (this is what keeps user accounts after redeploys):
   - In the service's **Disks** section (or during creation), add a disk:
     **Name:** `trainer-data`, **Mount Path:** `/data`, **Size:** 1 GB.
5. **Environment variables** — open the service's **Environment** tab and confirm:
   - `NODE_ENV` = `production`
   - `BASE_URL` = `https://olympiadmath.xyz`
   - `DB_PATH` = `/data/app.db`
   - `SESSION_SECRET` = (click **Generate** — Render fills a random value)
   - Leave the four `STRIPE_*` variables empty for now (Part 4 covers them).
6. Click **Create Web Service** / **Deploy**. Wait until the status says **Live**.
   Render gives you a temporary URL like
   `https://olympiad-math-trainer.onrender.com`.
7. Open that URL and check: the landing page loads, you can **Sign up**,
   **Log in**, and solve a drill problem. Your account is stored on the disk.

> ✅ Checkpoint: the app is live on Render's URL with working accounts.

---

## Part 3 — Point olympiadmath.xyz at Render (10 min + waiting)

1. In your Render service, go to **Settings** → **Custom Domain** →
   **Add Custom Domain**. Type `olympiadmath.xyz` and confirm. Do it again for
   `www.olympiadmath.xyz` if you want the www version too.
2. Render now shows you the exact **DNS records** to add. They look like:
   - Type **A**, Name/Host `@`, Value: an IP address Render shows you
     (e.g. `216.24.57.1` — copy exactly what YOUR dashboard shows)
   - Type **CNAME**, Name/Host `www`, Value: `olympiadmath.xyz`
     (or the `*.onrender.com` name Render shows — again, copy yours exactly)
3. Open the website **where you bought the xyz domain** (your registrar —
   e.g. Namecheap, Cloudflare, GoDaddy, Porkbun). Find **DNS settings** /
   **Manage DNS** for olympiadmath.xyz.
4. Add the two records from step 2 exactly as shown (type, name, value).
   Delete any old/conflicting A records for `@` if the registrar warns you.
5. Wait. DNS changes take **a few minutes to a few hours**. Render's dashboard
   will show the domain as **Verified** when it's done, and HTTPS is issued
   automatically — you do nothing for the certificate.
6. Visit **https://olympiadmath.xyz** — your site should load. Sign up once
   more to confirm accounts work on the real domain.

> ✅ Checkpoint: olympiadmath.xyz serves your app with HTTPS.

---

## Part 4 — Stripe: take real Pro payments (20 min, optional)

Skip this and the site still works — the Pro buttons show a polite
"coming soon" message instead of crashing. Do it when you're ready to charge.

1. Go to **stripe.com** and create an account. Stay in **Test mode** first
   (toggle at the top of the dashboard) to practice safely.
2. **API keys:** Dashboard → **Developers** → **API keys** → copy the
   **Secret key** (starts with `sk_test_`). This is `STRIPE_SECRET_KEY`.
3. **Prices:** Dashboard → **Product catalog** → **Add product**:
   - Product 1: name `Pro Monthly`, price **$8**, recurring **monthly** → save,
     copy the **Price ID** (starts with `price_`). This is `STRIPE_PRICE_MONTHLY`.
   - Product 2: name `Pro Annual`, price **$60**, recurring **yearly** → save,
     copy its Price ID → `STRIPE_PRICE_ANNUAL`.
4. **Webhook:** Dashboard → **Developers** → **Webhooks** → **Add endpoint**:
   - URL: `https://olympiadmath.xyz/api/billing/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`
   - Save → reveal the **Signing secret** (starts with `whsec_`) →
     this is `STRIPE_WEBHOOK_SECRET`.
5. Back in **Render** → your service → **Environment**, add the four values and
   **Save** (Render redeploys automatically).
6. Test: on your site, sign up a test account → **Billing** → pick a plan →
   you go to Stripe's checkout → pay with test card `4242 4242 4242 4242`
   (any future expiry, any CVC) → you're redirected back and the account shows
   **Pro**. Stripe's webhook flips the account — check the dashboard's webhook
   log if it doesn't.
7. **Go live:** in Stripe, toggle **off** Test mode, repeat steps 2–4 with the
   **live** keys (`sk_live_…`, live price IDs, live webhook secret), paste them
   into Render, redeploy. Real cards are now charged.

> ✅ Checkpoint: Pro checkout works end-to-end; webhooks grant Pro automatically.

---

## Ongoing

- **Updating the site:** push to GitHub (`git add . && git commit -m "…" && git push`) —
  Render redeploys automatically. The disk keeps all user data across deploys.
- **Backups:** the whole database is one file (`/data/app.db`). Render's disk
  snapshots cover it; for extra safety, download it occasionally via Render's
  **Shell** tab: `cp /data/app.db /tmp/ && ...` (or add a scheduled backup later).
- **Logs:** Render → your service → **Logs** shows server output and errors.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "Cannot GET /" or blank page | Check Render **Logs**; confirm Start Command is `npm start` |
| Accounts vanish after redeploy | The disk isn't attached or `DB_PATH` isn't `/data/app.db` |
| Domain not verifying after hours | Re-check the DNS records match Render's dashboard exactly; old A records conflict |
| Checkout says "coming soon" | Stripe env vars missing/empty in Render → add them, save, wait for redeploy |
| Webhook not granting Pro | Check Stripe → Developers → Webhooks → your endpoint's recent attempts for errors; confirm the URL is exactly `https://olympiadmath.xyz/api/billing/webhook` |
