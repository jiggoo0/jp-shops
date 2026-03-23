import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  service: z.enum(["loan", "visa", "booking", "document", "vifily", "card"]),
  message: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const documentSchema = z.object({
  type: z.enum(["payslip", "salary_certificate"]),
  companyName: z.string().min(2, "Company name is required"),
  employeeName: z.string().min(2, "Employee name is required"),
  position: z.string().min(2, "Position is required"),
  yearsOfService: z.number().min(0).optional(),

  // Financial Details
  baseSalary: z.number().positive("Base salary is required"),
  otherEarnings: z.record(z.string(), z.number()).optional(), // e.g. { "Overtime": 500, "Bonus": 200 }
  deductions: z.record(z.string(), z.number()).optional(), // e.g. { "Social Security": 50, "Tax": 30 }

  issueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export type DocumentInput = z.infer<typeof documentSchema>;
