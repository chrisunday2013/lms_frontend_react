import TeacherSideBar from "./teacherSideBar";
import {useState, useEffect} from 'react';
import axios from "axios";


const baseUrl='http://127.0.0.1:8000/api';
function TeacherChangePassword(){

    const [passData, setPassData]=useState({
        'password':'',

    });
    const teacherId=localStorage.getItem('teacherId');

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher/'+teacherId)
            .then((res)=>{
                setPassData({
                    password:res.data.password,
                    
                });
            });
        }catch(error){
            console.log(error);
        }
    },[]);

       // change value of element
       const handleChange=(event)=>{
        event.preventDefault();
        setPassData({
            ...passData,
            [event.target.name]:event.target.value
        });
    }
    // end 

        // Submit Form
        const submitForm=()=>{
            const teacherFormData=new FormData();
    
            teacherFormData.append("password", passData.password)
    
      
            try{
                axios.post(baseUrl+'/teacher/change-password/'+teacherId, teacherFormData)
                .then((response)=>{
                  
                    window.location.href='/teacher-logout'
                });
    
            }catch(error){
                 console.log(error);
                 setPassData({'status':'error'})
            }
        };
    
    
        const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
        if(teacherLoginStatus!='true'){
            window.location.href='/teacher-login'
        }
    
        useEffect(()=>{
            document.title="Teacher Password Change"
        },[]);    

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                   <TeacherSideBar/>
                </aside>
                <section className="col-md-9">
                   <div className="card">    
                      <h5 className="card-header">Change Password</h5>
                      <div className="card-body">
                           
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                                    <div className="col-sm-10">
                                    <input type="text" value={passData.password} onChange={handleChange} name="password" className="form-control" id="inputPassword"/>
                                    </div>
                            </div>
                            <hr/>
                            <button onClick={submitForm} className="btn btn-primary">Update</button>

                      </div>      
                   </div>      
                </section>
            </div>
        </div>
    )
}

export default TeacherChangePassword;