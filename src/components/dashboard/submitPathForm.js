import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, FormGroup, FormControlLabel, Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

}));

function SubmitPathForm() {
    const [optimizeByDistance, setOptimizeByDistance] = useState(true);
    const [optimizeByStops, setOptimizeByStops] = useState(false);

    function distanceOnChange() {
        setOptimizeByDistance(!optimizeByDistance);
        setOptimizeByStops(!optimizeByStops);
    }

    function stopsOnChange() {
        setOptimizeByDistance(!optimizeByDistance);
        setOptimizeByStops(!optimizeByStops);
    }

    return (
        <Box>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={optimizeByDistance} onChange={distanceOnChange} />}
                    label="Optimize by Distance"
                />
                <FormControlLabel
                    control={<Switch checked={optimizeByStops} onChange={stopsOnChange} />}
                    label="Optimize by Number of Landings"
                />
                <Box>
                    <Button variant='contained' color='secondary'>Preview Flight Plan</Button>
                    <Button variant='contained' color='primary'>Save Flight Plan</Button>
                </Box>
            </FormGroup>
        </Box>
    )
}

export default SubmitPathForm
