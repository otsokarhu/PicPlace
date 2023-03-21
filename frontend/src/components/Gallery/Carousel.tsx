import {
  IconButton,
  Container,
  Stack,
  Heading,
  Box,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import { PictureFromServer } from '../../types';

const Carousel = ({ pictures }: { pictures: PictureFromServer[] }) => {
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });
  const [slider, setSlider] = useState<Slider | null>(null);

  return (
    <>
      {pictures.length > 0 ? (
        <Box
          position={'relative'}
          height={'60vh'}
          width={'60vw'}
          overflow={'hidden'}
          rounded={'lg'}
          boxShadow={'lg'}
          top={3}
        >
          {/* CSS files for react-slick */}
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          {/* Left Icon */}
          <IconButton
            aria-label="left-arrow"
            variant="ghost"
            position="absolute"
            left={side}
            top={top}
            transform={'translate(0%, -50%)'}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <BiLeftArrowAlt size="40px" />
          </IconButton>
          {/* Right Icon */}
          <IconButton
            aria-label="right-arrow"
            variant="ghost"
            position="absolute"
            right={side}
            top={top}
            transform={'translate(0%, -50%)'}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <BiRightArrowAlt size="40px" />
          </IconButton>
          {/* Slider */}
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {pictures.map((pic, id) => (
              <Box
                key={id}
                height={'6xl'}
                position="relative"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundImage={`url(${pic.link})`}
              >
                {/* This is the block you need to change, to customize the caption */}
                <Container
                  size="container.lg"
                  height="600px"
                  position="relative"
                >
                  <Stack
                    spacing={6}
                    w={'full'}
                    maxW={'lg'}
                    position="absolute"
                    top="50%"
                    transform="translate(0, -50%)"
                  >
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                      {pic.description}
                    </Heading>
                  </Stack>
                </Container>
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Flex
          position={'relative'}
          height={'60vh'}
          width={'60vw'}
          rounded={'lg'}
          boxShadow={'lg'}
          top={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Heading>No pictures yet to show</Heading>
        </Flex>
      )}
    </>
  );
};

export default Carousel;
