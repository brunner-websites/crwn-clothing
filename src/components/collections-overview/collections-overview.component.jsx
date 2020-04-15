import React from 'react';

import './collections-overview.styles.scss';

// components
import CollectionPreview from '../collection-preview/collection-preview.component'

// react
import { connect } from 'react-redux'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';


const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collection-overview">
      {
        collections.map(({ id, ...otherCollectionProps }) => {
          return (
            <CollectionPreview key={id} {...otherCollectionProps} />
          )
        })
      }
    </div>
  )
}

const mapStateToProps = state => ({
  collections: selectCollectionsForPreview(state)
})

export default connect(mapStateToProps)(CollectionsOverview);