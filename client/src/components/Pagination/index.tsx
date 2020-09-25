import React from 'react';
import { ConsoleLogButton } from '..'
// import { ItemType } from '../../util/dataTypes';

type PropsType = {
  itemCount: number;
  currentPage: number;
  itemsPerPage: number;
  onClick: (page: number) => void;
}

const Pagination = (props: PropsType) => {
  const pages = Math.ceil(props.itemCount / props.itemsPerPage)

  return (
    <div>
      <div className="btn-group">

        <button type="button" className="btn btn-outline-primary btn-sm"
          disabled={props.currentPage === 1 ? true : false}
          onClick={() => props.onClick(props.currentPage - 1)}
          aria-disabled={props.currentPage === 0 ? "true" : "false"}>
          Previous
        </button>

        {/* {pages > 1 ?
          <button type="button" className="btn btn-primary" >
            {props.currentPage === 1 ? 1 : props.currentPage - 1}
          </button>
          :
          ''
        } */}

        <button type="button"
          className={`btn btn-outline-primary btn-sm`} >
          {/* {props.currentPage === 1 ? 2 : props.currentPage} */}
          {props.currentPage}
        </button>


        {/* {pages > 2 ?
          <button type="button" className="btn btn-primary" >
            {props.currentPage === 1 ? 3 : props.currentPage + 1}
          </button>
          :
          ''
        } */}




        <button type="button" className="btn btn-outline-primary btn-sm"
          disabled={pages === props.currentPage ? true : false}
          onClick={() => props.onClick(props.currentPage + 1)}
          aria-disabled={props.currentPage === 0 ? "true" : "false"}>
          Next
        </button>

      </div>

      <div>
        <ConsoleLogButton name="currentPage" state={props.currentPage} />
        <ConsoleLogButton name="item count" state={props.itemCount} />
      </div>
    </div >
  )
}

export default Pagination