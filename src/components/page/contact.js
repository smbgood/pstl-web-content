import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "../../styles/contact.scss"
import qs from "querystring"
import axios from "axios";

class Contact extends Component {
    render() {
        return (
            <div className="contact-root">
                <h1 className="contact-title">Contact Us</h1>
                <Formik
                    initialValues={{ firstname: '', email: '', message: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Email required';
                        }else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Please enter a valid email address';
                        }

                        if(!values.firstname){
                            errors.firstname = 'Please enter your name';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        values["form-name"] = "pstlcontact"
                        values = qs.stringify(values)

                        axios.post("/pstlcontact", values, {headers: {'Content-Type':'application/x-www-form-urlencoded'}})
                            .then(response => {
                                //used to parse out stuff to use on the spot
                                /*const {
                                    data: {
                                        userId: id
                                    }
                                } = profile*/

                                console.log(response)
                                if (typeof window !== `undefined`) window.location.replace(`/`)
                            }).catch(error => {
                            console.log(error)
                        })
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form name="pstlcontact" data-netlify action="/pstlcontact">
                            <br/>
                            <br/>
                            <Field name="firstname" placeholder="What's your name?"/>
                            <ErrorMessage name="firstname" component="div"/>
                            <br/>
                            <Field type="email" name="email" placeholder="A good contact email?" />
                            <ErrorMessage name="email" component="div" />
                            <br/>
                            <Field name="message" component="textarea" placeholder="Leave any messages or product inquiries here and we will respond within 24 hours. Thank you!" />
                            <ErrorMessage name="message" component="div" />
                            <br/>
                            <button className={"contact-us-submit"} type="submit" disabled={isSubmitting}>
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