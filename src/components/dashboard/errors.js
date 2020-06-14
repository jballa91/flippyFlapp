import React from 'react';

function Errors({ errors }) {

    return (
        <>
            {errors.map(error => {
                return <div>{error}</div>
            })}
        </>
    )
}

export default Errors
