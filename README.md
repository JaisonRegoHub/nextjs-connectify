# 🌐 Connectify — A Twitter-Like Social App

A modern, responsive social media platform built with **Next.js 13+**, **App Router**, **GitHub Authentication**, **Prisma ORM**, **TailwindCSS**, and **Cloudinary** for media uploads.

---

## 🚀 Features

- 🔐 GitHub Auth via **NextAuth.js**
- 🖼️ Image uploads via **Cloudinary**
- 📸 Rich post editor with image previews
- 🧵 Infinite feed of posts
- 🌗 Dark mode-ready theme
- 🎨 Custom background animation & visual polish
- 💬 Dynamic empty states & animated branding

---

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ (App Router, Server Actions)
- **Auth**: NextAuth.js (GitHub OAuth)
- **ORM**: Prisma + SQLite/PostgreSQL
- **Styling**: TailwindCSS + custom global theme
- **Media**: Cloudinary image hosting
- **Deployment**: Vercel (recommended)

---

## 📂 Project Structure

```

/app
/api
/posts       → CRUD routes for posts
layout.js       → Root layout + session provider
page.js         → Home page (feed + post form)

/components
Feed.js         → Renders all posts
PostForm.js     → Authenticated post editor
SessionButtons.js → Sign In / Sign Out

/lib
cloudinary.js   → Upload helper for Cloudinary

/prisma
schema.prisma   → Data model (User & Post)
migrations/     → DB versioning

```

---

## ⚙️ Setup Instructions

1. **Clone repo**

```bash
git clone https://github.com/yourusername/connectify.git
cd connectify
```

2. **Install deps**

```bash
npm install
```

3. **Set up `.env.local`**

```env
DATABASE_URL="file:./dev.db" # or PostgreSQL URL
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_secret
NEXTAUTH_SECRET=generate_one
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

4. **Set up DB**

```bash
npx prisma migrate dev --name init
```

5. **Run the dev server**

```bash
npm run dev
```

---

## 📸 Screenshots

_Add yours here!_

---

## 🧠 Credits

Built by Dragneel 🧙‍♂️ — Senior Dev & UI/UX Enhancer
Inspired by Twitter, powered by modern tools.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
