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
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [showAdminInput, setShowAdminInput] = useState(false);

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
        confirmPassword: '',
        adminPassword: '',
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
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showconfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    variant={'icon'}
                    onClick={() =>
                      setShowconfirmPassword(
                        (showconfirmPassword) => !showconfirmPassword
                      )
                    }
                  >
                    {showconfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && touched.confirmPassword && (
                <p>{errors.confirmPassword}</p>
              )}
            </FormControl>
            <Button
              variant={'outline'}
              mt={4}
              w={'full'}
              onClick={() =>
                setShowAdminInput((showAdminInput) => !showAdminInput)
              }
            >
              Want to be an admin?
            </Button>
            {showAdminInput && (
              <FormControl id="adminPassword">
                <FormLabel>Give Admin-code</FormLabel>
                <InputGroup>
                  <Input
                    type={showAdminPassword ? 'text' : 'password'}
                    name="adminPassword"
                    onChange={handleChange}
                    value={values.adminPassword}
                    placeholder="Admin-code"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      variant={'icon'}
                      onClick={() =>
                        setShowAdminPassword(
                          (showAdminPassword) => !showAdminPassword
                        )
                      }
                    >
                      {showconfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.adminPassword && touched.adminPassword && (
                  <p>{errors.adminPassword}</p>
                )}
              </FormControl>
            )}

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
