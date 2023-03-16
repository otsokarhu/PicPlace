import { Formik, Form } from 'formik';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { SignUpSchema } from '../../types';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const SignUpBox = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    toast({
      title: 'Signed up',
      description: 'You have successfully signed up',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirm: '',
      }}
      onSubmit={handleSignUp}
      validationSchema={SignUpSchema}
    >
      {({ handleChange, values, errors, touched }) => (
        <Form>
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            direction={'column'}
            w={'full'}
            opacity={0.9}
          >
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="username"
                name="username"
                onChange={handleChange}
                value={values.username}
                placeholder="Username"
              />
              {errors.username && touched.username && <p>{errors.username}</p>}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    variant={'icon'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && touched.password && <p>{errors.password}</p>}
            </FormControl>
            <FormControl id="passwordConfirm">
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="passwordConfirm"
                  onChange={handleChange}
                  value={values.passwordConfirm}
                  placeholder="Confirm Password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    variant={'icon'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.passwordConfirm && touched.passwordConfirm && (
                <p>{errors.passwordConfirm}</p>
              )}
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              variant="outline"
              mt={4}
              w={'full'}
            >
              Sign Up
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpBox;
