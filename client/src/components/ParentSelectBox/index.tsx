import React, { useState, useEffect } from 'react';
import { ParentType } from '../../util/dataTypes';

type PropsType = {
  parentId: string | null; // current/default parentId
  parents: ParentType[]; // available parents for this item
  onChange: (selectedParentId: string | null) => void; // takes parentId string
}

const ParentSelectBox = (props: PropsType) => {
  const [selectedParentId, updateSelectedParentId] = useState<string | null>(props.parentId);
  const [currentParentName, updateCurrentParentName] = useState<string>('(open)');

  const [currentHover, updateCurrentHover] = useState<string>('');
  const [active, updateActive] = useState<boolean>(false);

  const [filteredParents, updateFilteredParents] = useState<ParentType[]>(Array.from(props.parents));
  const [filter, updateFilter] = useState<string>('');

  // once props.parents loaded and parentId is not null, look for parent name.
  useEffect(() => {
    // the currentParentName === '(open)' condition prevents making this calculation everytime we select an option
    if (selectedParentId !== null && props.parents.length > 0 && currentParentName === '(open)') {
      props.parents.forEach(parent => {
        if (parent._id === selectedParentId) updateCurrentParentName(parent.name)
      })
    }
  }, [props.parents, selectedParentId, currentParentName]);

  useEffect(() => {
    if (props.parents.length) updateFilteredParents(props.parents)
  }, [props.parents]);


  // filter parent list based on search input
  useEffect(() => {
    updateFilteredParents(
      props.parents.filter(parent => {
        const words = parent.name.split(' ');
        let match = false;
        words.forEach(word => { if (word.toLowerCase().startsWith(filter.toLowerCase())) match = true })
        return match;
      })
    )
  }, [filter, props.parents]);


  return (
    <div className="d-flex flex-column">
      {/* current parent and dropdown button */}
      <div className="btn-group d-flex justify-content-between mb-2">
        <div className="bg-light w-100 text-dark px-3 py-1 rounded-left">
          {currentParentName}
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
          <div className={`px-3 py-1 ${currentHover === '(open)' ? 'bg-dark text-light' : ''}`}
            onClick={() => {
              updateActive(false);
              updateSelectedParentId(null);
              updateCurrentParentName('(open)')
              props.onChange(null);
            }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => updateCurrentHover('(open)')}
            onMouseLeave={() => updateCurrentHover('')}>
            <label className="m-0" style={{ cursor: 'pointer' }}>(open)</label>
          </div>

          {
            filteredParents.length > 0 ? Array.from(filteredParents).map(parent => {
              return (
                <div key={parent._id}
                  className={`px-3 py-1 ${currentHover === parent._id ? 'bg-dark text-light' : ''}`}
                  onClick={() => {
                    updateActive(false);
                    updateSelectedParentId(parent._id);
                    updateCurrentParentName(parent.name);
                    props.onChange(parent._id);
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


    </div>
  )
}

export default ParentSelectBox