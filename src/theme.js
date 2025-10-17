import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        background: {
            secondary: '#346A57',
            primary: '#40826D',
            light: '#E6F0ED',
            medium: '#59A18C',
            error: 'red',
            success: 'green'
        },
        text: {
            secondary: '#555',
            primary: '#000',
            light: '#FFF',
            medium: '#59A18C',
            disabled: '#999',
            error: 'red',
            success: 'green'
        }
    },
})