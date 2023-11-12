import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './collectiveSearch.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';

export default class collectiveSearch extends Component {
  render() {
    const banyakProduct = this.props.banyakProduct;
    console.log('banyak product collective : ', banyakProduct)
    return (
      <div className='searchCollectiveComponent'>
         <InputGroup className="mb-3">
        <Form.Control placeholder='Hide Filter' aria-label="Text input with dropdown button"/>
        <Form.Control className='w-50' placeholder={`${banyakProduct} Results`||'0 Results'} disabled aria-label="Text input with dropdown button" />
        <Form.Control className='w-5' placeholder="Filter by brand" disabled aria-label="Text input with dropdown button"/>
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
