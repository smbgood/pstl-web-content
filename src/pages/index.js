import React, {useState, useEffect} from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo";
import { navigate, graphql } from "gatsby"

import {GatsbyImage} from "gatsby-plugin-image";
import Flickity from "react-flickity-component"
import { ErrorMessage, Field, Form, Formik } from "formik"

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const Index = ({data, location}) =>
{
  return (
    <Layout>
      <SEO title={"Dave's Truck Barrels"} history={location}/>
      <div className={"welcome-root"}>

        <div className={"gallery-root"}>
          <Flickity className={'modal-carousel'} // default ''
                    elementType={'div'}
                    options={{contain:true, freeScroll: true, prevNextButtons:false, wrapAround: true,
                      initialIndex:3, pageDots:false, autoPlay:2222, pauseAutoPlayOnHover:true, selectedAttraction: 0.01,
                      friction: 0.15}}>
            {data.carouselImages.edges.map(({ node }, i) => (
              <GatsbyImage image={node.childImageSharp.gatsbyImageData} alt={"Carousel " + i} key={i}/>
            ))}
          </Flickity>
        </div>
        <div className={"call-to-action-root"}>
          <h1>Hey there! Welcome to Dave's Barrels.com !</h1>
          <h2>Have you ever wondered what it might be like to drive around your town, looking to everyone passing by like you have a TUN of whiskey, or more, fitted into the back of your truck?</h2>
          <h2>Well we've got just the thing for you!! Our recently PATENTED WHISKEY BARREL SHAPED PICKUP TRUCK CAP — built with exacting craftsmanship to perfectly fit the dimensions of your truck bed. </h2>
          <h2>Our truck caps are great for:</h2>
          <ul>
            <li>Promoting a new brewery or distillery</li>
            <li>Standing out at a tailgate, race or sporting event</li>
            <li>Protecting precious cargo on long roadtrips</li>
            <li>Generally being an excellent conversation starter and set piece</li>
            <li>Anything else you can imagine!</li>
          </ul>
          <h2>Our past customers love the look and the naturally weather resistant properties of cedar, and we are confident you will too.</h2>
          <h3>Give us a shout below and we can get started on your new custom truck cap today!</h3>
        </div>
        <div className="contact-root">
          <Formik
            initialValues={{ firstname: '', email: '', message: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Please enter a valid email address';
              }

              if (!values.firstname) {
                errors.firstname = 'Please enter your name';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encode({
                  'form-name': 'pstl',
                  ...values,
                }),
              })
                .then(() => navigate("/success"))
                .catch((error) => alert("We're sorry, something went wrong with your request. Please try again later."))
            }}
          >
            {({ isSubmitting }) => (
              <Form name="pstl" method="post" action="/success" data-netlify="true"
                    data-netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="pstl"/>
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field"/>
                  </label>
                </div>
                <Field name="firstname" placeholder="What's your name?"/>
                <ErrorMessage name="firstname" component="div"/>
                <br/>
                <Field type="email" name="email" placeholder="A good contact email?"/>
                <ErrorMessage name="email" component="div"/>
                <br/>
                <Field name="message" component="textarea"
                       placeholder="Leave any messages or product inquiries here and we will respond within 24 hours. Thank you!"/>
                <ErrorMessage name="message" component="div"/>
                <br/>
                <button className={"contact-us-submit"} type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  )
}
export const query = graphql`
    query IndexeQuery {
        carouselImages: allFile(filter: {relativePath: {glob: "caro-*"}}) {
          edges {
            node {
              childImageSharp{
                gatsbyImageData(
                  layout:FIXED
                  height:600
                  placeholder:DOMINANT_COLOR
                  formats: [AUTO,WEBP,AVIF]
                )
              }
            }
          }
        }             
    }
`
export default Index
