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
import { LoginSchema, LoginValues } from '../../types';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../state/UserState';
import { login } from '../../services/loginService';
import { loginModalState } from '../../state/ModalState';

const Login = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useSetRecoilState(userState);
  const setLoginModal = useSetRecoilState(loginModalState);

  const handleLogin = async (values: LoginValues): Promise<void> => {
    try {
      const loggingIn = await login(values.username, values.password); // logs in and returns the user object
      window.localStorage.setItem('loggedUser', JSON.stringify(loggingIn));

      setUser(() => ({
        id: loggingIn.id,
        username: loggingIn.username,
        token: loggingIn.access_token,
        admin: loggingIn.admin,
      })); // sets the user state

      setLoginModal(false); // closes the login modal

      toast({
        title: 'Login successful',
        description: `Welcome back! ${loggingIn.username}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Check your username or password',
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
      }}
      onSubmit={handleLogin}
      validationSchema={LoginSchema}
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
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <InputRightElement h={'full'}>
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
              <Button
                type="submit"
                colorScheme="teal"
                variant="outline"
                mt={4}
                w={'full'}
                name="login"
              >
                Login
              </Button>
            </FormControl>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
