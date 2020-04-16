// react
import React, { Component } from 'react';
import { Route } from 'react-router-dom'

// css
import './shop.styles.scss';

// components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import Collection from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component';


// redux
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import { selectIsCollectionFetching } from '../../redux/shop/shop.selector'

// HOC Component
const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(Collection);

class Shop extends Component {


  componentDidMount() {
    this.props.fetchCollectionsStartAsync();
  };

  componentWillUnmount() {

  }

  render() {

    const { match, isFetching } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact path={`${match.path}`}
          render={props => <CollectionOverviewWithSpinner isLoading={isFetching} {...props} />} />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => <CollectionPageWithSpinner isLoading={isFetching} {...props} />} />
      </div>
    )
  }

}

const mapStateToProps = state => ({
  isFetching: selectIsCollectionFetching(state)
})

const mapDispatchToProps = dispatch => {
  return {
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);