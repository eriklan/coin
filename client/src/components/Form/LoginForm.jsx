import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/userAction';
import ErrorBar from '../PlaceHolder/ErrorBar';
import LoadingCircle from '../PlaceHolder/LoadingCircle';
export default function LoginForm(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose}>
        <form  onSubmit={submitHandler}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Login to view your saved coins!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
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
              Login
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

