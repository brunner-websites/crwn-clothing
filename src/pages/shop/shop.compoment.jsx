// react
import React, { Component } from 'react';
import { Route } from 'react-router-dom'

// css
import './shop.styles.scss';

// components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import Collection from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component';


// firebase / firestore
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

// redux
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions'

// HOC Component
const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(Collection);

class Shop extends Component {

  state = {
    loading: true
  }

  unsubscribeFromSnapshot = null;

  componentDidMount() {

    const { updateCollections } = this.props;

    const collectionRef = firestore.collection('collections');

    this.unsubscribeFromSnapshot =
      collectionRef.onSnapshot(async snapshot => {

        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        updateCollections(collectionsMap);

        this.setState({ loading: false });

      })
  }


  componentWillUnmount() {

  }

  render() {

    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className="shop-page">
        <Route
          exact path={`${match.path}`}
          render={props => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
  }
}

export default connect(null, mapDispatchToProps)(Shop);