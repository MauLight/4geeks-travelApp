import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/setpreferences.css'
import { useParams } from 'react-router-dom';
//import ReactDOM from 'react-dom';

const SetPreferences = () => {
    const { id } = useParams();
    const [budget, setBudget] = useState(10000)
    const handleBudget = (e) => {
        setBudget(e.target.value)
    }
    const handleSubmitPreferences = (e) => {
        e.preventDefault()
        const sampleForm = document.getElementById("preferences");

        //Add an event listener to the form element and handler for the submit an event.
        sampleForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            let form = e.currentTarget;
            let url = `${process.env.BACKEND_URL}/users/${id}/mytrips`;

            try {
                let formData = new FormData(form);
                let responseData = await postFormFieldsAsJson({ url, formData });
                let { serverDataResponse } = responseData;
                console.log(serverDataResponse);
            } catch (error) {
                console.error(error);
            }
        });


        async function postFormFieldsAsJson({ url, formData }) {
            let formDataObject = Object.fromEntries(formData.entries());
            let formDataJsonString = JSON.stringify(formDataObject);
            let fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: formDataJsonString,
            };

            let res = await fetch(url, fetchOptions);
            if (!res.ok) {
                let error = await res.text();
                throw new Error(error);
            }
            window.location = '/save'
            return res.json();
        }
    }
    return (
        <div className='full-setpreferences py-2'>
            <form onSubmit={handleSubmitPreferences} id='preferences'>
                <div className='container'>
                    <h1 className='mt-3 text-center'>We're almost ready!</h1>
                    <h4 className='my-3 text-center'>We just need to know some things to find the perfect match for your trip</h4>
                    <div className='row mx-5'>
                        <div className='col-lg-6 col-12 my-4'>
                            <p>Traveling...</p>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='travelling' id='inlineRadio1' value='Alone' />
                                <label className='form-check-label' for='inlineRadio1'>Alone</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='travelling' id='inlineRadio2' value='Couple' />
                                <label className='form-check-label' for='inlineRadio2'>Couple</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='travelling' id='inlineRadio3' value='Group' />
                                <label className='form-check-label' for='inlineRadio3'>Group</label>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 my-4'>
                            <p>With children?</p>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='with_children' id='inlineRadio1' value='true' />
                                <label className='form-check-label' for='inlineRadio1'>Yes</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='with_children' id='inlineRadio2' value='false' />
                                <label className='form-check-label' for='inlineRadio2'>No</label>
                            </div>
                        </div>

                    </div>
                    <div className='row mx-5'>
                        <div className='col-lg-6 col-12 mb-4 py-4'>
                            <label for='customRange1' class='form-label'>Approximate budget (in US dollars)</label>
                            <div className='d-flex'>
                                <input type='range' class='slider form-range w-75 mb-3 in-line' min='50' max='20000' step="50" id='customRange1' onInput={handleBudget} name='budget' value={budget} />
                                <label className='form-label in-line ms-4' id='rangeValue'>$ {budget}</label>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 mb-4'>
                            <p className='w-75'>Do you have any places or activities of interest? Choose the one you prefer the most</p>
                            <div className='row'>
                                <div className='col col-md-12'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' id='inlineCheckbox1' value='Trekking' name='activities' />
                                        <label className='form-check-label' for='inlineCheckbox1'>Trekking</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' id='inlineCheckbox2' value='Restaurants' name='activities' />
                                        <label className='form-check-label' for='inlineCheckbox2'>Restaurants</label>
                                    </div>

                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' id='inlineCheckbox3' value='Museums' name='activities' />
                                        <label className='form-check-label' for='inlineCheckbox3'>Museums</label>
                                    </div>
                                </div>
                                <div className='col col-md-12'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' id='inlineCheckbox3' value='Disco' name='activities' />
                                        <label className='form-check-label' for='inlineCheckbox3'>Disco & Nights Out</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' id='inlineCheckbox3' value='Malls' name='activities' />
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
                                <input className='form-check-input' type='radio' name='gender_specific' id='inlineRadio1' value='Female' />
                                <label className='form-check-label' for='inlineRadio1'>Woman</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='gender_specific' id='inlineRadio2' value='Male' />
                                <label className='form-check-label' for='inlineRadio2'>Man</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='gender_specific' id='inlineRadio3' value='Both' />
                                <label className='form-check-label' for='inlineRadio3'>I do not care</label>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 mb-4'>
                            <p>Any age in particular for your perfect partner?</p>
                            <div className='row'>
                                <div className='col-md-12 col-2'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio4' value='18' />
                                        <label className='form-check-label' for='inlineRadio4'>18-24</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio5' value='25' />
                                        <label className='form-check-label' for='inlineRadio5'>25-31</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio6' value='32' />
                                        <label className='form-check-label' for='inlineRadio6'>32-38</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio7' value='39' />
                                        <label className='form-check-label' for='inlineRadio7'>39-45</label>
                                    </div>
                                </div>
                                <div className='col-md-12 col-2'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio8' value='45' />
                                        <label className='form-check-label' for='inlineRadio8'>45-51</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio9' value='52' />
                                        <label className='form-check-label' for='inlineRadio9'>52-59</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio10' value='60' />
                                        <label className='form-check-label' for='inlineRadio10'>60+</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio11' value='Any' />
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
                                <input className='form-check-input' type='radio' name='stay' id='Radio1' value='Hotel' />
                                <label className='form-check-label' for='Radio1'>Hotel</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='stay' id='Radio2' value='Apartment' />
                                <label className='form-check-label' for='Radio2'>Apartment/Airbnb</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='stay' id='Radio3' value='Camping' />
                                <label className='form-check-label' for='Radio3'>Camping</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='stay' id='Radio4' value='Anywhere' />
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