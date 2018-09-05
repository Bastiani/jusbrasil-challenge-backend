// @flow
import type { UserFlowType } from './UserFlowType';
import type { Dataloaders } from './Dataloaders';

export type GraphQLContext = {
  user?: UserFlowType,
  dataloaders: Dataloaders,
};
