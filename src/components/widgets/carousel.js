// src/components/widgets/Carousel.js
import React from "react"
import M from "materialize-css"
import ImageZoom from "js-image-zoom"
class Carousel extends React.Component {

  state = {
    modals: [],
  }

  componentDidMount(){
    let elems = document.querySelectorAll('.carousel');
    M.Carousel.init(elems, null);

    let modalElems = document.querySelectorAll('.modal')
    let modals = M.Modal.init(modalElems, null)
    this.setState( {modals} )
  }

  constructor(props){
    super(props)
    this.doClick = this.doClick.bind(this)
  }

  doClick(e){
    for(const modal of this.state.modals){
      console.log(modal)
      if(modal.id === e.target.getAttribute("data-modal-href")){
        modal.open();
      }
    }
  }

  createHTMLSafeKey(input){
    if(input.node.fixed.originalName){
      let name = input.node.fixed.originalName;
      let replaced = name.replace(/\./g, '_')
      return replaced
    }
    return ""
  }

  getLargerSizeImage(input){
    if(input.node.fixed.srcSet){
      let split = input.node.fixed.srcSet.split(",\n")
      let sizeToImage = []
      for(const val of split){
        let pieces = val.split(" ")
        if(pieces.length){
          let replaced = pieces[1].replace(/x/g, "")
          let retVal = {
            size: replaced,
            src: pieces[0]
          }
          sizeToImage.push(retVal);
        }
      }

      return sizeToImage
    }
    return null
  }

  render(){
    const images = this.props.images;
    return(
      <div>
      <div className="carousel">
      {images.map(item => (
        <a className="carousel-item waves-effect waves-purple" data-modal-href={this.createHTMLSafeKey(item)+"-modal"} onClick={this.doClick} key={this.createHTMLSafeKey(item) + "-parent"}><img src={item.node.fixed.src} key={this.createHTMLSafeKey(item)}/> </a>
      ))}
      </div>
    {images.map(item => (
      <div className="modal" id={this.createHTMLSafeKey(item)+"-modal"} key={this.createHTMLSafeKey(item)+"-modal"}>
        <div className="modal-content">
          {this.getLargerSizeImage(item).map( (itemImage) => (
            <img src={itemImage.src} key={itemImage.size + "-image"} />
          ))}
        </div>
        <div className="modal-footer">
          {this.getLargerSizeImage(item).map( (itemImage) => (
            <a className="btn" key={itemImage.size + "-button"} >{itemImage.size}</a>
          ))}
        </div>
      </div>
      ))}
      </div>
    )
  }

}
export default Carousel
