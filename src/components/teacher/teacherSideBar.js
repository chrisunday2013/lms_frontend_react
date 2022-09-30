import {Link} from "react-router-dom";



function TeacherSideBar(){
    return (
        <div className="card">
            <div className="list-group list-group-flush">
                <Link to="/teacher-dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/teacher-coses" className="list-group-item list-group-item-action">My Courses</Link>
                <Link to="/my-users" className="list-group-item list-group-item-action">My Users</Link>
                <Link to="/add-course" className="list-group-item list-group-item-action">Add Course</Link>
                <Link to="/quiz" className="list-group-item list-group-item-action ">Quiz</Link>
                <Link to="/add-quiz" className="list-group-item list-group-item-action">Add Quiz</Link>
                <Link to="/teacher-profile" className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to="/teacher-change-pwd" className="list-group-item list-group-item-action">Change Password</Link>
                <Link to="/teacher-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
            </div>
        </div>
    )
}

export default TeacherSideBar;