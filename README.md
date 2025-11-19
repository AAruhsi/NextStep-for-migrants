# NextStep

![NextStep Preview](Screenshot%202025-03-17%20233512.png)

## Project Overview

**Next Step** is a comprehensive platform designed to assist individuals relocating to a new city in India. It provides a one-stop solution for discovering:

* **Nearby healthcare facilities** (hospitals, clinics, pharmacies)
* **Available government policies and welfare schemes**
* **Local job opportunities**
* **Educational courses and training institutes**

By leveraging the user’s current location, Next Step personalizes recommendations and resources, making the transition to a new city smoother and more informed.

---

## Tech Stack

### **Frontend**

* React (with Vite)
* Tailwind CSS
* React Router DOM
* React Leaflet (for interactive maps)
* Lucide React (icons)
* Axios (API requests)

### **Backend**

* Node.js
* Express.js
* Mongoose (MongoDB ODM)
* JWT (authentication)
* Nodemailer (email/OTP services)
* dotenv (environment variables)
* CORS

### **Database**

* MongoDB

### **APIs & Libraries**

* OpenStreetMap (map tiles)
* Custom REST APIs for user, jobs, courses, policies, institutes, hospitals, etc.

---

## Getting Started

### **1. Clone the Repository**

```bash
git clone https://github.com/AAruhsi/NextStep-for-migrants.git
cd NextStep-for-migrants
```

### **2. Install Dependencies**

#### Backend:

```bash
cd "./backend"
npm install
```

#### Frontend:

```bash
cd "./client"
npm install
```

### **3. Environment Variable Setup**

Create a `.env` file inside **backend** with the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### **4. Run the Project Locally**

#### Start backend server:

```bash
cd "Frontend NextStep/backend"
npm run dev
```

#### Start frontend server:

```bash
cd "../nextstep"
npm run dev
```

* Frontend: **[http://localhost:5173](http://localhost:5173)**
* Backend: **[http://localhost:5000](http://localhost:5000)/api**

---

## Project Flow

### **1. Location Permission**

On first visit, the app requests permission to access the user’s location for personalized recommendations.

### **2. Dashboard**

Shows a quick summary of key resources: healthcare, jobs, policies, courses, and institutes.

### **3. Select Category**

User can choose:

* Healthcare
* Jobs
* Policies
* Courses
* Institutes

### **4. View Resources**

* **Healthcare:** Interactive map with nearby facilities
* **Jobs:** Local job listings
* **Policies:** Relevant government schemes
* **Courses/Institutes:** Available educational resources

### **5. Save & Personalize**

Users can save jobs, courses, policies, and institutes for future reference.

### **6. Profile & Recommendations**

Displays saved items and personalized suggestions based on user preferences and location.

---

## Directory Structure

```
NextStep-for-migrants/
│
├── Frontend NextStep/
│   ├── backend/                     # Node.js/Express backend
│   │   ├── models/                  # Mongoose models
│   │   ├── routes/                  # Express routes
│   │   ├── controllers/             # Business logic
│   │   ├── config/                  # DB + env config
│   │   └── server.js                # Backend entry point
│   │
│   └── nextstep/                    # React frontend
│       ├── src/
│       │   ├── assets/              # Static assets
│       │   ├── components/          # React components
│       │   ├── Context/             # Context API
│       │   ├── pages/               # React Pages
│       │   ├── App.jsx              # Main app component
│       │   └── main.jsx             # React entry point
│       └── package.json             # Frontend dependencies
│
├── README.md                        # Documentation
└── ...                              # Other files
```

---

## Contributing

We welcome contributions!

1. Fork the repository
2. Create a new branch
3. Commit your changes with clear messages
4. Open a pull request describing your modifications

---

## License

This project is open-source and available under the **MIT License**.

---

## ✨ Next Step — Making relocation easier, one city at a time.



Just tell me!
