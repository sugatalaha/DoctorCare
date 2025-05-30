﻿## DoctorCare
DoctorCare is a web application designed to manage and search for doctors based on specific filters such as experience and consultation fees. Built with Next.js and Tailwind CSS, it offers a responsive and user-friendly interface for healthcare management.

## 🌐 Live Demo

Check out the live website here: [DoctorCare Live](https://doctorcare-website.onrender.com/)

## 🩺 Features
Add Doctor: Input details like name, specialization, experience, location, and fees.

Filter Doctors: Search for doctors based on experience range and consultation fees.

Responsive Design: Ensures usability across various devices.

Navigation Header: Includes links to Home, Doctors, Appointments, Login, and Sign Up pages.

## 🚀 Technologies Used
Frontend: Next.js, React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

## 🛠️ Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/sugatalaha/DoctorCare.git
cd DoctorCare
Install dependencies:

bash
Copy
Edit
npm install
Set up environment variables:

Create a .env.local file in the root directory and add the following:

env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
Run the development server:

bash
Copy
Edit
npm run dev
Open http://localhost:3000 to view the application.

📂 Folder Structure
```bash
DoctorCare/
├── pages/
│   ├── api/
│   │   ├── add-doctor.js
│   │   └── list-doctor-with-filter.js
│   └── index.js
├── components/
├── styles/
├── public/
├── .env.local
├── package.json
└── README.md
```
📋 API Endpoints
Add Doctor: POST /api/add-doctor

List Doctors with Filters: GET /api/list-doctor-with-filter?minExperience=&maxExperience=&minFees=&maxFees=

🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

📄 License
This project is licensed under the MIT License.

Feel free to customize this README.md further to match any additional features or configurations specific to your project.
