import { Flex, Heading, Text } from '@chakra-ui/react';
import { PictureListPageProps } from '../../types';
import SinglePicture from './SinglePicture';

// component that displays the pictures in the user, admin page, or search page
const PictureListPage = ({
  name,
  pictures,
  toggleWindowConfirm,
  isOpen,
  handleDelete,
  page,
}: PictureListPageProps) => {
  // texts function return different texts depending on the amount of pictures and the page
  const texts = () => {
    switch (page) {
      case 'admin':
        return {
          one: 'There is 1 picture uploaded',
          many: `There are ${pictures.length} pictures uploaded`,
          text: 'Here are all the pictures uploaded to PicPlace:',
          none: 'There are no pictures uploaded to PicPlace yet',
          welcome_text: 'Hi, Admin!',
        };
      case 'user':
        return {
          one: 'You have uploaded 1 picture',
          many: `You have uploaded ${pictures.length} pictures`,
          text: 'Here are your pictures:',
          none: 'You have not uploaded any pictures yet',
          welcome_text: `Hi, ${name}!`,
        };
      default:
        return {
          one: 'Your search returned 1 picture',
          many: `Your search returned ${pictures.length} pictures`,
          text: 'Here are the pictures that matched your search:',
          none: 'Your search did not return any pictures',
          welcome_text: 'Search results',
        };
    }
  };

  const { one, many, text, none, welcome_text } = texts();

  const showDeleteButton = page === 'admin' || page === 'user';

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
        {welcome_text}
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
                showDeleteButton={showDeleteButton}
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
