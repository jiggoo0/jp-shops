/* @identity เจ้าป่า */
import React from "react";

interface BaseTemplateProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  containerClassName?: string;
}

/**
 * Template Method Pattern: กำหนดโครงสร้างหลัก (Skeleton) ของหน้าเว็บจำลอง
 * เพื่อลดความซ้ำซ้อนของ Code ในแต่ละธุรกิจ
 */
const BaseTemplate: React.FC<BaseTemplateProps> = ({
  header,
  children,
  footer,
  containerClassName = "",
}) => {
  return (
    <div className={containerClassName}>
      {header}
      <main>{children}</main>
      {footer}
    </div>
  );
};

export default BaseTemplate;
