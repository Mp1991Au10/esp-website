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
  Stack,
  Textarea
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface InquireData {
  '00N5J000000QWsP': string;
  company: string;
  description: string;
  email: string;
  first_name: '11';
  oid: string;
  retURL: string;
}

// try {
//   const response = await fetch("/api/submit", {
//     method: "POST",
//     body: JSON.stringify(values),
//   });

//   if (!response.ok)
//     throw new Error(`Something went wrong submitting the form.`);

//   setSuccess(true);
// } catch (err) {
//   setError(err.message);
// }

const InquirePage: NextPage = () => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data: InquireData) => {
    const { oid, retURL, first_name, email, company, description } = data;
    const _00N5J000000QWsP = data['00N5J000000QWsP'];

    const requestOptions: RequestInit = {
      method: 'POST',
      mode: 'no-cors'
    };

    fetch(
      `${process.env.WEB_TO_LEAD_BASE_URL}&oid=${oid}&retURL=${retURL}&first_name=${first_name}&email=${email}&company=${company}&00N5J000000QWsP=${_00N5J000000QWsP}&description=${description}`,
      requestOptions
    )
      .then(res => {
        console.log(res);
        router.push('/thanks');
      })
      .catch(console.error);

    // [TO DO]: make it work with NextJS API
    // fetch('/api/sf', {
    //   method: 'POST',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json; charset=UTF-8'
    //   },
    //   mode: 'no-cors',
    //   body: JSON.stringify({
    //     ...data,
    //     _00N5J000000QWsP: data['00N5J000000QWsP']
    //   })
    // })
    //   .then(res => {
    //     console.log(res);
    //     router.push('/thanks');
    //   })
    //   .catch(console.error);
  };

  return (
    <Container>
      <Head>
        <title>ESP Tech Stack PoC</title>
        <meta name='description' content='Generated by create next app' />
        <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8'></meta>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Flex py={16} minH='100vh' direction='column' justify='center' align='center'>
        <main>
          <Center>
            <Heading as='h1' size='2xl' mb={4}>
              Submit an Inquiry
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

          {/* SF Web-to-Lead form sample */}
          <Box w={['full', '2xl']} p={[8, 10]} backgroundColor='gray.50' rounded={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                id='oid'
                type='hidden'
                value='00D5E000000DkPC'
                {...register('oid', { required: true })}
              />
              <Input
                id='retURL'
                type='hidden'
                value='http://'
                {...register('retURL', { required: true })}
              />
              {/*
              <!--  ----------------------------------------------------------------------  -->
              <!--  NOTE: These fields are optional debugging elements. Please uncomment    -->
              <!--  these lines if you wish to test in debug mode.                          -->
              <!--  <input type="hidden" name="debug" value=1>                              -->
              <!--  <input type="hidden" name="debugEmail" value="nh.quiroz@gmail.com">     -->
              <!--  ----------------------------------------------------------------------  -->
            */}
              <Stack spacing={6} align='flex-start'>
                <FormControl id='first_name' isRequired>
                  <FormLabel htmlFor='first_name'>Your name</FormLabel>
                  <Input
                    maxLength={40}
                    type='text'
                    bg='white'
                    {...register('first_name', { required: true })}
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

                <FormControl id='company'>
                  <FormLabel htmlFor='company'>Project or company name</FormLabel>
                  <Input maxLength={40} type='text' bg='white' {...register('company')} />
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

                <FormControl id='description' isRequired>
                  <FormLabel htmlFor='description'>
                    Briefly enter your question, comment or reason for contacting us below
                  </FormLabel>
                  <Textarea bg='white' {...register('description', { required: true })} />
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

export default InquirePage;
