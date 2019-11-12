import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components/native';

import Bar from '../Bar';
import AddScreen from '../../screens/Add';

const StyledView = styled.View`
  padding: 40px 0 0 20px;
  background: #fff;
`;

const mapStateToProps = () => ({});
const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);

export type MainScreenProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchProps>;

const MainScreen: React.FC<MainScreenProps> = props => (
  <StyledView>
    <Bar />

    <AddScreen />

    {props.children}
  </StyledView>
);

export default connect(
  mapStateToProps,
  mapDispatchProps,
)(MainScreen);
