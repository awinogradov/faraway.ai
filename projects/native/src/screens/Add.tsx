import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button, Text, Linking, Platform } from 'react-native';

import { Swing } from '../components/Swing';
import { InstagramPreview } from '../components/InstagramPreview';
import { GlobalState } from '../providers/redux/store';
import { visibilityChange, addPoint, loadPointDescription } from '../providers/redux/actions/add';

const mapStateToProps = (state: GlobalState) => ({
  visible: state.add.visible,
  description: state.add.desciption,
  data: state.add.data,
});

const mapDispatchProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      visibilityChange,
      loadPointDescription,
      addPoint,
    },
    dispatch,
  );

export type AddScreenProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchProps>;

const Add: React.FC<AddScreenProps> = props => {
  const onSwingOpen = () => {
    if (!props.description) {
      props.loadPointDescription({
        address: props.data.location.name,
        region: props.data.location.region,
      });
    }
  };
  const onSwingClose = () => props.visibilityChange({ visible: false });

  const openOnMaps = () => {
    if (props.description) {
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = `${props.description.lat},${props.description.lng}`;
      const label = props.description.title;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });

      // Much more safety: Linking.canOpenURL(url).then(supported =>
      Linking.openURL(url);
    }
  };

  return props.visible ? (
    <Swing visible={props.visible} onOpen={onSwingOpen} onClose={onSwingClose}>
      <InstagramPreview size="m" thumb={props.data.src} title={props.data.location.name} />

      {props.description && (
        <>
          <Text>{props.description.rating}</Text>
          <Text>{props.description.address}</Text>
          <Button title="Open on maps" onPress={openOnMaps} />
        </>
      )}

      <Button title="Add" onPress={() => props.addPoint(props.data)} />
    </Swing>
  ) : null;
};

export default connect(
  mapStateToProps,
  mapDispatchProps,
)(Add);
