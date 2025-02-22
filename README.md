# TaskTide

TaskTide is a task management application that allows users to create, update, delete, and reorder tasks with a drag-and-drop interface. The frontend is built with React and Vite, ensuring a fast and responsive experience.

## Live Demo
[TaskTide](https://tasktide-app.vercel.app/)

## Features
- User authentication with Firebase (Google Sign-in)
- Task categorization: To-Do, In Progress, Done
- Drag-and-drop functionality using `react-beautiful-dnd`
- Real-time updates and synchronization with the backend
- Mobile-responsive UI with Tailwind CSS
- Dark mode toggle (Bonus)
- Task due dates with color indicators (Bonus)
- Activity log to track task changes (Bonus)

## Tech Stack
- **Frontend:** Vite.js, React.js, Tailwind CSS
- **Authentication:** Firebase (Google Sign-in)
- **Drag & Drop:** react-beautiful-dnd
- **State Management:** React Context API

## Installation
### Prerequisites
- Node.js installed
- Firebase project set up for authentication

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/tasktide.git
   cd tasktide/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your Firebase credentials:
   ```sh
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.





