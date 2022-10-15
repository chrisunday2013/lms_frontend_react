import {Link} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api';

function Footer(){
    const [pageData, setPageData]=useState([]);
        
    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/pages/')
            .then((res)=>{
              setPageData(res.data);
            })
        }catch(error){
            console.log(error);
        }
    },[]);

    return (
    <footer className="py-3 my-5">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
        <li className="nav-item"><Link to="/faq" className="nav-link px-2 text-muted">FAQs</Link></li>
        {pageData && pageData.map((row, index)=>
            <li className="nav-item"><Link to={`/page/${row.id}${row.url}`} className="nav-link px-2 text-muted">{row.title}</Link></li>
        )}
        </ul>
    <p className="text-center text-muted">© 2022 Uclassic Dev</p>
  </footer>
    )
}

export default Footer;