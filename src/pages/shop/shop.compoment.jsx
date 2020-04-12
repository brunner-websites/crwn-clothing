import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import './shop.styles.scss';

// redux
import { connect } from 'react-redux';
import { selectCollections } from '../../redux/shop/shop.selector';

const Shop = ({ collections }) => {

  return (
    <div className="shop-page">
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

const mapStateToProps = state => {

  return {
    collections: selectCollections(state)
  }

}

export default connect(mapStateToProps)(Shop);