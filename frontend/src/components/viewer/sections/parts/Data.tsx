import React from "react";
import { Text } from "@react-pdf/renderer";

const Data = ({
  value,
  style,
  type,
  bare,
}: {
  type: "phone" | "link" | "email" | "location" | "date";
  value?: string;
  bare?: boolean;
  style?: Object;
}) => {
  const getEmoji = (type: string) => {
    switch (type) {
      case "link":
        return { emoji: " 🌐 ", fallback: "www.example.com" };
      case "email":
        return { emoji: " ✉️ ", fallback: "john@doe.com" };
      case "location":
        return { emoji: " 📍", fallback: "Somewhere" };
      case "date":
        return { emoji: " 📅 ", fallback: "12/2018" };
      default:
        return { emoji: " 📞 ", fallback: "+12 3456789" };
    }
  };

  const config = getEmoji(type);
  const content = (
    <>
      {config.emoji}
      {value || config.fallback}
    </>
  );

  return bare ? content : <Text style={style}>{content}</Text>;
};

export default Data;
