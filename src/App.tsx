import React, { useState, useEffect, FormEvent } from "react";
import "./App.css";
import * as yup from "yup";

import formSchema from "./validation/formSchema";
import { ContactFooter } from "./components/ContactFooter";
import { ContactHeader } from "./components/ContactHeader";
import { ContactForm } from "./components/ContactForm";

const initialState: {
  name: string;
  email: string;
  birthDate: string;
  emailConsent: boolean;
} = {
  name: "",
  email: "",
  birthDate: "",
  emailConsent: false,
};

const initialFormErrors: {
  name: string;
  email: string;
  birthDate: string;
  emailConsent: string;
} = {
  name: "",
  email: "",
  birthDate: "",
  emailConsent: "",
};

const App = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [isDisabled, setIsDisabled] = useState(true);

  const inputChange = (name: string, value: any) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((error: any) => {
        setFormErrors({
          ...formErrors,
          [name]: error.message,
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setIsDisabled(!valid);
    });
  }, [formValues]);

  return (
    <>
      <ContactHeader />
      <ContactForm />
      <ContactFooter />
    </>
  );
};

export default App;
