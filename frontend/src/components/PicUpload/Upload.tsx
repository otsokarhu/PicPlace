import { FileWithPath, useDropzone } from 'react-dropzone';
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
import { useRecoilState, useRecoilValue } from 'recoil';
import { uploadingPictureState } from '../../state/PicturesState';
import { userState } from '../../state/UserState';
import { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { uploadPicture } from '../../services/picService';
import { CaptionValidation } from '../../types';

const ImageDropzone = () => {
  const [picture, setUploadingPicture] = useRecoilState(uploadingPictureState);
  const user = useRecoilValue(userState);
  const toast = useToast();
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        'image/*': [],
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
        const uploadedPicture = await uploadPicture(
          user.token,
          image,
          `${image.size}bytes`,
          caption,
          user.id
        );
        console.log(uploadedPicture);
      } catch (error) {
        toast({
          title: 'Upload failed',
          description: 'Check your file',
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
          <input
            {...getInputProps({
              accept: 'image/*',
              multiple: false,
            })}
          />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
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
                <FormControl id="caption" isRequired>
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
                <Button type="submit">Upload</Button>
              </Flex>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ImageDropzone;
