/* @identity เจ้าป่า */
import {
  getOrganizationSchema,
  getWebsiteSchema,
  getServicesSchema,
  getFAQSchema,
} from "@/lib/schema";

const FAQ_DATA = [
  {
    q: "กรณีถูกปฏิเสธวีซ่ามาหลายครั้ง ยังมีโอกาสผ่านไหม?",
    a: "มีโอกาสสูงครับ ทีมงานจะวิเคราะห์จดหมายปฏิเสธ (Refusal Letter) อย่างละเอียด เพื่อแก้จุดบกพร่องและเตรียมหลักฐานสนับสนุนใหม่ที่แน่นหนากว่าเดิม",
  },
  {
    q: "การจัดเตรียมเอกสารสินเชื่อใช้เวลานานเท่าไหร่?",
    a: "โดยปกติจะใช้เวลา 5-10 วันทำการ ขึ้นอยู่กับความซับซ้อนของเคสและประเภทของอาชีพครับ",
  },
  {
    q: "บริการจองตั๋วเครื่องบินและที่พัก เป็นของจริงไหม?",
    a: "เราออกใบจองที่มีรหัส PNR จริง ซึ่งสามารถตรวจสอบกับสายการบินได้ เพื่อใช้ประกอบการยื่นวีซ่าโดยเฉพาะ",
  },
];

const JsonLd = () => {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();
  const servicesSchema = getServicesSchema();
  const faqSchema = getFAQSchema(FAQ_DATA);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};

export default JsonLd;
