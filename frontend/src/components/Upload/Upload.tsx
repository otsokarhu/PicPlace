import { FileWithPath, useDropzone } from 'react-dropzone';
import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  useToast,
  Icon,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  allPicturesState,
  uploadingPictureState,
} from '../../state/PicturesState';
import { userState } from '../../state/UserState';
import { loginModalState, uploadModalState } from '../../state/ModalState';
import { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { uploadPicture } from '../../services/picService';
import { CaptionValidation } from '../../types';
import { getError } from '../../utils/utils';

// This component is used to upload a picture to the server
const ImageDropzone = () => {
  const [picture, setUploadingPicture] = useRecoilState(uploadingPictureState);
  const setUploadModal = useSetRecoilState(uploadModalState);
  const [spinner, setSpinner] = useState(false);
  const user = useRecoilValue(userState);
  const toast = useToast();
  const resetUser = useResetRecoilState(userState); // resets user state
  const resetPictures = useResetRecoilState(allPicturesState); // resets pictures state
  const setLoginModal = useSetRecoilState(loginModalState); // sets login modal to true

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp'],
      },
      maxFiles: 1,
      maxSize: 1000000,
    });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setUploadingPicture([acceptedFiles[0]]);
    }
  }, [acceptedFiles]);

  const handleUpload = async (
    image: FileWithPath,
    caption: string
  ): Promise<void> => {
    if (user.token !== '') {
      try {
        await uploadPicture(
          user.token,
          image,
          `${image.size}bytes`,
          caption,
          user.id,
          setSpinner
        );
        toast({
          title: 'Upload successful',
          description: 'Your picture has been uploaded',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        setUploadModal(false);
        setUploadingPicture([]);
      } catch (error) {
        const errorMessage = getError(error);
        if (errorMessage.includes('401')) {
          // jwt expired
          toast({
            title: 'Session expired',
            description: 'Please log in again',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          resetUser();
          resetPictures();
          window.localStorage.removeItem('loggedUser');
          setLoginModal(true);
          return;
        }
        toast({
          // other error
          title: 'Upload failed',
          description: 'Check your file or try again',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    }
  };

  return (
    <>
      {picture.length === 0 ? (
        <Box
          border="2px dashed gray"
          borderRadius="lg"
          textAlign="center"
          p={4}
          cursor="pointer"
          {...getRootProps()}
          bg={isDragActive ? 'gray.50' : 'white'}
        >
          <Input
            name="dropzone"
            {...getInputProps({
              accept: 'image/*',
              multiple: false,
            })}
          />
          {isDragActive ? (
            <Text>Drop the files here ...</Text>
          ) : (
            <Text>
              Drag 'n' drop your image here, or click to select image <br />
              <Text as="span" fontSize="sm">
                (max 1MB)
                <br />
                (accepted formats: .png, .jpg, .jpeg, .gif, .svg, .webp, .bmp)
              </Text>
            </Text>
          )}
        </Box>
      ) : (
        <Formik
          initialValues={{ caption: '' }}
          onSubmit={(values) => handleUpload(picture[0], values.caption)}
          validationSchema={CaptionValidation}
        >
          {({ handleChange, values, errors, touched }) => (
            <Form>
              <Flex justify={'center'} align={'center'} direction={'column'}>
                <Flex direction={'row'} justify={'center'} align={'center'}>
                  <Text paddingRight={4}>
                    {picture[0].name} ready to be uploaded
                  </Text>
                  <Button
                    bgColor={'red'}
                    onClick={() => setUploadingPicture([])}
                  >
                    <Icon color={'black'} as={CloseIcon} />
                  </Button>
                </Flex>
                <FormControl id="caption" isRequired marginBottom={4}>
                  <FormLabel>Caption</FormLabel>
                  <Input
                    type="text"
                    name="caption"
                    onChange={handleChange}
                    value={values.caption}
                    placeholder="Caption"
                  />
                  {errors.caption && touched.caption && <p>{errors.caption}</p>}
                </FormControl>
                <Button type="submit" name="Upload" isLoading={spinner}>
                  Upload
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ImageDropzone;
