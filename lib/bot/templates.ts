import { siteConfig } from "@/lib/site-config";

export const flexTemplates = {
  // เมนูหลัก [1-5]
  mainMenu: {
    type: "flex",
    altText: "เมนูหลัก JP Visual Docs",
    contents: {
      type: "bubble",
      size: "xl",
      header: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#111827",
        contents: [
          {
            type: "text",
            text: "SELECT PROTOCOL",
            color: "#10B981",
            weight: "bold",
            size: "xxs",
            tracking: "0.3em",
          },
          {
            type: "text",
            text: "ยินดีต้อนรับสู่เจ้าป่า",
            color: "#ffffff",
            weight: "bold",
            size: "lg",
            margin: "xs",
          },
        ],
      },
      hero: {
        type: "image",
        url: `${siteConfig.url}/hero-image.webp`,
        size: "full",
        aspectRatio: "20:10",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "กรุณาพิมพ์หมายเลข หรือกดปุ่มด้านล่างเพื่อดำเนินการครับ",
            size: "xs",
            color: "#6B7280",
            wrap: true,
          },
          {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            margin: "lg",
            contents: [
              {
                type: "button",
                style: "primary",
                color: "#111827",
                action: {
                  type: "message",
                  label: "1. ปรึกษาสินเชื่อ",
                  text: "1",
                },
                height: "sm",
              },
              {
                type: "button",
                style: "primary",
                color: "#111827",
                action: {
                  type: "message",
                  label: "2. จัดเตรียมวีซ่า",
                  text: "2",
                },
                height: "sm",
              },
              {
                type: "button",
                style: "primary",
                color: "#111827",
                action: {
                  type: "message",
                  label: "3. ระบบ Vifily QR",
                  text: "3",
                },
                height: "sm",
              },
              {
                type: "button",
                style: "secondary",
                action: {
                  type: "message",
                  label: "4. งานด่วนพิเศษ",
                  text: "4",
                },
                height: "sm",
              },
              {
                type: "button",
                style: "link",
                color: "#6B7280",
                action: {
                  type: "message",
                  label: "5. ติดต่อเจ้าหน้าที่",
                  text: "5",
                },
              },
            ],
          },
        ],
      },
    },
  },

  // เมนูย่อยสำหรับแต่ละบริการ (Sub-Menu)
  serviceSubMenu: (
    id: string,
    title: string,
    options: { label: string; text: string }[],
  ) => ({
    type: "flex",
    altText: `เมนู ${title}`,
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: title,
            weight: "bold",
            size: "lg",
            color: "#111827",
          },
          {
            type: "box",
            layout: "vertical",
            margin: "xl",
            spacing: "sm",
            contents: options.map((opt, idx) => ({
              type: "button",
              style: "secondary",
              color: "#F3F4F6",
              height: "sm",
              action: {
                type: "message",
                label: `${idx + 1}. ${opt.label}`,
                text: opt.text,
              },
            })),
          },
          {
            type: "button",
            style: "link",
            color: "#10B981",
            action: { type: "message", label: "กลับหน้าเมนูหลัก", text: "0" },
          },
        ],
      },
    },
  }),
};
