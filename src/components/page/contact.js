import React, { Component } from 'react'
import {graphql, StaticQuery} from 'gatsby'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "../../styles/contact.scss"

class Contact extends Component {

  render() {
    return (
      <div className="contact-root">
        <h1 className="contact-title">Contact Us</h1>
          <Formik
              initialValues={{ name: '', email: '', message: '' }}
              validate={values => {
                  const errors = {};
                  if (!values.email) {
                      errors.email = 'Email required';
                  }else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                      errors.email = 'Invalid email address';
                  }

                  if(!values.name){
                      errors.name = 'Please enter your name';
                  }
                  return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                      setSubmitting(false);
                  }, 400);
              }}
          >
              {({ isSubmitting }) => (
                  <Form name="b-b-contact" data-netlify="true" netlify-honeypot="bot-field" method="POST" action="/">
                      <input type="hidden" name="bot-field"/>
                      <Field name="name" placeholder="What's your name?"/>
                      <ErrorMessage name="name" component="div"/>
                      <br/>
                      <Field type="email" name="email" placeholder="Enter a good contact email" />
                      <ErrorMessage name="email" component="div" />
                      <br/>
                      <Field name="message" component="textarea" placeholder="Here is where you leave me your glowing messages or ask any questions!" />
                      <ErrorMessage name="message" component="div" />
                      <br/>
                      <button type="submit" disabled={isSubmitting}>
                          Submit
                      </button>
                  </Form>
              )}
          </Formik>
      </div>
    )
  }
}

export default Contact