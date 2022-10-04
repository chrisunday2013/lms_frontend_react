import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

function Header(){
    const [searchData, setSearchData]=useState({
        'search':''
    });
    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    
     // change value of element
    const handleChange=(event)=>{
    setSearchData({
        ...searchData,
        [event.target.name]:event.target.value
    });
    }

    const searchCourse=()=>{
        if (searchData.search !='') {
            window.location.href="/search/"+searchData.search
        }
    }
   
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Learning Portal</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <form className="d-flex">
                    <input name="search" onChange={handleChange} className="form-control me-2" type="search" placeholder="Search by course title" aria-label="Search"/>
                    <button onClick={searchCourse} className="btn btn-outline-success" type="button">Search</button>
                </form>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                       <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                       <Link className="nav-link" to="/all-courses">Courses</Link>
                       <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                            data-bs-toggle="dropdown" aria-expanded="false">
                                Teacher
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {teacherLoginStatus !== 'true' &&
                                <>
                                <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                                <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li>
                                </>
                                 }
                                 {teacherLoginStatus=== 'true' &&
                                 <>
                                <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                                <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                                </>
                                }
                            </ul>
                               
                            </li>

                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                            data-bs-toggle="dropdown" aria-expanded="false">
                                User
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {studentLoginStatus !== 'true' &&
                              <>
                                <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                                <li><Link className="dropdown-item" to="/user-register">Register</Link></li>
                              </>    
                            }
                            {studentLoginStatus==='true' &&
                                <>
                                <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                                <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li>
                                </>
                            }
                            </ul>
                        </li>
                          
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;