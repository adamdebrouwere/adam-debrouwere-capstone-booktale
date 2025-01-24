# Booktale

Deployed at [Booktale](booktale.netlify.app)

### How To Build

#### Install dependencies
```npm install```

#### Start development server
```npm run dev```

## Overview

This app allows users to to create, comment on, and collect QR codes linked to books. It includes robust user authentication, book and comment saving, and geolocation. 

### Problem Space

This app enables users to see where books have been, what past contributors thought about it, and future locaitons and thoughts about a text after they give it away.

### User Profile

Travelers and used book enthusiasts alike. My initial idea for this app came from my experience traveling and swapping books in hostels and used book stores. When I pick up a used book I wonder about it's past and I want to know how an old book of mine has travelled and affected its future readers. 

### Features

- User account create/login with past books and comments saved 
- User home page displaying recent activity of past books;
- User can create a new qr for a book
- User can see and set comments on a QR code they scan
- User can see past books, and new comments on past books.

## Implementation

### Tech Stack

HTML5, SCSS, JavaScript, React, PostgreSQL, Node.js, Express, JWT's.

Client side: react, react router, axios, html5-qrcode, qrcode-decoder-js, psql

Server Side: knex, uuid, qrcode, scrypt

### APIs

- Uses Open Library API to search books and display book information.

### Sitemap

- Comments - anyone who scans a Booktale QR can see the comments.
- Log in or create account - if user wants to save books and comment.
- Create a new Booktale QR.
- Past books page - users can see their past books and comments, and new comments made on their past books.

### Mockups

### landing page
![](public/mockups/Landing.jpg)

### homepage
![](public/mockups/homepage.jpg)


### comments/login/signup
![](public/mockups//comments-login-signup.jpg)

### tales/createTales
![](public/mockups//tales-create.jpg)


### Data

![](public/data/dataLayoutForBookTale.png)

### Endpoints

GET books data from API

GET user data, comment data, qrcode data, from server

POST user data, comment data, qrcode data, to server

PUT user data

## Roadmap

Sprint 1 - qr code to comment section, db migrate and seed, log in UX for comments, create a BookTale

Sprint 2 - connect to api to display book data, save users comments and books scanned, homepage and display books with new comments

Sprint 3 -  style for all sizes - deploy

---

## Future Implementations

- Connect to google books api to use google to authenticate users. 
- Ability to put up books for trade with other users. 
- Track friends booktale progress (follow)
- Book recommendations based on like genre (potential advertisement opportunity)
