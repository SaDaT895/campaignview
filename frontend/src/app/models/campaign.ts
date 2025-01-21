export interface Campaign {
  id: number;
  name: string;
  createdAt: Date;
  endsAt: Date;
  updatedAt: Date;
  channelId: number;
  allocatedBudget: number;
  currentExpense: number;
}
