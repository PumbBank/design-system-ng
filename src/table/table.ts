export interface DataModelInterface {
  fieldName: string;
  title: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  filterValue?: string;
}

export interface BadgeInterface {
  fieldName: string;
  valid: string | any[];
  invalid: string | any[];
  warning: string | any[];
}

export interface FilterInterface {
  value: string;
  fieldName: string;
}

export interface PaginatorInterface {
  currentPage: number;
  offset: number;
  limit: number;
  pages: number;
}

export interface SortInterface {
  sortDirection: string;
  sortColumn: any;
}

export interface EmitInterface {
  filter: FilterInterface[];
  sort: SortInterface;
  paginator: PaginatorInterface;
}

export enum RadioEnum {
  checked = 'checked',
  unchecked = 'unchecked'
}

export enum CheckboxEnum {
  checked = 'checked',
  unchecked = 'unchecked',
  indeterminate = 'indeterminate'
}

export enum TableTypeEnum {
  normal = 'normal',
  zebra = 'zebra'
}

export enum TableStyleEnum {
  normal = 'normal',
  small = 'small',
  large = 'large',
  round = 'round'
}

export class TableBadge {
  public badge: BadgeInterface;

  constructor(badge: BadgeInterface) {
    this.badge = badge;
  }

  getBadgeByType(type: string) {
    const badgeType = {
      color: null,
      icon: null
    };

    switch (type) {
      case 'valid':
        badgeType.color = 'green';
        badgeType.icon = 'valid';
        break;
      case 'invalid':
        badgeType.color = 'red';
        badgeType.icon = 'warning';
        break;
      case 'warning':
        badgeType.color = 'orange';
        badgeType.icon = 'warning';
    }

    return badgeType;
  }
}
