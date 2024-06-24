import { atom } from "jotai";

/**
 * Most simple atom structure, maybe primities and atom family
 * so we can compute; allChecked, isIntermediate, leaf,
 */
export const selectionKeysAtom = atom<TreeSelectionKeys>({});
export const expandedKeysAtom = atom<TreeExpandedKeys>({});
