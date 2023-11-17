import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './collectiveSearch.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';

export default class collectiveSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBrand : this.props.filterBrand
    }
  }

  render() {
    const banyakProduct = this.props.banyakProduct;
    const brands = this.props.brands;
    const handleFilterBrand = this.props.handleFilterBrand
    const handleNonFilter =this.props.handleNonFilter
    return (
      <div className='searchCollectiveComponent'>
         <InputGroup className="mb-3">
        <Form.Control placeholder='Search' aria-label="Text input with dropdown button"/>
        <Form.Control className='w-50' placeholder={`${banyakProduct} Results`||'0 Results'} disabled aria-label="Text input with dropdown button" />
        <DropdownButton
          variant="outline-secondary"
          title="Filter by brands"
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item onClick={handleNonFilter}>All</Dropdown.Item>
          {brands.map((data,index)=>{return(
          <Dropdown.Item key={index} onClick={()=> handleFilterBrand(data.id) }>{data.name}</Dropdown.Item>
        )})}
        </DropdownButton>
        {/* <FontAwesomeIcon icon={faArrowDownWideShort} /> */}
        <DropdownButton
          variant="outline-secondary"
          title="Relevance"
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item href="#"><b>Relevance</b></Dropdown.Item>
          <Dropdown.Divider/>
          <Dropdown.Item href="#">New Arrival</Dropdown.Item>
          <Dropdown.Item href="#">Price, low to high</Dropdown.Item>
          <Dropdown.Item href="#">Price, hight to low</Dropdown.Item>
          <Dropdown.Item href="#">Alphabetical, A - Z</Dropdown.Item>
          <Dropdown.Item href="#">Alphabetical, Z - A</Dropdown.Item>
          <Dropdown.Item href="#">New</Dropdown.Item>
          <Dropdown.Item href="#">Like New</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      </div>
    )
  }
}
