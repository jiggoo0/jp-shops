/* @identity เจ้าป่า */
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface IconRendererProps extends LucideProps {
  name: string;
}

/**
 * คอมโพเนนต์สำหรับแสดง Icon จากชื่อ String
 * ช่วยให้เราสามารถเก็บชื่อ Icon ใน constants แบบ serializable ได้
 */
export const IconRenderer = ({ name, ...props }: IconRendererProps) => {
  // ระบุ Type ให้กับ Icons เพื่อหลีกเลี่ยง any
  const LucideIcons = Icons as unknown as Record<
    string,
    React.ForwardRefExoticComponent<LucideProps>
  >;
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    return <Icons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};
