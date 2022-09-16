import TeacherSideBar from "./teacherSideBar";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';


const baseUrl='http://127.0.0.1:8000/api';

function EditCourse(){
    const [cosCat, setCosCat]=useState([]);
    const [courseData, setCourseData]=useState({
        category:'',
        title:'',
        description:'',
        prev_img:'',
        featured_img:'',
        technology:''
    });
    
    const {course_id}= useParams();
    
    // This fetch categories when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/category/')
            .then((response)=>{
                setCosCat(response.data)
            });    
        }catch(error){
            console.log(error);
        }

        // fetch current course data
        try{
            axios.get(baseUrl+'/teacherCourse-details/'+course_id)
            .then((res)=>{
                console.log(res.data)
                setCourseData({
                    category:res.data.category,
                    title:res.data.title,
                    description:res.data.description,
                    prev_img:res.data.featured_img,
                    featured_img:'',
                    technology:res.data.technology
                   
                });
            });
        }catch(error){
            console.log(error);
        }
        //end

    },[]);

  // change value of element
  const handleChange=(event)=>{
    setCourseData({
        ...courseData,
        [event.target.name]:event.target.value
    });
}

const handleFileChange=(event)=>{
    setCourseData({
        ...courseData,
        [event.target.name]:event.target.files[0]
    })
} 
//End

// Submit Form
const submitForm=()=>{
    const _formData=new FormData();

    _formData.append("category", courseData.category)
    _formData.append("teacher",1);
    _formData.append("title", courseData.title)
    _formData.append("description", courseData.description)
    if(courseData.featured_img!==""){
          _formData.append("featured_img", courseData.featured_img, courseData.featured_img.name);
    }
    _formData.append("technology", courseData.technology)

    try{
        axios.put(baseUrl+'/teacherCourse-details/'+course_id, _formData, {
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
                      <h5 className="card-header">Edit Course</h5>
                      <div className="card-body">
                          <form>
                              <div className="mb-3 row">
                                    <label for="title" className="form-label">Category</label>
                                    <select name="category" value={courseData.category} onChange={handleChange} className="form-control">
                                        {cosCat.map((category, index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                                    </select>
                            </div>
                            <div className="mb-3 row">
                                    <label for="title" className="form-label">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text"  value={courseData.title} onChange={handleChange} name="title" className="form-control"/>
                                    </div>
                            </div>
                           
                            <div className="mb-3">
                                <label for="description" className="form-label">Description</label>
                                <textarea  value={courseData.description} onChange={handleChange} name="description" className="form-control">
                                    id="description"</textarea>
                            </div>
                            <div className="mb-3 row">
                                    <label for="video" className="form-label">Featured Image</label>
                                    <input type="file"  onChange={handleFileChange} name="featured_img" id="video" className="form-control"/>
                                    {courseData.prev_img &&
                                        <p className="mt-2"><img src={courseData.prev_img} width="350"/></p>
                                    }
                            </div>
                          
                           <div className="mb-3">
                                <label for="video" className="form-label">Technologies</label>
                                <textarea  value={courseData.technology} onChange={handleChange} name="technology" className="form-control"
                                placeholder="Php, Python, JavaScript, HTML, CSS" id="technology"></textarea>
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

export default EditCourse;