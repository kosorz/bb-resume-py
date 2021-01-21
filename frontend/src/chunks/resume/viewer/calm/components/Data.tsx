import React from "react";
import { StyleSheet, View, Text, Image } from "@react-pdf/renderer";
import MetaShape from "../../../editor/sections/Meta/Meta.typing";

const Data = ({
  value,
  type,
  meta,
  style,
}: {
  meta: MetaShape;
  type: "phone" | "link" | "email" | "location" | "date";
  value?: string;
  style?: Object;
}) => {
  const { fontFamily, paper } = meta;

  const styles = StyleSheet.create({
    label: {
      fontFamily: fontFamily + "-Bold",
      textTransform: "uppercase",
      marginBottom: paper.space / 10,
      letterSpacing: 3,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    image: {
      width: 15,
      height: "auto",
      marginRight: paper.space / 4,
    },
  });

  const config: {
    [key: string]: { label: string; icon: string; fallback: string };
  } = {
    link: { label: "Web", fallback: "www.example.com", icon: "World" },
    email: { label: "Email", fallback: "john@doe.com", icon: "Envelope" },
    location: { label: "Location", fallback: "Somewhere", icon: "Pin" },
    phone: { label: "Phone", fallback: "+12 3456789", icon: "Mobile" },
  };

  return (
    <View style={style}>
      <View style={styles.label}>
        <Image
          source={`/icons/${config[type].icon}.png`}
          style={styles.image}
        />
        <Text>{config[type].label}</Text>
      </View>
      <Text>
        {type === "link"
          ? "www." +
            (value || config[type].fallback).replace(/(^\w+:|^)\/\//, "")
          : value}
      </Text>
    </View>
  );
};

export default Data;
