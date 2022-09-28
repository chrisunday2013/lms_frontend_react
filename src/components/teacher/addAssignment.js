import TeacherSideBar from "./teacherSideBar";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


const baseUrl='http://127.0.0.1:8000/api';

function AddAssignment(){
    const [assignmentData, setAssignmentData]=useState({
        title:'',
        detail:'',
    });

  // change value of element
  const handleChange=(event)=>{
    setAssignmentData({
        ...assignmentData,
        [event.target.name]:event.target.value
    });
}

//End
const {student_id}=useParams()
const {teacher_id}=useParams()

// Submit Form
const submitForm=()=>{
    const _FormData=new FormData();
   
    _FormData.append("teacher", teacher_id)
    _FormData.append("student", student_id)
    _FormData.append("title", assignmentData.title)
    _FormData.append("detail", assignmentData.detail)
   
    try{
        axios.post(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id, _FormData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((response)=>{
            // console.log(response.data);
            if(response.status===200||response.status===201){
                  Swal.fire({
                    title:'Assignment has been added',
                    icon: 'success',
                    toast:true,
                    timer:3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton: false
                  })
               window.location.reload();   
            }
        })
    }catch(error){
        console.log(error);
    }

};

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                   <TeacherSideBar/>
                </aside>
                <section className="col-md-9">
                   <div className="card">    
                      <h5 className="card-header">Add Assignment</h5>
                      <div className="card-body">
                       {/* <form>  */}
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="title" className="form-control" id="title"/>
                                    </div>
                            </div>
                           
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Detail</label>
                                <textarea onChange={handleChange} name="detail" className="form-control"></textarea>
                            </div>
                          
                                    <hr/>
                                    <button type="button" onClick={submitForm} className="btn btn-primary">Submit</button>

                           {/* </form>    */}
                       </div>      
                   </div>      
                </section>
            </div>
        </div>
    )
}

export default AddAssignment;