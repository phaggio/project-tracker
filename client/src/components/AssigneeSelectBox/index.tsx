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

const AssigneeSelectBox = (props: PropsType) => {
  console.log('Rendering search select box...')
  const constantUsers = (props.users);
  // current selected users
  const [currentAssignee, updateCurrentAssignee] = useState(props.currentAssignee);

  const [currentHover, updateCurrentHover] = useState('');
  const [active, updateActive] = useState(false);

  const [filteredUsers, updateFilteredUsers] = useState<userObj[]>(props.users);
  const [filter, updateFilter] = useState('');

  // filter selection
  useEffect(() => {
    updateFilteredUsers(
      constantUsers.filter(user => {
        const words = user.fullName!.split(' ');
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

  useEffect(() => {
    updateFilteredUsers(constantUsers);
  }, [constantUsers])

  return (
    <div className="d-flex flex-column">

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

          {filteredUsers.length > 0 ? filteredUsers.map(user => {
            return (
              <div key={user._id}
                className={`px-3 py-1 ${currentHover === user._id ? 'bg-dark text-light' : ''}`}
                onClick={() => {
                  updateActive(false);
                  updateCurrentAssignee(user.fullName);
                  props.onChange({ assignee: user.fullName, assigneeId: user._id });
                }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => updateCurrentHover(user._id)}
                onMouseLeave={() => updateCurrentHover('')}>
                <label className="m-0" style={{ cursor: 'pointer' }}>{user.fullName}</label>
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
              props.onChange({ assignee: 'Test User', assigneeId: 'test id' })
            }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => updateCurrentHover('5')}
            onMouseLeave={() => updateCurrentHover('0')}>
            <label className="m-0" style={{ cursor: 'pointer' }}>Test User</label>
          </div>



        </div>
        {/* end of scroll selection */}

      </div>

      <div className="div">
        <ConsoleLogButton name="filtered users" state={filteredUsers} />
        <ConsoleLogButton name="current assignee" state={currentAssignee} />
      </div>
    </div>
  )
}

export default AssigneeSelectBox