import React from 'react'
import './Directory.scss'
import MenuItem from '../menu-item/MenuItem'
import { connect } from 'react-redux'
import { createStructuredSelector} from 'reselect'
import { selectDirectorySections } from '../../redux/directory/DirectorySelector'

const Directory=({sections })=>
          (
            <div className='directory-menu'>
                {
                    sections.map(({id, ...otherSectionProps})=>(   //...otherSectionProps is equivalent to exporting all other values
                        <MenuItem key={id} {...otherSectionProps}/>
                    ))
                }
            </div>
          )

const mapStateToProps = createStructuredSelector ({
  sections: selectDirectorySections
})

export default connect(mapStateToProps) (Directory)