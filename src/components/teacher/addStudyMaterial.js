import TeacherSideBar from "./teacherSideBar";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


const baseUrl='http://127.0.0.1:8000/api';

function AddStudyMaterial(){
    const [addStudyData, setAddStudyData]=useState({
        title:'',
        description:'',
        upload:'',
        remarks:''
    });

  // change value of element
  const handleChange=(event)=>{
    setAddStudyData({
        ...addStudyData,
        [event.target.name]:event.target.value
    });
}


const handleFileChange=(event)=>{
    window.URL = window.URL || window.webkitURL;
    var upload = document.createElement('upload');
    upload.src = URL.createObjectURL(event.target.files[0]);

    setAddStudyData({
        ...addStudyData,
        [event.target.name]:event.target.files[0]
    })
}



// const handleFileChange=(event)=>{
//     setAddStudyData({
//         ...addStudyData,
//         [event.target.name]:event.target.files[0]
//     })
// } 

const {course_id}=useParams()

// Submit Form
const submitForm=()=>{
    const _FormData=new FormData();
   
    _FormData.append("course",course_id);
    _FormData.append("title", addStudyData.title)
    _FormData.append("description", addStudyData.description)
    _FormData.append("upload", addStudyData.upload, addStudyData.upload.name);
    _FormData.append("remarks", addStudyData.remarks)

    try{
        axios.post(baseUrl+'/study-materials/'+course_id, _FormData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((response)=>{
            // console.log(response.data);
            if(response.status===200||response.status===201){
                  Swal.fire({
                    title:'Data has been added',
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
                      <h5 className="card-header">Add Study Material</h5>
                      <div className="card-body">
                       {/* <form>  */}
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="title" className="form-control" id="title"/>
                                    </div>
                            </div>
                           
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Description</label>
                                <textarea onChange={handleChange} name="description" className="form-control"></textarea>
                            </div>
                            <div className="mb-3 row">
                                    <label for="upload" className="form-label">Upload</label>
                                    
                                    <input type="file" onChange={handleFileChange} name="upload" className="form-control" id="upload"/>
                                    
                            </div>
                          
                           <div className="mb-3">
                                <label for="ramarks" className="form-label">Remarks</label>
                                <textarea onChange={handleChange} name="remarks" className="form-control" id="remarks"></textarea>
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

export default AddStudyMaterial;