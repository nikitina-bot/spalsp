import React, { useState } from 'react'
import {
    Button,
  Heading,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react'
import {Box, TreeView} from '@primer/react';

interface QAPageProps {
}

const QAPage: React.FC<QAPageProps> = ({ }) => {
    const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAskQuestion = () => {
    // Пока просто добавляем вопрос в массив ответов
    setAnswers(['']);
    // Очищаем поле вопроса после задания вопроса
    //setQuestion("");
  };
  
  // При какой температуре была промывка?

  return (
    <Box p="4">
        <div>
            Документы: 
            <Input
                type="text"
                readOnly
                value={'"Акт от 30.04.2021.docx", "Акт от 30.03.2021.docx", "Акт от 23.03.2021.docx"'}
                style={{
                    margin: "5px",
                    padding: "5px",
                    width: "80%",
                    border: "1px solid #ccc"
                }}
            />
        </div>
        <div>
            Онтология:
            <Input
                type="text"
                readOnly
                value={'"Promyvka.ont"'}
                style={{
                    margin: "5px",
                    padding: "5px",
                    width: "81%",
                    border: "1px solid #ccc"
                }}
            />
        </div>
        <Heading
            size="sm"
            textAlign={{ base: 'center', md: 'left' }}
            pt={5}
        >
           Вопрос:
        </Heading>
        <Input
            marginTop={"10px"}
            placeholder="Введите ваш вопрос"
            value={question}
            onChange={handleQuestionChange}
            mb="4"
        />
        <Button type="button" aria-label="Save" onClick={handleAskQuestion} marginBottom={"10px"}>
            Задать вопрос
        </Button>
        <Heading
            size="sm"
            textAlign={{ base: 'center', md: 'left' }}
            pt={5}
        >
           Ответ:
        </Heading>
        <Textarea
            marginTop={"10px"}
            placeholder="Ответ появится здесь"
            value={answers.join("\n")}
            readOnly
        />
    </Box>
  );
}

export default QAPage
