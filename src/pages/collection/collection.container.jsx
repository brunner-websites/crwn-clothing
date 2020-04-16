import { connect } from 'react-redux'
import { compose } from 'redux'

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import Collection from '../../pages/collection/collection.component'


const mapStateToProps = state => ({
  isLoading: !selectIsCollectionsLoaded(state)
})

const CollectionPageContainer = connect(mapStateToProps)(WithSpinner(Collection));

export default CollectionPageContainer;