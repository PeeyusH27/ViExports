import { TextInput } from 'react-native'
import React from 'react'

interface TextInptProps {
  name: string,
  value: string | number,
  onChangeText: (text: string) => void,
  className: string
}

const TextInp: React.FC<TextInptProps> = ({ name, value, onChangeText, className, ...props }) => {
  return (
    <TextInput
      placeholderTextColor={'white'}
      placeholder={name}
      value={String(value)}
      onChangeText={onChangeText}
      className={className}
      {...props}
    />
  )
}
export default TextInp