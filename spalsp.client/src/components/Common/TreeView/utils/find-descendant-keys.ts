export const findDescendantKeys = (node: TreeNode): string[] =>
  (node.descendants ?? []).reduce((acc: string[], childNode: TreeNode) => {
    acc.push(childNode.key);
    if (childNode.descendants) acc.push(...findDescendantKeys(childNode));
    return acc;
  }, []);
