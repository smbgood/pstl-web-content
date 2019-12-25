// src/components/widgets/Carousel.js
import React from "react"
import M from "materialize-css"
import "../../styles/carousel.scss"

class Carousel extends React.Component {

  state = {
    modals: [],
    images: [],
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
    this.createHTMLSafeKey = this.createHTMLSafeKey.bind(this)
  }

  doClick(e){
    for(const modal of this.state.modals){
      //console.log(modal)
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

  getLargestSizeImage(input){
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
      console.log(sizeToImage)
      let highest = 0
      let index = -1
      for(let i=0;i<sizeToImage.length; i++){
        let size = sizeToImage[i]
        if(size.size){
          if(highest < parseFloat(size.size)){
            highest = parseFloat(size.size)
            index = i
          }
        }
      }

      if(index > -1){
        const retArray = []
        retArray[0] = sizeToImage[index]
        return retArray
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
        <a className="carousel-item waves-effect waves-purple" data-modal-href={this.createHTMLSafeKey(item.node.fixed.originalName)+"-modal"} onClick={this.doClick} key={this.createHTMLSafeKey(item.node.fixed.originalName) + "-parent"}><img src={item.node.fixed.src} key={this.createHTMLSafeKey(item.node.fixed.originalName)}/> </a>
      ))}
      </div>
    {images.map(item => (
      <div className="modal" id={this.createHTMLSafeKey(item.node.fixed.originalName)+"-modal"} key={this.createHTMLSafeKey(item.node.fixed.originalName)+"-modal"}>
        <div className="modal-content">
          {this.getLargestSizeImage(item).map( (itemImage) => (
            <img data-size={itemImage.size} src={itemImage.src}/>
          ))}
        </div>
        {/*<div className="modal-footer">
        </div>*/}
      </div>
      ))}
      </div>
    )
  }

}
export default Carousel
