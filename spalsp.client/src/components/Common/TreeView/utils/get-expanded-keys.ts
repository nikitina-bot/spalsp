export const getExpandedKeys = (nodes: TreeNode[]): TreeExpandedKeys =>
  nodes.reduce((acc: TreeExpandedKeys, node: TreeNode) => {
    if (node.descendants) {
      acc[node.key] = true;
      acc = {
        ...acc,
        ...getExpandedKeys(node.descendants)
      };
    }
    return acc;
  }, {});
