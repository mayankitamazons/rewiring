import React from "react";
import Paginations from "react-js-pagination"; 

const Pagination = (props) => {

  return (
    <div>

       
          <Paginations
            itemClass="page-item"
            linkClass="page-link"
            prevPageText="Prev"
            nextPageText="Next"
            firstPageText="First"
            lastPageText="Last"
            activePage={props.activePage} 
          totalItemsCount={props.totalData} 
            onChange={props.onChangePage}
            pageRangeDisplayed={5}
          />
    </div>
  );
}

export default Pagination