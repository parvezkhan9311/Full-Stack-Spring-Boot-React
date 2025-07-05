import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeServices'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
    //firstName is state variable name and setFirstName is function name that we use to update state f.name value
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')

    const { id } = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        emailId: ''
    })

    const navigator = useNavigate();

    useEffect(() => {

        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmailId(response.data.emailId);

            }).catch(error => {
                console.error(error);
            });
        }
    }, [id])

    function saveOrUpdateEmployee(e) {
        e.preventDefault(); //e--> event object

        if (validateForm()) {
            const employee = { firstName, lastName, emailId };
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                });
            }
            else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error=>{
                    console.error(error);
                });

            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors }

        if (firstName.trim()) {//if not empty or null
            errorsCopy.firstName = '';
        }
        else {
            errorsCopy.firstName = "First Name is required";
            valid = false;
        }

        if (lastName.trim()) {//if not empty or null
            errorsCopy.lastName = '';
        }
        else {
            errorsCopy.lastName = "Last Name is required";
            valid = false;
        }
        if (emailId.trim()) {//if not empty or null
            errorsCopy.emailId = '';
        }
        else {
            errorsCopy.emailId = "Email Id is required";
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        }
        else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form action="">
                            <div className='form-group mb-2'>
                                <label className="form-label">First Name</label>
                                <input type="text" placeholder='Enter first Name' name='firstName' value={firstName} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} onChange={(e) => setFirstName(e.target.value)}></input>
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className="form-label">Last Name</label>
                                <input type="text" placeholder='Enter last Name' name='lastName' value={lastName} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} onChange={(e) => setLastName(e.target.value)} ></input>
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className="form-label">emailId Id</label>
                                <input type="text" placeholder='Enter emailId' name='emailId' value={emailId} className={`form-control ${errors.emailId ? 'is-invalid' : ''}`} onChange={(e) => setEmailId(e.target.value)}></input>
                                {errors.emailId && <div className='invalid-feedback'>{errors.emailId}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EmployeeComponent

