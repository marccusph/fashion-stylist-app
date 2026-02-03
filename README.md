# Style AI - Fashion Styling Assistant 👗✨

An AI-powered app that analyzes your fashion items and provides instant styling suggestions with shopping links.

## 🚀 Quick Deploy to Vercel

### Step 1: Get Your Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Go to "API Keys" section
4. Click "Create Key"
5. Copy your API key (keep it safe!)

### Step 2: Create a GitHub Account

If you don't have one: https://github.com/signup

### Step 3: Upload to GitHub

1. Go to https://github.com/new
2. Name it: `fashion-stylist-app`
3. Make it **Public**
4. Click "Create repository"
5. Click "uploading an existing file"
6. **Unzip the folder** and drag all the files inside
7. Click "Commit changes"

### Step 4: Deploy on Vercel

1. Go to https://vercel.com/signup
2. Sign up with your GitHub account
3. Click "Add New Project"
4. Select your `fashion-stylist-app` repository
5. **IMPORTANT:** Before clicking Deploy:
   - Click "Environment Variables"
   - Add variable name: `ANTHROPIC_API_KEY`
   - Add value: (paste your API key from Step 1)
   - Click "Add"
6. Click "Deploy"
7. Wait 2-3 minutes ⏳

### Step 5: Get Your Link! 🎉

Vercel will give you a URL like:
```
https://fashion-stylist-app.vercel.app
```

**Share this link with anyone!** It works on phones and computers.

---

## 📱 How to Use

1. Open the app on your phone
2. Take a photo of any fashion item (shoes, bag, jewelry, etc.)
3. Get AI-powered styling suggestions
4. Shop the look with direct links to Zara, Mango, and Parfois

---

## 🛠️ Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- Claude AI (Anthropic)
- Lucide Icons

---

## 💡 Features

- 📸 Camera & gallery upload
- 🤖 AI-powered style analysis
- 👗 Multiple outfit suggestions
- 🛍️ Direct shopping links
- 💡 Personalized styling tips
- 📱 Mobile-optimized
- 🔒 Secure API key handling

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local

# Run development server
npm run dev
```

Open http://localhost:3000

---

## ❓ Troubleshooting

### "Failed to analyze image" error?
- Make sure you added your `ANTHROPIC_API_KEY` in Vercel's environment variables
- Go to your Vercel project → Settings → Environment Variables
- Add the key and redeploy

### Need to update the API key?
- Go to Vercel project → Settings → Environment Variables
- Update `ANTHROPIC_API_KEY`
- Go to Deployments → Click "..." on latest → "Redeploy"

---

Made with 💜 by Claude AI
