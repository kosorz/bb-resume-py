import React from "react";
import { Text } from "@react-pdf/renderer";

import { DataViewer } from "../../../../typings/Data.typing";

const Data = ({ value, style, type }: DataViewer) => {
  const getEmoji = (type: string) => {
    switch (type) {
      case "link":
        return { emoji: "🌐", fallback: "www.example.com" };
      case "email":
        return { emoji: "✉️", fallback: "john@doe.com" };
      case "location":
        return { emoji: "📍", fallback: "Somewhere" };
      case "date":
        return { emoji: "📅", fallback: "00/0000" };
      default:
        return { emoji: "📞", fallback: "+00 0000000" };
    }
  };

  const config = getEmoji(type);

  return (
    <Text style={style}>
      {config.emoji} {value || config.fallback}
    </Text>
  );
};

export default Data;
