import { Box, Button, ChakraProvider, Grid, GridItem, Heading } from "@chakra-ui/react"
import TreeView from "./TreeView"
import { Tree } from "./components/tree";
import { nodesPattern, nodesOnto, getRemoteData, nodesDocs } from "./data";
import { useEffect, useState } from "react";
import axios from "axios";


function TreeViewCrud({ type }) {
    const [treeData, setTreeData] = useState(undefined);
    console.log(type);
    const urlBase = 'http://localhost:8000/api/v1/paths/full/';
    const urlEnd = type==="onto" ? 'ontologies' :  type==="docs" ? 'documents' :  type==="lsp" ? 'lsp' : 'dictionaries';

    function getData(){
        const responce = axios.get(urlBase+urlEnd).then((resp: any) => { setTreeData(resp.data.content) });
        return responce;
    }

    useEffect(() => {
        getData();
      }, []);

    console.log('CRUD--> '+treeData);

    return (
        <>
            <Heading
                size="md"
                textAlign={{ base: 'center', md: 'left' }}
                color={'#009688'}
                fontWeight={'500'}
            >
                Загрузка новых {type=="docs"?"документов":type==="onto"?"онтологий":type==="lsp"?"ЛСШ":"словарей"}
            </Heading>
            <Heading
                size="md"
                textAlign={{ base: 'center', md: 'left' }}
                color={'#009688'}
                fontWeight={'500'}
            >
                Выбор и удаление имеющихся
            </Heading>
            <Heading
                size="md"
                textAlign={{ base: 'center', md: 'left' }}
                color={'#009688'}
                fontWeight={'500'}
            >
                Экспорт файлов
            </Heading>
            <Grid templateColumns='repeat(8, 1fr)' gap={6}>
                <GridItem w='100%'>
                    <Button margin={'5px'} fontSize={'15px'} marginTop={'50px'} width={'150px'}>
                        Загрузить
                    </Button>
                    <Button margin={'5px'} fontSize={'15px'} width={'150px'}>
                        Удалить
                    </Button>
                    <Button margin={'5px'} fontSize={'15px'} marginTop={'20px'} width={'150px'}>
                        Скачать
                    </Button>
                </GridItem>
                <GridItem colSpan={7} w='100%'>
                        <Box p={5}>
                            <Tree value={treeData} isReadOnly={false} isDisabled={false} />
                        </Box>
                </GridItem>
            </Grid>
        </>
    )
}

export default TreeViewCrud