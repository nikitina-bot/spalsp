import React, { useEffect, useState } from 'react'
import {
    Button,
  Heading,
  Input,
  Link,
  Select,
} from '@chakra-ui/react'
import {Box, TreeView} from '@primer/react';
import App from '../../Common/TreeView/App';
import axios from 'axios';
import { Tree } from '../../Common/TreeView/components/tree';

interface OntoPageProps {
    selectOnto: (val:string) => void;
}

const OntoPage: React.FC<OntoPageProps> = ({selectOnto }) => {
    const [selectedOntology, setSelectedOntology] = useState("");

    const handleOntologyChange = (event: any) => {
        setSelectedOntology(event);
        selectOnto(event);
    };

    const [treeData, setTreeData] = useState(undefined);
    const url = 'http://localhost:8000/api/v1/paths/full/ontologies/';
  
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
           Выберите онтологию, построенную на знаниях из коллекции документов
        </Heading>
        <Heading
            size="md"
            textAlign={{ base: 'center', md: 'left' }}
            pt={3}
            fontWeight={'350'}
            color={'red'}
            fontSize={'18'}
        >
           Внимание! Убедитесь, что онтология соответствует требованиям MagNolis: есть вершины "#Старт", "#Имя сущности" и "#Дата"
        </Heading>
        <Link
            size="md"
            textAlign={{ base: 'center', md: 'left' }}
            pt={3}
            fontWeight={'250'}
            color={'gray'}
            fontSize={'14'}
            href={"https://press.psu.ru/index.php/Math/article/download/5700/4075"}
        >
           <u>Пример доступен по ссылке</u>
        </Link>
        <Box pt={3}>
            <Tree hasCheckboxes={true} value={treeData} isReadOnly={false} isDisabled={false} />
        </Box>
        <Button type="button" fontSize={'15'} fontWeight={'300'} aria-label="Save" marginTop={'10px'} onClick={()=>{}}>
            Выбрать
        </Button>
        {false && (<App step="onto" hadleSelected={handleOntologyChange}/>)}
        <div>
            Выбранная онтология: 
            <Input
                type="text"
                readOnly
                value={selectedOntology.length === 0 ? "Выберите одну онтологию ↑" :  selectedOntology[0] }
                style={{
                    marginTop: "5px",
                    padding: "5px",
                    width: "80%",
                    border: selectedOntology.length === 0 ? "1px solid red" : "1px solid #ccc"
                }}
            />
        </div>
        
    </>
  )
}

export default OntoPage
