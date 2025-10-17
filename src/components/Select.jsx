import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect from '@mui/material/Select';
// import Select as MuiSelect from '@mui/material/Select';

export default function Select({children, size="small", name='dropdown'}) {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size={size}>
            <InputLabel id="demo-select-small-label">{name}</InputLabel>
            <MuiSelect
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {children}
            </MuiSelect>
        </FormControl>
    );
}
