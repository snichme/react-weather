import React from 'react'

const Navigation = ({ query, onSearch }) => {

  let onChangeQuery = (e) => {
    if(e.nativeEvent.keyCode === 13) {
      onSearch(e.target.value)
    }
  }

  return (
    <header>
      <nav className="top-nav deep-orange darken-3">
        <div className="container">
          <div className="nav-wrapper">
            <div className="input-field">
              <i className="material-icons prefix">search</i>
              <input id="w-search" placeholder="Enter a city to get a report" type="text" className="validate" defaultValue={query} onKeyUp={onChangeQuery} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
