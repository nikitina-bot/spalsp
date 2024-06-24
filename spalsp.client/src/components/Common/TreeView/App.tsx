import { useEffect, useMemo, useState } from "react";
import { ChakraProvider, Box, Button } from "@chakra-ui/react";
import { Tree, useTree } from "./components/tree";
import { nodesPattern, nodesOnto, getRemoteData, nodesDocs } from "./data";

export default function App({step, hadleSelected} : {step:string, hadleSelected: (setted:string[])=>void}) {
  const nodes = step==="onto" ? nodesOnto :  step==="docs" ? nodesDocs : nodesPattern;

  const {
    selectionKeys,
    setSelectionKeys,
    setExpandedKeys,
    extendedNodes,
    nodesToSelectionKeys,
    getExpandedKeys
  } = useTree();

  const initSelectionKeys = useMemo<TreeSelectionKeys>(
    () => nodesToSelectionKeys(extendedNodes(nodes)),
    [nodesToSelectionKeys, extendedNodes]
  );

  const initialExpandedKeys = useMemo<TreeExpandedKeys>(
    () => getExpandedKeys(nodes),
    [getExpandedKeys]
  );


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
        <Tree value={nodes} isReadOnly={false} isDisabled={false} />
      </Box>
      <Box px={5}>
        <Button type="button" aria-label="Save" onClick={onSave}>
          Выбрать
        </Button>
      </Box>
    </ChakraProvider>
  );
}
