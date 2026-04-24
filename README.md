# BFHL — SRM Full Stack Challenge Round 1

## 📌 Overview

This project is a full stack web application built as part of the **BFHL SRM Full Stack Challenge**.
It consists of a backend API deployed on Render and a frontend interface deployed on Netlify.

The application processes user input data and returns categorized results such as numbers, alphabets, special characters, and computed values.

---

## 🚀 Live Links

* 🔗 Frontend: https://roaring-fudge-bc7c37.netlify.app/
* 🔗 Backend API: https://my-project-1-ot2y.onrender.com

---

## 🛠️ Tech Stack

### Backend:

* Node.js
* Express.js

### Frontend:

* HTML
* CSS
* JavaScript (Fetch API)

### Deployment:

* Render (Backend)
* Netlify (Frontend)

---

## ⚙️ API Endpoint

### POST /bfhl

#### Request Body:

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

---

#### Response Format:

```json
{
  "is_success": true,
  "user_id": "yourname_ddmmyyyy",
  "email": "your_email@example.com",
  "roll_number": "your_roll_number",
  "even_numbers": ["334", "4"],
  "odd_numbers": ["1"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

---

## 🧠 Features

* ✔️ Identifies even and odd numbers
* ✔️ Extracts alphabets (converted to uppercase)
* ✔️ Detects special characters
* ✔️ Calculates sum of numbers
* ✔️ Generates concatenated string in reverse alternating caps

---

## 📁 Project Structure

```
/
├── index.js        # Backend server
├── package.json    # Dependencies and scripts
├── index.html      # Frontend UI
├── README.md       # Project documentation
```

---

## ▶️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/kshitija1888/my-project.git
cd my-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start server

```bash
node index.js
```

Server will run at:

```
http://localhost:3000
```

---

## 📬 Testing API

You can test using:

* Postman
* Thunder Client
* Browser (for GET only)

---

## ⚠️ Notes

* Make sure CORS is enabled for frontend-backend communication
* Backend expects POST requests with JSON body
* Frontend uses Fetch API to interact with backend

---

## 👨‍💻 Author

**Kshitija Patil**

---

 
 
 
