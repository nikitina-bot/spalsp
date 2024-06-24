import { memo, forwardRef, useRef, useImperativeHandle } from "react";
import { chakra, Box } from "@chakra-ui/react";
import { UITreeNode, UITreeNodeEditor, UITreeNodeViewer } from "./ui-tree-node";

export const Tree = memo(
  forwardRef((props: TreeProps, ref) => {
    const elementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      props,
      getElement: () => elementRef.current
    }));

    const getRootNode = (): TreeNode[] => {
      return props.value ?? [];
    };

    const createRootChild = (
      node: TreeNode,
      index: number,
      last: boolean
    ): JSX.Element => (
      <UITreeNode
        key={node.key}
        index={index}
        root={getRootNode()}
        node={node}
        last={last}
        path={String(index)}
        isReadOnly={props.isReadOnly ?? false}
        isDisabled={props.isDisabled ?? false}
        hasCheckboxes={props.hasCheckboxes ?? false}
      />
    );

    const createRootChildren = (): JSX.Element[] => {
      const value = getRootNode();
      return value.map((node: any, index: number) =>
        createRootChild(node, index, index === value.length - 1)
      );
    };

    const createModel = (): Maybe<JSX.Element> => {
      if (!props.value) return null;

      const rootNodes = createRootChildren();

      return (
        <chakra.ul
          role="tree"
          sx={{
            listStyleType: "none"
          }}
        >
          {rootNodes}
        </chakra.ul>
      );
    };

    return <Box ref={elementRef}>{createModel()}</Box>;
  })
);

export const TreeEditor = memo(
  forwardRef((props: TreeProps, ref) => {
    const elementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      props,
      getElement: () => elementRef.current
    }));

    const getRootNode = (): TreeNode[] => {
      return props.value ?? [];
    };

    const createRootChild = (
      node: TreeNode,
      index: number,
      last: boolean
    ): JSX.Element => (
      <UITreeNodeEditor
        key={node.key}
        index={index}
        root={getRootNode()}
        node={node}
        last={last}
        path={String(index)}
        isReadOnly={props.isReadOnly ?? false}
        isDisabled={props.isDisabled ?? false}
        hasCheckboxes={props.hasCheckboxes ?? false}
      />
    );

    const createRootChildren = (): JSX.Element[] => {
      const value = getRootNode();
      return value.map((node: any, index: number) =>
        createRootChild(node, index, index === value.length - 1)
      );
    };

    const createModel = (): Maybe<JSX.Element> => {
      if (!props.value) return null;

      const rootNodes = createRootChildren();

      return (
        <chakra.ul
          role="tree"
          sx={{
            listStyleType: "none"
          }}
        >
          {rootNodes}
        </chakra.ul>
      );
    };

    return <Box ref={elementRef}>{createModel()}</Box>;
  })
);

export const TreeViewer = memo(
  forwardRef((props: TreeProps, ref) => {
    const elementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      props,
      getElement: () => elementRef.current
    }));

    const getRootNode = (): TreeNode[] => {
      return props.value ?? [];
    };

    const createRootChild = (
      node: TreeNode,
      index: number,
      last: boolean
    ): JSX.Element => (
      <UITreeNodeViewer
        key={node.key}
        index={index}
        root={getRootNode()}
        node={node}
        last={last}
        path={String(index)}
        isReadOnly={props.isReadOnly ?? false}
        isDisabled={props.isDisabled ?? false}
        hasCheckboxes={props.hasCheckboxes ?? false}
      />
    );

    const createRootChildren = (): JSX.Element[] => {
      const value = getRootNode();
      return value.map((node: any, index: number) =>
        createRootChild(node, index, index === value.length - 1)
      );
    };

    const createModel = (): Maybe<JSX.Element> => {
      if (!props.value) return null;

      const rootNodes = createRootChildren();

      return (
        <chakra.ul
          role="tree"
          sx={{
            listStyleType: "none"
          }}
        >
          {rootNodes}
        </chakra.ul>
      );
    };

    return <Box ref={elementRef}>{createModel()}</Box>;
  })
);
