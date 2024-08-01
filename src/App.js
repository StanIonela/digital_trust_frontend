import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import Students from "./pages/professor/Students";
import Subjects from "./pages/professor/Subjects";
import Grades from "./pages/professor/Grades";
import AssignSubjectForm from "./components/AssignSubjectForm";
import AddGradeForm from "./components/AddGradeForm";
import Home from "./pages/Home";
import StudentSubject from "./pages/student/Subject";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/students" element={<Students />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/grades" element={<Grades />} />

          <Route path="/studentSubjects" element={<StudentSubject />} />

          <Route path="/" element={() => <div>Home</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;