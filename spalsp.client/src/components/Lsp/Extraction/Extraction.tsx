import React, { useState } from 'react'
import {
    Button,
  Heading,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react'
import {Box, TreeView} from '@primer/react';
import axios from 'axios';

interface ExtractionPageProps {
}

const ExtractionPage: React.FC<ExtractionPageProps> = ({ }) => {
    const [matches, setMatches] = useState(null);
    const [concordances, setConcordances] = useState(null);
    const [termins, setTermins] = useState(null);
    const [relations, setRelations] = useState(null);
    const [path, setPath] = useState('');
    const [isHidden, setHidden] = useState(true);
    const [ontoHidden, setOnto] = useState(true);
    const [dicHidden, setDic] = useState(true);

  const handleExtraction = () => {
    setHidden(false);
    const responce = axios.post('http://localhost:8000/api/v1/extract/', 
        {
            "lsp_id": 1,
            "document_id": 1,
            "ontology_id": 1,
            "dictionary_id": 1
        }
    ).then(
        (responce) => {
            console.log(responce);
            setMatches(responce.data.matches);
            setConcordances(responce.data.concordances);
            setTermins(responce.data.termins);
            setRelations(responce.data.relations);
            setPath(responce.data.path);
        }
    );
  };

  return (
    <Box p="4">
        <div>
            Документы: 
            <Input
                type="text"
                readOnly
                value={'"Распространение ВИЧ.docx"'}
                style={{
                    margin: "5px",
                    padding: "5px",
                    width: "100%",
                    border: "1px solid #ccc"
                }}
            />
        </div>
        <div>
            ЛСШ:
            <Input
                type="text"
                readOnly
                value={'"<NP=hypo>,[<NP=hypo>,][а также/также как [и]/и/или] другие/другим/других/о других <NP=hyper>"'}
                style={{
                    margin: "5px",
                    padding: "5px",
                    width: "100%",
                    border: "1px solid #ccc"
                }}
            />
        </div>
        <Button type="button" aria-label="Save" onClick={handleExtraction} marginBottom={"10px"} marginTop={"10px"}>
            Извлечь знания
        </Button>
        <Box hidden={isHidden}>
            <Heading
                size="md"
                textAlign={{ base: 'center', md: 'left' }}
                pt={5}
                color={'#009688'}
            >
                Результаты извлечения
            </Heading>
            <Heading
                size="md"
                textAlign={{ base: 'center', md: 'left' }}
                pt={5}
            >
                Совпадения:
            </Heading>
            <Textarea
                marginTop={"10px"}
                placeholder="Совпадения появятся здесь"
                value={matches}
                readOnly
            />
            <Heading
                size="md"
                textAlign={{ base: 'center', md: 'left' }}
                pt={5}
            >
                Конкордансы:
            </Heading>
            <Textarea
                marginTop={"10px"}
                placeholder="Конкордансы появятся здесь"
                value={concordances}
                readOnly
            />
            <Heading
                size="md"
                textAlign={{ base: 'center', md: 'left' }}
                pt={5}
            >
                Понятия:
            </Heading>
            <Textarea
                marginTop={"10px"}
                placeholder="Понятия появятся здесь"
                value={termins}
                readOnly
            />
            <Heading
                size="md"
                textAlign={{ base: 'center', md: 'left' }}
                pt={5}
            >
                Отношения:
            </Heading>
            <Textarea
                marginTop={"10px"}
                placeholder="Отношения появятся здесь"
                value={relations}
                readOnly
            />


            <Heading
                size="md"
                textAlign={{ base: 'center', md: 'left' }}
                pt={5}
                color={'#009688'}
            >
                На основе извлеченных знаний
            </Heading>
            <Button type="button" aria-label="Save" onClick={()=>{setOnto(false)}} marginTop={"10px"} marginRight={"10px"} width={'200px'}>
                Создать онтологию
            </Button>
            <Button type="button" aria-label="Save" onClick={()=>{setDic(false)}} marginTop={"10px"} marginRight={"10px"} width={'200px'}>
                Создать словарь
            </Button>
            <Textarea hidden={ontoHidden && dicHidden}
                marginTop={"10px"}
                value={
                    ontoHidden? (dicHidden? '': ('Словарь создан в '+path.toString())) : (dicHidden?('Онтология создана в '+path.toString()): 
                    ('Онтология создана в '+path.toString()+'\n'+'Словарь создан в '+path.toString()))
                }
                readOnly
            />

        </Box>
    </Box>
  );
}

export default ExtractionPage
