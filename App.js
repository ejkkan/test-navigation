
import React, { Component } from 'react';
import { Button, Platform, ScrollView, Text, View, StatusBar, ListView, Dimensions, ImageBackground } from 'react-native';
import { TabNavigator, DrawerNavigator, StackNavigator, Header } from 'react-navigation';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ds3 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const {width} = Dimensions.get('window')
const thumbnailSize = width/3 - 2;

const Ad = ({ad}) => {
  return (
    <ImageBackground source={{uri: ad.thumbnail}} style={{width:thumbnailSize, height:thumbnailSize, backgroundColor:'red',marginHorizontal:1,marginTop:1}}>
    </ImageBackground>
  );
}

class SimpleScreen1 extends Component {
  constructor(props){
    super(props)
    this.state = {
      ads: ds.cloneWithRows([])
    }
  }

  componentDidMount() {
    fetch('https://api.tiptapp.co/v1/ads?payType=1')
    .then(response => response.json())
    .then(ads => {
      this.setState({ads:ds.cloneWithRows(ads.items)})
    })
  }

  render() {
    const {ads} = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar barStyle="light-content"/>
        <ListView
        initialListSize={25}
        pageSize={25}
        removeClippedSubviews={false}
          contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}}  
          dataSource={ads}
          renderRow={(rowData) => <Ad key={rowData.id} ad={rowData}/>}
        />
      </View>
    );
  }
}


class SimpleScreen2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      ads: ds2.cloneWithRows([])
    }
  }

  componentDidMount() {
    fetch('https://api.tiptapp.co/v1/ads?payType=3')
    .then(response => response.json())
    .then(ads => {
      this.setState({ads:ds2.cloneWithRows(ads.items)})
    })
  }

  render() {
    const {ads} = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar barStyle="light-content"/>
        <ListView
        initialListSize={25}
        pageSize={25}
        removeClippedSubviews={false}
          contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}}  
          dataSource={ads}
          renderRow={(rowData) => <Ad key={rowData.id} ad={rowData}/>}
        />
      </View>
    );
  }
}


class SimpleScreen3 extends Component {
  constructor(props){
    super(props)
    this.state = {
      ads: ds3.cloneWithRows([])
    }
  }

  componentDidMount() {
    fetch('https://api.tiptapp.co/v1/ads?payType=4')
    .then(response => response.json())
    .then(ads => {
      this.setState({ads:ds3.cloneWithRows(ads.items)})
    })
  }

  render() {
    const {ads} = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar barStyle="light-content"/>
        <ListView
        initialListSize={25}
        pageSize={25}
        removeClippedSubviews={false}
          contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}}  
          dataSource={ads}
          renderRow={(rowData) => <Ad key={rowData.id} ad={rowData}/>}
        />
      </View>
    );
  }
}


class AdView extends Component {
  render() {
    return (
      <View style={{ backgroundColor: "blue", flex: 1 }}>
        <Text>Ad view</Text>
      </View>
    );
  }
}

const MainGrid = TabNavigator({
  PayAway: {
    screen: SimpleScreen1,
    screenProps: {
      title: "asdfasdf"
    }
  },
  GiveAway: {
    screen: SimpleScreen2
  },
  HereToThere: {
    screen: SimpleScreen3
  }
}, {
  tabBarPosition: 'top',
  tabBarOptions: {
    style: {
      backgroundColor: "#51A7F9",
    },
    labelStyle: {
      color: "#FFF"
    }
  }
},{
  swipeEnabled: true,
  lazy: false
});

const RootDrawer = DrawerNavigator({
  SimpleTabs: {
    screen: MainGrid,
    navigationOptions: {
      drawer: () => ({
        label: 'Simple Tabs'
      }),
    },
  },
});

const MainStack = StackNavigator({
  Main: {
    screen: RootDrawer,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#51A7F9",
        borderBottomWidth: 0,
        shadowRadius: 0
      }
    }
  },
  AdView: {
    screen: AdView,
    navigationOptions: {
      header: null
    }
  }
}, {
  headerMode: "screen"
});




export default MainStack;