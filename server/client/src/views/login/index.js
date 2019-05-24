import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { spacing } from "@material-ui/system";

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
import connect from "react-redux/es/connect/connect";

class Login extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Formik
        className={classes.form}
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          this.props.loginUser(values);
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
              Login
            </Typography>
            <div className={classes.fields}>
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
            </div>
            <Button
              className={classes.signInUpButton}
              color="primary"
              disabled={isSubmitting || !isValid}
              type="submit"
              size="large"
              variant="contained"
              fullWidth
              mt={8}
            >
              Login
            </Button>
            <Typography className={classes.signInUp} variant="body1">
              Don't have an account?{" "}
              <Link className={classes.signInUpUrl} to="/register">
                Register
              </Link>
            </Typography>
          </form>
        )}
      </Formik>
    );
  }
}

Login.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(AuthActions.login(user))
  };
};

// Will need to connect actions here
export default withStyles(styles, { withTheme: true })(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
