import React from 'react';
import {Avatar, Box, Text} from 'native-base';
interface Iusername {
  username: string;
}
const UserAvatar = ({username}: Iusername) => {
  const initials = (username || 'HTU')
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase())
    .join('');

  return (
    <Avatar size="lg">
      <Avatar size="lg">
        <Box
          bg="white"
          borderColor="white"
          borderWidth={1}
          borderRadius="full"
          width={10}
          height={10}
          alignItems="center"
          justifyContent="center">
          <Text color="black" fontSize={10} fontWeight="bold">
            {initials}
          </Text>
        </Box>
      </Avatar>
    </Avatar>
  );
};

export default UserAvatar;
