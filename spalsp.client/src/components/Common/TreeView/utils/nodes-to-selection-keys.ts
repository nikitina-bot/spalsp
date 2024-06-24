export const nodesToSelectionKeys = (nodes: TreeNode[]): TreeSelectionKeys =>
  nodes.reduce((acc: TreeSelectionKeys, node: TreeNode) => {
    acc[node.key] = node;
    return acc;
  }, {});
