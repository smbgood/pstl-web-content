import React from "react"
import Flickity from "react-flickity-component"
import "../../../node_modules/flickity/css/flickity.css"
import "../../styles/carousel.scss"

export default class Carousel extends React.Component {

  state = {
    modals: [],
    images: [],
  }

  componentDidMount(){
    let modals = document.querySelectorAll('.modal')
    this.setState( {modals} )
  }

  constructor(props){
    super(props)
    this.doClick = this.doClick.bind(this)
    this.createHTMLSafeKey = this.createHTMLSafeKey.bind(this)
  }

  doClick(e){
    for(const modal of this.state.modals){
      if(modal.id === e.target.getAttribute("data-modal-href")){
        modal.open();
      }
    }
  }

  createHTMLSafeKey(input){
    if(input){
      let other = input.toString();
      const retVal = other.replace(/\./g, '-')
      if(retVal){
        return retVal
      }
      return ""
    }
    return ""
  }

  render(){
      const images = this.props.images;
      const opts = {contain : true}
      return (
          <Flickity className={'carousel'} // default ''
                    elementType={'div'}
                    options={opts}>
            {images.map(item => (
              <img
                src={item.node.fixed.src} key={this.createHTMLSafeKey(item.node.fixed.originalName)}/>
            ))}
          </Flickity>
      )
  }

}
