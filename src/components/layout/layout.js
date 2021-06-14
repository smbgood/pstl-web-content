import React, { useEffect, useState } from "react"
import Footer from "./footer"
import { graphql, StaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Layout = ({children}) => {
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
      const isScrolled = window.scrollY > 20;
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
    <StaticQuery
      query={graphql`
        query SiteInfo {
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
      `}
      render={ data  => (
        <div className="container-root-outer">
          <div className="page-root" >
            <div className={"nav-section"} data-hide={state.scrolled}>
              <div className={"welcome-image-top"}>
                <GatsbyImage image={data.newLogo.childImageSharp.gatsbyImageData}  alt={"Dave's Patented Whiskey Barrel Shaped Pickup Truck Bed Caps"}/>
              </div>
              <div className={"welcome-overlay"} data-hide={state.scrolled}>
                <div className={"welcome-links"}>
                  <a href={"/"}>Home</a>
                  <a href={"/gallery"}>Gallery</a>
                </div>
              </div>
            </div>
            {children}
          </div>
          <Footer />
        </div>
      )}
    />
  )
}

export default Layout
