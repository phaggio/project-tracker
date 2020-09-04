import React, { useState, useEffect } from 'react';
import ConsoleLogButton from '../ConsoleLogButton';

// a drop down component
// input: an array of objects

type PropsType = {
  currentAssigneeId: string | null;
  users: UserType[];
  onChange: (selectedAssignee: string | null) => void;
}

type UserType = {
  _id: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
}

const AssigneeSelectBox = (props: PropsType) => {
  const [currentAssigneeName, updateCurrentAssigneeName] = useState<string>('Unassigned');

  const [currentHover, updateCurrentHover] = useState('');
  const [active, updateActive] = useState(false);

  const [filteredUsers, updateFilteredUsers] = useState<UserType[]>(props.users);
  const [filter, updateFilter] = useState('');

  // filter selection
  useEffect(() => {
    updateFilteredUsers(
      props.users.filter(user => {
        const words = user.fullName!.split(' ');
        let match = false;
        words.forEach(word => {
          if (word.toLowerCase().startsWith(filter.toLowerCase())) match = true;
        })
        return match;
      })
    )
  }, [filter, props.users]);

  useEffect(() => {
    updateFilteredUsers(props.users);
    if (props.currentAssigneeId !== null) {
      props.users.forEach(user => {
        if (user._id === props.currentAssigneeId) updateCurrentAssigneeName(user.fullName)
      })
    } 
  }, [props.users, props.currentAssigneeId]);

  return (
    <div className="d-flex flex-column">

      {/* currently selected assignee and dropdown button */}
      <div className="btn-group d-flex justify-content-between mb-2">
        <div className="bg-light w-100 text-dark px-3 py-1 rounded-left">
          {currentAssigneeName}
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
              updateCurrentAssigneeName('Unassigned');
              props.onChange(null);
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
                  updateCurrentAssigneeName(user.fullName);
                  props.onChange(user._id);
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
        </div>
        {/* end of scroll selection */}

      </div>

      <div className="div">
        <ConsoleLogButton name="filtered users" state={filteredUsers} />
        <ConsoleLogButton name="props.assigneeId" state={props.currentAssigneeId} />
      </div>
    </div>
  )
}

export default AssigneeSelectBox