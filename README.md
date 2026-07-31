# Rainbow Gyms 🏋️🌈

Rainbow Gyms is a web application designed to help users find workout partners and organize gym sessions. Users can create workout sessions, browse available sessions, join groups, and connect with other members of the gym community.

The goal of Rainbow Gyms is to make finding workout partners easier by allowing users to discover sessions based on workout type, availability, and other user profiles.

## Live Application

The application is deployed through Vercel.

To use the application:
1. Open the deployed website.
2. Create an account or sign in.
3. Browse available gym sessions and interact with other users.

All users share the same database through NeonDB, meaning users can see sessions, profiles, and activity created by other members.

---

# Features

## Authentication
- User registration and login
- Secure credential-based authentication
- User roles:
  - User
  - Admin

## User Profiles
Users can create and view profiles containing:
- Display name
- Profile picture
- Major
- School year
- Experience level
- Bio

Users can view other members' profiles to learn more about potential workout partners.

## Gym Sessions
Users can:
- Create workout sessions
- Browse available sessions
- Join workout sessions
- View session details
- Track session capacity
- Manage their created sessions

Each session contains:
- Workout name
- Workout type
- Host
- Location
- Date/time
- Description
- Maximum participants
- Current participants
- Session status

## Session Discovery
Users can filter sessions by:
- Workout type
- Date

The browse page updates dynamically without requiring a page refresh.

---

# Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- React Bootstrap

## Backend
- Next.js Server Actions
- Prisma ORM
- PostgreSQL

## Database Hosting
- NeonDB PostgreSQL

## Authentication
- NextAuth / Auth.js

## Deployment
- Vercel

---

# Database Structure

Rainbow Gyms uses Prisma ORM with a PostgreSQL database.

## Database Relationships

### User ↔ Profile
**One-to-One Relationship**

A user can have one profile, and each profile belongs to one user.

Relationship:


Example:
- One account has one profile page.
- A profile cannot exist without a user.

---

### User ↔ Session
**One-to-Many Relationship**

A user can create multiple workout sessions, but each session has only one host.

Relationship:

Example:
- A user can host:
  - Monday Chest Workout
  - Friday Leg Workout
  - Weekend Cardio Session

- Each session belongs to one host.

---

### User ↔ SessionParticipant ↔ Session
**Many-to-Many Relationship**

Users can join many sessions, and sessions can have many users.

This relationship is implemented using the `SessionParticipant` join table.

Relationship:


Example:
- A user can join multiple workout sessions.
- A workout session can contain multiple participants.

The join table stores:
- User ID
- Session ID
- Join date
