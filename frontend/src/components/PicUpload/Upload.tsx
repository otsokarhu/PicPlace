import React, { useCallback } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { Box } from '@chakra-ui/react';

interface Props extends Omit<DropzoneOptions, 'accept'> {
  onDrop: (acceptedFiles: File[]) => void;
}

const ImageDropzone: React.FC<Props> = ({ onDrop, ...rest }) => {
  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      const imageFiles = acceptedFiles.filter(
        (file) => file.type.split('/')[0] === 'image'
      );
      onDrop(imageFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: { image: ['image/jpeg', 'image/png'] },
    ...rest,
  });

  return (
    <Box
      border="2px dashed gray"
      borderRadius="lg"
      textAlign="center"
      p={4}
      cursor="pointer"
      {...getRootProps()}
      bg={isDragActive ? 'gray.50' : 'white'}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </Box>
  );
};

export default ImageDropzone;
