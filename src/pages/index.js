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
            <a href={"/other"}>Home</a>
            <a href={"/other"}>About Us</a>
            <a href={"/other"}>Order</a>
            <a href={"/other"}>Contact</a>
            <a href={"/other"}>Gallery</a>
          </div>
        </div>
      </div>
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
          <h2>Have you ever wondered what it would be like to drive around your town, looking to everyone passing by like you have a TUN of whiskey, or more, fitted into your truck bed?</h2>
          <h2>Well we've got just the thing for you!! A custom-fitted truck bed cover, built with our patented design and machined exactly to fit the dimensions of your truck bed. </h2>
          <h2>Our truck bed covers are great for:</h2>
          <ul>
            <li>Promoting a new brewery or distillery</li>
            <li>Standing out at a tailgate, race or sporting event</li>
            <li>Protecting precious cargo on long roadtrips</li>
            <li>Generally being an excellent conversation starter and set piece</li>
            <li>Anything else you can imagine!</li>
          </ul>
          <h2>Our past customers love the look and the naturally weather resistant properties of cedar, and we are confident you will too.</h2>
          <h3>Give us a shout via our contact form and we can get you started on your (amazing) new custom truck bed cover today!</h3>
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
