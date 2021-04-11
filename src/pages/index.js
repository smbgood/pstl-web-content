import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo";
import { graphql, Link } from "gatsby"
import "../styles/welcome.scss"
import "../styles/contact.scss"
import {GatsbyImage} from "gatsby-plugin-image";
import { ErrorMessage, Field, Form, Formik } from "formik"
import qs from "querystring"
import axios from "axios"

function transformData(obj, image){
    return { title: obj.welcomeimagesection.welcomeTitle, image: image}
}

function param(object) {
  var encodedString = '';
  for (var prop in object) {
    if (object.hasOwnProperty(prop)) {
      if (encodedString.length > 0) {
        encodedString += '&';
      }
      encodedString += encodeURI(prop + '=' + object[prop]);
    }
  }
  return encodedString;
}

const Index = ({data, location}) => (
    <Layout navImage={data.logoImage.edges[0].node} location={location}>
        <SEO title={"Dave's Truck Barrels"} history={location}/>
      <div className={"welcome-root"}>
        <div className={"welcome-section"}>
          <div className={"welcome-image"}>
            <GatsbyImage image={data.comingSoonImage.childImageSharp.gatsbyImageData} alt={"Coming Soon"}/>
            <div className={"welcome-overlay"}>
              <div className={"welcome-top"}>
                Welcome to davesbarrels.com! Please mind the mess as we are undergoing construction.
              </div>
              <div className={"welcome-bottom"}>
                however, you can still get in contact with us below while we are building!
              </div>
            </div>
          </div>
        </div>
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
              values["form-name"] = "pstl"
              values = qs.stringify(values)
              /*var url = "/pstl-contact";
              const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: param(values),
                url,
              };
              axios(options)
                .then(response => {
                  //used to parse out stuff to use on the spot
                  /!*const {
                      data: {
                          userId: id
                      }
                  } = profile*!/

                  console.log(response)
                  if (typeof window !== `undefined`) window.location.replace(`/success`)
                  setSubmitting(false);
                }).catch(error => {
                console.log(error)
                setSubmitting(false);
              })*/
              values = qs.stringify(values)
              axios.post("/contact", values, {headers: {'Content-Type':'application/x-www-form-urlencoded'}})
                .then(response => {
                  //used to parse out stuff to use on the spot
                  /*const {
                      data: {
                          userId: id
                      }
                  } = profile*/

                  console.log(response)
                  if (typeof window !== `undefined`) window.location.replace(`/success`)
                }).catch(error => {
                console.log(error)
              })
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form name="pstl" data-netlify="true" netlify-honeypot="bot-field" method="post" action="/success" >
                <input type="hidden" name="bot-field"/>
                <input type="hidden" name="form-name" value="pstl"/>
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
      </div>
    </Layout>
)
export const query = graphql`
    query IndexeQuery {
        logoImage: allImageSharp(filter: {fluid: {originalName: {eq: "pstl-logo.png"}}}) {
            edges {
                node {
                    fluid(maxWidth: 500, quality: 100) {
                        ...GatsbyImageSharpFluid
                        originalName
                    }
                }
            }
        },
        welcomeInfo: allSiteadminJson {
            nodes {
              welcomepage {
                welcomeimagesection {
                  welcomeImage
                  welcomeTitle
                  }
                }
              }
            
        },
        comingSoonImage: file(relativePath: { eq: "coming-soon.png" }) {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
        }                  
    }
`
export default Index
