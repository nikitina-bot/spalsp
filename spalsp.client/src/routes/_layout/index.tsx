import { Box, Button, Container, Text, Image } from '@chakra-ui/react'
import { useQueryClient } from 'react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete';

import { UserOut } from '../../client'
import React from 'react';

export const Route = createFileRoute('/_layout/')({
  component: Dashboard,
})

function Dashboard() {
  const queryClient = useQueryClient()

  const currentUser = localStorage.getItem('current_user.name')

  const options = [
    { value: '<NP=hypo> является <DET> <A+super> <NP=hyper>.', label: '<NP=hypo> является <DET> <A+super> <NP=hyper>.' },
    { value: '<NP=hypo> — вид/тип/форма/разновидность/сорт <NP=hyper>.', label: '<NP=hypo> — вид/тип/форма/разновидность/сорт <NP=hyper>.' },
    { value: '<NP=syn> означает то же самое, что <NP=syn>.', label: '<NP=syn> означает то же самое, что <NP=syn>.' },
    { value: '<NP=syn>, также известный как <NP=syn>.', label: '<NP=syn>, также известный как <NP=syn>.' },
  ];
  const [result, setResult] = React.useState<Option[]>([]);
  //console.log("current "+currentUser?.first_name+ currentUser?.last_name+ currentUser.email);
  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
          С возвращением, {currentUser} 👋🏼
          </Text>
          <Text fontSize="3xl" color={'#009688'}>
            Добро пожаловать в инструментальное окружение SpaLSP
          </Text>
          <Image maxH={"500px"} src='https://i.pinimg.com/originals/6f/b9/35/6fb935c214156c44201777e4cdbc7230.jpg' alt='Dan Abramov' />
        </Box>
        <Box maxW="md">
          <Autocomplete
          width="500px"
            options={options}
            result={result}
            setResult={(options: Option[]) => setResult(options)}
            placeholder="Autocomplete"
          />
        </Box>
        <Box>
          
        </Box>
      </Container>
    </>
  )
}

export default Dashboard
