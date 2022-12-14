import React from 'react'
import { useState, useEffect } from "react";
import {Plants,Pots} from '../assets/Data.js'
import styled from 'styled-components';
import ProductElement from '../components/ProductElement'
import FilterElement from '../components/FilterElement.js';
import { useParams } from 'react-router-dom'


const FilterBarre  = styled.div `
display : flex ; 
flex-wrap : nowrap ; 
justify-content: center ; 
align-items: center;
margin : 20px;
@media screen and (max-width: 700px) {
  flex-wrap : wrap ; 

}
`

const List = styled.ul`
margin :  10px;
display:flex;
flex-wrap : wrap ; 
 justify-content:center ;

`

function Products() {
  const {product} = useParams()
  const item = (product == "plants") ? Plants : Pots ; 
  const [subFilter,setsubFilter]=useState(null);
  const [criteria,setcriteria]=useState(null);
  const [products,setproducts]=useState(item.products);

  useEffect(() => {
    setproducts(item.products)
  }, [item,product,subFilter]);
  
  return (

<div className='page-container'>
      


   
   <FilterBarre  >
   { item.filterList.map((element) => 
    <div  key= {element[0][0]}  onClick={()=> setsubFilter(element) } >
    <FilterElement item={element[0]} sub={false}  />
    </div>
    )}
   
   </FilterBarre>

{ subFilter &&
  <FilterBarre  >
   { subFilter.map((element,index) => 
    index>0 &&
    <div  key= {element[0]}  onClick={()=> setproducts(item.products.filter(p => ( p.description.includes(element[0]))) )  } >
    <FilterElement item={element} sub={true} />
    </div>
   )}
   
   </FilterBarre>}
   

  
 <List>
     { products && products.map((p) => 
      <ProductElement element={p} key={p.name + p.id} />)}
  </List> 

</div>

    )
}

export default Products