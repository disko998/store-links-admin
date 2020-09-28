import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useFormik } from 'formik'
import { ResetSchema } from '../utils/validation'

export default function EmailDialog({ handleClose, open, onReset }) {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: ResetSchema,
        validateOnChange: false,
        onSubmit: (values, { resetForm }) => {
            onReset(values.email)
            handleClose()
            resetForm()
        },
    })

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'
        >
            <DialogTitle id='form-dialog-title'>Forgot Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your email address. We will send you a reset password
                    link to an email.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin='dense'
                    id='email'
                    label='Email Address'
                    type='email'
                    fullWidth
                    value={formik.values.email}
                    error={!!formik.errors.email}
                    onChange={formik.handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Cancel
                </Button>
                <Button onClick={formik.handleSubmit} color='primary'>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}
