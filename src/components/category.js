import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api';

function Category(){
    const [categoryData, setCategoryData]=useState([]);

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/category/')
            .then((res)=>{
                setCategoryData(res.data);
            })
        } catch(error){
            console.log(error);
        }
    },[]);

    return(
          <div className="container mt-3">
               {/* latest courses*/}
        <h3 className="pb-1 mb-4">All Categories</h3>
          <div className="row mb-4">
          {categoryData && categoryData.map((row, index)=>
              <div className="col-md-3 mb-4">
                    <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/course/${row.id}/${row.title}`}>{row.title} ({row.total_courses})</Link></h5>
                                <p className='card-text'>{row.description}</p>
                            </div>
                    </div>
              </div>
            )}
          </div>
        {/*end latest courses*/}
        {/* pagination start */}
        {/* <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    {previousUrl && 
                    <li className="page-item"><button className="page-link" onClick={()=>paginationHandler(previousUrl)}><i class="bi bi-arrow-left"></i>Previous</button></li>
                    }
                    {nextUrl && 
                    <li className="page-item"><button className="page-link" onClick={()=>paginationHandler(nextUrl)}><i class="bi bi-arrow-right"></i>Next</button></li>
                    }
                </ul>
            </nav> */}
        {/* pagination ends */}
        </div>
    )
}

export default Category;