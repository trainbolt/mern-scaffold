import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik } from "formik";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material UI
import { Button, TextField, Typography } from "@material-ui/core";

// Actions
import AuthActions from "../../actions/auth";

// Component styles
import styles from "../../layouts/login/styles";

// Validation Schema
import validationSchema from "./validationSchema";

class Register extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Formik
        className={classes.form}
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirm_password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          this.props.registerUser(values);
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
          isValid
        }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Typography className={classes.title} variant="h2">
              Register
            </Typography>
            <div className={classes.fields}>
              <TextField
                className={classes.textField}
                label="First name"
                name="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.first_name}
                variant="outlined"
              />
              {errors.first_name && touched.first_name && (
                <Typography className={classes.fieldError} variant="body2">
                  {errors.first_name}
                </Typography>
              )}
              <TextField
                className={classes.textField}
                label="Last Name"
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.last_name}
                variant="outlined"
              />
              {errors.last_name && touched.last_name && (
                <Typography className={classes.fieldError} variant="body2">
                  {errors.last_name}
                </Typography>
              )}
              <TextField
                className={classes.textField}
                label="Email address"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                value={values.email}
                variant="outlined"
              />
              {errors.email && touched.email && (
                <Typography className={classes.fieldError} variant="body2">
                  {errors.email}
                </Typography>
              )}
              <TextField
                className={classes.textField}
                label="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                value={values.password}
                variant="outlined"
              />
              {errors.password && touched.password && (
                <Typography className={classes.fieldError} variant="body2">
                  {errors.password}
                </Typography>
              )}
              <TextField
                className={classes.textField}
                label="Confirm Password"
                name="confirm_password"
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                value={values.confirm_password}
                variant="outlined"
              />
              {errors.confirm_password && touched.confirm_password && (
                <Typography className={classes.fieldError} variant="body2">
                  {errors.confirm_password}
                </Typography>
              )}
            </div>
            <Button
              className={classes.signInUpButton}
              color="primary"
              disabled={isSubmitting || !isValid}
              type="submit"
              size="large"
              variant="contained"
              fullWidth
            >
              Sign in now
            </Button>
            <Typography className={classes.signInUp} variant="body1">
              Already have an account?{" "}
              <Link className={classes.signInUpUrl} to="/login">
                Login
              </Link>
            </Typography>
          </form>
        )}
      </Formik>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: newUser => dispatch(AuthActions.register(newUser))
  };
};

// Will need to connect actions here
export default withStyles(styles, { withTheme: true })(
  connect(
    null,
    mapDispatchToProps
  )(Register)
);
