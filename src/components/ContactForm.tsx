import React, { ChangeEvent, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import * as yup from "yup";
import formSchema from "../validation/formSchema";

type initialStateType = yup.InferType<typeof formSchema>;

const initialState: initialStateType = {
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

export const ContactForm = () => {
  const [contactPerson, setContactPerson] = useState(initialState);
  const [contactFormErrors, setContactFormErrors] = useState(initialFormErrors);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [postErrorMessage, setPostErrorMessage] = useState<boolean>(false);

  const inputChange = (name: string, value: any) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setContactFormErrors({
          ...contactFormErrors,
          [name]: "",
        });
      })
      .catch((error: any) => {
        setContactFormErrors({
          ...contactFormErrors,
          [name]: error.message,
        });
      });
    setContactPerson({
      ...contactPerson,
      [name]: value,
    });
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    inputChange(name, valueToUse);
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(contactPerson, `form has been submitted`);
  };

  useEffect(() => {
    console.log(formSchema.isValidSync(contactPerson)), [];
    // formSchema.isValid(contactPerson).then(
    //   (isValid: boolean) => {
    //     setIsDisabled(!isValid);
    //   },
    //   [contactPerson]
    // );
  });

  return (
    <>
      <Form onSubmit={submitForm} className="contact-form-container">
        <h2 className="contact-h2">Contact us</h2>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="enter your name"
            value={contactPerson.name}
            onChange={changeHandler}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="enter your email"
            value={contactPerson.email}
            onChange={changeHandler}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="birthDate">Date of Birth</Label>
          <Input
            type="date"
            name="birthDate"
            id="birthDate"
            placeholder="enter your Date of Birth"
            value={contactPerson.birthDate}
            onChange={changeHandler}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="emailConsent"
              id="emailConsent"
              onChange={changeHandler}
              checked={contactPerson.emailConsent}
              required
            />
            I agree to be contacted via email.
          </Label>
        </FormGroup>
        <Button
          type="reset"
          className="contact-form-btn"
          onClick={() => setContactPerson(initialState)}
        >
          Clear
        </Button>
        <Button
          type="submit"
          className="contact-form-btn"
          color="primary"
          disabled={isDisabled}
        >
          Submit
        </Button>
        <div className="error-message-container">
          <p>{contactFormErrors.name}</p>
          <p>{contactFormErrors.email}</p>
          <p>{contactFormErrors.birthDate}</p>
          <p>{contactFormErrors.emailConsent}</p>
        </div>
      </Form>
      {!successMessage ? null : (
        <Alert className="success-message-container" color="success">
          Thank you for filling the form. We will contact you very soon!
        </Alert>
      )}
      {!postErrorMessage ? null : (
        <Alert className="post-error-message-container" color="danger">
          Something went wrong with form submit. Please try again.
        </Alert>
      )}
    </>
  );
};
