import React, { Component } from 'react'
import './colorPicker.css'
import { Col, Row } from 'react-bootstrap';
import { GetColor } from '../../../config/api';
import axios from 'axios';

export default class colorPicker extends Component {
    constructor() {
        super();
        this.state = {
          color: [],
          colorPicked : '',
          colorParam : this.props
        };
      }
    
      colorChecked = () => {
        this.style.border = '5px';
      }

      async componentDidMount() {
        try {
          const response = await axios.get(GetColor)
          this.setState({color : response.data.data})
        } catch (error) {
          console.log(error)
        }
       }

       handleCheckColor = () => {
        const warna = this.state.colorPicked
        alert('warna : ', warna)
       }


      
  render() {
    const color= this.state;
    const colors = color.color;
    const hideFilter = this.props
    console.log('data warna : ',this.state.colorPicked)
    return (
      <div className='container-fluid'>
        <div><hr style={{width:'76%',marginLeft:'100px'}}/></div>
        <div style={{marginLeft:'100px'}}><b>Colors</b></div>
        <br/>
          <Row xs={'auto'} style={{marginLeft:'95px'}}>
          {colors.map((data,index)=>{
            return(
              <button
               key={index} onClick={() => this.props.handleColorFilter(data.id) }
               style={{border:'none', 
              backgroundColor:`${data.id===8 ? 'grey' : data.id===9 ? 'blue' : data.id===5 ? 'brown' : data.id===10 ? 'cream' : data.id===4 ? 'black' : data.id===2 ? 'yellow' : data.id===3 ? 'red' : data.id===7 ? 'orange' : 'white' }`, 
              borderRadius:'50%', padding:'15px', marginRight:'5px', marginBottom:'5px'}}></button>
            )
          })}
          </Row>
     </div>
    )
  }
}
