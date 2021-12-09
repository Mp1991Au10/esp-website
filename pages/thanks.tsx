import { Container, Flex, Heading, Link as ChakraLink, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const ThanksPage: NextPage = () => {
  return (
    <Container maxW='2xl'>
      <Head>
        <title>ESP Tech Stack PoC</title>
        <meta name='description' content='Generated by create next app' />
        <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8'></meta>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Flex py={16} minH='100vh' direction='column' justify='center' align='center'>
        <main>
          <Heading as='h2' size='xl' mb={8}>
            Thank you!
          </Heading>

          <Stack mb={4}>
            <p>
              Your inquiry has been successfully submitted! The Ecosystem Support team will get back
              to you within the next few business days.
            </p>
          </Stack>

          <Stack mb={8}>
            <p>Until then, kick back and relax.</p>
          </Stack>

          <Stack mb={8}>
            <Link href='/' passHref>
              <ChakraLink color='blue.500'>Go back to home.</ChakraLink>
            </Link>
          </Stack>
        </main>
      </Flex>
    </Container>
  );
};

export default ThanksPage;
