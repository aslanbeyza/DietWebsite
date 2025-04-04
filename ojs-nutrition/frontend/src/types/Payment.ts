export interface Payment {
  amount: number; // Payment amount in decimal format
  type: "credit_card" | "cash"; // Payment type, either 'credit_card' or 'cash'
}
