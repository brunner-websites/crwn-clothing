// react
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom'

// css
import './shop.styles.scss';

// components
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container'

// redux
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions'
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector'



const Shop = ({ fetchCollectionsStart, isCollectionsLoaded, match }) => {

  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);


  return (
    <div className="shop-page">
      <Route
        exact path={`${match.path}`}
        component={CollectionsOverviewContainer} />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer} />
    </div>
  )

}

const mapStateToProps = state => ({
  isCollectionsLoaded: selectIsCollectionsLoaded(state)
})

const mapDispatchToProps = dispatch => {
  return {
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);