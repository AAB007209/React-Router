import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom'

const JobDetails = () => {

    // Getting dynamic value id from the URL using the useParams hook
    // const { id } = useParams();

    const jobDetails = useLoaderData();
    const navigate = useNavigate();

    return (
        <div className='job-details'>
            <p><b>Job Title: </b>{jobDetails.title}</p>
            <p><b>Salary: </b>{jobDetails.salary}</p>
            <p><b>Job Location: </b>{jobDetails.location}</p>
            <p><b>Description: </b>{jobDetails.description}</p>
            <button>Apply Now</button>
            <br />
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    )
}

export default JobDetails;

export const JobDetailsLoader = async ({ params }) => {
    const { id } = params;

    const response = await fetch("http://localhost:5000/jobs/" + id);
    // Adding check for the errorElement using thing "ok" property from response object
    if (!response.ok) {
        throw Error("Could not find the job details!");
    }

    return response.json();
}