import React, { useState, useEffect } from 'react';
import axios from 'axios';


const baseUrl="http://localhost:8000/api/contact/";


function ContactUs(){
    const [contactData, setContactData]=useState({
        'full_name':'',
        'email':'',
        'query':'',
        'status': ''
    });

    // change value of element
    const handleChange=(event)=>{
        event.preventDefault();
        setContactData({
            ...contactData,
            [event.target.name]:event.target.value
        });
    }

    //End

    // Submit Form
    const submitForm=()=>{
        const contactFormData=new FormData();

        contactFormData.append("full_name", contactData.full_name)
        contactFormData.append("email", contactData.email)
        contactFormData.append("query", contactData.query)


        try{
            axios.post(baseUrl,contactFormData).then((response)=>{
                setContactData({
                    'full_name':'',
                    'email':'',
                    'query':'',
                    'status': 'success'
                });
            });

        }catch(error){
             console.log(error);
             setContactData({'status':'error'})
        }
    };


    const listStyle={
        'list-style':'none',
    }

    useEffect(()=>{
        document.title="Contact Us"
    });
    
    return (
        <div className="container mt-4">
          <div className="row">
            <div className="col-7">
                {contactData.status==='success' && 
                   <p className="text-success">Thanks for your registration</p>
                }
                {contactData.status==='error' && 
                  <p className="text-danger">Something went wrong with your registration</p>
                }
                <div className="card">
                    <h5 className="card-header">Contact Us</h5>
                    <div className="card-body">
                       {/* <form> */}
                           <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Full name</label>
                                <input value={contactData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" />
                                
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email</label>
                                <input value={contactData.email} onChange={handleChange} name="email" type="email" className="form-control" />
                             </div>
                           
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Query</label>
                                <textarea rows="10" value={contactData.query} onChange={handleChange} name="query" className="form-control"></textarea>
                            </div>
                        
                            <button onClick={submitForm}  type="submit" className="btn btn-primary">Submit</button>
                        {/* </form> */}
                    </div>

                </div> 
            </div>
            <div className="col-4 offset-1">
                <h3 className='border-bottom'>Address</h3>
                <ul className='m-0 p-0' style={listStyle}>
                    <li>
                        <label className='fw-bold'>Address:</label>
                        <span className='ms-2'>5B, Elizabethan Street, WestEast Estate, Abuja</span>
                    </li>
                    <li>
                        <label className='fw-bold'>Mobile Number:</label>
                        <span className='ms-2'>234509876890</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default ContactUs
   
