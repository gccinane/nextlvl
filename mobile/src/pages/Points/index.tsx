import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView , Image} from 'react-native';
import Constants from 'expo-constants'
import {useNavigation} from '@react-navigation/native'
import {Feather as Icon} from '@expo/vector-icons'
import MapView, {Marker} from 'react-native-maps'
import {SvgUri} from 'react-native-svg'
import api from '../../services/api'

interface Item {
  id: number;
  name: string;
  image_url: string;
}

const Points: React.FC = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  useEffect(()=>{
    api.get('items').then(res => {
      setItems(res.data)

    })
  },[])

  function handleNavigateBack(){
    navigation.goBack();
  }

  function handleNavigateToDetail(){
    navigation.navigate('Detail');
  }

  function handleSelectItem(id: number){
    const alreadySelected = selectedItems.findIndex(item => item === id)

    if(alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)
      setSelectedItems(filteredItems)
    }else{
      setSelectedItems([...selectedItems, id]);
    }
    
  }

  return( 
    <>
      <View style = {styles.container}>
        <TouchableOpacity>
          <Icon name = "arrow-left" size = {20} color = "#34cb79" onPress= {handleNavigateBack}/>
        </TouchableOpacity>

        <Text style = {styles.title}>Seja Bem Vindo.</Text>
        <Text style = {styles.description}>Encontre um Ponto de coleta.</Text>

        <View style = {styles.mapContainer}>
          <MapView style = {styles.map} 
            initialRegion= {{
              latitude: -15.908864,
              longitude:-47.7724672,
              latitudeDelta: 0.010,
              longitudeDelta: 0.010,
            }}
          >
            <Marker 
              style = {styles.mapMarker}
              onPress= {handleNavigateToDetail}
              coordinate={{
                latitude: -15.908864,
                longitude:-47.7724672,
              }}
            > 
              <View style= {styles.mapMarkerContainer}>
                <Image style ={styles.mapMarkerImage} source={{uri: 'data:image/jpeg;base64,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'}}/>
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>
          </MapView>
        </View> 
      </View>
      <View style = {styles.itemsContainer}>
        <ScrollView horizontal
          showsVerticalScrollIndicator= {false}
          contentContainerStyle =  {{paddingHorizontal: 20}}
        >
         
          {items.map(item => (
            <TouchableOpacity 
              key = {String(item.id)} 
              style = {[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem: {}
              ]} 
              onPress= {() => {handleSelectItem(item.id)}}
              activeOpacity={0.7}
            >
              <SvgUri width = {42} uri={item.image_url}/>
              <Text style = {styles.itemTitle}>{item.name}</Text>
            </TouchableOpacity>        
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;