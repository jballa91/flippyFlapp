import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { Alert } from '@material-ui/lab';


function Errors({ errors }) {

    return (
        <>
            {errors.map(error => {
                return <Alert severity='error'>{error}</Alert>
            })}
        </>
    )
}

export default Errors
