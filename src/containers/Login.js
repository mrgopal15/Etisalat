import React, { useEffect } from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import _ from "lodash";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import tick from "../assets/images/icons/tick.svg";

function Login() {
  useEffect(() => {
    localStorage.removeItem("authtoken");
  }, []);

  var username = localStorage.getItem("name");
  var password = atob(localStorage.getItem("pwd"));
  let history = useHistory();

  const [state, setState] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
                <h3>Sign in</h3>
              </div>
              <Formik
                initialValues={{
                  name: "",
                  password: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (values.name === "") {
                    errors.name = "User name is Required";
                  } else if (values.name !== username) {
                    errors.name = "User doesn't Exist. Please Sign Up";
                  }
                  if (values.password === "") {
                    errors.password = "Password is Required";
                  } else if (values.password !== password) {
                    errors.password = "Password doesn't Match";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(username);
                  console.log(password);
                  console.log(values);
                  if (
                    username === values.name &&
                    _.toString(password) === values.password
                  ) {
                    localStorage.setItem("authtoken", 1);
                    history.push("/Dashboard");
                  } else {
                    localStorage.removeItem("authtoken");
                    history.push("/");
                  }

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
                          id="username"
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
                        <FormControl className="form_div" variant="filled">
                          <InputLabel htmlFor="password">
                            Password
                          </InputLabel>
                          <FilledInput
                            name="password"
                            id="password"
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
                      Sign in
                    </Button>
                  </form>
                )}
              </Formik>
            </div>
            <div className="mt_15">
              I don't have an account{" "}
              <Link
                to="/Register"
              >
                Sign Up
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Login;
