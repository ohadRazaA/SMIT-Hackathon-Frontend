import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function Input({ variant = "outlined", type = "text", placeholder, value = '', onChange = () => { }, className = '', label = 'Input', disabled = false, margin, name }) {
    return <TextField label={label} variant={variant} type={type} placeholder={placeholder} value={value} onChange={onChange} className={className} disabled={disabled} margin={margin} name={name} />

}
