import React, { useEffect, useState } from 'react'
import {
    Button,
  Heading,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react'
import {Box, TreeView} from '@primer/react';
import axios from 'axios';


export default function DataTable({selectedFileId}) {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        async function loadData () {
            try{
                let url = 'http://127.0.0.1:8000/api/v1/magic/maintable/' + selectedFileId;
                let res =  await axios(url, {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                    credentials: 'same-origin',
                    })
                console.log(res);
                setTableData(res.data);
            }
            catch(e){
                console.log(e);
            }
        }
        loadData();
    }, [selectedFileId]);

    return (
        <table>
        <thead>
            <tr>
                <th>Атрибут</th>
                <th>Значение</th>
            </tr>
        </thead>
        <tbody>
            {tableData.map((row, i) => {
                return (
                    <tr key={i} >
                        <td>{row.attr}</td>
                        <td>{row.value}</td>
                    </tr>
                )
                })
            }
        </tbody>
        </table>
    )
}

