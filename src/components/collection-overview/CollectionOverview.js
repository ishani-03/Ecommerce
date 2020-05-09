import React from 'react'
import './CollectionOverview.scss'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CollectionPreview from '../Preview/CollectionPreview'
import { selectColletionsForPreview} from '../../redux/shop/ShopSelector'

const CollectionOverview = ({collections})=> (
    <div className='collections-overview'>
       {
            collections.map(({id, ...otherCollectionProps})=>(
                <CollectionPreview key={id} {...otherCollectionProps}/>
            )) 
        }
    </div>
)

const  mapStateToProps = createStructuredSelector ({
    collections : selectColletionsForPreview
})

export default connect(mapStateToProps) (CollectionOverview)