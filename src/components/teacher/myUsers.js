import TeacherSideBar from "../teacher/teacherSideBar";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import MessageList from "../messageList";


const baseUrl='http://127.0.0.1:8000/api';

function UserList(){

    const [studentData, setStudentData]=useState([]);

    const [msgData, setMsgData]=useState({
        msg_text:'',
    });

    const [successMeg, setSuccessMessage]=useState('')
    const [errorMeg, setErrorMessage]=useState('')


    const teacherId=localStorage.getItem('teacherId');;
        
    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/fetch-all-Enrolled-students/'+teacherId)
            .then((res)=>{
                setStudentData(res.data);
            })
        }catch(error){
            console.log(error);
        }
    },[]);

     // change value of element
  const handleChange=(event)=>{
    setMsgData({
        ...msgData,
        [event.target.name]:event.target.value
    });
}


// Submit Form
const handleSubmit=(student_id)=>{
    const _FormData=new FormData();
    _FormData.append("msg_text", msgData.msg_text);
    _FormData.append("msg_from", "teacher")
    
   
    try{
        axios.post(baseUrl+'/send-message/'+teacherId+'/'+student_id, _FormData)
        .then((response)=>{
            if(response.data.bool===true){
                setMsgData({
                    'msg_text':''
                })
                setSuccessMessage(response.data.msg);
                setErrorMessage('');
            }else{
                setErrorMessage(response.data.msg);
                setSuccessMessage('');
            }

        });
    }catch(error){
        console.log(error);
    }

};
    const msgList={
        height:'800px',
        overflow:'auto'
    }

    return (
        <div className="container mt-4">
            <div className="row">
               <aside className="col-md-3">
                   <TeacherSideBar/>
                </aside>
                <section className="col-md-9">
                                <div className="card">
                          <h5 className="card-header">All Enrolled Student List</h5>
                          <div className="card-body">
                           
                              <table className="table table-bordered">
                                  <thead>
                                       <tr>
                                           <th>Name</th>
                                           <th>Email</th>
                                           <th>Username</th>
                                           <th>Interested Category</th>
                                           <th>Assignment</th>
                                       </tr>
                                  </thead>
                                  <tbody>
                                       {studentData.map((row, index)=>
                                       <tr>
                                            <td><Link to={`/view-student/`+row.student.id}>{row.student.full_name}</Link></td>
                                            <td>{row.student.email}</td>
                                            <td>{row.student.username}</td>
                                            <td>{row.student.interested_categories}</td>
                                            <td >
                                                 <Link to={`/show-assignment/${row.student.id}/${teacherId}`}  className="btn btn-sm btn-warning mb-2 me-2">Assignments</Link>
                                                 <Link to={`/add-assignment/${row.student.id}/${teacherId}`} className="btn btn-sm btn-success mb-2 me-2">Add Assignment</Link>
                                                 <button data-bs-toggle="modal" data-bs-target={`#msgModal${index}`} className='btn btn-sm btn-dark mb-2' title="Send Message" ><i className="bi bi-chat-dots-fill"></i></button>


                                                <div className="modal fade" id={`msgModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog modal-fullscreen">
                                                        <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                <span className="text-danger ms-1">{row.student.full_name}</span>
                                                            </h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="row">
                                                               <div className="col-md-8 mb-2 col-12 border-end" style={{msgList}}>
                                                                 
                                                                       <MessageList teacher_id={teacherId} student_id={row.student.id}/>
                                                                   
                                                                </div>
                                                                    <div className='col-md-4 col-12'>
                                                                      {successMeg && <p className="text-success">{successMeg}</p>}
                                                                      {successMeg && <p className="text-success">{errorMeg}</p>}
                                                                        <form>
                                                                            <div className="mb-3">
                                                                                <label for="exampleInputEmail1" className="form-label">Message</label>
                                                                                <textarea value={msgData.msg_text} onChange={handleChange} name="msg_text" className="form-control" rows="10"></textarea>
                                                                            </div>
                                                                           
                                                                            <button onClick={()=>handleSubmit(row.student.id)} type="button" className="btn btn-primary">Submit</button>
                                                                        </form>
                                                                    </div>
                                                            </div>
                                                        </div>
                                        
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                       </tr>   
                                       )}
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