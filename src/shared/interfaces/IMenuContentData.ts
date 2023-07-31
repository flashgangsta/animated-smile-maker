export interface IMenuContent {
    [label: string]: IMenuContextItem;
}

export interface IMenuContextItem {
    [label:string]: IMenuContextItemProps;
}

export interface IMenuContextItemProps {
    handler?: () => void;
    disabled?: boolean;
}
