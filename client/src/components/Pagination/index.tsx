import React, { useEffect, useState } from 'react';
import { ConsoleLogButton } from '..'
import DebugModeContext from '../../util/DebugModeContext';

type PropsType = {
  itemCount: number;
  currentPage: number;
  itemsPerPage: number;
  onClick: (page: number) => void;
}

const Pagination = (props: PropsType) => {
  const lastPageIndex = Math.floor(props.itemCount / props.itemsPerPage);
  const [pageButtons, updatePageButtons] = useState<number[]>([])

  useEffect(() => {
    if (lastPageIndex < 4) {
      let pageIndexArr = []
      for (let i = 0; i <= lastPageIndex; ++i) pageIndexArr.push(i);
      updatePageButtons(pageIndexArr)
    } else if (props.currentPage > 2 && props.currentPage < lastPageIndex - 1) {
      updatePageButtons([props.currentPage - 2, props.currentPage - 1, props.currentPage, props.currentPage + 1, props.currentPage + 2])
    } else if (props.currentPage === lastPageIndex) {
      updatePageButtons([props.currentPage - 4, props.currentPage - 3, props.currentPage - 2, props.currentPage - 1, props.currentPage])
    } else if (props.currentPage === lastPageIndex - 1) {
      updatePageButtons([props.currentPage - 3, props.currentPage - 2, props.currentPage - 1, props.currentPage, props.currentPage + 1])
    } else {
      updatePageButtons([0, 1, 2, 3, 4])
    }
  }, [props.currentPage, lastPageIndex])
  return (
    <div>
      <div className="btn-group">

        <button type="button"
          className="btn btn-outline-primary btn-sm"
          disabled={props.currentPage === 0 ? true : false}
          onClick={() => props.onClick(props.currentPage - 1)}
          aria-disabled={props.currentPage === 0 ? "true" : "false"}>
          Previous
        </button>

        {pageButtons.map(pageNum => {
          return (
            <button key={pageNum}
              type="button"
              className={`btn btn-outline-primary btn-sm ${props.currentPage === pageNum ? 'active' : ''}`}
              style={{ width: '40px' }}
              onClick={() => props.onClick(pageNum)}>
              {pageNum + 1}
            </button>
          )
        })}

        <button type="button"
          className="btn btn-outline-primary btn-sm"
          disabled={props.currentPage === lastPageIndex ? true : false}
          onClick={() => props.onClick(props.currentPage + 1)}
          aria-disabled={props.currentPage === 0 ? "true" : "false"}>
          Next
        </button>

      </div>

      <DebugModeContext.Consumer>
        {({ debugMode }) => {
          if (debugMode) return (
            <div className="d-flex flex-column align-items-center">
              <ConsoleLogButton name="currentPage" state={props.currentPage} />
              <ConsoleLogButton name="item count" state={props.itemCount} />
              <ConsoleLogButton name="pageButtons" state={pageButtons} />
              <ConsoleLogButton name="lastPageIndex" state={lastPageIndex} />
            </div>
          )
        }}
      </DebugModeContext.Consumer>

    </div >
  )
}

export default Pagination