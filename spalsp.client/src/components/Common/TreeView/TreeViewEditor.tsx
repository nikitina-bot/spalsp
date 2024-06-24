import { useEffect, useMemo, useRef, useState } from "react";
import { ChakraProvider, Box, Button } from "@chakra-ui/react";
import { Tree, TreeEditor, useTree } from "./components/tree";
import { nodesPattern, nodesOnto, getRemoteData, nodesDocs, nodesStruct } from "./data";

export default function TreeViewEditor({nodes, hadleSelected} : {nodes:any, hadleSelected: (setted:string[])=>void}) {

  const {
    selectionKeys,
    setSelectionKeys,
    setExpandedKeys,
    extendedNodes,
    nodesToSelectionKeys,
    getExpandedKeys
  } = useTree();

  console.log('NODES', nodes);

  const initSelectionKeys = useMemo<TreeSelectionKeys>(
    () => nodesToSelectionKeys(extendedNodes(nodes)),
    [nodesToSelectionKeys, extendedNodes]
  );

  const initialExpandedKeys = useMemo<TreeExpandedKeys>(
    () => getExpandedKeys(nodes),
    [getExpandedKeys]
  );

  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (files) {
      setStatus("uploading");

      const formData = new FormData();

      [...files].forEach((file) => {
        formData.append("files", file);
      });

      try {
        const result = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  const onSave = (): void => {
    const labeleess = () => {
      let res: { [key: string]: string } = {};
      for (const el of Object.keys(initSelectionKeys)) {
        console.log("++"+initSelectionKeys[el].label);
        res[el] = initSelectionKeys[el].label;
      }
      return res;
    }
    
    const selectedByKeys = Object.keys(selectionKeys).filter((key) => selectionKeys[key]?.checked);

    console.log(
      "onSave",
      selectionKeys,
      selectedByKeys,
      initSelectionKeys,
      labeleess()
    );
    const allV = labeleess();
    let result = [];
    for (const key of selectedByKeys)
    {
      result.push(allV[key]);
    }
    hadleSelected(result);
  };

  const onDelete = (): void => {
    const labeleess = () => {
      let res: { [key: string]: string } = {};
      for (const el of Object.keys(initSelectionKeys)) {
        console.log("++"+initSelectionKeys[el].label);
        res[el] = initSelectionKeys[el].label;
      }
      return res;
    }
    
    const selectedByKeys = Object.keys(selectionKeys).filter((key) => selectionKeys[key]?.checked);

    console.log(
      "onSave",
      selectionKeys,
      selectedByKeys,
      initSelectionKeys,
      labeleess()
    );
    const allV = labeleess();
    let result = [];
    for (const key of selectedByKeys)
    {
      result.push(allV[key]);
    }
    hadleSelected(result);
  };

  useEffect(() => {
    setExpandedKeys(initialExpandedKeys);
  }, [initialExpandedKeys, setExpandedKeys]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRemoteData(step);
      const keys = data.split(",");
      const usedKeys = keys.reduce((acc: TreeSelectionKeys, key: string) => {
        acc[key] = {
          ...initSelectionKeys[key],
          checked: true
        };
        return acc;
      }, {});

      setSelectionKeys({
        ...initSelectionKeys,
        ...usedKeys,
      });
      setSelectionKeys({});

      console.log("fetchData", usedKeys);
    };

    fetchData();
  }, [initSelectionKeys, setSelectionKeys]);

  return (
    <ChakraProvider>
      <Box p={5}>
        <TreeEditor value={nodes} isReadOnly={false} isDisabled={false} />
        <Box>
          <input
            style={{ display: "none" }}
            // accept=".zip,.rar"
            ref={inputFile}
            onChange={handleFileUpload}
            type="file"
          />
          <Button marginTop={'15px'} onClick={onUpload} fontWeight={'100'}>
            Загрузить {step==="onto" ? "онтологии" :  step==="docs" ? "документы" : step==="pattern" ? "ЛСШ": "словари"}
          </Button>
        </Box>
        <Box>
          <Button marginTop={'15px'} onClick={onDelete} color={'#ED2939'} fontWeight={'100'}>
            Удалить выбранные
          </Button>
        </Box>
        <Box>
          <Button marginTop={'15px'} onClick={onSave}>
            Сохранить изменения
          </Button>
        </Box>
        
      </Box>
    </ChakraProvider>
  );
}
