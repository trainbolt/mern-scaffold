import * as yup from "yup";
import { string, object } from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().required("Please enter an email."),
  password: yup.string().required("Please enter a password.")
});

export default validationSchema;
