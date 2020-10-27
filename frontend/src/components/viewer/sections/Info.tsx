import React from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { InfoViewer } from "../../../typings/Info.typing";

import Data from "./parts/Data";

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
    info: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: theme.paper.space,
      marginVertical: theme.paper.space / 2,
      marginBottom: theme.paper.space / 3,
      alignItems: "center",
      // borderBottom: 1,
      // borderColor: theme.colors.secondary,
      color: theme.colors.secondary,
    },
    rest: {
      flex: 70,
    },
    name: {
      color: theme.colors.main,
      fontSize: theme.fontSize.big,
    },
    role: {
      fontSize: theme.fontSize.large,
    },
    contactInfo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: theme.fontSize.small,
      marginTop: 5,
    },
    contact: {
      flex: 50,
    },
    imageFrame: {
      flex: 30,
      display: "flex",
    },
    image: {
      width: "100px",
      height: "100px",
      borderRadius: 5,
      alignSelf: "flex-end",
    },
  });

  return (
    <View style={styles.info} wrap={false}>
      <View style={styles.rest}>
        <View>
          <Text style={styles.name}>{name}</Text>
          {role_enabled && <Text style={styles.role}>{role}</Text>}
        </View>
        <View style={styles.contactInfo}>
          {phone_enabled && (
            <Data type="phone" style={styles.contact} value={phone} />
          )}
          {link_enabled && (
            <Data type="link" style={styles.contact} value={link} />
          )}
        </View>
        <View style={styles.contactInfo}>
          {email_enabled && (
            <Data type="email" style={styles.contact} value={email} />
          )}
          {location_enabled && (
            <Data type="location" style={styles.contact} value={location} />
          )}
        </View>
      </View>
      <View style={styles.imageFrame}>
        {true && <Image style={styles.image} source="/ogorkowa.jpg" />}
      </View>
    </View>
  );
};

export default Info;
