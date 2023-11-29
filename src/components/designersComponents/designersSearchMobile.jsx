import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './designersSearch.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';

export default class DesignerSearchMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBrand: this.props.filterBrand,
    };
  }

  render() {
    const banyakProduct = this.props.banyakProduct;
    const categories = this.props.categories;
    const handleFilterBrand = this.props.handleFilterBrand;
    const handleNonFilter = this.props.handleNonFilter;
    const handleNewArrivalProd = this.props.handleNewArrivalProd;
    const handlePriceLowToHigh = this.props.handlePriceLowToHigh;
    const handleLowToHigh = this.props.handleLowToHigh;
    const handleAtoZ = this.props.handleAtoZ;
    const handleZtoA = this.props.handleZtoA;
    const handleConditionNew = this.props.handleConditionNew;
    const handleConditionLikeNew = this.props.handleConditionLikeNew;

    return (
      <div className='designerSearch'>
        <InputGroup className="mb-3" style={{marginTop:'30px'}}>
          <Form.Control
            placeholder='Search'
            aria-label="Text input with dropdown button"
          />
          {/* <Form.Control
            placeholder={`${banyakProduct} Results` || '0 Results'}
            disabled
            aria-label="Text input with dropdown button"
            className="mb-2 mb-md-0 w-20"
          /> */}
          <DropdownButton
            variant="outline-secondary"
            title="Filter by brands"
            id="input-group-dropdown-2"
            align="end"
            size="sm"
          >
            <Dropdown.Item onClick={handleNonFilter}>All</Dropdown.Item>
            {categories.map((data, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleFilterBrand(data.id)}
                >
                  {data.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
          <DropdownButton
            variant="outline-secondary"
            title="Relevance"
            id="input-group-dropdown-2"
            align="end"
            className="mb-2 mb-md-0"
            size='sm'
          >
            <Dropdown.Item href="#"><b>Relevance</b></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleNewArrivalProd}>
              New Arrival
            </Dropdown.Item>
            <Dropdown.Item onClick={handlePriceLowToHigh}>
              Price, low to high
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLowToHigh}>
              Price, high to low
            </Dropdown.Item>
            <Dropdown.Item onClick={handleAtoZ}>
              Alphabetical, A - Z
            </Dropdown.Item>
            <Dropdown.Item onClick={handleZtoA}>
              Alphabetical, Z - A
            </Dropdown.Item>
            <Dropdown.Item onClick={handleConditionNew}>New</Dropdown.Item>
            <Dropdown.Item onClick={handleConditionLikeNew}>
              Like New
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </div>
    );
  }
}
