import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../../styles/poll.css'
const Nombre = () => {
    const [firstInput, setFirstInput] = useState('7');
    const [secondInput, setSecondInput] = useState('7');
    const handleFirstInput = (e) => {
        setFirstInput(e.target.value)
    }
    const handleSecondInput = (e) => {
        setSecondInput(e.target.value)
    }

    const handleSubmitPoll = () =>{
        
    }
    return (
        <div className='full-poll'>
            <form onSubmit={handleSubmitPoll}>
                <div className='container'>
                    <h1 className='text-center pt-3'>Username! Your trip to (city) has been completed...</h1>
                    <h5 className='text-center'>You chose (username1) as your partner, please give us your feedback</h5>
                    <div className='row mt-5 d-flex '>
                        <div className='col-lg-5 col-12 text-center'>
                            <img src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png' alt='user image' className='w-50' />
                            <div className='mt-3 '>

                                <textarea className='form-control w-75 mx-auto mb-3' id='validationTextarea' placeholder='Please tell us briefly about your experience' required></textarea>
                                <div className='invalid-feedback'>
                                    Please enter a message.
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-7 col-12 align-content-center'>
                            <p>From 1 to 7, being 1 the worst and 7 the best experience: </p>
                            <p class="instructions">(set sliders according to your preferences)</p>
                            <label for='customRange1' class='form-label'>Was (username1) a good match according to what you were looking for?</label>
                            <div className='d-flex'>
                                <input type='range' class='slider form-range w-50 mb-3  in-line' min='1' max='7' step='1' id='customRange1' onInput={handleFirstInput} />
                                <label className='form-label in-line ms-4' id='rangeValue'>{firstInput}</label>
                            </div>
                            <p for='customRange2' class='form-label'>Would you recommend (username1) to join other travellers?</p>
                            <div className='d-flex'>
                                <input type='range' class='slider form-range w-50 mb-3' min='1' max='7' step='1' id='customRange2' onInput={handleSecondInput} />
                                <p className='d-flex in-line ms-4' id='rangeValue'>{secondInput}</p>
                            </div>
                            <div className='mb-3'>
                                <p className='form-label'>If your score is above or equal to 5 tell us why do you recommend username1 (choose 3)</p>
                                <div className='form-check '>
                                    <input className='form-check-input' type='checkbox' id='Checkbox1' value='Funny' />
                                    <label className='form-check-label' for='Checkbox1'>Funny</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' id='Checkbox4' value='Love Adventures' />
                                    <label className='form-check-label' for='Checkbox4'>Love Adventures</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' id='Checkbox2' value='Relax' />
                                    <label className='form-check-label' for='Checkbox2'>Relax</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' id='Checkbox3' value='Good Talking' />
                                    <label className='form-check-label' for='Checkbox3'>Good Talking</label>
                                </div>

                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' id='Checkbox5' value='Good at History' />
                                    <label className='form-check-label' for='Checkbox5'>Good at History</label>
                                </div>
                                <div className='form-check form-check-inline'>
                                    <input className='form-check-input ' type='checkbox' id='Checkbox6' value='Great Dancer' />
                                    <label className='form-check-label' for='Checkbox6'>Great Dancer</label>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>If your score is under 5 tell us why do you not recommend username1 (choose 3)</label>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' id='secondCheckbox1' value='Bored' />
                                    <label className='form-check-label' for='Checkbox1'>Bored</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' id='secondCheckbox2' value='Disrespectful' />
                                    <label className='form-check-label' for='Checkbox2'>Disrespectful</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' id='secondCheckbox3' value='Obscene' />
                                    <label className='form-check-label' for='Checkbox3'>Obscene</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' id='secondCheckbox4' value='Complaining person' />
                                    <label className='form-check-label' for='Checkbox4'>Complaining person</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' id='secondCheckbox5' value='Unpunctual' />
                                    <label className='form-check-label' for='Checkbox5'>Unpunctual</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' id='secondCheckbox6' value='Messy' />
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
export default Nombre;