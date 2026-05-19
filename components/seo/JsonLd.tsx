/* @identity เจ้าป่า */
import {
  getOrganizationSchema,
  getWebsiteSchema,
  getServicesSchema,
  getFAQSchema,
} from "@/lib/schema";
import { FAQ_DATA } from "@/constants";

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
