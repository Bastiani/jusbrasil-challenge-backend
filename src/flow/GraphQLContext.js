// @flow
import type { UserFlowType } from './UserFlowType';
import type { ProductFlowType } from './ProductFlowType';
import type { OrderFlowType } from './OrderFlowType';
import type { OrderItemFlowType } from './OrderItemFlowType';
import type { Dataloaders } from './Dataloaders';

export type GraphQLContext = {
  user?: UserFlowType,
  product?: ProductFlowType,
  order?: OrderFlowType,
  orderItem?: OrderItemFlowType,
  dataloaders: Dataloaders,
};
