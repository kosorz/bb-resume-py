import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { InfoViewer } from "../../../typings/Info.typing";

const Info = ({
  name,
  phone,
  link,
  email,
  location,
  role,
  phone_enabled,
  link_enabled,
  email_enabled,
  location_enabled,
  role_enabled,
  theme,
}: InfoViewer) => {
  const styles = StyleSheet.create({
    name: {
      color: theme.colors.main,
      fontSize: theme.fontSize.big,
    },
  });

  return (
    <View>
      <Text style={styles.name}>{name}</Text>
      {phone_enabled && <Text>{phone}</Text>}
      {link_enabled && <Text>{link}</Text>}
      {email_enabled && <Text>{email}</Text>}
      {location_enabled && <Text>{location}</Text>}
      {role_enabled && <Text>{role}</Text>}
    </View>
  );
};

export default Info;
