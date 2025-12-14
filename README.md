

````markdown
# Fit Plan Hub 🏋️‍♂️

FitPlanHub is a full-stack MERN application connecting fitness trainers with users. Trainers can create and sell workout plans, while users can follow their favorite trainers and subscribe to premium content.

## 🚀 Features

### **Authentication & Roles**
* **Role-Based Access Control (RBAC):** Separate Signup/Login flows for **Trainers** and **Users**.
* **Secure Auth:** JWT (JSON Web Tokens) for session management and bcrypt for password hashing.

### **For Trainers**
* **Dashboard:** Create, view, and delete fitness plans.
* **Content Management:** Set plan details like title, description, price, and duration.
* **Profile:** Public profile displaying all created plans.

### **For Users**
* **Personalized Feed:** Filter plans to show only trainers you follow.
* **Subscriptions:** "Subscribe" to plans (simulated payment) to unlock full content.
* **Access Control:** Unsubscribed users see a preview (locked content); subscribers see full details.
* **Interaction:** Follow/Unfollow trainers.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS v4, React Router DOM, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT, BcryptJS

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/krishshah1519/FitPlanHub.git
cd FitPlanHub
````

### 2\. Backend Setup

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    npm install express dotenv mongoose cors

    ```
3.  Create a `.env` file in the `backend` folder and add:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```
4.  Start the server:
    ```bash
    npm run dev
    # Server runs on http://localhost:5000
    ```

### 3\. Frontend Setup

1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React app:
    ```bash
    npm run dev
    # App runs on http://localhost:5173
    ```

-----

## 📡 API Endpoints

### **Authentication**

  * `POST /api/auth/signup` - Register a new user/trainer
  * `POST /api/auth/login` - Login and receive JWT

### **Plans**

  * `GET /api/plans` - Fetch all plans
  * `POST /api/plans` - Create a plan (Trainer only)
  * `DELETE /api/plans/:id` - Delete a plan (Trainer only)
  * `POST /api/plans/:id/subscribe` - Subscribe to a plan (User only)

### **Users & Relationships**

  * `GET /api/users/profile` - Get current user profile (with following list)
  * `PUT /api/users/:id/follow` - Follow a trainer
  * `PUT /api/users/:id/unfollow` - Unfollow a trainer

-----

## 🧪 How to Test (Walkthrough)

1.  **Register a Trainer:** Sign up as "Trainer Mike" (Role: Trainer).
2.  **Create Content:** Go to the Dashboard and create a "30-Day Shred" plan.
3.  **Register a User:** Logout and sign up as "User John" (Role: User).
4.  **Browse:** Go to the Home Page. You will see the plan but the content is **locked**.
5.  **Subscribe:** Click "Subscribe". The button changes to "✅ Subscribed".
6.  **Access Content:** Click "Details". You can now see the full workout description.
7.  **Filter:** Follow "Trainer Mike" and use the "Filter: Following Only" toggle on the Home page.

-----

## 📂 Folder Structure

```
FitPlanHub/
├── backend/
│   ├── controllers/   # Logic for Auth, Plans, and Users
│   ├── middleware/    # Auth protection & Role checks
│   ├── models/        # Mongoose Schemas (User, Plan)
│   ├── routes/        # API Routes
│   └── app.js         # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI (Navbar, PlanCard)
    │   ├── context/    # Auth Context (Login state)
    │   ├── pages/      # Full pages (Home, Dashboard, Login)
    │   └── main.jsx    # React Entry
```