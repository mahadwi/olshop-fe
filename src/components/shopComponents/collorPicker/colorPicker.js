import React, { Component } from 'react'
import './colorPicker.css'
import { Col, Row } from 'react-bootstrap';

export default class colorPicker extends Component {
    constructor() {
        super();
        this.state = {
          color: []
        };
      }
    
      colorChecked = () => {
        this.style.border = '5px';
      }
      
  render() {
    return (
      <div className='container-fluid'>
        <div><hr style={{width:'76%',marginLeft:'100px'}}/></div>
        <div style={{marginLeft:'100px'}}><b>Colors</b></div>
        <br/>
          <Row xs={'auto'} style={{marginLeft:'83px'}}>
            <Col style={{marginRight:'10px'}} xs={1}>
            <div class="result" style={{backgroundColor:'black', cursor:"pointer", border:'none'}}>
              </div> 
            </Col>
            <Col style={{marginRight:'10px'}} xs={1}>
            <div class="result" style={{backgroundColor:'rgba(205, 185, 160, 1)', cursor:"pointer", border:'none'}}></div> 
            </Col>
            <Col style={{marginRight:'10px'}} xs={1}>
            <div class="result" style={{backgroundColor:'rgba(164, 164, 166, 1)', cursor:"pointer", border:'none'}}></div> 
            </Col>
            <Col style={{marginRight:'10px'}} xs={1}>
            <div class="result" style={{backgroundColor:'rgba(150, 90, 64, 1)', cursor:"pointer", border:'none'}}></div> 
            </Col>
            <Col style={{marginRight:'10px'}} xs={1}>
            <div class="result" style={{backgroundColor:'rgba(250, 145, 178, 1)', cursor:"pointer", border:'none'}}></div> 
            </Col>
            <Col style={{marginRight:'2px'}} xs={1}>
            <div class="result" style={{backgroundColor:'rgba(228, 232, 213, 1)', cursor:"pointer", border:'none'}}></div>
            </Col>
          </Row>
     </div>
    )
  }
}
