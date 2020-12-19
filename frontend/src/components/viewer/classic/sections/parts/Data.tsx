import React from "react";
import { Text } from "@react-pdf/renderer";

const Data = ({
  value,
  style,
  type,
}: {
  type: "phone" | "link" | "email" | "location" | "date";
  value?: string;
  style?: Object;
}) => {
  const config: { [key: string]: { emoji: string; fallback: string } } = {
    link: { emoji: " 🌐 ", fallback: "www.example.com" },
    location: { emoji: " 📍", fallback: "Somewhere" },
    date: { emoji: " 📅 ", fallback: "12/2018" },
    phone: { emoji: " 📞 ", fallback: "+12 3456789" },
  };

  return (
    <Text style={style}>
      {config[type].emoji}
      {value || config[type].fallback}
    </Text>
  );
};

export default Data;
