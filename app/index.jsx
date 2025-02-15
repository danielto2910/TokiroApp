import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl text-blue-500 font-pblack">index</Text>
      {/* <Link href=""></Link> */}
    </View>
  )
}

export default index

const styles = StyleSheet.create({})