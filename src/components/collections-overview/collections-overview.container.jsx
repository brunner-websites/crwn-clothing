import { connect } from 'react-redux'
import { compose } from 'redux'

import { selectIsCollectionFetching } from '../../redux/shop/shop.selector'
import WithSpinner from '../with-spinner/with-spinner.component'
import CollectionsOverview from '../collections-overview/collections-overview.component'

const mapStateToProps = state => {
  return {
    isLoading: selectIsCollectionFetching(state)
  }
}

// this does the same as the code below which uses 'compose'
//const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;