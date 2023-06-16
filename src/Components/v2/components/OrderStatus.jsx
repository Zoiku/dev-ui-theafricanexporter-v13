export const ORDER_STATUS_LEVELS = {
  RECEIVED: 10,
  CONFIRMED: 20,
  "AWAITING PROOF OF PAYMENT": 30,
  "PROOF OF PAYMENT APPROVED": 40,
  PROCESSING: 60,
  SHIPPED: 80,
  DELIVERED: 100,
};

export const ORDER_STATUS_STEPS = {
  RECEIVED: 1,
  CONFIRMED: 2,
  "AWAITING PROOF OF PAYMENT": 3,
  "PROOF OF PAYMENT APPROVED": 4,
  PROCESSING: 5,
  SHIPPED: 6,
  DELIVERED: 7,
};

export const steps = [
  {
    label: "Order placed",
    description: "Order placed by buyer",
  },
  {
    label: "Order Confirmed",
    description: "Order to be confirmed by merchant",
  },
  {
    label: "Proof of payment",
    description: "Awaiting proof of payment from the buyer",
  },
  {
    label: "Payment Approval",
    description: "Pending Approval",
  },
  {
    label: "Processing",
    description: "The order is being processed.",
  },
  {
    label: "Shipped",
    description: "Your order is being shipped.",
  },
  {
    label: "Delivered",
    description: "Your order is being delivered.",
  },
];
