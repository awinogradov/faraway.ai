/* eslint-disable prefer-object-spread */
import React from 'react';
import {
  View,
  Dimensions,
  PanResponder,
  Animated,
  PanResponderInstance,
  ViewStyle,
  StyleProp,
  ScaledSize,
} from 'react-native';
import styled, { css } from 'styled-components/native';

export interface SwingProps {
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
  onOpen?: () => void;
  onClose?: () => void;
  onPreviewOpen?: () => void;
  onPreviewClose?: () => void;
}

interface SwingState {
  pan: Animated.ValueXY;
  animatedYValue: number;
  style?: StyleProp<ViewStyle>;
  opened: boolean;
  changingVisibilityAllowed?: boolean;
}

const StyledSwingInner = styled(View)`
  ${() => css`
    top: ${Dimensions.get('screen').height - 100};
    height: 200;
  `}
  position: absolute;
  z-index: 9999;
  left: 5;
  right: 5;

  padding: 20px;

  border-top-left-radius: 20;
  border-top-right-radius: 20;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-color: #fff;
`;

const defaultOpenedTopPosition = 40;
const defaultClosedHeight = 200;
const defaultMargin = 5;

const closedStyle = (dimensions: ScaledSize) => ({
  top: dimensions.height - 100,
  height: defaultClosedHeight,
  left: defaultMargin,
  right: defaultMargin,
});

const openedStyle = (dimensions: ScaledSize) => ({
  top: defaultOpenedTopPosition,
  height: dimensions.height - defaultOpenedTopPosition,
  left: 0,
  right: 0,
});

export class Swing extends React.Component<SwingProps, SwingState> {
  panResponder: PanResponderInstance;

  dimensions = Dimensions.get('screen');

  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      animatedYValue: 0,
      style: {},
      opened: false,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan.setOffset({ x: 0, y: this.state.animatedYValue });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),
      onPanResponderRelease: () => {
        const { opened } = this.state;

        const calculatedOpenedStyle = openedStyle(this.dimensions);
        const calculatedClosedStyle = closedStyle(this.dimensions);

        this.setState({
          animatedYValue: 0,
          style: opened ? calculatedOpenedStyle : calculatedClosedStyle,
          changingVisibilityAllowed: !opened,
        });
      },
    });
  }

  componentDidMount() {
    this.state.pan.y.addListener(({ value: gruggedYValue }) => {
      const calculatedOpenedStyle = openedStyle(this.dimensions);
      const calculatedClosedStyle = closedStyle(this.dimensions);
      const defaultClosedTopPosition = this.dimensions.height - 100;
      const defaultOpenedHeight = this.dimensions.height - 40;
      const { opened, changingVisibilityAllowed } = this.state;
      const direction = gruggedYValue > 0 ? 'down' : 'up';
      let willBeOpened = opened;

      if (direction === 'up' && !opened) {
        let style: StyleProp<ViewStyle> = {};
        const openBorder = (this.dimensions.height / 3) * 2;
        const druggedTopPosition = defaultClosedTopPosition + gruggedYValue;
        const possibleDrugMargin = defaultMargin + gruggedYValue / 10;
        const druggedMargin = possibleDrugMargin <= 0 ? 0 : possibleDrugMargin;
        style.top = druggedTopPosition;
        style.height = defaultClosedHeight - gruggedYValue;
        style.left = druggedMargin;
        style.right = druggedMargin;

        if (style.top < openBorder) {
          style = calculatedOpenedStyle;
          willBeOpened = true;
        }

        this.setState({ animatedYValue: gruggedYValue, style, opened: willBeOpened });
      }

      if (direction === 'down' && opened) {
        let style: StyleProp<ViewStyle> = {};
        const closeBorder = this.dimensions.height / 4;
        const druggedTopPosition = defaultOpenedTopPosition + gruggedYValue;
        const possibleDrugMargin = 0 + gruggedYValue / 10;
        const druggedMargin = possibleDrugMargin >= defaultMargin ? defaultMargin : possibleDrugMargin;
        style.top = druggedTopPosition;
        style.height = defaultOpenedHeight - gruggedYValue;
        style.left = druggedMargin;
        style.right = druggedMargin;

        if (style.top > closeBorder) {
          style = calculatedClosedStyle;
          willBeOpened = false;
        }

        this.setState({ animatedYValue: gruggedYValue, style, opened: willBeOpened });
      }

      if (direction === 'down' && !opened && changingVisibilityAllowed) {
        const style: StyleProp<ViewStyle> = {};
        const closeBorder = calculatedClosedStyle.top + defaultClosedHeight / 4;
        const druggedTopPosition = defaultClosedTopPosition + gruggedYValue;
        style.top = druggedTopPosition;

        if (style.top > closeBorder) {
          style.top = this.dimensions.height;
          this.setState({ animatedYValue: gruggedYValue, style }, () => {
            if (this.props.onClose) {
              this.props.onClose();
            }
          });
        }

        this.setState({ animatedYValue: gruggedYValue, style });
      }
    });
  }

  componentWillUnmount() {
    this.state.pan.y.removeAllListeners();
  }

  render() {
    // eslint-disable-next-line compat/compat
    const style = Object.assign({}, this.state.style, this.props.style);

    return this.props.visible ? (
      <StyledSwingInner {...this.panResponder.panHandlers} style={style}>
        {this.props.children}
      </StyledSwingInner>
    ) : null;
  }
}
