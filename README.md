# trackAS: Smart Attendance System

## Project Description

trackAS is a smart attendance system built using React and Vite. It leverages QR codes and geolocation to enable lecturers to efficiently take attendance in classes and manage schedules, while providing a straightforward attendance process for students.

## Features

- Lecturer registration and login
- Create and manage class schedules
- Generate QR codes for attendance sessions
- Use geolocation to verify student presence within a class location
- Record and track student attendance
- View previous class attendance records
- Export attendance data (inferred from `xlsx` dependency)

## Technologies Used

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS, DaisyUI
- **Routing:** React Router DOM
- **State Management:** (To be determined, based on code - maybe add a note if not immediately clear)
- **Backend:** Supabase (Authentication, Database)
- **QR Code Generation:** `qrcode.react`, `react-qr-code`
- **Geolocation/Mapping:** Leaflet, React Leaflet
- **HTTP Client:** Axios
- **Date/Time Handling:** Day.js
- **File Handling:** FileSaver, XLSX
- **Linting:** ESLint

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn
- A Supabase account and project

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd trackAS
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Supabase:**

    - Create a new project in your Supabase account.
    - Note down your Supabase Project URL and Anon Key.
    - Set up the necessary database tables and RLS (Row Level Security) policies as required by the application. (You may need to add specific table/schema details here if they are standard or crucial for setup).

4.  **Configure environment variables:**

    - Rename the `.env.example` file to `.env`.

    ```bash
    mv .env.example .env
    # or in Windows command prompt
    ren .env.example .env
    ```

    - Open the `.env` file and replace the placeholder values with your actual Supabase credentials and URLs:

    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    VITE_LOCALHOST_URL=http://localhost:5173
    VITE_VERCEL_URL=YOUR_VERCEL_APP_URL # Optional: if deploying to Vercel
    ```

## Running the Project

- **Development Mode:**

  ```bash
  npm run dev
  # or
  yarn dev
  ```

  This will start the development server, usually at `http://localhost:5173`.

- **Build for Production:**

  ```bash
  npm run build
  # or
  yarn build
  ```

  This will build the project for production in the `dist` folder.

- **Preview Production Build:**

  ```bash
  npm run preview
  # or
  yarn preview
  ```

  This will serve the production build locally.

## Project Structure (Basic)

```
trackAS/
├── node_modules/
├── public/ # Static assets
├── src/
│   ├── assets/ # Images, icons, etc.
│   ├── component/ # Reusable React components
│   ├── hooks/ # Custom React hooks
│   ├── page/ # Pages/Views of the application
│   ├── utils/ # Utility functions
│   ├── App.jsx # Main application component
│   ├── index.css # Global styles
│   └── main.jsx # Entry point
├── .gitignore
├── .env
├── .env.example
├── package.json
├── package-lock.json # or yarn.lock
├── README.md
├── tailwind.config.js
├── vite.config.js
├── vercel.json # Vercel deployment configuration
└── ... other config files
```

## Contributing

(Add contributing guidelines here if applicable)

## License

(Add license information here)

## Core Functionalities

This section provides a detailed look at the main features and their technical implementation:

### QR Code Generation and Attendance Process

- **QR Code Generation**: When a lecturer creates a class schedule, the system generates a unique QR code containing:
  - Class ID
  - Class location coordinates (latitude and longitude)
  - Attendance session timestamp
  - A unique session token for security
- The QR code is generated using the `qrcode.react` library and encodes a URL that directs students to the attendance page with the necessary parameters.

### Geolocation Verification

- **Location Verification Process**:
  1. When a student scans the QR code, the system extracts the class location coordinates
  2. The student's browser is prompted to share their current location using the Geolocation API
  3. The system calculates the distance between the student's location and the class location using the Haversine formula
  4. Attendance is only recorded if the student is within 20 meters of the class location
  5. The system includes error handling for:
     - Geolocation permission denials
     - GPS signal issues
     - Out-of-range locations

### Data Management with Supabase

- **Database Structure**:
  - `classes` table: Stores class schedules with location data
  - `attendance` table: Records student attendance with:
    - Student information
    - Class reference
    - Timestamp
    - Location verification status
    - Distance from class location
- **Security**:
  - Row Level Security (RLS) policies ensure data privacy
  - Authentication required for lecturer actions
  - Session tokens prevent unauthorized attendance marking

### User Interface Components

- **Landing Page (`/`)**: Entry point with role selection (Lecturer/Student)
- **Lecturer Registration (`/registerLecturer`)**: Account creation with email verification
- **Lecturer Login (`/loginLecturer`)**: Secure authentication using Supabase Auth
- **Class Schedule (`/classSchedule`)**:
  - Interactive calendar interface
  - Location selection using Leaflet maps
  - QR code generation for each class
- **Attendance (`/attendance`)**:
  - Student information input form
  - Real-time geolocation status display
  - Success/failure feedback
- **Previous Class (`/previousClass`)**:
  - Attendance history view
  - Export functionality for attendance records
  - Filtering and search capabilities

### Technical Implementation Details

- **Frontend**:
  - React components with hooks for state management
  - Tailwind CSS for responsive design
  - DaisyUI for pre-styled components
- **Backend Integration**:
  - Supabase client for real-time database operations
  - Secure API endpoints for data operations
  - Environment variable management for configuration
- **Performance Optimizations**:
  - Lazy loading for components
  - Caching of location data
  - Efficient QR code generation
- **Error Handling**:
  - Graceful fallbacks for geolocation failures
  - User-friendly error messages
  - Automatic retry mechanisms for failed operations

These features work together to provide a secure, efficient, and user-friendly attendance system that leverages modern web technologies for accurate attendance tracking.
