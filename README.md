# DoubtSharing App
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

DoubtSharing is an application designed to facilitate efficient communication between students and tutors for addressing academic doubts. The platform supports both students and tutors, allowing them to engage in real-time doubt resolution.

## Features

### User Roles

#### Students
- Students can log in or register.
- Each student has a class grade and language associated with their profile.

#### Tutors
- Tutors can log in or register.
- Tutors have specific expertise, including allowed doubt subject types, class grade, and language that they teach.

### Doubt Requests

- Students can create doubt requests, specifying the doubt subject type.
- Tutors receive real-time notifications for doubt requests matching their expertise (class grade, language, and doubt subject type).

### Matching Algorithm

- The system intelligently matches student doubt requests with online tutors based on class grade, language, and doubt subject type.

### Chat Consultation

- The first tutor who accepts a student's doubt request gets connected for a chat consultation.
- During the chat, tutors can provide explanations and clarify doubts, fostering effective learning.

### Doubt History

- Students can view their doubt history (logs) on the platform for future reference.
- Doubt history provides a comprehensive record of resolved doubts and discussions.

## Technologies Used

- Frontend: [React](https://reactjs.org/)
- Backend: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)

## Getting Started

1. Clone the repository: `git clone https://github.com/LalitKumar234/doubt-share-patform.git`
2. Install dependencies: `npm install` (for both frontend and backend)
3. Create a .env file inside the root of a backend folder and add your `MONGO_URI=` and `JWT_STRING`
4. Start the server: `npm run dev` (backend)
5. Start the client: `npm run dev` (frontend)

## Some Screenshots

<img width="1582" alt="image" src="https://github.com/LalitKumar234/doubt-share-patform/assets/64685787/1a644342-d309-421b-93fb-76aff524b13a">

<img width="1582" alt="image" src="https://github.com/LalitKumar234/doubt-share-patform/assets/64685787/4efa3a64-7e1b-4819-9977-130500cbbffc">

<img width="1582" alt="image" src="https://github.com/LalitKumar234/doubt-share-patform/assets/64685787/4b14d0f0-5a25-49a5-add7-947833b4c65c">

