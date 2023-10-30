import React, { Component } from 'react'
import axios from 'axios'
import { GetProduct } from '../../config/api';
import CollectiveSearch from '../../components/collectiveComponents/collectiveSearch';
import IndexNavbar from '../../components/navbar/IndexNavbar';

export default class collectiveIndex extends Component {

    async componentDidMount() {
       try {
        const response = await axios.get(GetProduct)
        {
            console.log('data :', response.data)
        }
       } catch (error) {
            console.log('error :',error)
       }
      }

  render() {
    return (
      <div>
        <IndexNavbar/>
        <CollectiveSearch/>
      </div>
    )
  }
}
