# Music Library Management API

## Overview
The Music Library Management API is a RESTful service designed for organizations to manage their collection of Artists, Albums, and Tracks. It features role-based access control, allowing users to personalize their experience by marking items as favorites.

## Key Features

### Role-Based Access Control
- **Admin**: Full control over users and content.
- **Editor**: Can manage Artists, Albums, and Tracks.
- **Viewer**: Read-only access.

### Entity Management
- CRUD operations for Users, Artists, Albums, and Tracks.

### Favorites System
- Users can favorite Artists, Albums, and Tracks.

### Authentication & Authorization
- Secure login/signup with token-based authentication.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Hosting**: Render, AWS

## Setup Instructions

### Clone the Repository
```
git clone <repository-url>
cd music-library-api
```

## Endpoints
```
Method	Endpoint
POST	/signup	
POST	/login
GET	/users (Admin only)
POST	/users/add-user	(Admin only)
DELETE	/users/:id (Admin only)
GET	/artists
POST	/artists/add-artist	(Admin/Editor)
GET	/albums
POST	/albums/add-album (Admin/Editor)
GET	/tracks	
POST	/tracks/add-track (Admin/Editor)
GET	/favorites/:category
POST	/favorites/add-favorite
DELETE	/favorites/remove-favorite/:id
```
Install Dependencies
```bash
npm install
