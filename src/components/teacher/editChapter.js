import TeacherSideBar from "./teacherSideBar";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';


const baseUrl='http://127.0.0.1:8000/api';

function EditChapter(){
    const [chapterData, setChapterData]=useState({
        course:'',
        title:'',
        description:'',
        prev_video:'',
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

const handleFileChange=(event)=>{
    setChapterData({
        ...chapterData,
        [event.target.name]:event.target.files[0]
    })
} 
//End

const {chapter_id}=useParams()

// Submit Form
const submitForm=()=>{
    const _FormData=new FormData();
   
    _FormData.append("course",chapterData.course);
    _FormData.append("title", chapterData.title);
    _FormData.append("description", chapterData.description);
    if(chapterData.video!==''){
        _FormData.append("video", chapterData.video, chapterData.video.name);

    }
    _FormData.append("remarks", chapterData.remarks)

    try{
        axios.put(baseUrl+'/chapter/'+chapter_id, _FormData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((res)=>{
            if(res.status==200){
                    Swal.fire({
                        title: 'Data has been updated',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showCanfirmButton:false
                    })
                }

            // window.location.href='/add-chapter/1';
        })
    }catch(error){
        console.log(error);
    }

};

useEffect(()=>{
    try{
        axios.get(baseUrl+'/chapter/'+chapter_id)
        .then((res)=>{
            console.log(res.data)
            setChapterData({
                course:res.data.course,
                title:res.data.title,
                description:res.data.description,
                prev_video:res.data.video,
                remarks:res.data.remarks,
                video:''
            });
        });
    }catch(error){
        console.log(error);
    }
},[])

    return(
        <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
               <TeacherSideBar/>
            </aside>
            <section className="col-md-9">
               <div className="card">    
                  <h5 className="card-header">Update Chapter</h5>
                  <div className="card-body">
                   <form> 
                        <div className="mb-3 row">
                                <label for="title" className="form-label">Title</label>
                                <input type="text" value={chapterData.title} onChange={handleChange} name="title" id="title" className="form-control"/>
                                
                        </div>
                       
                        <div className="mb-3">
                            <label for="description" className="form-label">Description</label>
                            <textarea value={chapterData.description} onChange={handleChange} name="description" className="form-control"></textarea>
                        </div>
                        <div className="mb-3 row">
                            <label for="video" className="form-label">Video</label>
                                    <input type="file" onChange={handleFileChange} className="form-control" id="video"/>
                                    <video controls width="100%" height="240" className="mt-2">
                                        <source src={chapterData.prev_video} type="video/mp4"/>
                                    </video>
                        </div>
                      
                       <div className="mb-3">
                            <label for="remarks" className="form-label">Remarks</label>
                            <textarea value={chapterData.remarks} onChange={handleChange} name="remarks" placeholder="This video is focused on Beginners" className="form-control"></textarea>
                        </div>
                                <hr/>
                            <button type="button" onClick={submitForm} className="btn btn-primary">Submit</button>

                     </form>   
                   </div>      
               </div>      
            </section>
        </div>
    </div>
    )
}

export default EditChapter;