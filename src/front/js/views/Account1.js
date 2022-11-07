import React, { useEffect, useState, useHistory } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import '../../styles/account1.css'
import "../../styles/formmedia.css";

const Account1 = () => {
    const url = 'https://restcountries.com/v3.1/all'
    const languagesOptions = ['Arabic', 'Bengali', 'English', 'French', 'German', 'Hindi', 'Indonesian', 'Japanese', 'Mandarin', 'Portuguese', 'Russian', 'Spanish']
    const [countries, setCountry] = useState([])
    const [formData, setFormData] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState(false)
    const [selectedGender, setSelectedGender] = useState(false)
    const [countryAlert, setCountryAlert] = useState(false)
    const [languageAlert, setLanguageAlert] = useState(false)
    const [genderAlert, setGenderAlert] = useState(false)

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        //console.log(formData)

    };

    // useEffect(() => {
    //     if (!selectedCountry) {
    //         setCountryAlert(true)
    //     }
    //     else {
    //         setCountryAlert(false)
    //     }
    // }, [selectedCountry])

    // useEffect(() => {
    //     if (!selectedLanguage) {
    //         setLanguageAlert(true)
    //     }
    //     else {
    //         setLanguageAlert(false)
    //     }
    // }, [selectedLanguage])

    // useEffect(() => {
    //     if (!selectedGender) {
    //         setGenderAlert(true)
    //     }
    //     else {
    //         setGenderAlert(false)
    //     }
    // }, [selectedGender])

    const createUser = async (e) => {
        e.preventDefault()
        if (!selectedGender || !selectedCountry || !selectedLanguage){
            if (!selectedCountry) {
                setCountryAlert(true)
            }
            else {
                setCountryAlert(false)
            }
            if (!selectedLanguage) {
                setLanguageAlert(true)
            }
            else {
                setLanguageAlert(false)
            }
            if (!selectedGender) {
                setGenderAlert(true)
            }
            else {
                setGenderAlert(false)
            }
        }

        if (selectedGender && selectedCountry && selectedLanguage) {
                try {
                    //console.log("attempt to fetch")
                    //const info = formData
                    console.log(formData)

                    const response = await fetch(`${process.env.BACKEND_URL}/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(formData)

                    });
                    const data = await response.json()
                    window.location = '/save'
                    console.log(data);

                } catch (error) {
                    console.log(error)
                }
            }
    }

    return (

        <form onSubmit={(e) => createUser(e)} >
            <div className='full-account1 '>
                <div className='d-flex justify-content-end '>
                    <Link to="/login" className='link'>
                        <strong >Already have an account? Log in</strong>
                    </Link>
                </div>
                <div className='container my-4'>

                    <h1 className='mt-3 mb-2 text-center'>CREATE YOUR ACCOUNT</h1>
                    <h4 className='mt-3 mb-2 text-center'>So happy you are joining us! Your perfect match is closer to you now</h4>
                    <h4 className='mt-3 mb-5 text-center'>But first, tell us about yourself</h4>

                    <div className='row mt-3'>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label htmlFor='exampleInputText' className='form-label'>First Name</label>
                            <input type='text' className='form-control' id='exampleInputText' name='firstname' required onChange={(e) => handleChange(e)} />
                        </div>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label htmlFor='exampleInputText' className='form-label'>Last Name</label>
                            <input type='text' className='form-control' id='exampleInputText' name='lastname' required onChange={(e) => handleChange(e)} />
                        </div>
                        <div className='col-lg-3 col-12 mx-auto'>
                            <p className='exampleInputDate' htmlFor='exampleDate'>Birth Date</p>
                            <input type='date' className='form-label w-100' id='exampleDate' name='birthdate' required onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label htmlFor='exampleInputEmail1' className='form-label'>Email address</label>
                            <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' name='email' placeholder='alguien@example.com' required onChange={(e) => handleChange(e)} />
                        </div>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label htmlFor='exampleInputPassword1' className='form-label'>Password</label>
                            <input type='password' className='form-control' id='exampleInputPassword1' name='password' required onChange={(e) => handleChange(e)} />
                        </div>
                        <div className='col-lg-3 col-12 mx-auto'>
                            <label htmlFor='exampleInputEmail1' className='form-label'>Language</label>
                            <select className='form-select ' aria-label='.form-select-lg example' name='languages' onChange={(e) => handleChange(e)}>
                                <option onClick={() => setSelectedLanguage(false)}>--- Select a language ---</option>
                                {languagesOptions.map((languageOption, index) => {
                                    return <option key={index} value={languageOption} onClick={() => setSelectedLanguage(true)}>{languageOption}</option>
                                })}
                            </select>
                            {(languageAlert) ?
                                (<div className='message text-danger'>
                                    Please select a language
                                </div>) : ''}

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label className='form-label'>Gender</label>
                            <div className='form-check' >
                                <input className='form-check-input' type='radio' name='gender' id='flexRadioDefault1' value='Female' onClick={() => setSelectedGender(true)} onChange={(e) => handleChange(e)} />
                                <label className='form-check-label' htmlFor='flexRadioDefault1'>
                                    Female
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='gender' id='flexRadioDefault2' value='Male' onClick={() => setSelectedGender(true)} onChange={(e) => handleChange(e)} />
                                <label className='form-check-label' htmlFor='flexRadioDefault1'>
                                    Male
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='gender' id='flexRadioDefault3' value='NonBinary' onClick={() => setSelectedGender(true)} onChange={(e) => handleChange(e)} />
                                <label className='form-check-label' htmlFor='flexRadioDefault1'>
                                    Non Binary
                                </label>
                            </div>
                            {(genderAlert) ?
                                (<div className='message text-danger'>
                                    Please select a gender
                                </div>) : ''}
                        </div>
                        <div className='col-lg-4 col-12 mb-5 mx-auto'>
                            <label className='form-label'> Country of Residence</label>
                            <select className='form-select' aria-label='select country of residence' name='countryofresidence' onChange={(e) => handleChange(e)}>
                                <option selected onClick={() => setSelectedCountry(false)}>--- Select a country ---</option>
                                {countries.sort((a, b) => a.name.common > b.name.common ? 1 : -1).map((country, index) => {
                                    return <option key={index} value={country?.name?.common} onClick={() => setSelectedCountry(true)}>{country?.name?.common}</option>
                                })}
                            </select>
                            {(countryAlert) ?
                                (<div className='message text-danger'>
                                    Please select a country
                                </div>) : ''}


                        </div>
                        <div className='col-lg-3 col-12 mb-5 mx-auto'>
                            {/* REDES SOCIALES */}
                            <div className="social-media">
                                <label className='form-label' data-toggle="tooltip" title="Why do we ask this? It's because you are going to contact your match through these external social media">Social Media
                                </label>

                                {/* FACEBOOK */}
                                <div className="row">
                                    <div className="col d-flex mb-1">


                                        <FaFacebookSquare className="icon text-primary" />

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="facebook"
                                            placeholder="user"
                                            //value={userface}
                                            onChange={(e) => handleChange(e)}
                                            name='facebook'
                                            required
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
                                            //value={userinsta}
                                            onChange={(e) => handleChange(e)}
                                            name='instagram'
                                            required

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
                                            //value={usertweet}

                                            onChange={(e) => handleChange(e)}
                                            name='twitter'
                                            required

                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type='submit' style={{ backgroundColor: '#336b87', color: 'white' }} className='btn mb-3 d-flex mx-auto'>Submit</button>
                </div >
            </div >
        </form >

    )
}

export default Account1;