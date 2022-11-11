import { Box, Heading, Text, Button } from '@chakra-ui/react';

const PageNotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6} justifyContent="center" alignItems="center" w="100%">
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear-gradient(135deg, #d4b89c 0%, #e2d1c3 100%);"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Pagina não encotrada
      </Text>
      <Text color={'gray.500'} mb={6}>
        A pagina que voce esta procurando não existe
      </Text>

      <Button
        colorScheme="teal"
        bg="#dfbda1"
        color="white"
        variant="solid"
        _hover={{
          bg: '#dfbda1',
          opacity: 0.5
        }}>
        Voltar
      </Button>
    </Box>
  );
}

export { PageNotFound }