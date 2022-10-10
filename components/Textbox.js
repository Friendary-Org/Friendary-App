import * as React from 'react';
import { TextInput } from 'react-native-paper';

const Textbox = () => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      label="CreateCategory"
      value={text}
      onChangeText={text => setText(text)}
    />
  );
};

export default Textbox;