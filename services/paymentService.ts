import { ProductFormData } from "../types";

export interface PaymentSubmissionData {
  name: string;
  email: string;
  upiId: string;
  txnId: string;
  planName: string;
  amount: string;
  screenshot: File | null;
}

// Mock API call to submit payment proof
export const submitPaymentProof = async (data: PaymentSubmissionData): Promise<{ success: boolean; message: string }> => {
  console.log("Submitting payment proof to backend...", data);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // In a real app, you would use fetch() here:
  /*
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('screenshot', data.screenshot);
  ...
  
  const response = await fetch('/api/payments/submit', {
    method: 'POST',
    body: formData
  });
  */

  return {
    success: true,
    message: "Payment submitted successfully"
  };
};
