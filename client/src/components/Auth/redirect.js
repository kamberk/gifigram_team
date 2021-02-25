import React from 'react'
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const redirect = () => {

    return (
        <div>
            <Button
                variant="contained"
                disabled
                style={{
                    backgroundColor: "#24a0ed",
                    color: "#fff"
                }}
                color="inherit"
                startIcon={<VerifiedUserIcon />}
                fullWidth
            >
                Please verify your email and login!
      </Button>
            <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" startIcon={<MailIcon />} style={{ marginTop: '1rem' }} fullWidth>Take me to to Gmail!</Button>
            </a>
            <a href="https://login.live.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button color="primary" variant="contained" style={{ marginTop: '1rem' }} startIcon={<ContactMailIcon />} fullWidth>Take me to Outlook</Button>
            </a>
        </div>
    )
}

export default redirect
