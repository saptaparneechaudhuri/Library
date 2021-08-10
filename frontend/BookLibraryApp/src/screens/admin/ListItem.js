import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighLight,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var {width} = Dimensions.get('window');

const ListItem = props => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 5,
                right: 10,
              }}>
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <Button
              title="Edit"
              color="#00CCCC"
              onPress={() =>
                props.navigation.navigate('BookForm', {item: props.item})
              }
              style={styles.button}
            />
            <Button
              title="Delete"
              color="#00CCCC"
              onPress={() => [
                props.delete(props.item._id),
                setModalVisible(false),
              ]}
              // onPress={() => {
              //   console.log(props.item._id);
              // }}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: props.index % 2 == 0 ? 'white' : 'gainsboro',
          },
        ]}
        onPress={() =>
          props.navigation.navigate('BookDetails', {item: props.item})
        }
        onLongPress={() => setModalVisible(true)}>
        <Image
          source={{uri: props.item.image}}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.item} ellipsizeMode="tail">
          {props.item.title}
        </Text>
        <Text style={styles.item} numberOfLines={1}>
          {props.item.ISBN}
        </Text>
        <Text style={styles.item}>{props.item.count}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    width: width,
    justifyContent: 'space-between',
  },
  image: {
    width: width / 6,
    height: 80,
    margin: 2,
  },
  item: {
    flexWrap: 'wrap',
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: '50%',
    height: '20%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    margin: 5,
  },
});

export default ListItem;
