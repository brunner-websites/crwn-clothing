import React from 'react'
import './directory.styles.scss'

// components
import MenuItem from '../menu-item/menu-item.component';

// redux
import { connect } from 'react-redux';
import { selectSections } from '../../redux/directory/directory.selector';

const Directory = ({ sections }) => {


  return (
    <div className="directory-menu">

      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem
          key={id}
          {...otherSectionProps}
        />)
      )}

    </div>
  )
}


const mapStateToProps = state => ({
  sections: selectSections(state)
})

export default connect(mapStateToProps)(Directory);
