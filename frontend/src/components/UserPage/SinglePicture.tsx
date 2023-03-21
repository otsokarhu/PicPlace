import { Image, Button, Icon, Flex } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { SinglePictureProps } from '../../types';
import WindowConfirm from '../Miscellaneous/WIndowConfirm';

const SinglePicture = ({
  pic,
  toggleWindowConfirm,
  isOpen,
  handleDelete,
}: SinglePictureProps) => {
  return (
    <Flex direction="row" align="center">
      <Image src={pic.link} alt={pic.description} w="300px" h="300px" m={2} />
      <Button
        colorScheme="red"
        onClick={() => {
          toggleWindowConfirm();
        }}
        m={2}
      >
        <Icon as={DeleteIcon} />
      </Button>
      <WindowConfirm
        isOpen={isOpen}
        onClose={toggleWindowConfirm}
        header={'Delete picture'}
        body={
          'Are you sure you want to delete this picture? You cannot undo this action.'
        }
        confirmButtonText={'Delete'}
        cancelButtonText={'Cancel'}
        onConfirm={() => handleDelete(pic.id)}
      />
    </Flex>
  );
};

export default SinglePicture;