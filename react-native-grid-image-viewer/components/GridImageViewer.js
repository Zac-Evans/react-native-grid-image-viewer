import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  ScrollView,
  Platform,
  NativeModules,
} from 'react-native';
import Cross from './Cross';
import MoveLeft from './MoveLeft';
import MoveRight from './MoveRight';

const GridImageView = ({
  data,
  dataIndex,
  headers = null,
  renderGridImage = null,
  renderModalImage = null,
  transparent = 0.8,
  heightOfGridImage = Dimensions.get('window').height / 5.5,
}) => {
  function useHookWithRefCallback() {
    const ref = useRef(null)
    const setRef = useCallback(node => {
      if (ref.current) {
        // Make sure to cleanup any events/references added to the last instance
      
      }
      
      if (node) {
       
        // Check if a node is actually passed. Otherwise node would be null.
        // You can now do what you need to, addEventListeners, measure, etc.
      }
      
      // Save a reference to the node
      ref.current = node
    }, [])
    
    return [setRef]
  }


  const [modal, setModal] = useState({visible: false});
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref] = useHookWithRefCallback()
  var key = 0;

  const {StatusBarManager} = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const [height, setHeight] = useState(STATUSBAR_HEIGHT);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarHeight) => {
        setHeight(statusBarHeight.height);
      });
    }
  }, []);

  const Component = ({style = {flex: 1}}) => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        ref={ref}
        style={{...style}}
        snapToInterval={Dimensions.get('window').width}
        decelerationRate="fast"
        horizontal>
        {data.map((item, key) => (
          <View key={key}>
            {renderModalImage !== null ? (
              renderModalImage(item, {
                ...styles.img_modal,
                backgroundColor: `rgba(0, 0, 0, ${transparent})`,
              })
            ) : (
              <Image
                style={{
                  ...styles.img_modal,
                  backgroundColor: `rgba(0, 0, 0, ${transparent})`,
                }}
                source={{
                  uri: item,
                  ...(headers == null || headers == undefined || headers == {}
                    ? {}
                    : {method: 'POST', headers}),
                }}
              />
            )}
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.background}>
      <Modal
        // propagateSwipe={true}
        animationType="slide"
        transparent={true}
        visible={modal.visible}
        onRequestClose={() => {
          setModal({visible: false});
        }}>
        <Component />

        {/* <View style={styles.move_left_view}> */}
          {/* <TouchableOpacity
            onPress={() => {
              if (modal.data - 1 >= 0) {
                setTimeout(() => {
                  ref.current.scrollTo({
                    x: Dimensions.get('window').width * (modal.data - 1),
                    y: 0,
                    animated: false,
                  });
                }, 1);
                setModal({visible: true, data: modal.data - 1});
              }
            }}>
            <MoveLeft />
          </TouchableOpacity> */}
        {/* </View> */}

        <View style={{...styles.cross, top: height + 5}}>
          <TouchableOpacity
            onPress={() => {
              setModal({visible: false});
            }}>
            <Cross />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.move_right_view}> */}
          {/* <TouchableOpacity
            onPress={() => {
              if (modal.data + 1 < data.length) {
                setTimeout(() => {
                  ref.current.scrollTo({
                    x: Dimensions.get('window').width * (modal.data + 1),
                    y: 0,
                    animated: false,
                  });
                }, 1);
                setModal({visible: true, data: modal.data + 1});
              }
            }}>
            <MoveRight />
          </TouchableOpacity> */}
        {/* </View> */}
      </Modal>

      <FlatList
        contentContainerStyle={{paddingBottom: 40}}
        data={data}
        renderItem={({index}) => {
          if (data.length <= index * 3) {
            return null;
          }
          return (
            <View style={styles.unit}>
              <View style={[styles.unit_item, {height: heightOfGridImage}]}>
                {data.length > index * 3 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModal({visible: true});
                      setCurrentIndex(index)
                      setTimeout(() => {
                        ref.current.scrollTo({
                          x: Dimensions.get('window').width * currentIndex * 3,
                          y: 0,
                          animated: false,
                        })
                      }, 1);
                    }}
                    style={[styles.unit_item, {height: heightOfGridImage}]}>
                    {renderGridImage !== null ? (
                      renderGridImage(data[index * 3], styles.img)
                    ) : (
                      <Image
                        style={styles.img}
                        source={{
                          uri: data[index * 3],
                          ...(headers == null ||
                          headers == undefined ||
                          headers == {}
                            ? {}
                            : {method: 'POST', headers}),
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={[styles.unit_item, {height: heightOfGridImage}]}>
                {data.length > index * 3 + 1 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModal({visible: true});

                      setTimeout(() => {
                        ref.current.scrollTo({
                          x: Dimensions.get('window').width * (index * 3 + 1),
                          y: 0,
                          animated: false,
                        });
                      }, 1);
                    }}
                    style={[styles.unit_item, {height: heightOfGridImage}]}>
                    {renderGridImage !== null ? (
                      renderGridImage(data[index * 3 + 1], styles.img)
                    ) : (
                      <Image
                        style={styles.img}
                        source={{
                          uri: data[index * 3 + 1],
                          ...(headers == null ||
                          headers == undefined ||
                          headers == {}
                            ? {}
                            : {method: 'POST', headers}),
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={[styles.unit_item, {height: heightOfGridImage}]}>
                {data.length > index * 3 + 2 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModal({visible: true});

                      setTimeout(() => {
                        ref.current.scrollTo({
                          x: Dimensions.get('window').width * (index * 3 + 2),
                          y: 0,
                          animated: false,
                        });
                      }, 1);
                    }}
                    style={[styles.unit_item, {height: heightOfGridImage}]}>
                    {renderGridImage !== null ? (
                      renderGridImage(data[index * 3 + 2], styles.img)
                    ) : (
                      <Image
                        style={styles.img}
                        source={{
                          uri: data[index * 3 + 2],
                          ...(headers == null ||
                          headers == undefined ||
                          headers == {}
                            ? {}
                            : {method: 'POST', headers}),
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => {
          key++;
          return key.toString();
        }}
        style={styles.flatlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
  },
  unit: {
    flexDirection: 'row',
  },
  unit_item: {
    margin: 1.5,
    flex: 1,
  },
  img: {
    flex: 1,
  },
  img_modal: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
  cross: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
  },
  move_left_view: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 10,
  },
  move_right_view: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    right: 10,
  },
});

export default GridImageView;
