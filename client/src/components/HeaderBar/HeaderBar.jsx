import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HeaderBarStyle from './style';
import LoginForm from '../Form/LoginForm';
import RegisterForm from '../Form/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../store/actions/userAction';
export default function HeaderBar() {
  const classes = HeaderBarStyle();

  const [openLoginForm, setLoginOpen] = React.useState(false);
  const [openRegisterForm, setRegisterOpen] = React.useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const handleLoginClickOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegisterClickOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  const handleSignout = () => {
    dispatch(signout())
  }

  return (
    <div className={classes.headerBar}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Coins
          </Typography>
          {userInfo ? (
            <>
            <Button color="inherit" onClick={handleSignout}>Signout</Button>
            </>
          ) : (
            <>
            <Button color="inherit" onClick={handleLoginClickOpen}>Login</Button>
            <Button color="inherit" onClick={handleRegisterClickOpen}>Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <LoginForm handleClose={handleLoginClose} open={openLoginForm}/>
      <RegisterForm handleClose={handleRegisterClose} open={openRegisterForm}/>
    </div>
  );
}