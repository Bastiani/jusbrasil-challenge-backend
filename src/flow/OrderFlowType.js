// @flow
import { OrderItemFlowType } from './OrderItemFlowType';

export type OrderFlowType = {
  id: string,
  _id: string,
  orderItems: Array<OrderItemFlowType>,
  qty: number,
  total: string,
};
