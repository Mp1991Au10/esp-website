import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface InquireData {
  last_name: string;
  email: string;
  company: string;
}

const InquireBetaPage: NextPage = () => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data: InquireData) => {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        recordTypeFlag: 'beta'
      })
    };

    fetch('/api/sf', requestOptions)
      .then(res => {
        if (res.ok) {
          console.log({ res });
          router.push('/thanks');
        } else {
          router.push('/error');
          throw new Error('Network response was not OK');
        }
      })
      .catch(err =>
        console.error('There has been a problem with your fetch operation: ', err.message)
      );
  };

  return (
    <Container>
      <Head>
        <title>ESP Tech Stack PoC</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Flex py={16} minH='100vh' direction='column' justify='center' align='center'>
        <main>
          <Center>
            <Heading as='h1' size='2xl' mb={4}>
              Submit an Inquiry w/Beta Record Type
            </Heading>
          </Center>

          <Center>
            <Stack mb={16}>
              <p>
                Tell us a bit about yourself, what you’re working on, your needs or challenges, and
                any other information you feel is pertinent for us to know. You’ll hear back from
                someone on the Ecosystem Support team very soon! We only collect the following
                information submitted below and will not use or share for any purposes other than
                evaluation.
              </p>
            </Stack>
          </Center>

          <Box w={['full', '2xl']} p={[8, 10]} backgroundColor='gray.50' rounded={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={6} align='flex-start'>
                <FormControl id='last_name' isRequired>
                  <FormLabel htmlFor='last_name'>Last name</FormLabel>
                  <Input
                    maxLength={40}
                    type='text'
                    bg='white'
                    {...register('last_name', { required: true })}
                  />
                  <FormHelperText>
                    Use whichever preferred name you would like our team to address you by.
                  </FormHelperText>
                </FormControl>

                <FormControl id='email' isRequired>
                  <FormLabel htmlFor='email'>Contact email</FormLabel>
                  <Input
                    maxLength={80}
                    type='email'
                    bg='white'
                    {...register('email', { required: true })}
                  />
                </FormControl>

                <FormControl id='company' isRequired>
                  <FormLabel htmlFor='company'>Project or company name</FormLabel>
                  <Input
                    maxLength={40}
                    type='text'
                    bg='white'
                    {...register('company', { required: true })}
                  />
                </FormControl>

                <FormControl id='00N5J000000QWsP' isRequired>
                  <FormLabel htmlFor='inquiry_type'>What are you getting in touch about?</FormLabel>
                  <Select
                    title='Type of Inquiry'
                    placeholder='Select...'
                    bg='white'
                    {...register('00N5J000000QWsP', { required: true })}
                  >
                    <option value='Project'>Project</option>
                    <option value='Exploring Possibilities'>Exploring Possibilities</option>
                    <option value='Sponsorship'>Sponsorship</option>
                  </Select>
                </FormControl>

                <Checkbox>
                  Subscribe to the ESP Newsletter? You&apos;ll hear from us every few weeks, and
                  we&apos;ll only ever contact you with ESP news.
                </Checkbox>

                <Button colorScheme='blue' px={8} py={6} type='submit'>
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
        </main>
      </Flex>
    </Container>
  );
};

export default InquireBetaPage;
