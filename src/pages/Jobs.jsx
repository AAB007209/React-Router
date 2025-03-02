import React from 'react'
import { Link, useLoaderData } from 'react-router-dom';

const Jobs = () => {
    const jobsData = useLoaderData();
    return (
        <div className='jobs'>
            {jobsData.map((job) => {
                // We will get id as number here so convert it into string
                return <Link to={job.id.toString()} key={job.id}>
                    <h3>{job.title}</h3>
                    <p>{job.location}</p>
                </Link>
            })}
        </div>
    )
}

export default Jobs;

// Adding loader function here

export const jobsLoader = async () => {
    const response = await fetch("http://localhost:5000/jobs");

    if (!response.ok) {
        throw Error("Could not find the job list!");
    }

    return response.json();
}