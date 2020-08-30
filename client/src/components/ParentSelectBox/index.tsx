import React, { useState, useEffect } from 'react';
import { ParentPayloadType } from '../../util/dataTypes';
import ConsoleLogButton from '../ConsoleLogButton';

type PropsType = {
  currentParent: ParentPayloadType;
  parents: ParentType[];
  onChange: (parentObj: ParentPayloadType) => void;
}

type ParentType = {
  type: string;
  name: string;
  _id: string;
}

const ParentSelectBox = (props: PropsType) => {
  const constantParents = props.parents;

  const [currentParent, updateCurrentParent] = useState<ParentPayloadType>(props.currentParent);

  const [currentHover, updateCurrentHover] = useState<string>('');
  const [active, updateActive] = useState<boolean>(false);
  const [filteredParents, updateFilteredParents] = useState<ParentType[]>(props.parents);
  const [filter, updateFilter] = useState<string>('');

  // filter parent list based on search input
  useEffect(() => {
    updateFilteredParents(
      constantParents.filter(parent => {
        const words = parent.name.split(' ');
        let match = false;
        words.forEach(word => {
          if (word.toLowerCase().startsWith(filter.toLowerCase())) {
            match = true;
          }
        })
        return match;
      })
    )
  }, [filter])


  return (
    <div className="d-flex flex-column">
      {/* current parent and dropdown button */}
      <div className="btn-group d-flex justify-content-between mb-2">
        <div className="bg-light w-100 text-dark px-3 py-1 rounded-left">
          {currentParent.parentName}
        </div>
        <button className="btn btn-light btn-sm dropdown-toggle dropdown-toggle-split"
          onClick={() => updateActive(!active)}>
        </button>
      </div>

      <div className="bg-light rounded"
        style={active ?
          {
            maxHeight: 150,
            opacity: 1,
            transitionProperty: 'all',
            transitionDuration: '0.5s'
          }
          :
          {
            maxHeight: 0,
            opacity: 0,
            overflow: 'hidden',
            transitionProperty: 'all',
            transitionDuration: '0.5s'
          }}
      >

        <div className="search-box bg-light rounded px-3 py-1">
          <input type="text"
            className="w-100"
            placeholder="start typing..."
            onChange={event => updateFilter(event.target.value)} />
        </div>

        <div className="bg-light text-dark rounded-bottom m-0"
          style={{
            maxHeight: 110,
            opacity: 0.8,
            overflowY: 'scroll'
          }}>

          {/* Unassigned option */}
          <div className={`px-3 py-1 ${currentHover === 'Unassigned' ? 'bg-dark text-light' : ''}`}
            onClick={() => {
              updateActive(false);
              updateCurrentParent({ parentType: null, parentName: 'Unassigned', parentId: null });
              props.onChange({ parentType: null, parentName: 'Unassigned', parentId: null });
            }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => updateCurrentHover('Unassigned')}
            onMouseLeave={() => updateCurrentHover('')}>
            <label className="m-0" style={{ cursor: 'pointer' }}>Unassigned</label>
          </div>

          {
            filteredParents.length > 0 ? filteredParents.map(parent => {
              return (
                <div key={parent._id}
                  className={`px-3 py-1 ${currentHover === parent._id ? 'bg-dark text-light' : ''}`}
                  onClick={() => {
                    updateActive(false);
                    updateCurrentParent({ parentType: parent.type, parentName: parent.name, parentId: parent._id });
                    props.onChange({ parentType: parent.type, parentName: parent.name, parentId: parent._id });
                  }}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => updateCurrentHover(parent._id)}
                  onMouseLeave={() => updateCurrentHover('')}>
                  <label className="m-0" style={{ cursor: 'pointer' }}>{parent.name}</label>
                </div>
              )
            })
              :
              ''
          }

        </div>
        {/* end of scroll selection */}

      </div>

      <div className="col-3">
        <ConsoleLogButton name="filtered parents" state={filteredParents} />
      </div>

    </div>
  )
}

export default ParentSelectBox