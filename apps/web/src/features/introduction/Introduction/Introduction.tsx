import { ReactNode, FC } from 'react';
import { Flex, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { Illustration } from '../components/Illustration';

export const Introduction: FC<{ children?: ReactNode }> = () => {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          This is is changing how teams build software
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          We are uncovering better ways of developing software by doing it and
          helping others do it. Through this work we have come to value:
          Individuals and interactions over processes and tools Working software
          over comprehensive documentation Customer collaboration over contract
          negotiation Responding to change over following a plan That is, while
          there is value in the items on the right, we value the items on the
          left more.
        </Text>
        <Stack spacing={6} direction={'row'}></Stack>
        <Flex w={'full'}>
          <Illustration
            height={{ sm: '24rem', lg: '28rem' }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
};
