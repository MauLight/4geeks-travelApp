import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/account1.css'

const Account1 = () => {
    const url = 'https://restcountries.com/v3.1/all'
    const [countries, setCountry] = useState([])
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',

    })
    useEffect(() => {
        fetchCountries()
    }, [])

    const fetchCountries = async () => {
        const response = await fetch(url)
        console.log(response)
        const responseJSON = await response.json()
        console.log(responseJSON)
        setCountry(responseJSON)
    }

    const handleSubmitAccount1 = () => {



    }

    return (

        <form onSubmit={handleSubmitAccount1}>
            <div className='full-account1 py-2'>
                <div className='container '>

                    <h1 className='mt-3 mb-2 text-center'>Create your account</h1>
                    <h4 className='mt-3 mb-2 text-center'>So happy you are joining us! Your perfect match is closer to you now</h4>
                    <h4 className='mt-3 mb-5 text-center'>But first, tell us about yourself</h4>

                    <div className='row mt-3'>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label for='exampleInputText' className='form-label'>First Name</label>
                            <input type='text' className='form-control' id='exampleInputText' />
                        </div>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label for='exampleInputText' className='form-label'>Last Name</label>
                            <input type='text' className='form-control' id='exampleInputText' />
                        </div>
                        <div className='col-lg-3 col-12 mx-auto'>
                            <p className='exampleInputDate' for='exampleDate'>Birth Date</p>
                            <input type='date' className='form-label w-100' id='exampleDate' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label for='exampleInputEmail1' className='form-label'>Email address</label>
                            <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' />
                            <div id='emailHelp' className='form-text'>We'll never share your email with anyone else.</div>
                        </div>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label for='exampleInputPassword1' className='form-label'>Password</label>
                            <input type='password' className='form-control' id='exampleInputPassword1' />
                        </div>
                        <div className='col-lg-3 col-12 mx-auto'>
                            <label for='exampleInputEmail1' className='form-label'>Language</label>
                            <select className='form-select mb-3' aria-label='.form-select-lg example'>
                                <option value='English' selected>English</option>
                                <option value='Arabic'>Arabic</option>
                                <option value='Bengali'>Bengali</option>
                                <option value='French'>French</option>
                                <option value='German'>German</option>
                                <option value='Hindi'>Hindi</option>
                                <option value='Indonesian'>Indonesian</option>
                                <option value='Japanese'>Japanese</option>
                                <option value='Mandarin'>Mandarin</option>
                                <option value='Portuguese'>Portuguese</option>
                                <option value='Russian'>Russian</option>
                                <option value='Spanish'>Spanish</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label className='form-label'>Gender</label>
                            <div className='form-check' required>
                                <input className='form-check-input' type='radio' name='flexRadioDefault' id='flexRadioDefault1' value='Female' />
                                <label className='form-check-label' for='flexRadioDefault1'>
                                    Female
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='flexRadioDefault' id='flexRadioDefault2' value='Male' />
                                <label className='form-check-label' for='flexRadioDefault1'>
                                    Male
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='flexRadioDefault' id='flexRadioDefault3' value='NonBinary' />
                                <label className='form-check-label' for='flexRadioDefault1'>
                                    Non Binary
                                </label>
                            </div>
                            <div className='invalid-feedback'>
                                Please enter a message.
                            </div>
                        </div>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label className='form-label'> Country of Residence</label>
                            <select className='form-select' aria-label='select country of residence' required>
                                {countries.sort((a, b) => a.name.common > b.name.common ? 1 : -1).map((country, index) => {
                                    return <option key={index} value={country?.name?.common}>{country?.name?.common}</option>
                                })}
                            </select>
                        </div>
                        <div className='col-lg-3 col-12 mb-5 mx-auto'></div>
                    </div>
                    <button type='submit' className='btn btn-success mb-3 d-flex mx-auto'>Submit</button>
                </div >
            </div >
        </form >

    )
}

export default Account1;