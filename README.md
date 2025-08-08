# 🌐 Connectify — A Twitter-Like Social App

Connectify is a modern, responsive social media platform inspired by Twitter, built with the latest **Next.js 13+** features. It features GitHub OAuth authentication, image uploads via Cloudinary, Prisma ORM for database management, and TailwindCSS for styling — all designed to deliver a smooth developer and user experience.

---

## 🚀 Features

- 🔐 GitHub Authentication powered by **NextAuth.js**
- 🖼️ Image uploads and hosting via **Cloudinary**
- 📸 Rich post editor with live image previews
- 🧵 Infinite scrolling feed of posts
- 🌗 Fully responsive with Dark Mode support
- 🎨 Custom background animations and polished UI
- 💬 Dynamic empty states with animated branding visuals
- ❤️ Like system with real-time updates (Prisma + API)

---

## 🛠️ Tech Stack

| Layer          | Technology                               |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 13+ (App Router, Server Actions) |
| Authentication | NextAuth.js (GitHub OAuth)               |
| ORM            | Prisma ORM (Neon / PostgreSQL)           |
| Styling        | TailwindCSS + Custom Global Theme        |
| Media          | Cloudinary Image Hosting                 |
| Deployment     | Vercel (recommended)                     |

---

## 📂 Project Structure

```
components
├── FeedWrapper           # Container wrapping feed-related components
│   ├── Feed              # Displays infinite list of posts
│   │   ├── Feed.js
│   │   └── Feed.module.css
│   ├── PostForm          # Post editor for authenticated users
│   │   ├── PostForm.js
│   │   └── PostForm.module.css
│   ├── SignInModal       # Modal prompting user sign-in
│   │   ├── SignInModal.js
│   │   └── SignInModal.module.css
│   └── FeedWrapper.js    # Orchestrates Feed, PostForm, and SignInModal
├── Session               # User session management components
│   ├── SessionProvider.js
│   └── UserSessionChecker.js
└── UserMenu              # User profile menu UI
    ├── UserMenu.js
    └── UserMenu.module.css

lib
├── apiClient.js          # API helper functions
├── auth.js               # Authentication utilities
├── cloudinary.js         # Cloudinary upload helper
└── prisma.js             # Prisma client initialization

prisma
├── schema.prisma         # Data model (User, Post, Like)
└── migrations/           # Database migrations

src/app
├── api
│   ├── auth              # Authentication API routes ([...nextauth], check-user)
│   ├── like              # API routes for liking posts
│   └── posts             # CRUD API routes for posts
├── layout.js             # Root layout & session provider
└── page.js               # Home page (feed + post form)

public                   # Static assets like images and icons

styles
└── globals.css           # Global styles
```

---

## ⚙️ Setup Instructions (Using Neon Database)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root with your Neon database URL and API keys:

```env
DATABASE_URL="your_neon_database_url_here"
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_generated_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> **Tip:** Generate `NEXTAUTH_SECRET` securely with:
> `openssl rand -base64 32`

### 3. Start Neon proxy

Ensure you have Neon CLI installed or use npx:

```bash
npx neon run
```

This command starts a local proxy that connects your app to the Neon cloud database.

### 4. Push Prisma schema to Neon

Instead of migrations, use Prisma’s push command to sync the schema:

```bash
npx prisma db push
```

> This command creates or updates tables in your Neon database based on your Prisma schema.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see Connectify live.

---

## 🧩 How It Works — Component Breakdown

### FeedWrapper

The main container managing the feed UI, wrapping:

- **Feed**: Displays an infinite scrolling list of posts with likes and comments.
- **PostForm**: Authenticated post editor allowing users to create posts with images.
- **SignInModal**: Modal dialog prompting users to sign in when interaction requires authentication.

### Session Components

- **SessionProvider**: Provides authentication context to the app.
- **UserSessionChecker**: Helper to verify user session status.

### UserMenu

Dropdown menu for logged-in users to access profile and sign-out options.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
