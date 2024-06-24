import { Box, Button, ChakraProvider, Checkbox, Grid, GridItem, Heading } from "@chakra-ui/react"
import { Tree } from "../TreeView/components/tree";
import axios from "axios";
import { useEffect, useState } from "react";
import TreeView from '../TreeView/TreeView';


function SmartRepoStructEditor() {
    const [treeData, setTreeData] = useState(undefined);

    function getData(){
        const responce = axios.get('http://localhost:8000/api/v1/paths/full/structure/').then((resp: any) => { setTreeData(resp.data.content) });
        return responce;
    }

    useEffect(() => {
        getData();
      }, []);

    console.log('--> '+treeData);

    return (
        <>
            <Heading
                size="md"
                textAlign={{ base: 'center', md: 'left' }}
                color={'#009688'}
                fontWeight={'500'}
            >
                Добавление и изменение
            </Heading>
            <Heading
                size="md"
                textAlign={{ base: 'center', md: 'left' }}
                color={'#009688'}
                fontWeight={'500'}
            >
                Языков(стран) -&gt; стилей текста -&gt; категорий -&gt; предметных областей -&gt; тематик
            </Heading>
            
            <Box p={5}>
                <Tree value={treeData} isReadOnly={false} isDisabled={false} />
            </Box>
        </>
    )
}

export default SmartRepoStructEditor