import React from 'react';
import {
    Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
    flight_plan_form_container: {
        backgroundColor: "white",
        height: "50%",
        width: "50%",
        display: "flex",
    },
}));

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
