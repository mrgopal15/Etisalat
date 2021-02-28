import React, { useEffect } from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import tick from "../assets/images/icons/tick.svg";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Register() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const [state, setState] = React.useState({
    showPassword: false,
    status: 0,
  });

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  console.log(state);
  return (
    <>
      <div>
        <Grid container spacing={0}>
        <Grid className="login_leftside" item xs={6}>
            <div>
              <div class="login_logo">Company Logo</div>
              <div className="login_div">
                <img src={tick} alt="tick" /> Easy to Sign Up
              </div>
              <div className="login_div">
                <img src={tick} alt="tick" /> Product Dashboard
              </div>
            </div>
          </Grid>
          <div className="copy_write">
            <span className="copywrite_font">© Copyright 2021 </span>
            <span className="copywrite_font">
              <Link to="#">
                Privacy Policy
              </Link>
            </span>
          </div>
          <Grid className="login_rightside" item xs={6}>
            <div className="form_area">
              <div>
                <h3>Sign Up</h3>
              </div>
              <Formik
                initialValues={{
                  name: "",
                  password: "",
                  email:""
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = "User name Required";
                  }
                  if (!values.password) {
                    errors.password = "Password Required";
                  }

                  if (!values.email) {
                    errors.email = 'Email Required';
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  localStorage.setItem("name", values.name);
                  localStorage.setItem("pwd", btoa(values.password));
                  localStorage.setItem("email", btoa(values.email));
                  setState({ ...state, status: 1 });
                  setOpen(true);
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 300);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <Grid item>
                      <div className="form_div p_0 mb_15">
                        <TextField
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          id="standard-basic"
                          label="User Name*"
                          variant="filled"
                          className="form_div"
                        />
                        <span className="error-msg">
                          {errors.name && touched.name && errors.name}
                        </span>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="form_div p_0 mb_15">
                        <TextField
                          type="text"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          id="standard-basic"
                          label="User Email*"
                          variant="filled"
                          className="form_div"
                        />
                        <span className="error-msg">
                          {errors.email && touched.email && errors.email}
                        </span>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="form_div p_0 mb_15">
                        <FormControl className="form_div" variant="filled">
                          <InputLabel htmlFor="filled-adornment-password">
                            Password
                          </InputLabel>
                          <FilledInput
                            name="password"
                            id="filled-adornment-password"
                            type={state.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form_div"
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {values.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>

                        <span className="error-msg">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </span>
                      </div>
                    </Grid>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      color="primary"
                      variant="contained"
                      className="form_div"
                    >
                      Sign up
                    </Button>
                  </form>
                )}
              </Formik>
            </div>
            <div className="mt_15">
              I have an account{" "}
              <Link to="/">
                Sign in
              </Link>
            </div>

            {state.status === 1 ? (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  Sign Up Success!
                </Alert>
              </Snackbar>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Register;
