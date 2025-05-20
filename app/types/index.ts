export interface Item {
  type: 'Fruit' | 'Vegetable';
  name: string;
}

export interface ItemWithAnimation extends Item {
  returningToMain?: boolean;
}

export type Column = 'Main' | 'Fruit' | 'Vegetable'; 