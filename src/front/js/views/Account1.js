import React, { useEffect, useState, useHistory } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import '../../styles/account1.css'
import "../../styles/formmedia.css";

const Account1 = () => {
    const url = 'https://restcountries.com/v3.1/all'
    const [userface, setUserFace] = useState("");
    const [userinsta, setUserInsta] = useState("");
    const [usertweet, setUserTweet] = useState("");
    const [countries, setCountry] = useState([])
    const [user, setUser] = useState(null)
    // const [formData, setFormData] = useState({
    //     firstName: '',
    //     lastName: '',
    //     birthdate: '',
    //     email: '',
    //     password: '',
    //     languages: '',
    //     gender: '',
    //     countryofresidence: '',
    //     instagram: '',
    //     facebook: '',
    //     twitter: '',
    //     verified: '',

    // })
    useEffect(() => {
        fetchCountries()
    }, [])

    const fetchCountries = async () => {
        const response = await fetch(url)
        //console.log(response)
        const responseJSON = await response.json()
        //console.log(responseJSON)
        setCountry(responseJSON)
    }

    const handleSubmitAccount1 = () => {

    }


    const addUser = async (url, id) => {
        try {

            const info = {firstname:'karina', lastname:'paez'}

            const response = await fetch(url, {
               method: 'POST',
               headers: {
                'Content-Type': 'application/json'
               },
               body: JSON.stringify(info)
            });
            const data = await response.json()

            console.log(data);
            setUser(data)

        } catch (error) {
            console.log(error)
        }
    }
    const handleClick = () => {
        addUser(`${process.env.REACT_APP_API_URL}/users`, user.id)
        
 }

    
    return (

        <form onSubmit={handleSubmitAccount1}>
            <div className='full-account1 py-2'>
                <div className='d-flex justify-content-end me-2'>
                    <Link to="/login" className='text-success'>
                        <strong >Already have an account? Log in</strong>
                    </Link>
                </div>
                <div className='container '>

                    <h1 className='mt-3 mb-2 text-center'>Create your account</h1>
                    <h4 className='mt-3 mb-2 text-center'>So happy you are joining us! Your perfect match is closer to you now</h4>
                    <h4 className='mt-3 mb-5 text-center'>But first, tell us about yourself</h4>

                    <div className='row mt-3'>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label htmlFor='exampleInputText' className='form-label'>First Name</label>
                            <input type='text' className='form-control' id='exampleInputText' name='firstname' />
                        </div>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label htmlFor='exampleInputText' className='form-label'>Last Name</label>
                            <input type='text' className='form-control' id='exampleInputText' name='lastname' />
                        </div>
                        <div className='col-lg-3 col-12 mx-auto'>
                            <p className='exampleInputDate' htmlFor='exampleDate'>Birth Date</p>
                            <input type='date' className='form-label w-100' id='exampleDate' name='birthdate' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label htmlFor='exampleInputEmail1' className='form-label'>Email address</label>
                            <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' name='email' />
                            <div id='emailHelp' className='form-text'>We'll never share your email with anyone else.</div>
                        </div>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label htmlFor='exampleInputPassword1' className='form-label'>Password</label>
                            <input type='password' className='form-control' id='exampleInputPassword1' name='password' />
                        </div>
                        <div className='col-lg-3 col-12 mx-auto'>
                            <label htmlFor='exampleInputEmail1' className='form-label'>Language</label>
                            <select className='form-select mb-3' aria-label='.form-select-lg example' name='languages'>
                                <option value='English' >English</option>
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
                            <div className='form-check' >
                                <input className='form-check-input' type='radio' name='gender' id='flexRadioDefault1' value='Female' />
                                <label className='form-check-label' htmlFor='flexRadioDefault1'>
                                    Female
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='gender' id='flexRadioDefault2' value='Male' />
                                <label className='form-check-label' htmlFor='flexRadioDefault1'>
                                    Male
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='gender' id='flexRadioDefault3' value='NonBinary' />
                                <label className='form-check-label' htmlFor='flexRadioDefault1'>
                                    Non Binary
                                </label>
                            </div>
                            <div className='invalid-feedback'>
                                Please enter a message.
                            </div>
                        </div>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label className='form-label'> Country of Residence</label>
                            <select className='form-select' aria-label='select country of residence' required name='countryofresidence'>
                                {countries.sort((a, b) => a.name.common > b.name.common ? 1 : -1).map((country, index) => {
                                    return <option key={index} value={country?.name?.common}>{country?.name?.common}</option>
                                })}
                            </select>
                        </div>
                        <div className='col-lg-3 col-12 mb-5 mx-auto'>
                            {/* REDES SOCIALES */}
                            <div className="social-media">

                                <label className='form-label'>Social Media</label>

                                {/* FACEBOOK */}
                                <div className="row">
                                    <div className="col d-flex mb-1">


                                        <FaFacebookSquare className="icon text-primary" />

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="facebook"
                                            placeholder="user"
                                            value={userface}
                                            onChange={(e) => setUserFace(e.target.value)}
                                            name='facebook'
                                        />

                                    </div>
                                </div>
                                {/* INSTAGRAM */}
                                <div className="row">
                                    <div className="col d-flex mb-1">


                                        <FaInstagramSquare className="icon text-primary" />

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="instagram"
                                            placeholder="user"
                                            value={userinsta}
                                            onChange={(e) => setUserInsta(e.target.value)}
                                            name='instagram'
                                        />

                                    </div>
                                </div>
                                {/* TWITTER */}
                                <div className="row">
                                    <div className="col d-flex mb-1">


                                        <FaTwitter className="icon text-primary" />

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="twitter"
                                            placeholder="user"
                                            value={usertweet}
                                            onChange={(e) => setUserTweet(e.target.value)}
                                            name='twitter'
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type='submit' onClick={handleClick} className='btn btn-success mb-3 d-flex mx-auto'>Submit</button>
                </div >
            </div >
        </form >

    )
}

export default Account1;