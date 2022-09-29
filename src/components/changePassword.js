import SideBar from "./sideBar";
import {useState, useEffect} from 'react';
import axios from "axios";


const baseUrl='http://127.0.0.1:8000/api';
function ChangePassword(){

    const [passData, setPassData]=useState({
        'password':'',

    });
    const studentId=localStorage.getItem('studentId');

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student/'+studentId)
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
            const studentFormData=new FormData();
    
            studentFormData.append("password", passData.password)
    
      
            try{
                axios.post(baseUrl+'/student/change-password/'+studentId, studentFormData)
                .then((response)=>{
                  
                    window.location.href='/user-logout'
                });
    
            }catch(error){
                 console.log(error);
                 setPassData({'status':'error'})
            }
        };
    
    
        const studentLoginStatus=localStorage.getItem('studentLoginStatus')
        if(studentLoginStatus!='true'){
            window.location.href='/user-login'
        }
    
        useEffect(()=>{
            document.title="Student Password Change"
        },[]);    

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                <SideBar/>
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

export default ChangePassword;