const React = require('react');
const ReactNative = require('react-native');
const {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback
} = ReactNative;
const Button = require('../../node_modules/react-native-scrollable-tab-view/Button');

const SearchTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor: React.PropTypes.string,
    underlineHeight: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: 'black',
      inactiveTextColor: 'rgb(160,160,160)',
      underlineColor: 'black',
      backgroundColor: null,
      underlineHeight: 2,
    };
  },

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? '500' : '500';

    return <TouchableWithoutFeedback
      style={{flex: 1}}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => this.props.goToPage(page)}
    >
      <View style={[styles.tab, this.props.tabStyle]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>;
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: this.props.underlineHeight,
      backgroundColor: this.props.underlineColor,
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });
    // console.log(this.props.scrollValue)

    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <Animated.View style={[tabUnderlineStyle, { left, }, ]} />
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  tabs: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: .5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
  },
});

module.exports = SearchTabBar;
