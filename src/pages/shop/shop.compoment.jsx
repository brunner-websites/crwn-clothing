// react
import React, { Component } from 'react';
import { Route } from 'react-router-dom'

// css
import './shop.styles.scss';

// components
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container'

// redux
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector'



class Shop extends Component {

  componentDidMount() {
    this.props.fetchCollectionsStartAsync();
  };

  componentWillUnmount() {

  }

  render() {

    const { match } = this.props;

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

}

const mapStateToProps = state => ({
  isCollectionsLoaded: selectIsCollectionsLoaded(state)
})

const mapDispatchToProps = dispatch => {
  return {
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);