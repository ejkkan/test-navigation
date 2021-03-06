
import React, { Component } from 'react';
import {
    Button,
    Platform,
    ScrollView,
    Text,
    View,
    StatusBar,
    ListView,
    Dimensions,
    ImageBackground,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { TabNavigator, DrawerNavigator, StackNavigator, Header } from 'react-navigation';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ds3 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


const {width,height} = Dimensions.get('window')
const thumbnailSize = width/3 - 2;

import MapView from 'react-native-maps';
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Ad = ({ad, navigation}) => {
  return (
      <ImageBackground source={{uri: ad.thumbnail, cache: "default" }} style={{width:thumbnailSize, height:thumbnailSize,marginHorizontal:1,marginTop:1}}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('AdView',{ad})}>
        <View style={{flexDirection:'column', justifyContent:'space-between',flex:1}}>
          <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'flex-start', backgroundColor:'transparent'}}>
            <Text style={{marginHorizontal:10,color:'white', fontSize:20, fontWeight:'bold'}}>sumzin'</Text>
          </View>
          <View style={{flexDirection:'column', backgroundColor:'transparent'}}>
            <Text style={{marginHorizontal:10,color:'white', fontSize:12, fontWeight:'bold'}}>{ad.title}</Text> 
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end', backgroundColor:'transparent'}}>
              <Text style={{margin:10,color:'white', fontSize:20, fontWeight:'bold'}}>{ad.pay}</Text>
              <Text style={{margin:10,color:'white', fontSize:20, fontWeight:'bold'}}>{timeAgo(getTimestampFromItemId(ad._id))}</Text>
            </View>
        </View>
        </View>
        </TouchableWithoutFeedback>
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
      console.log('ads',ads.items)
      this.setState({ads:ds.cloneWithRows(ads.items)})
    })
  }

  render() {
    const {ads} = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar barStyle="light-content"/>
        <ListView
          enableEmptySections={true}
          initialListSize={25}
          pageSize={25}
          removeClippedSubviews={false}
          contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}}  
          dataSource={ads}
          renderRow={(rowData) => <Ad navigation={this.props.navigation} key={rowData.id} ad={rowData}/>}
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
          enableEmptySections={true}
          initialListSize={25}
          pageSize={25}
          removeClippedSubviews={false}
          contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}}  
          dataSource={ads}
          renderRow={(rowData) => <Ad navigation={this.props.navigation} key={rowData.id} ad={rowData}/>}
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
          enableEmptySections={true} 
          initialListSize={25}
          pageSize={25}
          removeClippedSubviews={false}
          contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}}  
          dataSource={ads}
          renderRow={(rowData) => <Ad navigation={this.props.navigation} key={rowData.id} ad={rowData}/>}
        />
      </View>
    );
  }
}

class AdView extends Component {
  componentDidMount() {
    const{ad} = this.props.navigation.state.params;
    let uri = ad.thumbnail.substring(0, ad.thumbnail.length - 2);
    
    Image.prefetch(uri)
      .then(loaded => {
        if (!loaded || !this._image) {
          return;
        }
        this._image.setNativeProps({ source: [{uri, cache: 'default'}] });
      })
      .catch(err => console.log(err));
  }

  render() {
    const{ad} = this.props.navigation.state.params;

    return (
      <ScrollView>
      <View style={{ flex: 1 }}>
        <ImageBackground imageRef={ref => this._image = ref} source={{uri: ad.thumbnail, cache: "default" }} style={{width:width, height:width}}>
          <View style={{flex:1,flexDirection:'column', justifyContent:'flex-end'}}>
          <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'transparent'}}>
              <Text style={{fontSize:40, color:'white', fontWeight:'bold', margin:10}}>{ad.pay}KR</Text>
              <Text style={{fontSize:40, color:'white', fontWeight:'bold', margin:10}}>{timeAgo(getTimestampFromItemId(ad._id))}</Text>
            </View>
          </View>
        </ImageBackground>
        <View>
          <Text style={{fontSize:30, color:'black', fontWeight:'bold', margin:10}}>{ad.title}</Text>
           <Text style={{fontSize:12, color:'black', fontWeight:'bold', margin:10}}>{ad.desc}</Text>
        </View>
        <View style ={{
           height: 200,
           width: width,
        }}>
        <MapView
          style={{  ...StyleSheet.absoluteFillObject,}}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <MapView.Marker
              title="This is a title"
              description="This is a description"
              coordinate={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }}
            />
        </MapView>
        </View>
      </View>
      </ScrollView>
    );
  }
}

class MyAccount extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Mitt Konto</Text>
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
  swipeEnabled: true,
  animationEnabled:true,
  tabBarOptions: {
    style: {
      backgroundColor: "#51A7F9",
      borderTopWidth: 0,
      borderBottomWidth: 0,
      elevation:0
    },
    labelStyle: {
      color: "#FFF"
    }
  }
},{
  lazy: false
});

const MainStack = StackNavigator({
  Main: {
    screen: MainGrid,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#51A7F9",
        borderBottomWidth: 0,
        borderTopWidth: 0,
        elevation:0
      },
      headerLeft: (
        <TouchableOpacity style={{width: 50, height: 50, justifyContent: "center", alignItems: "center"}} onPress={() => navigation.navigate('DrawerOpen')}>
          <Image source={require("./imgs/menu.png")}/>
        </TouchableOpacity>
      )
    })
  },
  AdView: {
    screen: AdView,
    navigationOptions: {
      header: null,
      drawerLockMode: "locked-closed"
    }
  }
}, 
{
  mode: "card",
  headerMode: "screen"
});

class DrawerContent extends Component {
  render() {
    return (
      <View style={{flex:1, marginTop: 100}}>
      <TouchableWithoutFeedback onPress={() => this.navigate("GridWithAds")}>
        <View style={{ alignItems: "center", flexDirection: "row", alignSelf: "stretch", padding: 14, backgroundColor: "rgb(63,63,63)"}}>
            <Image source={require("./imgs/gridIcon.png")} style={{marginRight: 10}}/>
            <Text style={{ color: "#FFF" }}>Alla annonser</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.navigate("MyAccount")}>
          <View style={{ marginTop: 1, alignItems: "center", flexDirection: "row", alignSelf: "stretch", padding: 14, backgroundColor: "rgb(63,63,63)"}}>
            <Image style={{ width: 25, height: 25, marginRight: 10}} 
              source={require("./imgs/icons8-settings-filled-50.png")} />
            <Text style={{ color: "#FFF" }}>Mitt konto</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  navigate(screen, props = {}) {
    this.props.navigation.navigate("DrawerClose");
    this.props.navigation.navigate(screen, props);
  }
}

const RootDrawer = DrawerNavigator(
  {
    GridWithAds: { screen: MainStack }
  }, 
  {
    drawerBackgroundColor: "rgb(56,56,56)",
    contentComponent: DrawerContent
  }
);

const ModalStack = StackNavigator(
  {
    MainStack: {
      screen: RootDrawer,
    },
    MyAccount: {
      screen: MyAccount,
    }
  }, 
  {
    headerMode:'none',
    mode: "modal"
  }
);

const getTimestampFromItemId = inAsHex => {
  return parseInt(inAsHex.slice(0, 11), 16);
};
const timeAgo = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  interval = Math.floor(seconds / 420000);
  if (interval >= 1) {
    return interval + 'w';
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + 'd';
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + 'h';
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + 'm';
  }
  return Math.floor(seconds) + 's';
}

export default ModalStack;