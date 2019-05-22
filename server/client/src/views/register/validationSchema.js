import * as yup from "yup";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("Please enter a first name."),
  last_name: yup.string().required("Please enter a last name."),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter an email."),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    //.matches(
    //  /((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/,
    //  "Password must satisfy 3 of the following: one uppercase, one lowercase, one number or one special character."
    //)
    .required("Please enter a password."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match.")
});

export default validationSchema;
