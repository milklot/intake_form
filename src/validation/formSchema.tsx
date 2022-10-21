import * as yup from "yup";

const formSchema = yup.object({
  name: yup.string().required("missing your name"),
  email: yup.string().required("please enter your email"),
  emailConsent: yup
    .boolean()
    .required("please check box above in order to submit the form"),
  birthDate: yup.string().notRequired(),
});

export default formSchema;
