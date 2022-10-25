import React, { useEffect, useState } from 'react';

const URL_API = "...";
const getFetch = (url = "", options = {}) => {
    return fetch(url, options);
}

const style = {
    width: '80px',
    height: 'auto',
    objectFit: 'cover',
    padding: '0% !important'

}

const rounded = {
    borderRadius: '100%',
    objectFit: 'cover',
    width: '300px',
    height: '300px',
    objectPosition: 'top'
}

//563492ad6f9170000100000167d81d8c57d0444188568902267487d1

const CardBody = ({ name, compatibility, image }) => {
    return (
        <div className='row justify-content-center px-3'>
            <img src={image} className="card-img-top py-3" alt="..." style={rounded} />
            <div className="card mb-5 p-0">
                <div className="card-body d-flex p-0">
                    <img src={image} className="rounded-start" alt="..." style={style} />
                    <div className='w-100 text-center'>
                        <h3 className="card-text">{name}</h3>
                        <p className="card-text">{compatibility}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

const Loading = () => {
    return (
        <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
};

export default function RecommendationCard() {

    const [matches, setMatches] = useState(null);

    useEffect(() => {

        getMatches(URL_API)

    }, [])

    const getMatches = (url, options = {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
        }
    }) => {
        getFetch(url, options)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((response) => {
                console.log(response);
                setMatches(response);
            })
    }

    return (
        <div className="container">
        <h1 className='mb-5'>USERNAME'S MATCHES</h1>
            <div className="row">
                {
                    !!matches &&
                        matches.results.length > 0 ?
                        matches.results.map((match) => {
                            return (
                                <div className="col-md-4 col-sm-4 col-12" key={match.id}>
                                    <CardBody {...match} />
                                </div>
                            )
                        }) :
                        (
                            <div className="col-md-12 text-center">
                                <Loading />
                            </div>
                        )
                }
            </div>
        </div>
    );
};



