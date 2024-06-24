import type { SyntheticEvent } from "react";
import { memo, useRef, useMemo, useCallback } from "react";
import { chakra, Checkbox, Box, HStack, IconButton, Input } from "@chakra-ui/react";
import { BiBookAlt, BiBracket, BiChevronDown, BiChevronRight, BiFileBlank, BiGitMerge, BiMinus, BiPlus } from "react-icons/bi";
import { useTree } from "./use-tree";

/**
 * Modified version of https://github.com/primefaces/primereact/tree/master/components/lib/tree
 * @todo
 * - Bug: Checked state does not calculate correct when moving from intermediate state
 * - Init state from save object (update) keys.split(',')
 * - Precalculate values on init; parents (keys + length), descendants (keys + length)
 * - Move more logic to jotai using optics
 */
export const UITreeNode = memo(
  ({
    root,
    node,
    path,
    index,
    isReadOnly = false,
    isDisabled = false,
    hasCheckboxes,
  }: UITreeNodeProps) => {
    const {
      findDescendantKeys,
      selectionKeys,
      setSelectionKeys,
      expandedKeys,
      setExpandedKeys,
      intermediates,
      isNodeLeaf
    } = useTree();

    const contentRef = useRef<any>(null);
    const descendants = useMemo<TreeNode[]>(() => node.descendants ?? [], [
      node.descendants
    ]);

    const isExpanded = useMemo<boolean>(
      () => Object.prototype.hasOwnProperty.call(expandedKeys, node.key),
      [expandedKeys, node.key]
    );

    const isChecked = useMemo<boolean>(() => {
      const selection = selectionKeys[node.key];
      return selection?.checked ?? false;
    }, [node.key, selectionKeys]);

    const isIntermediate = useMemo<boolean>(() => {
      if (
        node.key === "all" &&
        Object.values(intermediates).some((bool) => bool)
      ) {
        return true;
      }
      return intermediates[node.key] ?? false;
    }, [node.key, intermediates]);

    const expand = useCallback((): void => {
      const keys: TreeExpandedKeys = {
        ...expandedKeys,
        [node.key]: true
      };
      setExpandedKeys(keys);
    }, [node.key, expandedKeys, setExpandedKeys]);

    const collapse = useCallback((): void => {
      const keys = Object.keys(expandedKeys).reduce(
        (acc: TreeExpandedKeys, key: string) => {
          if (key === node.key) return acc;
          acc[key] = true;
          return acc;
        },
        {}
      );
      setExpandedKeys(keys);
    }, [node.key, expandedKeys, setExpandedKeys]);

    const toggleSelectionKeys = useCallback(
      (checked: boolean): void => {
        const descendants = findDescendantKeys(node);
        const keys = {
          ...selectionKeys,
          [node.key]: {
            ...selectionKeys[node.key],
            checked,
            intermediate: false
          },
          ...descendants.reduce((acc: any, key: string) => {
            acc[key] = {
              ...selectionKeys[key],
              checked,
              intermediate: false
            };
            return acc;
          }, {})
        };

        setSelectionKeys(keys);
      },
      [node, selectionKeys, setSelectionKeys, findDescendantKeys]
    );

    const onTogglerClick = useCallback(
      (event: SyntheticEvent<HTMLButtonElement>): void => {
        if (isExpanded) collapse();
        else expand();

        event.preventDefault();
        event.stopPropagation();
      },
      [collapse, expand, isExpanded]
    );

    const createLabel = (): JSX.Element => <Box as="span">{node.label}</Box>;

    const createCheckbox = (): JSX.Element => {
      if (!hasCheckboxes)  
        return (<></>);
      return (
          <Checkbox
            isChecked={isChecked}
            isIndeterminate={isIntermediate}
            isReadOnly={isReadOnly}
            isDisabled={isDisabled}
            onChange={(event) => {
              toggleSelectionKeys(event.currentTarget.checked);
            }}
          />
        );
    }

    const createToggler = (): Maybe<JSX.Element> => {
      if (!descendants?.length) 
        if (node.type === 'subdomain' || node.type === 'domain')
          return null;
        else
          return (
            <IconButton
            isRound
            size="xs"
            variant="link"
            colorScheme="blue"
            aria-label="Expand"
            fontSize="24px"
            onClick={()=>{console.log('clicked')}}
            icon={ 
              node.type === 'document'
                ?<BiFileBlank />
                :node.type === 'dictionary'
                  ?<BiBookAlt />
                  :node.type === 'ontology'
                    ? <BiGitMerge/>
                    :<BiBracket/>
            }
            />
          );
            

      return (
        <IconButton
          isRound
          size="xs"
          variant="link"
          colorScheme="blue"
          aria-label="Expand"
          onClick={onTogglerClick}
          fontSize="24px"
          icon={isExpanded ? <BiChevronDown /> : <BiChevronRight />}
        />
      );
    };

    const createContent = (): JSX.Element => (
      <Box
        role="treeitem"
        ref={contentRef}
        tabIndex={0}
        aria-posinset={index + 1}
        aria-expanded={isExpanded}
        aria-selected={isChecked}
        sx={{
          pl: descendants?.length ? 0 : 6,
          fontWeight: isChecked ? "medium" : "normal"
        }}
      >
        <HStack>
          {createToggler()}
          {createCheckbox()}
          {createLabel()}
        </HStack>
      </Box>
    );

    const createChildren = (): Maybe<JSX.Element> => {
      if (!descendants?.length || !isExpanded) return null;

      return (
        <chakra.ul
          role="group"
          sx={{
            pl: isNodeLeaf(node) ? 0 : 6,
            listStyleType: "none"
          }}
        >
          {descendants.map((descendant: TreeNode, key: number) => (
            <UITreeNode
              key={descendant.key}
              node={descendant}
              parent={node}
              root={root}
              index={key}
              last={key === descendants.length - 1}
              path={`${path}-${key}`}
              isReadOnly={isReadOnly}
              isDisabled={isDisabled}
              hasCheckboxes={hasCheckboxes}
            />
          ))}
        </chakra.ul>
      );
    };

    const createNode = (): JSX.Element => (
      <chakra.li
        sx={{
          pl: isNodeLeaf(node) ? 2 : 1
        }}
      >
        {createContent()}
        {createChildren()}
      </chakra.li>
    );

    return createNode();
  }
);

export const UITreeNodeEditor = memo(
  ({
    root,
    node,
    path,
    index,
    isReadOnly = false,
    isDisabled = false,
    hasCheckboxes
  }: UITreeNodeProps) => {
    const {
      findDescendantKeys,
      selectionKeys,
      setSelectionKeys,
      expandedKeys,
      setExpandedKeys,
      intermediates,
      isNodeLeaf
    } = useTree();

    const contentRef = useRef<any>(null);
    const descendants = useMemo<TreeNode[]>(() => node.descendants ?? [], [
      node.descendants
    ]);

    const isExpanded = useMemo<boolean>(
      () => Object.prototype.hasOwnProperty.call(expandedKeys, node.key),
      [expandedKeys, node.key]
    );

    const isChecked = useMemo<boolean>(() => {
      const selection = selectionKeys[node.key];
      return selection?.checked ?? false;
    }, [node.key, selectionKeys]);

    const isIntermediate = useMemo<boolean>(() => {
      if (
        node.key === "all" &&
        Object.values(intermediates).some((bool) => bool)
      ) {
        return true;
      }
      return intermediates[node.key] ?? false;
    }, [node.key, intermediates]);

    const expand = useCallback((): void => {
      const keys: TreeExpandedKeys = {
        ...expandedKeys,
        [node.key]: true
      };
      setExpandedKeys(keys);
    }, [node.key, expandedKeys, setExpandedKeys]);

    const collapse = useCallback((): void => {
      const keys = Object.keys(expandedKeys).reduce(
        (acc: TreeExpandedKeys, key: string) => {
          if (key === node.key) return acc;
          acc[key] = true;
          return acc;
        },
        {}
      );
      setExpandedKeys(keys);
    }, [node.key, expandedKeys, setExpandedKeys]);

    const toggleSelectionKeys = useCallback(
      (checked: boolean): void => {
        const descendants = findDescendantKeys(node);
        const keys = {
          ...selectionKeys,
          [node.key]: {
            ...selectionKeys[node.key],
            checked,
            intermediate: false
          },
          ...descendants.reduce((acc: any, key: string) => {
            acc[key] = {
              ...selectionKeys[key],
              checked,
              intermediate: false
            };
            return acc;
          }, {})
        };

        setSelectionKeys(keys);
      },
      [node, selectionKeys, setSelectionKeys, findDescendantKeys]
    );

    const onTogglerClick = useCallback(
      (event: SyntheticEvent<HTMLButtonElement>): void => {
        if (isExpanded) collapse();
        else expand();

        event.preventDefault();
        event.stopPropagation();
      },
      [collapse, expand, isExpanded]
    );

    const onAddClick = useCallback(
      (event: SyntheticEvent<HTMLButtonElement>): void => {
        if (isExpanded) collapse();
        else expand();

        event.preventDefault();
        event.stopPropagation();
      },
      [collapse, expand, isExpanded]
    );

    const createLabel = (): JSX.Element => 
      <div>
        <Input width={'400px'} height={'30px'} marginBottom={'5px'} defaultValue={node.label}/>
      </div>;
    
    const createCheckbox = (): JSX.Element => (
      <Checkbox
        isChecked={isChecked}
        isIndeterminate={isIntermediate}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onChange={(event) => {
          toggleSelectionKeys(event.currentTarget.checked);
        }}
      />
    );

    const createToggler = (): Maybe<JSX.Element> => {
      if (!descendants?.length) return null;
      return (
        <div>
          <IconButton
            isRound
            size="xs"
            variant="link"
            colorScheme="blue"
            aria-label="Expand"
            onClick={onTogglerClick}
            fontSize="24px"
            icon={isExpanded ? <BiChevronDown /> : <BiChevronRight />}
          />
        </div>
      );
    };

    const createPlus = (): Maybe<JSX.Element> => {
      if (!descendants?.length) return (
        <div>
          <IconButton
            isRound
            size="xs"
            variant="link"
            colorScheme="green"
            aria-label="Expand"
            onClick={onAddClick}
            fontSize="24px"
          />
        </div>
      );
      return (
        <div>
          <IconButton
            isRound
            size="xs"
            variant="link"
            colorScheme="green"
            aria-label="Expand"
            onClick={onAddClick}
            fontSize="24px"
            icon={<BiPlus />}
          />
        </div>
      );
    };

    const createContent = (): JSX.Element => (
      <Box
        role="treeitem"
        ref={contentRef}
        tabIndex={0}
        aria-posinset={index + 1}
        aria-expanded={isExpanded}
        aria-selected={isChecked}
        sx={{
          pl: descendants?.length ? 0 : 6,
          fontWeight: isChecked ? "medium" : "normal"
        }}
      >
        <HStack>
          {createToggler()}
          {createPlus()}
          {createCheckbox()}
          {createLabel()}
        </HStack>
      </Box>
    );

    const createChildren = (): Maybe<JSX.Element> => {
      if (!descendants?.length || !isExpanded) return null;

      return (
        <chakra.ul
          role="group"
          sx={{
            pl: isNodeLeaf(node) ? 0 : 6,
            listStyleType: "none"
          }}
        >
          {descendants.map((descendant: TreeNode, key: number) => (
            <UITreeNodeEditor
              key={descendant.key}
              node={descendant}
              parent={node}
              root={root}
              index={key}
              last={key === descendants.length - 1}
              path={`${path}-${key}`}
              isReadOnly={isReadOnly}
              isDisabled={isDisabled}
              hasCheckboxes={hasCheckboxes}
            />
          ))}
        </chakra.ul>
      );
    };

    const createNode = (): JSX.Element => (
      <chakra.li
        sx={{
          pl: isNodeLeaf(node) ? 2 : 1
        }}
      >
        {createContent()}
        {createChildren()}
      </chakra.li>
    );

    return createNode();
  }
);

export const UITreeNodeViewer = memo(
  ({
    root,
    node,
    path,
    index,
    isReadOnly = false,
    isDisabled = false,
    level = 0,
    hasCheckboxes
  }: UITreeNodeProps) => {
    const {
      findDescendantKeys,
      selectionKeys,
      setSelectionKeys,
      expandedKeys,
      setExpandedKeys,
      intermediates,
      isNodeLeaf
    } = useTree();

    const contentRef = useRef<any>(null);
    const descendants = useMemo<TreeNode[]>(() => node.descendants ?? [], [
      node.descendants
    ]);

    const isExpanded = useMemo<boolean>(
      () => Object.prototype.hasOwnProperty.call(expandedKeys, node.key),
      [expandedKeys, node.key]
    );

    const isChecked = useMemo<boolean>(() => {
      const selection = selectionKeys[node.key];
      return selection?.checked ?? false;
    }, [node.key, selectionKeys]);

    const isIntermediate = useMemo<boolean>(() => {
      if (
        node.key === "all" &&
        Object.values(intermediates).some((bool) => bool)
      ) {
        return true;
      }
      return intermediates[node.key] ?? false;
    }, [node.key, intermediates]);

    const expand = useCallback((): void => {
      const keys: TreeExpandedKeys = {
        ...expandedKeys,
        [node.key]: true
      };
      setExpandedKeys(keys);
    }, [node.key, expandedKeys, setExpandedKeys]);

    const collapse = useCallback((): void => {
      const keys = Object.keys(expandedKeys).reduce(
        (acc: TreeExpandedKeys, key: string) => {
          if (key === node.key) return acc;
          acc[key] = true;
          return acc;
        },
        {}
      );
      setExpandedKeys(keys);
    }, [node.key, expandedKeys, setExpandedKeys]);

    const toggleSelectionKeys = useCallback(
      (checked: boolean): void => {
        const descendants = findDescendantKeys(node);
        const keys = {
          ...selectionKeys,
          [node.key]: {
            ...selectionKeys[node.key],
            checked,
            intermediate: false
          },
          ...descendants.reduce((acc: any, key: string) => {
            acc[key] = {
              ...selectionKeys[key],
              checked,
              intermediate: false
            };
            return acc;
          }, {})
        };

        setSelectionKeys(keys);
      },
      [node, selectionKeys, setSelectionKeys, findDescendantKeys]
    );

    const onTogglerClick = useCallback(
      (event: SyntheticEvent<HTMLButtonElement>): void => {
        if (isExpanded) collapse();
        else expand();

        event.preventDefault();
        event.stopPropagation();
      },
      [collapse, expand, isExpanded]
    );

    const onAddClick = useCallback(
      (event: SyntheticEvent<HTMLButtonElement>): void => {
        if (isExpanded) collapse();
        else expand();

        event.preventDefault();
        event.stopPropagation();
      },
      [collapse, expand, isExpanded]
    );

    const createLabel = (): JSX.Element => 
      <div>
        <Input width={'400px'} height={'30px'} marginBottom={'5px'} defaultValue={node.label}/>
      </div>;
    
    const createCheckbox = (): JSX.Element => (
      <Checkbox
        isChecked={isChecked}
        isIndeterminate={isIntermediate}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onChange={(event) => {
          toggleSelectionKeys(event.currentTarget.checked);
        }}
      />
    );

    const createToggler = (): Maybe<JSX.Element> => {
      if (!descendants?.length) 
        return (
          <IconButton
          isRound
          size="xs"
          variant="link"
          colorScheme="blue"
          aria-label="Expand"
          onClick={onTogglerClick}
          fontSize="24px"
          icon={node.label.includes('.') ? <BiFileBlank /> : <></>}
          />
        );
      return (
        <div>
          <IconButton
            isRound
            size="xs"
            variant="link"
            colorScheme="blue"
            aria-label="Expand"
            onClick={onTogglerClick}
            fontSize="24px"
            icon={isExpanded ? <BiChevronDown /> : <BiChevronRight />}
          />
        </div>
      );
    };

    const createContent = (): JSX.Element => (
      <Box
        role="treeitem"
        ref={contentRef}
        tabIndex={0}
        aria-posinset={index + 1}
        aria-expanded={isExpanded}
        aria-selected={isChecked}
        sx={{
          pl: descendants?.length ? 0 : 6,
          fontWeight: isChecked ? "medium" : "normal"
        }}
      >
        <HStack>
          {createToggler()}
          {createLabel()}
        </HStack>
      </Box>
    );

    const createChildren = (): Maybe<JSX.Element> => {
      if (!descendants?.length || !isExpanded) return null;
      const newLevel=level+1;

      return (
        <chakra.ul
          role="group"
          sx={{
            pl: isNodeLeaf(node) ? 0 : 6,
            listStyleType: "none"
          }}
        >
          {descendants.map((descendant: TreeNode, key: number) => (
            <UITreeNodeViewer
              key={descendant.key}
              node={descendant}
              parent={node}
              root={root}
              index={key}
              last={key === descendants.length - 1}
              path={`${path}-${key}`}
              isReadOnly={isReadOnly}
              isDisabled={isDisabled}
              level={newLevel}
              hasCheckboxes={hasCheckboxes}
            />
          ))}
        </chakra.ul>
      );
    };

    const createNode = (): JSX.Element => (
      <chakra.li
        sx={{
          pl: isNodeLeaf(node) ? 2 : 1
        }}
      >
        {createContent()}
        {createChildren()}
      </chakra.li>
    );

    return createNode();
  }
);