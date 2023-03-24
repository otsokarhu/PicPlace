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
import { SignUpSchema, SignUpValues } from '../../types';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { signUp } from '../../services/userService';
import { useSetRecoilState } from 'recoil';
import { loginModalState, signUpModalState } from '../../state/ModalState';

// component for sign up modal
const SignUpBox = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false); // show password inputted
  const [showconfirmPassword, setShowconfirmPassword] = useState(false); // show confirm password inputted
  const [showAdminPassword, setShowAdminPassword] = useState(false); // show admin password inputted
  const [showAdminInput, setShowAdminInput] = useState(false); // show admin input field
  const setSignUpModal = useSetRecoilState(signUpModalState); // sets sign up modal open or closed
  const setLoginModal = useSetRecoilState(loginModalState); // sets login modal open or closed

  const handleSignUp = async (values: SignUpValues): Promise<void> => {
    try {
      let admin = false;
      if (values.adminPassword) {
        admin = true;
      }
      const signUpResponse = await signUp({
        username: values.username,
        password: values.password,
        admin: admin,
      });

      setSignUpModal(false); // closes sign up modal

      toast({
        title: `${signUpResponse.username} registered succesfully`,
        description: 'You can now log in',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      setLoginModal(true); // and opens login modal so user can log in right away after sign up
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Check your inputs',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
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
              name="signup"
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
