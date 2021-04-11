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
                however, you can still {/*<Link className={"welcome-link"} to={"/shope/categories"}>preorder in the shop</Link> or*/} <Link className={"welcome-link"} to={"/shope/contact"}>get in contact with us</Link> while we are building!
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
              values["form-name"] = "pstlcontact"
              values = qs.stringify(values)
              var url = "/?no-cache=1";
              const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(values),
                url,
              };
              axios(options)
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
              <Form>
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
          <form name="pstlcontact" method="post" data-netlify={true} data-netlify-honeypot="bot-field" action="/" hidden>
            <input type="hidden" name="bot-field"/>
            <input type="hidden" name="form-name" value="pstlcontact"/>
            <input type="text" name="firstname" />
            <input type="text" name="email" />
            <input type="text" name="message" />
          </form>
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
