import {Link} from "react-router-dom";



function SideBar(){
    return (
        <div className="card">
            <div className="list-group list-group-flush">
                <Link to="/user-dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/my-courses" className="list-group-item list-group-item-action">My Courses</Link>
                <Link to="/favorite" className="list-group-item list-group-item-action">Favorite Courses</Link>
                <Link to="/recommended" className="list-group-item list-group-item-action">Recommended courses</Link>
                <Link to="/profile" className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to="/change-pwd" className="list-group-item list-group-item-action">Change Password</Link>
                <Link to="/user-login" className="list-group-item list-group-item-action text-danger">Logout</Link>
            </div>
        </div>
    )
}

export default SideBar;