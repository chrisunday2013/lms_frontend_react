import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';


const baseUrl="http://localhost:8000/api";
function AllPopularTeachers(){
    const [teacher, setTeacher]=useState(null);
   

    useEffect(()=>{
        axios.get(baseUrl+'/popular-teachers/?all=1')
        .then((response)=>{
            console.log(response.data);
            setTeacher(response.data);
           
        });
    },[]);
    

    return(
          <div className="container mt-3">
               {/* latest courses*/}
        <h3 className="pb-1 mb-4">Popular Teacher </h3>
          <div className="row mb-4">
              <div className="col-md-3 mb-4">
                {teacher.map((row, index)=>
                    <div className="card">
                        <Link to="/detail/1"><img src="teacha.jpg" className="card-img-top" alt="..."/></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/teacher-detail/1">{row.teacher.full_name}</Link></h5>
                            </div>
                            <div className="card-footer">
                                 <div className="title">
                                       <span>Rating: 4.5/5</span>
                                 </div>
                            </div>
                    </div>
                    )}
              </div>
             
          </div>
        {/*end latest courses*/}
        {/* pagination start */}
        <nav aria-label="Page navigation example mt-5">
               
            </nav>
        {/* pagination ends */}
        </div>
    )
}

export default AllPopularTeachers;