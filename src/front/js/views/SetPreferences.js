import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/workspace/Final-Project/src/front/styles/SetPreferences.css'
//import { Link, useParams } from 'react-router-dom';
//import ReactDOM from 'react-dom';

const SetPreferences = () => {
    const [budget, setBudget] = useState()
    const handleBudget = (e) => {
        setBudget(e.target.value)
    }
    const handleSubmitPreferences = () => { }
    return (
        <div className='full-setpreferences py-2'>
            <form onSubmit={handleSubmitPreferences}>
                <div className='container'>
                    <h1 className='mt-3 text-center'>We're almost ready!</h1>
                    <h3 className='my-3 text-center'>We just need to know some things to find the perfect match for your trip</h3>
                    <div className='row mx-5'>
                        <div className='col-lg-6 col-12 my-4'>
                            <p>Traveling...</p>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio1' value='option1' />
                                <label className='form-check-label' for='inlineRadio1'>Alone</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio2' value='option2' />
                                <label className='form-check-label' for='inlineRadio2'>Couple</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio3' value='option3' />
                                <label className='form-check-label' for='inlineRadio3'>Group</label>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 my-4'>
                            <p>With children?</p>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio1' value='option1' />
                                <label className='form-check-label' for='inlineRadio1'>Yes</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio2' value='option2' />
                                <label className='form-check-label' for='inlineRadio2'>No</label>
                            </div>
                        </div>

                    </div>
                    <div className='row mx-5'>
                        <div className='col-lg-6 col-12 mb-4 py-4'>
                            <label for='customRange1' class='form-label'>Approximate budget (in US dollars)</label>
                            <div className='d-flex'>
                                <input type='range' class='slider form-range w-75 mb-3 in-line' min='50' max='20000' step="50" id='customRange1' onInput={handleBudget} />
                                <label className='form-label in-line ms-4' id='rangeValue'>{budget}</label>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 mb-4'>
                            <p className='w-75'>Do you have any places or activities of interest? You can choose more than one</p>
                            <div className='row'>
                                <div className='col col-md-12'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='checkbox' id='inlineCheckbox1' value='Trekking' />
                                        <label className='form-check-label' for='inlineCheckbox1'>Trekking</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='checkbox' id='inlineCheckbox2' value='Restaurants' />
                                        <label className='form-check-label' for='inlineCheckbox2'>Restaurants</label>
                                    </div>

                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='checkbox' id='inlineCheckbox3' value='Museums' />
                                        <label className='form-check-label' for='inlineCheckbox3'>Museums</label>
                                    </div>
                                </div>
                                <div className='col col-md-12'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='checkbox' id='inlineCheckbox3' value='Disco' />
                                        <label className='form-check-label' for='inlineCheckbox3'>Disco & Nights Out</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='checkbox' id='inlineCheckbox3' value='Malls' />
                                        <label className='form-check-label' for='inlineCheckbox3'>Malls & Shopping</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mx-5'>
                        <div className='col-lg-6 col-12 mb-4'>
                            <p>Do you prefer a gender in specific?</p>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio1' value='Female' />
                                <label className='form-check-label' for='inlineRadio1'>Woman</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio2' value='Male' />
                                <label className='form-check-label' for='inlineRadio2'>Man</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio3' value='Both' />
                                <label className='form-check-label' for='inlineRadio3'>I do not care</label>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 mb-4'>
                            <p>Any age in particular for your perfect partner?</p>
                            <div className='row'>
                                <div className='col-md-12 col-2'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio4' value='18' />
                                        <label className='form-check-label' for='inlineRadio4'>18-24</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio5' value='25' />
                                        <label className='form-check-label' for='inlineRadio5'>25-31</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio6' value='32' />
                                        <label className='form-check-label' for='inlineRadio6'>32-38</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio7' value='39' />
                                        <label className='form-check-label' for='inlineRadio7'>39-45</label>
                                    </div>
                                </div>
                                <div className='col-md-12 col-2'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio8' value='45' />
                                        <label className='form-check-label' for='inlineRadio8'>45-51</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio9' value='52' />
                                        <label className='form-check-label' for='inlineRadio9'>52-59</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio10' value='60' />
                                        <label className='form-check-label' for='inlineRadio10'>60+</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio11' value='Any' />
                                        <label className='form-check-label' for='inlineRadio11'>I do not care</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mx-5'>
                        <div className='col-lg-6 col-12 mb-4'>
                            <p>Where are you planning to stay?</p>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='RadioOptions' id='Radio1' value='Hotel' />
                                <label className='form-check-label' for='Radio1'>Hotel</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='RadioOptions' id='Radio2' value='Apartment' />
                                <label className='form-check-label' for='Radio2'>Apartment/Airbnb</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='RadioOptions' id='Radio3' value='Camping' />
                                <label className='form-check-label' for='Radio3'>Camping</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='RadioOptions' id='Radio4' value='Anywhere' />
                                <label className='form-check-label' for='Radio4'>Any place would be ok / I'm open to partner's suggestions</label>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success d-flex mx-auto mb-3'>Submit</button>
                </div>
            </form >



        </div >)
}
export default SetPreferences;