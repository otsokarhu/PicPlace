import { Flex, Heading, Text } from '@chakra-ui/react';
import { PictureFromServer } from '../../types';
import SinglePicture from './SinglePicture';

type PictureListPageProps = {
  name: string;
  pictures: PictureFromServer[];
  toggleWindowConfirm: () => void;
  isOpen: boolean;
  handleDelete: (id: number) => void;
  page: 'admin' | 'user';
};

const PictureListPage = ({
  name,
  pictures,
  toggleWindowConfirm,
  isOpen,
  handleDelete,
  page,
}: PictureListPageProps) => {
  const texts = () => {
    switch (page) {
      case 'admin':
        return {
          one: 'There is 1 picture uploaded',
          many: `There are ${pictures.length} pictures uploaded`,
          text: 'Here are all the pictures uploaded to PicPlace:',
          none: 'There are no pictures uploaded to PicPlace yet',
        };
      default:
        return {
          one: 'You have uploaded 1 picture',
          many: `You have uploaded ${pictures.length} pictures`,
          text: 'Here are your pictures:',
          none: 'You have not uploaded any pictures yet',
        };
    }
  };

  const { one, many, text, none } = texts();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100%"
      h="100%"
      p={4}
    >
      <Heading size="2xl" mb={4}>
        Hi, {name}!
      </Heading>
      {pictures.length > 0 ? (
        <>
          {pictures.length === 1 ? (
            <>
              <Text>{one}</Text>
            </>
          ) : (
            <>
              <Text>{many}</Text>
            </>
          )}
          <Text>{text}</Text>
          <Flex direction="row" wrap="wrap" justify="center" mt={4}>
            {pictures.map((pic) => (
              <SinglePicture
                key={pic.id}
                pic={pic}
                toggleWindowConfirm={toggleWindowConfirm}
                isOpen={isOpen}
                handleDelete={handleDelete}
              />
            ))}
          </Flex>
        </>
      ) : (
        <Text>{none}</Text>
      )}
    </Flex>
  );
};

export default PictureListPage;
