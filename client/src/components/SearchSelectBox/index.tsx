import React, { useState, useEffect, Props } from 'react';
import { userRequest } from '../../httpRequests'

type PropsType = {
  users: userObj[];
  onChange: (str: string) => void;
}

type userObj = {
  type: string;
  firstName: string;
  lastName: string;
  fullName: string;
  _id: string;
}

const SearchSelectBox = (props: PropsType) => {
  console.log(props)
  console.log('rendering search select box')
  const [staticData, updateStaticData] = useState<userObj[]>([]);
  const [draft, updateDraft] = useState("")
  const [currentHover, updateCurrentHover] = useState('');
  const [active, updateActive] = useState(false);
  const [data, updateData] = useState<userObj[]>([]);
  const [filter, updateFilter] = useState('');


  useEffect(() => {
    userRequest.getUser()
      .then(res => {
        updateStaticData(res.data)
        updateData(res.data);
      })
  }, [])

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

      <div className="btn-group d-flex justify-content-between mb-2">
        <div className="bg-dark w-100 text-light px-3 py-1 rounded-left">
          {draft}
        </div>
        <button className="btn btn-dark btn-sm dropdown-toggle dropdown-toggle-split"
          onClick={() => updateActive(!active)}>
        </button>
      </div>

      <div className="bg-dark rounded"
        style={active ?
          {
            maxHeight: 150,
            opacity: 1,
            transitionProperty: 'all',
            transitionDuration: '1s'
          }
          :
          {
            maxHeight: 0,
            opacity: 0,
            overflow: 'hidden',
            transitionProperty: 'all',
            transitionDuration: '1s'
          }}
      >

        <div className="search-box bg-dark rounded px-3 py-1">
          <input type="text"
            className="w-100"
            placeholder="start typing..."
            onChange={event => updateFilter(event.target.value)} />
        </div>

        <div className="bg-dark text-light rounded-bottom m-0"
          style={{
            maxHeight: 110,
            opacity: 0.7,
            overflowY: 'scroll'
          }}>

          {data.length > 0 ? data.map(item => {
            return (
              <div key={item._id}
                className={`px-3 py-1 ${currentHover === item._id ? 'bg-secondary' : ''}`}
                onClick={() => {
                  updateActive(false);
                  updateDraft(item._id!)
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
          <div className={`px-3 py-1 ${currentHover === '5' ? 'bg-secondary' : ''}`}
            onClick={() => {
              updateActive(false);
              updateDraft("Tesla")
            }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => updateCurrentHover('5')}
            onMouseLeave={() => updateCurrentHover('0')}>
            <label className="m-0" style={{ cursor: 'pointer' }}>Tesla</label>
          </div>

          <div className={`px-3 py-1 ${currentHover === '1' ? 'bg-secondary' : ''}`}
            onClick={() => {
              updateActive(false);
              updateDraft("Wahoo")
            }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => updateCurrentHover('1')}
            onMouseLeave={() => updateCurrentHover('0')}>
            <label className="m-0" style={{ cursor: 'pointer' }}>Wahoo</label>
          </div>

          <div className={`px-3 py-1 ${currentHover === '2' ? 'bg-secondary' : ''}`}
            onClick={() => {
              updateActive(false);
              updateDraft("film")
            }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => updateCurrentHover('2')}
            onMouseLeave={() => updateCurrentHover('0')}>
            <label className="m-0" style={{ cursor: 'pointer' }}>Film</label>
          </div>

          <div className={`px-3 py-1 ${currentHover === '3' ? 'bg-secondary' : ''}`}
            onClick={() => {
              updateActive(false);
              updateDraft("test")
            }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => updateCurrentHover('3')}
            onMouseLeave={() => updateCurrentHover('0')}>
            <label className="m-0" style={{ cursor: 'pointer' }}>Test</label>
          </div>

          <div className={`px-3 py-1 ${currentHover === '4' ? 'bg-secondary' : ''}`}
            onClick={() => {
              updateActive(false);
              updateDraft("sony")
            }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => updateCurrentHover('4')}
            onMouseLeave={() => updateCurrentHover('0')}>
            <label className="m-0" style={{ cursor: 'pointer' }}>Sony</label>
          </div>


        </div>


      </div>

    </div>
  )
}

export default SearchSelectBox