# Birthday Reminder Backend API

A scalable backend system for a **Birthday Reminder Mobile App** that allows users to store birthdays, receive reminders, and get notifications.

---

# Tech Stack

* **Backend**: NestJS
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Notifications**: Firebase Cloud Messaging (FCM)

---

# Features

* User registration
* Manage birthdays (CRUD)
* Store device tokens (FCM)
* Push notifications for reminders
* Cron-based scheduler for automatic alerts
* Swagger API documentation

---

# Project Structure

```
src/
├── prisma/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── birthday/
│   ├── device/
│   ├── notification/
│
├── common/
├── app.module.ts
└── main.ts
```

---

# Setup Instructions

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Setup Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/birthday_db"
```

---

## 3. Setup Database (Prisma)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 4. Run Project

```bash
npm run start:dev
```

---

# API Documentation (Swagger)

After running the app:

Open:

```
http://localhost:3000/api
```

---

# API Endpoints Overview

## Auth

* `POST /auth/register`

## Birthdays

* `POST /birthdays`
* `GET /birthdays`
* `DELETE /birthdays/:id`

## Devices

* `POST /devices`

---

# Notification Flow

1. App generates FCM token
2. Token saved via `/devices` API
3. User adds birthday
4. Scheduler runs daily
5. Notification sent using Firebase

---

# Scheduler

* Runs daily at **9 AM**
* Checks upcoming birthdays
* Sends notifications based on `reminderDays`

---

# FCM Setup (Important)

* Add `firebase-key.json` in project root
* Configure Firebase Admin SDK
* Store device tokens in DB

---

# Important Notes

* Currently using **demo user ID (no auth yet)**
* JWT authentication can be added later
* Use **real device for FCM testing**

---

# Future Improvements

* JWT Authentication
* Contact sync
* AI birthday message generator
* Multi-reminder support
* Timezone handling

---

# Author

Mani

---

# License

MIT
