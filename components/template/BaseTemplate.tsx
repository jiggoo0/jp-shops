/* @identity เจ้าป่า */
import React from "react";

interface BaseTemplateProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  containerClassName?: string;
  mainClassName?: string;
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
  mainClassName = "",
}) => {
  return (
    <div className={`flex min-h-screen flex-col ${containerClassName}`}>
      {header}
      <main className={`flex-grow ${mainClassName}`}>{children}</main>
      {footer}
    </div>
  );
};

export default BaseTemplate;
