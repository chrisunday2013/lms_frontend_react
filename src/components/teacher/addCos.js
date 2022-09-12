import TeacherSideBar from "./teacherSideBar";
import {useState, useEffect} from 'react';
import axios from "axios";


const baseUrl='http://127.0.0.1:8000/api';

function AddCourse(){
    const [cosCat, setCosCat]=useState([]);
    const [cosData, setCosData]=useState({
        category:'',
        title:'',
        description:'',
        featured_img:'',
        technology:''
    });

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
    },[]);

  // change value of element
  const handleChange=(event)=>{
    setCosData({
        ...cosData,
        [event.target.name]:event.target.value
    });
}

const handleFileChange=(event)=>{
    setCosData({
        ...cosData,
        [event.target.name]:event.target.files[0]
    })
} 
//End

// Submit Form
const submitForm=()=>{
    const _FormData=new FormData();

    _FormData.append("category", cosData.category)
    _FormData.append("teacher",1);
    _FormData.append("title", cosData.title)
    _FormData.append("description", cosData.description)
    _FormData.append("featured_img", cosData.featured_img, cosData.featured_img.name);
    _FormData.append("technology", cosData.technology)

    try{
        axios.post(baseUrl+'/course/', _FormData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((response)=>{
            console.log(response.data);
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
                      <h5 className="card-header">Add Course</h5>
                      <div className="card-body">
                           
                              <div className="mb-3 row">
                                    <label for="title" className="col-sm-2 col-form-label">Category</label>
                                    <select name="category" onChange={handleChange} className="form-control">
                                        {cosCat.map((category, index)=>{return <option key={index} value={category.id}>{category.title}</option>})}

                                    </select>
                            </div>
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="title" className="form-control" id="inputPassword"/>
                                    </div>
                            </div>
                           
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Description</label>
                                <textarea onChange={handleChange} name="description" className="form-control"></textarea>
                            </div>
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-2 col-form-label">Featured Image</label>
                                    <div className="col-sm-10">
                                    <input type="file" onChange={handleFileChange} name="featured_img" className="form-control" id="inputPassword"/>
                                    </div>
                            </div>
                          
                           <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Technologies</label>
                                <textarea onChange={handleChange} name="technology" className="form-control"></textarea>
                            </div>
                                    <hr/>
                                    <button type="button" onClick={submitForm} className="btn btn-primary">Submit</button>

                      </div>      
                   </div>      
                </section>
            </div>
        </div>
    )
}

export default AddCourse;