import React, { useEffect, useState } from 'react'
import {
    Button,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react'
import {Box, TreeView} from '@primer/react';
import App from '../../Common/TreeView/App';
import axios from 'axios';
import { Tree } from '../../Common/TreeView/components/tree';

interface PatternPageProps {
}

const PatternPage: React.FC<PatternPageProps> = ({ }) => {
    const [selectedDocs, setSelectedDocs] = useState("");

    const handleDocsChange = (event: any) => {
        setSelectedDocs(event);
        //selectDocs(event);
    };

    const [treeData, setTreeData] = useState(undefined);
    const url = 'http://localhost:8000/api/v1/paths/full/lsp';
  
    function getData(){
        const responce = axios.get(url).then((resp: any) => { setTreeData(resp.data.content) });
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
            pt={6}
            fontWeight={'700'}
            color={'#009688'}
        >
           Выберите ЛСШ, которые будут применяться к коллекции документов
        </Heading>

        <Box pt={3}>
            <Tree hasCheckboxes={true} value={treeData} isReadOnly={false} isDisabled={false} />
        </Box>
        <Button type="button" fontSize={'15'} fontWeight={'300'} aria-label="Save" marginTop={'10px'} onClick={()=>{}}>
            Выбрать
        </Button>
        <div>
            Выбранные ЛСШ: 
            <Input
                type="text"
                readOnly
                value={selectedDocs.length === 0 ? "Выберите ЛСШ ↑" :  selectedDocs }
                style={{
                    marginTop: "5px",
                    padding: "5px",
                    width: "80%",
                    border: selectedDocs.length === 0 ? "1px solid red" : "1px solid #ccc"
                }}
            />
        </div>
        
    </>
  )
}

export default PatternPage
