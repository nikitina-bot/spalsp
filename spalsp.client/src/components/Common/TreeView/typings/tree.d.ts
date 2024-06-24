import type { ReactNode } from "react";

export {};

declare global {
  interface TreeNode {
    key: string;
    label: string;
    leaf?: boolean;
    path_id?: number[];
    type?: string;
    user_id?: string;
    checked?: boolean;
    intermediate?: boolean;
    descendants?: TreeNode[];
  }

  interface TreeSelectionKeys {
    [key: string]: TreeNode;
  }

  interface TreeExpandedKeys {
    [key: string]: boolean;
  }

  interface TreeProps {
    value: TreeNode[];
    isReadOnly?: boolean;
    isDisabled?: boolean;
    children?: ReactNode;
    hasCheckboxes?: boolean;
  }

  interface UITreeNodeProps {
    key: string;
    index: number;
    node: TreeNode;
    parent?: TreeNode;
    root: TreeNode[];
    last: boolean;
    path: string;
    isReadOnly: boolean;
    isDisabled: boolean;
    children?: ReactNode;
    level?: number;
    hasCheckboxes?: boolean;
  }

  declare class Tree extends Component<TreeProps, any> {
    public getElement(): HTMLDivElement;
  }
}
