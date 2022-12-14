import TeacherSideBar from "./teacherSideBar";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


const baseUrl='http://127.0.0.1:8000/api';

function AddChapter(){
    const [videoDuration, setVideoDuration]=useState()
    const [chapterData, setChapterData]=useState({
        title:'',
        description:'',
        video:'',
        remarks:''
    });

  // change value of element
  const handleChange=(event)=>{
    setChapterData({
        ...chapterData,
        [event.target.name]:event.target.value
    });
}

// const handleFileChange=(event)=>{
//     setChapterData({
//         ...chapterData,
//         [event.target.name]:event.target.files[0]
//     })
// } 
//End

const handleFileChange=(event)=>{
    window.URL = window.URL || window.webkitURL;
    var video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        setVideoDuration(video.duration);
    }
    video.src = URL.createObjectURL(event.target.files[0]);

    setChapterData({
        ...chapterData,
        [event.target.name]:event.target.files[0]
    })
}

const {course_id}=useParams()

// Submit Form
const submitForm=()=>{
    const _FormData=new FormData();
   
    _FormData.append("course",course_id);
    _FormData.append("title", chapterData.title)
    _FormData.append("description", chapterData.description)
    _FormData.append("video", chapterData.video, chapterData.video.name);
    _FormData.append("video_duration", videoDuration);
    _FormData.append("remarks", chapterData.remarks)

    try{
        axios.post(baseUrl+'/chapter/'+course_id, _FormData, {
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
                      <h5 className="card-header">Add Chapter</h5>
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
                                    <label for="inputPassword" className="form-label">Video</label>
                                    <div className="col-sm-10">
                                    <input type="file" onChange={handleFileChange} name="video" className="form-control" id="video"/>
                                    </div>
                            </div>
                          
                           <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Remarks</label>
                                <textarea onChange={handleChange} name="remarks" placeholder="This video is focused on Beginners" className="form-control"></textarea>
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

export default AddChapter;