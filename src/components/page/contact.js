import React, { Component } from 'react'
import {graphql, StaticQuery} from 'gatsby'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "../../styles/contact.scss"
import axios from "axios";
import qs from "querystring"

class Contact extends Component {

  render() {
    return (
      <div className="contact-root">
        <h1 className="contact-title">Contact Us</h1>
          <form name="b-b-contact" data-netlify="true" netlify-honeypot="bot-field" method="POST" action="/" netlify>
              <input type="hidden" name="bot-field"/>
              <input type="hidden" name="form-name" value="b-b-contact" />
              <input type="text" name="name" placeholder="What's your name?"/>
              <br/>
              <input type="email" name="email" placeholder="Enter a good contact email" />
              <br/>
              <input name="message" type="textarea" placeholder="Here is where you leave me your glowing messages or ask any questions!" />
              <br/>
              <button type="submit" >
                  Submit
              </button>
          </form>

      </div>
    )
  }
}

export default Contact