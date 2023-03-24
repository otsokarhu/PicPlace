import {
  Collapse,
  Heading,
  useColorModeValue,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { infoState } from '../../state/Infostate';
import { ArrowUpIcon } from '@chakra-ui/icons';

// info component for info modal
const Info = () => {
  const flexBg = useColorModeValue('antiquewhite', 'lightgray');
  const textColor = useColorModeValue('gray.500', 'whitesmoke');
  const [isOpen, setIsOpen] = useRecoilState(infoState);

  return (
    <Collapse in={isOpen} animateOpacity>
      <Box
        w={'20vw'}
        roundedBottom={'lg'}
        h={'full'}
        p={2}
        opacity={0.8}
        bg={flexBg}
        position={'sticky'}
        height={'auto'}
        zIndex={1}
      >
        <Heading textAlign={'center'} fontSize={'1.8rem'} color={textColor}>
          Welcome to PicPlace
        </Heading>
        <Text textAlign={'center'} fontSize={'1.2rem'} color={textColor}>
          At PicPlace users can upload pictures and share them with others.
          Users can also search for pictures and view them.
        </Text>
        <Button
          aria-label="CloseInfo"
          variant={'solid'}
          onClick={() => setIsOpen(false)}
          bottom={0}
          right={0}
          w={'full'}
          colorScheme={'facebook'}
        >
          <ArrowUpIcon boxSize={8} />
          <ArrowUpIcon boxSize={8} />
          <ArrowUpIcon boxSize={8} />
        </Button>
      </Box>
    </Collapse>
  );
};

export default Info;
