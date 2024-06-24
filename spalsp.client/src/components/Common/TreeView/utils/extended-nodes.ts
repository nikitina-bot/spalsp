export const extendedNodes = (nodes: TreeNode[]): TreeNode[] =>
  nodes.reduce((acc: TreeNode[], childNode) => {
    acc.push({
      ...childNode,
      leaf: !childNode.descendants,
      checked: false,
      intermediate: false
    });
    if (childNode.descendants) {
      const ns = childNode.descendants.reduce((a: TreeNode[], n: TreeNode) => {
        acc.push({
          ...n,
          leaf: !n.descendants,
          checked: false,
          intermediate: false
        });
        if (n.descendants) a.push(...extendedNodes(n.descendants));
        return a;
      }, []);
      acc.push(...ns);
    }
    return acc;
  }, []);
