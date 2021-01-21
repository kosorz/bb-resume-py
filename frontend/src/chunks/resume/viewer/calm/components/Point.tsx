import React, { ReactNode } from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  point: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
});

const Item = ({ children }: { children: ReactNode | ReactNode[] }) => (
  <View style={styles.point}>
    <Text style={styles.bullet}>•</Text>
    <Text>{children}</Text>
  </View>
);

export default Item;
