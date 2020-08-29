import React, { useState, useEffect } from 'react';
import ConsoleLogButton from '../ConsoleLogButton';

// a drop down component
// input: an array of objects

type PropsType = {
  currentAssigneeId: string | null;
  currentAssignee: string;
  users: userObj[];
  onChange: (assigneeObj: AssigneeObj) => void;
}

type AssigneeObj = {
  assignee: string;
  assigneeId: string | null;
}

type userObj = {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  _id: string;
}

const SearchSelectBox = (props: PropsType) => {
  console.log('Rendering search select box...')
  const [staticData, updateStaticData] = useState<userObj[]>(props.users);
  // current selected users
  const [currentAssignee, updateCurrentAssignee] = useState(props.currentAssignee);
  const [currentHover, updateCurrentHover] = useState('');
  const [active, updateActive] = useState(false);
  const [data, updateData] = useState<userObj[]>(props.users);
  const [filter, updateFilter] = useState('');

  // filter selection
  useEffect(() => {
    updateData(
      staticData.filter(item => {
        const words = item.fullName!.split(' ');
        let match = false;
        words.forEach(word => {
          console.log(word.toLowerCase(), filter.toLowerCase())
          if (word.toLowerCase().startsWith(filter.toLowerCase())) {
            match = true;
          }
        })
        return match;
      })
    )
  }, [filter])

  return (
    <div className="select-box d-flex flex-column">

      {/* currently selected assignee and dropdown button */}
      <div className="btn-group d-flex justify-content-between mb-2">
        <div className="bg-light w-100 text-dark px-3 py-1 rounded-left">
          {currentAssignee}
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
              updateCurrentAssignee('Unassigned');
              props.onChange({ assignee: 'Unassigned', assigneeId: null });
            }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => updateCurrentHover('Unassigned')}
            onMouseLeave={() => updateCurrentHover('')}>
            <label className="m-0" style={{ cursor: 'pointer' }}>Unassigned</label>
          </div>

          {data.length > 0 ? data.map(item => {
            return (
              <div key={item._id}
                className={`px-3 py-1 ${currentHover === item._id ? 'bg-dark text-light' : ''}`}
                onClick={() => {
                  updateActive(false);
                  updateCurrentAssignee(item.fullName);
                  props.onChange({ assignee: item.fullName, assigneeId: item._id });
                }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => updateCurrentHover(item._id)}
                onMouseLeave={() => updateCurrentHover('')}>
                <label className="m-0" style={{ cursor: 'pointer' }}>{item.fullName}</label>
              </div>
            )
          })
            :
            ''
          }


          {/* hard coded examples  */}
          <div className={`px-3 py-1 ${currentHover === '5' ? 'bg-dark text-light' : ''}`}
            onClick={() => {
              updateActive(false);
              updateCurrentAssignee('Test Users');
              props.onChange({assignee: 'Test User', assigneeId: 'test id'})
            }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => updateCurrentHover('5')}
            onMouseLeave={() => updateCurrentHover('0')}>
            <label className="m-0" style={{ cursor: 'pointer' }}>Test User</label>
          </div>



        </div>
        {/* end of scroll selection */}

      </div>

      <ConsoleLogButton name="data" state={data} />
    </div>
  )
}

export default SearchSelectBox