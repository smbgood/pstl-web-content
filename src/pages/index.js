import React, {useState, useEffect} from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo";
import { graphql } from "gatsby"
import "../styles/welcome.scss"
import "../styles/contact.scss"
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
  const [state, setState] = useState({
    scrolled: false,
    visible: false,
    element: {},
    isVisible: (state) => {
        const { top, bottom } = state.element.getBoundingClientRect();
        const vHeight = (window.innerHeight || document.documentElement.clientHeight);

        return (
          (top > 0 || bottom > 0) &&
          top < vHeight
        );
    }
  });

  // change state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== state.scrolled) {
        setState({
          ...state,
          scrolled: !state.scrolled,
        });
      }
    };

    setState({...state, element: document.querySelector(".welcome-image-top")})

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      // clean up the event handler when the component unmounts
      document.removeEventListener('scroll', handleScroll);
    };
  }, [state.scrolled]);

  const toggleVisibility = () => {
    setState({
      ...state,
      visible: !state.visible,
    });
  };

  return (
    <Layout location={location}>
      <SEO title={"Dave's Truck Barrels"} history={location}/>
      <div className={"nav-section"} data-hide={state.scrolled}>
        <div className={"welcome-image-top"}>
          <GatsbyImage image={data.newLogo.childImageSharp.gatsbyImageData}  alt={"Coming Soon"}/>
        </div>
        <div className={"welcome-overlay"} data-hide={state.scrolled}>
          <div className={"welcome-links"}>
            <a href={"/other"}>Other</a>
            <a href={"/other"}>Other</a>
            <a href={"/other"}>Other</a>
            <a href={"/other"}>Other</a>
            <a href={"/other"}>Other</a>
          </div>
        </div>
      </div>
      <div className={"welcome-root"}>

        <div className={"gallery-root"}>
          <Flickity className={'modal-carousel'} // default ''
                    elementType={'div'}
                    options={{contain:false, freeScroll: true, prevNextButtons:false, initialIndex:3, wrapAround:true, pageDots:false, autoPlay:2222, pauseAutoPlayOnHover:false, selectedAttraction: 0.01,
                      friction: 0.15, fullscreen: true}}>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg" alt="orange tree" />
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg" alt="submerged" />
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/look-out.jpg" alt="look-out" />
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/one-world-trade.jpg" alt="One World Trade" />
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/drizzle.jpg" alt="drizzle" />
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/cat-nose.jpg" alt="cat nose" />
          </Flickity>
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
                .then(() => alert("success"))
                .catch((error) => alert(error))
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
          <button className={"merples"} onClick={() => alert(state.isVisible(state))}>hi</button>
        </div>
      </div>
    </Layout>
  )
}
export const query = graphql`
    query IndexeQuery {
        newLogo: file(relativePath: { eq :"pstl-logo.png"}) {
            childImageSharp {
              gatsbyImageData(
                 layout:CONSTRAINED
                 width:189
                 placeholder:TRACED_SVG
                 formats: [AUTO,WEBP,AVIF]
              )
            }
        }             
    }
`
export default Index
