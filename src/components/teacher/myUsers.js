

import TeacherSideBar from "./teacherSideBar";
import {Link} from "react-router-dom";


function UserList(){
    return (
        <div className="container mt-4">
            <div className="row">
               <aside className="col-md-3">
                   <TeacherSideBar/>
                </aside>
                <section className="col-md-9">
                     <div className="card">
                          <h5 className="card-header">My Users</h5>
                          <div className="card-body">
                              <table className="table table-bordered">
                                  <thead>
                                       <tr>
                                           <th>Name</th>
                                           <th>Enrolled Course</th>
                                           <th>Action</th>
                                       </tr>
                                  </thead>
                                  <tbody>
                                       <td><Link to="/">Mike Otori</Link></td>
                                       <td><Link to="/">Django</Link></td>
                                       <td>
                                            <button className="btn btn-danger btn-sm active">Delete</button>
                                       </td>
                                  </tbody>
                              </table>

                          </div>
                     </div>
                </section>
            </div>
        </div>
    )
}

export default UserList;