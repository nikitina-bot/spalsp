import React from 'react'
import {
  Badge,
  Container,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  useColorMode,
} from '@chakra-ui/react'

const Appearance: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Container maxW="full">
        <RadioGroup onChange={toggleColorMode} value={colorMode}>
          <Stack>
            {/* TODO: Add system default option */}
            <Radio value="light" colorScheme="teal">
              Светлая тема
              <Badge ml="1" colorScheme="teal">
                Default
              </Badge>
            </Radio>
            <Radio value="dark" colorScheme="teal">
              Темная тема
            </Radio>
          </Stack>
        </RadioGroup>
      </Container>
    </>
  )
}
export default Appearance
