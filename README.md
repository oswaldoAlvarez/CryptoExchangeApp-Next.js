# 🚀 MyApp

---

## 🎬 Getting Started

### 1. Clone the repository

```bash
$ git clone https://github.com/your-username/myApp.git  
$ cd cryptoapp
```

### 2. Install dependencies

```bash
$ npm install
```

### 3. Configure environment variables

Create a file named `` in the project root with:

```env
# Supabase direct connection (port 5432), SSL required
DATABASE_URL="postgresql://postgres:pass@localhost:5432/postgres?schema=public"

# NextAuth configuration\NEXTAUTH_URL="http://localhost:3000"  
NEXTAUTH_SECRET="a-very-secure-random-string"
```

### 4. Prisma: Generate & Migrate

```bash
$ npx prisma generate
$ npx prisma migrate deploy
```

### 5. Run Dev Server

```bash
$ npm run dev
```

Open → [http://localhost:3000](http://localhost:3000)\
Register at `/register` or login at `/login`.

---

## 🏗️ Architecture & Libraries

### Clean Architecture

- **Separation of Concerns**: UI, logic, and infra in distinct layers.
- **Testability**: Core logic decoupled from frameworks/APIs.
- **Maintainability**: Easy to extend/refactor safely.

### Zustand (Global State)

- **Minimal Boilerplate** without Context API overhead.
- **Performance** via selectors & shallow comparison.
- **Flexibility** for app-wide data (selected coin, theme, etc.).

### Axios + React Query

#### Axios

- Clean HTTP syntax.
- Interceptors, timeouts, error handling.

#### React Query

- Caching & background refetch.
- Paginated & infinite queries support.
- Simplified loading & error state hooks.

> **Benefits:** Modular & testable, responsive with fresh data, rapid development.

