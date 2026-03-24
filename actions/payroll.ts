"use server";

import { payrollSchema, type PayrollInput } from "@/lib/config/payroll";
import { createDocument } from "./document";

/**
 * Creates a formal Payroll/Salary Certificate.
 * Encapsulates the specific metadata for payroll logic.
 */
export async function createPayrollCertificate(data: PayrollInput) {
  try {
    // 1. Validate against payroll schema
    const validated = payrollSchema.parse(data);

    // 2. Map to common document structure
    const documentData = {
      ownerName: validated.ownerName,
      documentType: "Official Payroll Certificate",
      issuedDate: validated.issuedDate,
      expiryDate: validated.expiryDate,
      status: "Verified",
      issuer: validated.issuer,
      metadata: {
        position: validated.position,
        companyName: validated.companyName,
        registrationNo: validated.registrationNo,
        salary: validated.salary,
        allowance: validated.allowance,
        tax: validated.tax,
        sso: validated.sso,
      },
    };

    // 3. Call the base document creator
    return await createDocument(documentData);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate payroll certificate";
    return {
      success: false,
      error: message,
    };
  }
}
