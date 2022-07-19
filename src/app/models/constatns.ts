import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const DISPLAYED_COLUMNS_ADMIN = [
  'first_name',
  'last-name',
  'email',
  'csv',
];

export const DISPLAYED_COLUMNS_DASHBOARD = [
  'id',
  'name',
  'active',
  'users_resolved',
];

export const ANIMATION_CONFIGS = [
  trigger('detailExpand', [
    state('collapsed', style({ height: '0px', minHeight: '0' })),
    state('expanded', style({ height: '*' })),
    transition(
      'expanded <=> collapsed',
      animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    ),
  ]),
];
