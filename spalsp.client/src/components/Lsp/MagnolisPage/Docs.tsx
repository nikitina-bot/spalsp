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

interface DocsPageProps {
    selectDocs: (val:string[]) => void;
    whatfor? : string;
}

const DocsPage: React.FC<DocsPageProps> = ({selectDocs, whatfor }) => {
    const [selectedDocs, setSelectedDocs] = useState("");

    const handleDocsChange = (event: any) => {
        setSelectedDocs(event);
        selectDocs(event);
    };

    const [treeData, setTreeData] = useState(undefined);
    const url = 'http://localhost:8000/api/v1/paths/full/documents';
  
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
           Выберите документы, {whatfor==="run"? "для которых будут применяться ЛСШ" : "к которым будут задавться ЕЯ-запросы" }
        </Heading>
        <Box pt={3}>
            <Tree hasCheckboxes={true} value={treeData} isReadOnly={false} isDisabled={false} />
        </Box>
        <Button type="button" fontSize={'15'} fontWeight={'300'} aria-label="Save" marginTop={'10px'} onClick={()=>{}}>
            Выбрать
        </Button>
        {false && (<App step="docs" hadleSelected={handleDocsChange}/>)}
        <div>
            Выбранные документы: 
            <Input
                type="text"
                readOnly
                value={selectedDocs.length === 0 ? "Выберите документы ↑" :  selectedDocs }
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

export default DocsPage
