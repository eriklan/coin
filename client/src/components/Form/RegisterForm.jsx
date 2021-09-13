import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/actions/userAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoadingCircle from '../PlaceHolder/LoadingCircle';
import ErrorBar from '../PlaceHolder/ErrorBar';

export default function RegisterForm(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose}>
      <form  onSubmit={submitHandler}>
          <DialogTitle>Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Register to view your saved coins!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="Name"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          {loading && <LoadingCircle />}
          {error && <ErrorBar error={error}/>}
          <DialogActions>
            <Button onClick={props.handleClose} color="primary" type="submit">
              Register
            </Button>
            <Button onClick={props.handleClose} color="primary">
              cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

