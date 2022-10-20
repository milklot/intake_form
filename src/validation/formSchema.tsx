import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().required("missing your name"),
  email: yup.string().required("please enter your email"),
  emailConsent: yup
    .boolean()
    .required("please check box above in order to submit the form"),
  birthDate: yup.string(),
});

export default formSchema;
