# 🧠 ContextSnap — Never Lose Your AI Context Again

<div align="center">

![ContextSnap Banner](https://via.placeholder.com/1200x400/6366f1/ffffff?text=🧠+ContextSnap+-+Never+Lose+Your+AI+Context+Again)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.x-brightgreen?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql)](https://mysql.com/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow?style=for-the-badge&logo=googlechrome)](https://developer.chrome.com/docs/extensions/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

**A full-stack web application + browser extension that captures, summarizes, and resumes AI conversations — solving the token limit problem once and for all.**

[🌐 Live Demo](#deployment) • [📥 Download Extension](#extension-download) • [📖 Documentation](#table-of-contents) • [🐛 Report Bug](#contact--support)

</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [❗ The Problem It Solves](#-the-problem-it-solves)
- [✅ How It Solves It](#-how-it-solves-it)
- [🏗️ System Architecture](#️-system-architecture)
- [🔧 Tech Stack](#-tech-stack)
- [📁 Complete Folder Structure](#-complete-folder-structure)
- [🔌 Chrome Extension Development](#-chrome-extension-development)
- [🗄️ Database Design](#️-database-design)
- [🌊 Complete Workflow](#-complete-workflow)
- [🚀 Getting Started](#-getting-started)
- [🌍 Deployment Guide](#-deployment-guide)
- [📸 Screenshots](#-screenshots)
- [🔐 Role Based Access Control](#-role-based-access-control)
- [🚧 Future Improvements](#-future-improvements)
- [⏱️ Development Timeline](#️-development-timeline)
- [✅ Dos and Don'ts](#-dos-and-donts)
- [📞 Contact & Support](#-contact--support)
- [💡 Suggestions & Feedback](#-suggestions--feedback)

---

## 🎯 Project Overview

**ContextSnap** is a two-part system:

1. **Browser Extension** — A Chrome/Edge/Brave extension that injects a `🧠 Snap` button into AI chat interfaces (Claude, ChatGPT, Gemini, Perplexity). When clicked, it captures the entire conversation, optionally summarizes it using Gemini AI, and copies a ready-to-paste resume prompt.

2. **Web Application** — A full-stack Spring Boot + React application that serves as the official platform for ContextSnap. Users register, download the extension, manage their profile, and contact support. Admins get a full control panel.

| Feature | Description |
|---|---|
| 🔌 Extension | Works on Claude, ChatGPT, Gemini, Perplexity |
| 🌐 Web App | Landing page, auth, user dashboard, admin panel |
| 🤖 AI Summary | Gemini API compresses long chats into smart summaries |
| 🔐 Auth | JWT-based authentication with role-based access |
| 📧 Email | Gmail SMTP notifications for queries and replies |
| 📊 Analytics | Admin tracks registrations, downloads, queries |

---

## ❗ The Problem It Solves

Every day, millions of people use AI tools like Claude, ChatGPT, and Gemini for:
- Complex coding projects
- Long-form writing and research
- Business analysis and planning
- Learning and tutoring sessions

**The frustrating reality:** Every AI tool has a token/context limit. When you hit it:

- ❌ Your entire conversation history is lost
- ❌ You have to manually re-explain your project from scratch
- ❌ The AI loses all context about what you were building
- ❌ You waste 10–20 minutes just setting up context again
- ❌ You lose momentum and productivity

This happens **multiple times per day** for power users and costs enormous amounts of time.

---

## ✅ How It Solves It

ContextSnap solves this with a **3-step workflow:**

```
CAPTURE  →  SUMMARIZE  →  RESUME
```

**Step 1 — CAPTURE** 📸
Click the `🧠 Snap` button injected directly into the AI tool's input bar. The extension scrapes the entire conversation using DOM selectors specific to each AI platform.

**Step 2 — SUMMARIZE** ✨
If a Gemini API key is configured, the raw conversation is sent to Gemini 2.0 Flash which generates a concise 300-word summary capturing: main topics, key decisions, and last task being worked on.

**Step 3 — RESUME** 📋
A formatted resume prompt is shown in a modal with a copy button. Paste it into any new AI chat and the AI instantly understands your full context — picking up exactly where you left off.

**Time saved:** What used to take 10–20 minutes now takes **10 seconds.**

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│                                                              │
│  ┌─────────────────┐    ┌──────────────────────────────┐   │
│  │  Chrome Extension│    │     React Frontend (Vite)    │   │
│  │  (Manifest V3)  │    │     localhost:5173            │   │
│  │                 │    │                              │   │
│  │  Content Scripts│    │  Landing / Auth / Dashboard  │   │
│  │  claude.js      │    │  Admin Panel / Guide         │   │
│  │  chatgpt.js     │    └──────────────┬───────────────┘   │
│  │  gemini.js      │                   │ HTTP/REST          │
│  │  perplexity.js  │                   │                    │
│  └────────┬────────┘                   │                    │
│           │ Gemini API                 │                    │
│           ▼                            ▼                    │
│  ┌────────────────┐    ┌──────────────────────────────┐   │
│  │  Gemini API    │    │   Spring Boot Backend        │   │
│  │  (AI Summary)  │    │   localhost:8080             │   │
│  └────────────────┘    │                              │   │
│                         │  Auth / Users / Downloads   │   │
│                         │  Queries / Admin / Email    │   │
│                         └──────────────┬───────────────┘   │
│                                        │ JPA/Hibernate      │
│                                        ▼                    │
│                         ┌──────────────────────────────┐   │
│                         │   MySQL / PostgreSQL DB      │   │
│                         │   contextsnap_db             │   │
│                         └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Tech Stack

### Browser Extension
| Technology | Version | Purpose |
|---|---|---|
| Manifest V3 | Latest | Chrome Extension standard |
| Vanilla JavaScript | ES2022 | Content scripts, DOM manipulation |
| React + Vite | 18.x / 5.x | Popup UI |
| Tailwind CSS | 3.x | Popup styling |
| Gemini API | 2.0 Flash | AI summarization |
| chrome.storage API | - | Local session storage |

### Frontend (Web App)
| Technology | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.x | Styling |
| React Router DOM | 6.x | Client-side routing |
| Axios | 1.x | HTTP client |
| Framer Motion | 10.x | Animations |
| React Icons | 4.x | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Spring Boot | 3.2.x | REST API framework |
| Spring Security | 6.x | Authentication & authorization |
| Spring Data JPA | 3.x | Database ORM |
| Spring Mail | 3.x | Email notifications |
| JWT (JJWT) | 0.12.3 | Token-based auth |
| Lombok | 1.18.x | Boilerplate reduction |
| Hibernate | 6.x | ORM implementation |

### Database
| Technology | Purpose |
|---|---|
| MySQL 8.0 | Primary database (local/production) |
| PostgreSQL 15 | Alternative database (compatible) |
| HikariCP | Connection pooling |

### DevOps & Tools
| Tool | Purpose |
|---|---|
| Maven | Backend build tool |
| npm | Frontend package manager |
| Git | Version control |
| IntelliJ IDEA | Backend IDE |
| VS Code | Frontend IDE |
| Postman | API testing |

---

## 📁 Complete Folder Structure

```
Context Packer/
│
├── 📁 context-snap/                    # Chrome Extension
│   ├── 📁 public/
│   │   ├── manifest.json               # Chrome Manifest V3
│   │   ├── manifest.firefox.json       # Firefox Manifest V2
│   │   └── 📁 icons/                   # Extension icons
│   ├── 📁 src/
│   │   ├── 📁 content/                 # Content scripts (injected into AI sites)
│   │   │   ├── claude.js               # Claude.ai message extractor + Snap button
│   │   │   ├── chatgpt.js              # ChatGPT message extractor + Snap button
│   │   │   ├── gemini.js               # Gemini message extractor + Snap button
│   │   │   └── perplexity.js           # Perplexity message extractor + Snap button
│   │   ├── 📁 background/
│   │   │   └── service-worker.js       # Background service worker
│   │   ├── 📁 popup/
│   │   │   └── 📁 components/
│   │   │       ├── Header.jsx           # Popup header
│   │   │       ├── CaptureButton.jsx    # Capture context button
│   │   │       ├── ResumePrompt.jsx     # Generated prompt display
│   │   │       ├── SessionList.jsx      # Saved sessions list
│   │   │       ├── SummarizeButton.jsx  # AI summarize button
│   │   │       └── ApiKeyInput.jsx      # Gemini API key input
│   │   ├── App.jsx                      # Main popup app
│   │   ├── main.jsx                     # Entry point
│   │   └── index.css                    # Styles
│   ├── 📁 scripts/
│   │   └── build-firefox.js            # Firefox build script
│   ├── 📁 dist/                         # Built extension (Chrome/Edge/Brave)
│   ├── 📁 dist-firefox/                 # Built extension (Firefox)
│   ├── vite.config.js                   # Multi-entry Vite config
│   ├── tailwind.config.js
│   └── package.json
│
├── 📁 frontend/                         # React Web Application
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 api/
│   │   │   └── axios.js                 # Axios instance with JWT interceptor
│   │   ├── 📁 components/
│   │   │   ├── Navbar.jsx               # Navigation with role-based links
│   │   │   ├── Footer.jsx               # Footer with section links
│   │   │   ├── ScrollToTop.jsx          # Auto scroll to top on route change
│   │   │   └── 📁 landing/
│   │   │       ├── Hero.jsx             # Hero section
│   │   │       ├── Features.jsx         # Features grid
│   │   │       ├── BrowserSupport.jsx   # Browser compatibility cards
│   │   │       ├── Testimonials.jsx     # User testimonials
│   │   │       └── DownloadSection.jsx  # Download with browser detection
│   │   ├── 📁 context/
│   │   │   ├── AuthContext.jsx          # Authentication state
│   │   │   └── ThemeContext.jsx         # Dark/light theme state
│   │   ├── 📁 pages/
│   │   │   ├── Landing.jsx              # Home page
│   │   │   ├── Login.jsx                # Login page
│   │   │   ├── Register.jsx             # Registration page
│   │   │   ├── Dashboard.jsx            # User dashboard
│   │   │   ├── AdminDashboard.jsx       # Admin control panel
│   │   │   ├── Guide.jsx                # Installation guide
│   │   │   ├── About.jsx                # About page
│   │   │   ├── Contact.jsx              # Contact page
│   │   │   └── Privacy.jsx              # Privacy policy
│   │   ├── App.jsx                      # Router + protected routes
│   │   ├── main.jsx                     # Entry point
│   │   └── index.css                    # Global styles + Tailwind
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── 📁 backend/                          # Spring Boot API
    ├── 📁 src/main/java/com/contextsnap/backend/
    │   ├── 📁 config/
    │   │   ├── SecurityConfig.java       # Spring Security + JWT filter + CORS
    │   │   └── DataSeeder.java           # Auto-creates admin on first run
    │   ├── 📁 controller/
    │   │   ├── AuthController.java       # /api/auth — register, login
    │   │   ├── UserController.java       # /api/user — profile, downloads, queries
    │   │   ├── AdminController.java      # /api/admin — users, stats, mail
    │   │   └── FileController.java       # /api/files — extension download
    │   ├── 📁 entity/
    │   │   ├── User.java                 # User entity with Role enum
    │   │   ├── Download.java             # Download tracking entity
    │   │   ├── QueryMessage.java         # User queries/contact entity
    │   │   └── Notification.java         # Admin notifications entity
    │   ├── 📁 repository/
    │   │   ├── UserRepository.java
    │   │   ├── DownloadRepository.java
    │   │   ├── QueryMessageRepository.java
    │   │   └── NotificationRepository.java
    │   ├── 📁 service/
    │   │   ├── AuthService.java          # Register + login logic
    │   │   ├── UserService.java          # Profile management
    │   │   ├── DownloadService.java      # Download tracking
    │   │   ├── QueryService.java         # Query + email notifications
    │   │   └── EmailService.java         # Gmail SMTP email sender
    │   ├── 📁 dto/
    │   │   ├── RegisterRequest.java
    │   │   ├── LoginRequest.java
    │   │   └── AuthResponse.java
    │   └── 📁 util/
    │       └── JwtUtil.java              # JWT generate/validate/extract
    ├── 📁 src/main/resources/
    │   ├── application.properties        # DB, JWT, mail config
    │   └── 📁 static/downloads/
    │       ├── contextsnap-chrome.zip    # Extension for Chrome/Edge/Brave
    │       └── contextsnap-firefox.zip   # Extension for Firefox
    └── pom.xml                           # Maven dependencies
```

---

## 🔌 Chrome Extension Development

### How the Extension Works

The extension uses **Manifest V3** and consists of 4 layers:

#### 1. Content Scripts
Each AI platform has a dedicated content script that:
- Knows the exact DOM selectors for that platform
- Extracts messages in chronological order
- Injects the `🧠 Snap` capsule button into the input toolbar
- Shows a modal with the captured/summarized context

| Platform | User Message Selector | AI Message Selector | Input Injection Point |
|---|---|---|---|
| Claude | `[data-testid="user-message"]` | `.font-claude-response-body` | After `[aria-label="Add files..."]` button |
| ChatGPT | `[data-testid="collapsible-user-message-content"]` | `.markdown` inside `conversation-turn-*` | Next to `[data-testid="composer-plus-btn"]` |
| Gemini | `user-query-content` tag | `model-response` tag | `.leading-actions-wrapper` |
| Perplexity | `h1[class*="group/query"]` | `div.prose` | Next to toggle indicator |

#### 2. Popup UI (React)
The extension popup provides:
- 📸 One-click context capture
- ✨ AI summarization via Gemini API
- 💾 Save up to 10 sessions locally
- 📋 Copy resume prompt to clipboard
- 🔑 Gemini API key management

#### 3. Background Service Worker
Handles extension lifecycle events and installation.

#### 4. Multi-Browser Build
```bash
# Chrome/Edge/Brave build
npm run build          # → dist/

# Firefox build  
npm run build:firefox  # → dist-firefox/
```

### Key Extension Files

**`vite.config.js`** — Multi-entry build:
```js
input: {
  popup: 'index.html',
  claude: 'src/content/claude.js',
  chatgpt: 'src/content/chatgpt.js',
  gemini: 'src/content/gemini.js',
  perplexity: 'src/content/perplexity.js',
  background: 'src/background/service-worker.js',
}
```

**Resume Prompt Format:**
```
[CONTEXT RESUME — AI Summary]

Continue from our previous conversation. Here's what we discussed:

<Gemini-generated 300-word summary>

Please acknowledge and continue.
```

---

## 🗄️ Database Design

### Database Selection

ContextSnap supports both **MySQL** and **PostgreSQL** — switch by changing `application.properties`:

```properties
# MySQL (default)
spring.datasource.url=jdbc:mysql://localhost:3306/contextsnap_db
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# PostgreSQL (alternative)
spring.datasource.url=jdbc:postgresql://localhost:5432/contextsnap_db
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS                                    │
│  id (PK) | name | email (UNIQUE) | password | location          │
│  role (USER/ADMIN) | hasDownloaded | browserUsed                │
│  createdAt | updatedAt                                           │
└──────────────────┬──────────────────────────────────────────────┘
                   │ 1
         ┌─────────┼─────────┐
         │         │         │
         │ N       │ N       │ N
┌────────▼──┐ ┌────▼──────┐ ┌▼──────────────┐
│ DOWNLOADS │ │  QUERIES  │ │ NOTIFICATIONS  │
│ id (PK)   │ │ id (PK)   │ │ id (PK)        │
│ user_id   │ │ user_id   │ │ message        │
│ browser   │ │ subject   │ │ type           │
│ version   │ │ message   │ │ isRead         │
│ downloadedAt│ │ status  │ │ relatedUserId  │
└───────────┘ │ adminReply│ │ createdAt      │
              │ createdAt │ └────────────────┘
              │ repliedAt │
              └───────────┘
```

### Table Descriptions

**users** — Core user table with role-based access
- `role` — `USER` or `ADMIN` (ENUM)
- `hasDownloaded` — tracks if user downloaded extension
- `browserUsed` — last browser used for download

**downloads** — Tracks every download event
- Linked to user via `user_id` foreign key
- Records browser type and extension version

**queries** — User contact/support messages
- `status` — `PENDING` or `REPLIED`
- `adminReply` — admin's response text
- Creates notification on submission

**notifications** — Admin notification feed
- `type` — `NEW_QUERY`, `REPLY_SENT`, `MAIL_SENT`
- `isRead` — unread badge counter for admin
- `relatedUserId` — links back to the relevant user

---

## 🌊 Complete Workflow

### User Workflow

```
1. DISCOVER
   └── User visits contextsnap.dev
   └── Reads landing page (features, browser support, testimonials)

2. REGISTER
   └── Clicks "Get Extension Free" or "Get Started"
   └── Creates account (name, email, password, location)
   └── JWT token issued → stored in localStorage
   └── Redirected to user dashboard

3. DOWNLOAD
   └── Returns to landing page
   └── Browser auto-detected (Chrome/Edge/Brave/Firefox)
   └── Clicks "Download for [Browser]"
   └── Download tracked in DB (browser, version, timestamp)
   └── ZIP file downloaded from Spring Boot static files

4. INSTALL EXTENSION
   └── Extracts ZIP → gets dist/ folder
   └── Opens browser://extensions
   └── Enables Developer Mode
   └── Loads unpacked → selects dist/ folder
   └── Pins extension to toolbar

5. USE EXTENSION
   └── Opens Claude/ChatGPT/Gemini/Perplexity
   └── Has a conversation until context limit approaches
   └── Clicks 🧠 Snap button in input bar
   └── (Optional) Adds Gemini API key in popup for AI summary
   └── Modal shows resume prompt
   └── Copies prompt → opens new chat → pastes → resumes!

6. MANAGE ACCOUNT
   └── Dashboard: update name, password, location
   └── Downloads tab: view download history
   └── My Queries tab: view submitted queries + admin replies
   └── Contact tab: submit new query/suggestion
```

### Admin Workflow

```
1. LOGIN (Admin account)
   └── Redirected to /admin dashboard

2. OVERVIEW TAB
   └── See: Total Users, Downloads, Active Users, Pending Queries
   └── Recent registrations list

3. USERS TAB
   └── View all registered users (non-admin)
   └── See: name, email, location, browser, download status, join date
   └── Actions: Send custom mail | Delete user

4. QUERIES TAB
   └── View all user queries with status (PENDING/REPLIED)
   └── Type reply in textarea → click Send
   └── User receives email notification with reply

5. DOWNLOADS TAB
   └── Full download history: who downloaded, when, which browser

6. NOTIFICATIONS TAB
   └── Real-time feed: new queries, replies sent, mails sent
   └── Mark individual notifications as read
   └── Unread count badge on tab
```

### Extension Snap Workflow

```
User opens Claude/ChatGPT/Gemini/Perplexity
         │
         ▼
Content script injected → 🧠 Snap button appears in input bar
         │
         ▼ (User clicks Snap)
         │
    ┌────┴────┐
    │  chrome.storage.local.get('geminiApiKey')
    └────┬────┘
         │
    ┌────┴──────────────────────────────┐
    │ API Key exists?                    │
    ├─── YES ──► Extract messages        │
    │            └── Send to Gemini API  │
    │            └── Get 300-word summary│
    │            └── Show modal with     │
    │                summarized prompt   │
    │                                    │
    └─── NO ───► Extract messages        │
                 └── Show modal with     │
                     raw prompt          │
                                         │
    User clicks "📋 Copy to Clipboard"   │
    User opens new AI chat               │
    User pastes prompt                   │
    AI acknowledges context & continues  │
```

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.0+ or PostgreSQL 15+
- Maven 3.8+
- Chrome/Edge/Brave browser

### 1. Clone the Repository

```bash
git clone https://github.com/gopalkrishna06114/context-snap.git
cd context-snap
```

### 2. Set Up the Database

```sql
CREATE DATABASE contextsnap_db;
```

### 3. Configure Backend

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/contextsnap_db
spring.datasource.username=root
spring.datasource.password=yourpassword

jwt.secret=your-secret-key-minimum-32-characters-long
jwt.expiration=86400000

spring.mail.username=yourgmail@gmail.com
spring.mail.password=your-16-char-app-password

admin.email=youremail@gmail.com
admin.name=Your Name
admin.password=StrongAdminPassword123
```

### 4. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend starts at `http://localhost:8080`
Admin account auto-created on first run ✅

### 5. Set Up the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at `http://localhost:5173`

### 6. Build the Extension

```bash
cd context-snap
npm install
npm run build          # Chrome/Edge/Brave → dist/
npm run build:firefox  # Firefox → dist-firefox/
```

### 7. Load Extension in Browser

**Chrome/Edge/Brave:**
1. Go to `chrome://extensions` (or `edge://extensions` / `brave://extensions`)
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the `dist/` folder

**Firefox:**
1. Go to `about:debugging`
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select `manifest.json` from `dist-firefox/`

---

## 🌍 Deployment Guide

### Backend — Deploy on Render

1. Create account at [render.com](https://render.com)
2. New → Web Service → Connect GitHub repo
3. Configure:
   - **Build Command:** `mvn clean package -DskipTests`
   - **Start Command:** `java -jar target/backend-0.0.1-SNAPSHOT.jar`
4. Add Environment Variables:
   ```
   SPRING_DATASOURCE_URL=jdbc:mysql://your-db-host:3306/contextsnap_db
   SPRING_DATASOURCE_USERNAME=your-db-user
   SPRING_DATASOURCE_PASSWORD=your-db-password
   JWT_SECRET=your-secret-key
   SPRING_MAIL_USERNAME=yourgmail@gmail.com
   SPRING_MAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=youremail@gmail.com
   ADMIN_NAME=Your Name
   ADMIN_PASSWORD=StrongPassword123
   ```
5. Add a MySQL database (Render provides free MySQL via PlanetScale or Railway)

### Frontend — Deploy on Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository → select `frontend/` folder
3. Add Environment Variable:
   ```
   VITE_API_BASE_URL=https://your-backend.onrender.com
   ```
4. Update `src/api/axios.js`:
   ```js
   baseURL: import.meta.env.VITE_API_BASE_URL + '/api'
   ```
5. Deploy ✅

### Update CORS After Deployment

In `application.properties`:
```properties
frontend.url=https://your-frontend.vercel.app
```

In `SecurityConfig.java`:
```java
config.setAllowedOrigins(List.of(
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
));
```

### Database — Free Options

| Provider | Database | Free Tier |
|---|---|---|
| [PlanetScale](https://planetscale.com) | MySQL | 5GB free |
| [Railway](https://railway.app) | MySQL/PostgreSQL | $5 credit/month |
| [Supabase](https://supabase.com) | PostgreSQL | 500MB free |
| [Neon](https://neon.tech) | PostgreSQL | 512MB free |

---

## 📸 Screenshots

> **Note:** Replace the placeholder paths below with actual screenshots after deployment.

### Landing Page
```
[Screenshot: Hero section with "Never Lose Your AI Context Again" headline]
Path: docs/screenshots/landing-hero.png
```

### Extension in Action
```
[Screenshot: 🧠 Snap button in Claude's input bar]
Path: docs/screenshots/extension-claude.png

[Screenshot: Summary modal with copy button]
Path: docs/screenshots/extension-modal.png

[Screenshot: Extension popup with session list]
Path: docs/screenshots/extension-popup.png
```

### Web Application
```
[Screenshot: User dashboard — Profile tab]
Path: docs/screenshots/user-dashboard.png

[Screenshot: Admin dashboard — Overview tab]
Path: docs/screenshots/admin-overview.png

[Screenshot: Admin dashboard — Users tab with Mail button]
Path: docs/screenshots/admin-users.png

[Screenshot: Admin dashboard — Queries tab with reply]
Path: docs/screenshots/admin-queries.png
```

### Browser Support
```
[Screenshot: Chrome with Snap button]
Path: docs/screenshots/chrome-snap.png

[Screenshot: Gemini with Snap button in toolbar]
Path: docs/screenshots/gemini-snap.png

[Screenshot: Perplexity with Snap button]
Path: docs/screenshots/perplexity-snap.png
```

---

## 🔐 Role Based Access Control

ContextSnap implements **two-tier RBAC** — completely transparent to regular users.

### Role Hierarchy

```
ADMIN (You)
  ├── View all users
  ├── Delete any user (cascades: downloads, queries, notifications)
  ├── Reply to queries (triggers email to user)
  ├── Send custom emails to any user
  ├── View all downloads
  ├── View real-time notifications
  └── See full platform analytics

USER (Everyone else)
  ├── Update own profile (name, location, password)
  ├── Download extension (tracked in DB)
  ├── View own download history
  ├── Submit queries/contact messages
  ├── View own query history + admin replies
  └── NO knowledge of admin system exists
```

### How Admin is Created

**Option 1 — DataSeeder (Auto on startup):**
Set in `application.properties`:
```properties
admin.email=youremail@gmail.com
admin.name=Your Name
admin.password=StrongPassword123
```

**Option 2 — SQL (Production):**
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'youremail@gmail.com';
```

### JWT Token Claims
```json
{
  "sub": "user@email.com",
  "role": "ADMIN",
  "iat": 1716000000,
  "exp": 1716086400
}
```

---

## 🚧 Future Improvements

### High Priority

| Feature | Description | Effort |
|---|---|---|
| 📧 **Enable Email System** | Gmail App Password setup for query notifications and admin replies. Currently built but requires Gmail 2FA + App Password configuration | Low |
| 🔑 **Google OAuth Login** | Replace manual register/login with Google Sign-In for frictionless onboarding | Medium |
| 🏪 **Chrome Web Store** | Publish extension to Chrome Web Store for one-click install without Developer Mode | Medium |
| 🦊 **Firefox Add-ons Store** | Publish Firefox version to addons.mozilla.org | Medium |

### Medium Priority

| Feature | Description | Effort |
|---|---|---|
| 📊 **Usage Analytics Dashboard** | Charts showing daily active users, downloads by browser, query trends | Medium |
| 🔔 **Real-time Notifications** | WebSocket-based live notifications for admin instead of polling | High |
| 🌍 **Multi-language Support** | i18n for Hindi, Spanish, French etc. | Medium |
| 💳 **Premium Tier** | Paid plan with unlimited session storage, priority support | High |
| 🤖 **Multiple AI Summarizers** | Support OpenAI GPT-4, Claude API as alternatives to Gemini | Low |
| 📱 **Mobile App** | React Native app for mobile context management | High |

### Low Priority

| Feature | Description | Effort |
|---|---|---|
| 🔗 **Share Sessions** | Share conversation snapshots via public link | Medium |
| 📂 **Export to PDF** | Export captured conversations as PDF | Low |
| 🧩 **VS Code Extension** | Snap context from GitHub Copilot Chat | High |
| 🔄 **Auto-Sync** | Automatically sync sessions across devices via account | High |
| 📧 **Email Digest** | Weekly summary email to users about their AI usage | Medium |

### Enabling Email (Step-by-Step)

The email system is **fully built** but requires Gmail setup:

1. Enable 2-Step Verification on your Gmail account
2. Go to Google Account → Security → App Passwords
3. Generate a 16-character app password
4. Update `application.properties`:
   ```properties
   spring.mail.username=yourgmail@gmail.com
   spring.mail.password=xxxx-xxxx-xxxx-xxxx
   ```
5. Restart backend — emails will work immediately

### Adding Google OAuth (Future)

```xml
<!-- Add to pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
```

Frontend: Add `react-google-login` or use Google Identity Services JS SDK.

---

## ⏱️ Development Timeline

| Phase | Duration | What Was Built |
|---|---|---|
| **Ideation & Planning** | 1 day | Problem identification, architecture design, tech stack selection |
| **Extension Core** | 3 days | Manifest V3 setup, Claude content script, popup UI, capture logic |
| **Multi-Platform Extension** | 2 days | ChatGPT, Gemini, Perplexity content scripts, DOM debugging |
| **Gemini AI Integration** | 1 day | Summarization API, modal UI, clipboard copy |
| **Cross-Browser Support** | 1 day | Firefox build, Edge/Brave testing |
| **Backend Foundation** | 2 days | Spring Boot setup, entities, repositories, JWT auth |
| **Backend APIs** | 2 days | User, download, query, admin, email services |
| **Frontend Foundation** | 1 day | React setup, routing, auth context, theme context |
| **Landing Page** | 2 days | Hero, features, browser support, testimonials, download section |
| **Auth Pages** | 1 day | Login, register with validation |
| **User Dashboard** | 1 day | Profile, downloads, queries, contact tabs |
| **Admin Dashboard** | 2 days | Overview, users, queries, downloads, notifications, mail modal |
| **Additional Pages** | 1 day | Guide, About, Contact, Privacy |
| **Bug Fixes & Polish** | 3 days | UI fixes, selector debugging, download flow, RBAC, scroll fixes |
| **Documentation** | 1 day | This README |
| **Total** | **~25 days** | **Complete full-stack project** |

---

## ✅ Dos and Don'ts

### ✅ DOs

- **DO** use App Password (not Gmail password) for email configuration
- **DO** change the JWT secret key before deploying to production
- **DO** set admin credentials via environment variables, never hardcode
- **DO** regularly backup your database
- **DO** test the extension after every Chrome update (DOM selectors can change)
- **DO** keep the Gemini API key in extension popup storage only (never server-side)
- **DO** use HTTPS in production for both frontend and backend
- **DO** set strong passwords for admin account (min 12 chars, mixed case, numbers)
- **DO** monitor the notifications tab daily for user queries

### ❌ DON'Ts

- **DON'T** expose your JWT secret key in public repositories
- **DON'T** share admin credentials with anyone
- **DON'T** hardcode production database credentials in `application.properties`
- **DON'T** use `ddl-auto=create` in production (use `update` or `validate`)
- **DON'T** delete your own admin account from the users table
- **DON'T** ignore user queries — respond within 24 hours for good UX
- **DON'T** store sensitive user data beyond what's necessary
- **DON'T** skip testing after building a new extension version
- **DON'T** commit the `dist/` or `dist-firefox/` folders to Git

---

## 📞 Contact & Support

### Developer

**Gopal Krishna**
- 🎓 B.Tech Computer Science, PSIT Kanpur (2022–2026)
- 💼 Full Stack Developer — Java, Spring Boot, React
- 📧 Email: gopalkrishna@example.com
- 🐙 GitHub: [@gopalkrishna06114](https://github.com/gopalkrishna06114)
- 💼 LinkedIn: [linkedin.com/in/gopalkrishna](https://linkedin.com/in/gopalkrishna)

### Report Issues

Found a bug? Please open an issue on GitHub with:
1. Browser and version
2. Which AI platform (Claude/ChatGPT/Gemini/Perplexity)
3. What you expected vs what happened
4. Console errors (F12 → Console)

### API Endpoints Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | None | Register new user |
| POST | `/api/auth/login` | None | Login + get JWT |
| GET | `/api/user/profile` | USER | Get own profile |
| PUT | `/api/user/profile` | USER | Update profile |
| POST | `/api/user/download` | USER | Track download |
| GET | `/api/user/downloads` | USER | Get download history |
| POST | `/api/user/query` | USER | Submit query |
| GET | `/api/user/queries` | USER | Get own queries |
| GET | `/api/admin/stats` | ADMIN | Dashboard statistics |
| GET | `/api/admin/users` | ADMIN | All users |
| DELETE | `/api/admin/users/{id}` | ADMIN | Delete user |
| POST | `/api/admin/users/{id}/mail` | ADMIN | Send mail to user |
| GET | `/api/admin/queries` | ADMIN | All queries |
| POST | `/api/admin/queries/{id}/reply` | ADMIN | Reply to query |
| GET | `/api/admin/notifications` | ADMIN | Unread notifications |
| PUT | `/api/admin/notifications/{id}/read` | ADMIN | Mark as read |
| GET | `/api/admin/downloads` | ADMIN | All downloads |
| GET | `/api/files/download/{filename}` | None | Download extension file |

---

## 💡 Suggestions & Feedback

We welcome all feedback! Here's how to contribute:

### For Users
- Use the **Contact tab** in your dashboard to submit queries or suggestions
- Rate and review the extension on the Chrome Web Store (coming soon)
- Share ContextSnap with colleagues who use AI tools daily

### For Developers
- Fork the repository and submit Pull Requests
- Open GitHub Issues for bug reports
- Suggest new AI platform integrations (Mistral, Copilot, etc.)

### Known Limitations

1. **DOM Selector Fragility** — AI platforms update their UI frequently. If the Snap button stops appearing, the content script selectors likely need updating. Check the GitHub Issues page for fixes.

2. **Token Limit on Summary** — Very long conversations (500+ messages) may hit Gemini's input token limit. The extension falls back to raw prompt in this case.

3. **Firefox Temporary Install** — Firefox requires re-loading the extension after each browser restart until published to the Add-ons Store.

4. **Email System** — Email notifications require manual Gmail App Password setup (see Future Improvements section above).

5. **CORS in Production** — Remember to update CORS allowed origins in `SecurityConfig.java` after deploying.

---

## 📄 License

```
MIT License

Copyright (c) 2025 Gopal Krishna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgements

- [Anthropic Claude](https://claude.ai) — AI assistant used throughout development
- [Google Gemini](https://gemini.google.com) — AI summarization API
- [Spring Boot](https://spring.io) — Backend framework
- [Vite](https://vitejs.dev) — Frontend build tool
- [Tailwind CSS](https://tailwindcss.com) — Styling framework
- [Framer Motion](https://www.framer.com/motion/) — Animations

---

<div align="center">

**Built with ❤️ by Gopal Krishna**

*If ContextSnap saved you time today, consider giving it a ⭐ on GitHub!*

[⬆ Back to Top](#-contextsnap--never-lose-your-ai-context-again)

</div>
