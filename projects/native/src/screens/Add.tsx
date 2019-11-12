import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button } from 'react-native';

import { Swing } from '../components/Swing';
import { InstagramPreview } from '../components/InstagramPreview';
import { GlobalState } from '../providers/redux/store';
import { visibilityChange, addPoint } from '../providers/redux/actions/add';

const mapStateToProps = (state: GlobalState) => ({
  visible: state.add.visible,
  data: state.add.data,
});
const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators({ visibilityChange, addPoint }, dispatch);

export type AddScreenProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchProps>;

// eslint-disable-next-line no-shadow
const Add: React.FC<AddScreenProps> = props => {
  return props.visible ? (
    <Swing visible={props.visible} onClose={() => props.visibilityChange({ visible: false })}>
      <InstagramPreview size="m" thumb={props.data.post.image} title={props.data.location.name} />
      <Button title="Add" onPress={() => props.addPoint(props.data)} />
    </Swing>
  ) : null;
};

export default connect(
  mapStateToProps,
  mapDispatchProps,
)(Add);