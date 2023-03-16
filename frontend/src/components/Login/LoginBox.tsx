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
import { LoginSchema } from '../../types';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const LoginBox = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    toast({
      title: 'Logged in',
      description: 'You have successfully logged in',
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

export default LoginBox;
