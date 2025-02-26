import { StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native'
import React from 'react'

const IconButton = ({icon, handlePress, containerStyles, iconStyles ,color }) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`  border-2 border-primary w-12 h-12 bg-secondary-400 rounded-xl justify-center items-center  ${containerStyles}`}
    >
        <Image
            source={icon}
            className={`w-6 h-6  ${iconStyles}`}
            resizeMode='contain'
            tintColor={color}
        />
    </TouchableOpacity>
  )
}

export default IconButton
