import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../../styles/poll.css'
const Poll = () => {
    const { id } = useParams();
    const [firstInput, setFirstInput] = useState('7');
    const [secondInput, setSecondInput] = useState('7');
    const handleFirstInput = (e) => {
        setFirstInput(e.target.value)
    }
    const handleSecondInput = (e) => {
        setSecondInput(e.target.value)
    }

    const handleSubmitPoll = (e) => {
        e.preventDefault()
        const sampleForm = document.getElementById("rating");
        //Add an event listener to the form element and handler for the submit an event.
        sampleForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            let form = e.currentTarget;
            let url = `${process.env.BACKEND_URL}/users/${id}/rating`;
            try {
                /**
                 * Takes all the form fields and make the field values
                 * available through a `FormData` instance.
                 */
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
        <div className='full-poll'>
            <form onSubmit={handleSubmitPoll} id='rating'>
                <div className='container'>
                    <h1 className='text-center pt-3'>YOUR TRIP HAS BEEN COMPLETED</h1>
                    <h5 className='text-center'>Please give us your feedback on the partner you chose</h5>
                    <div className='row mt-5 d-flex '>
                        <div className='col-lg-5 col-12 text-center'>
                            <img src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png' alt='user image' className='w-50' />
                            <div className='mt-3 '>

                                <textarea className='form-control w-75 mx-auto mb-3' id='validationTextarea' placeholder='Please tell us briefly about your experience' name='experience' required></textarea>
                                <div className='invalid-feedback'>
                                    Please enter a message.
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-7 col-12 align-content-center'>
                            <p>From 1 to 7, being 1 the worst and 7 the best experience: </p>
                            <p class="instructions">(set sliders according to your preferences)</p>
                            <label for='customRange1' class='form-label'>Was your partner a good match according to what you were looking for?</label>
                            <div className='d-flex'>
                                <input type='range' class='slider form-range w-50 mb-3  in-line' min='1' max='7' step='1' id='customRange1' onInput={handleFirstInput} name='good_match' value={firstInput} />
                                <label className='form-label in-line ms-4' id='rangeValue'>{firstInput}</label>
                            </div>
                            <p for='customRange2' class='form-label'>Would you recommend your partner to join other travellers?</p>
                            <div className='d-flex'>
                                <input type='range' class='slider form-range w-50 mb-3' min='1' max='7' step='1' id='customRange2' onInput={handleSecondInput} name='recommend' value={secondInput} />
                                <p className='d-flex in-line ms-4' id='rangeValue'>{secondInput}</p>
                            </div>
                            <div className={'mb-3' + (secondInput < 5 ? ' d-none' : '')}>
                                <p className='form-label'>Please tell us why do you recommend your partner (choose one)</p>
                                <div className='form-check '>
                                    <input className='form-check-input' type='radio' id='Checkbox1' name='reason_good' value='Funny' />
                                    <label className='form-check-label' for='Checkbox1'>Funny</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='Checkbox4' name='reason_good' value='Love Adventures' />
                                    <label className='form-check-label' for='Checkbox4'>Love Adventures</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='Checkbox2' name='reason_good' value='Relax' />
                                    <label className='form-check-label' for='Checkbox2'>Relax</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='Checkbox3' name='reason_good' value='Good Talking' />
                                    <label className='form-check-label' for='Checkbox3'>Good Talking</label>
                                </div>

                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='Checkbox5' name='reason_good' value='Good at History' />
                                    <label className='form-check-label' for='Checkbox5'>Good at History</label>
                                </div>
                                <div className='form-check form-check-inline'>
                                    <input className='form-check-input ' type='radio' id='Checkbox6' name='reason_good' value='Great Dancer' />
                                    <label className='form-check-label' for='Checkbox6'>Great Dancer</label>
                                </div>
                            </div>
                            <div className={'mb-3' + (secondInput >= 5 ? ' d-none' : '')}>
                                <label className='form-label'>Please tell us why do you not recommend your partner (choose one)</label>
                                <div className='form-check'>
                                    <input className='form-check-input display-none' type='radio' id='secondCheckbox1' name='reason_bad' value='Bored' />
                                    <label className='form-check-label' for='Checkbox1'>Bored</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='secondCheckbox2' name='reason_bad' value='Disrespectful' />
                                    <label className='form-check-label' for='Checkbox2'>Disrespectful</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='secondCheckbox3' name='reason_bad' value='Obscene' />
                                    <label className='form-check-label' for='Checkbox3'>Obscene</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='secondCheckbox4' name='reason_bad' value='Complaining person' />
                                    <label className='form-check-label' for='Checkbox4'>Complaining person</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='secondCheckbox5' name='reason_bad' value='Unpunctual' />
                                    <label className='form-check-label' for='Checkbox5'>Unpunctual</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='secondCheckbox6' name='reason_bad' value='Messy' />
                                    <label className='form-check-label' for='Checkbox6'>Messy</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row d-flex">
                        <div class="col-lg-3 col-12 ms-auto">
                            <button type='submit' className='btn btn-primary mb-5 btn-lg'>Submit</button>
                        </div>
                    </div>


                </div>

            </form>
        </div>
    )
}
export default Poll;