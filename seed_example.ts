import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function seed() {
  const { data, error } = await supabase
    .from("documents")
    .insert([
      {
        type: "payslip",
        company_name: "บริษัท เจพีวีซอลแอนดอส จำกัด",
        employee_name: "นายเจ้าป่า ตัวอย่าง",
        position: "Senior Strategic Consultant",
        years_of_service: 9,
        base_salary: 1000,
        other_earnings: {
          "Cost of Living Allowance": 200,
          "Position Allowance": 300,
        },
        deductions: {
          "Social Security": 50,
          "Withholding Tax": 30,
          "Provident Fund": 420,
        },
        issue_date: new Date().toISOString().split("T")[0],
      },
    ])
    .select();

  if (error) console.error(error);
  else console.log("Example Document Created ID:", data[0].id);
}
seed();
