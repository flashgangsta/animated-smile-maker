export interface IMenuContentData {
    [label: string]: IMenuContentDataItem | IMenuContentSubmenu;
}

export interface IMenuContentDataItem {
    handler?: () => void;
    disabled?: boolean;
}

export interface IMenuContentSubmenu {
    [subLabel: string]: IMenuContentDataItem;
}