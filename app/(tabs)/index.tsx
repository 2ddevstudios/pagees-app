import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const items: { text: string, image: any, label: string }[] = [
  {
    label: 'Access multiple platforms',
    text: 'Send Out one Post to multiple platforms at once',
    image: require('../../assets/images/abstract1.jpg')
  },
  {
    label: 'Scheduling made easy',
    text: 'Schedule posts to be sent out at anytime to multiple platforms',
    image: require('../../assets/images/abstract2.jpg')
  },
];

export default function HomeScreen() {
  const [index, setIndex] = useState(0);

  const handleClick = () => {
    if (index === items.length - 1) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ width: '100%', height: '60%', backgroundColor: 'lightgrey', }}>
        <Image style={{ width: '100%', height: '100%', objectFit: 'cover', ...StyleSheet.absoluteFillObject }} source={items[index].image} contentFit='cover' />
      </View>
      <View style={{ width: '100%', height: '40%', paddingHorizontal: 20, paddingTop: 30, paddingBottom: 20 }}>
        <View style={{ width: '100%', height: '70%', justifyContent: 'center', }}>
          <Text style={{ fontSize: 18, fontFamily: 'AncizarSans-Medium', color: 'grey' }}>{items[index].label}</Text>
          <Text style={{ fontSize: 40, fontFamily: 'AncizarSans-ExtraBold', color: 'black', marginTop: 20 }}>{items[index].text}</Text>
        </View>
        <View style={{ width: '100%', height: '20%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ width: 70, height: 10, borderRadius: 5, overflow: 'hidden', backgroundColor: 'lightgrey', flexDirection: 'row' }}>
            {items.map((item, indx) => (
              <View style={{ flex: 1, backgroundColor: indx === index ? '#a466dfc5' : 'whitesmoke', borderRadius: index === indx ? 5 : 0, width: 40, height: 10 }} key={indx.toString()} />
            ))}
          </View>
          <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 0.6, borderColor: 'grey', backgroundColor: '#a566df50' }} onPress={handleClick}>
            <Feather name='arrow-right' size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

