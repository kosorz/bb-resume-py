import React from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { InfoViewer } from "../../../typings/Info.typing";

import Data from "./parts/Data";

const Info = ({
  name,
  phone,
  link,
  email,
  photo,
  location,
  role,
  phone_enabled,
  link_enabled,
  email_enabled,
  location_enabled,
  role_enabled,
  photo_enabled,
  meta,
  isActive,
}: InfoViewer) => {
  const { paper, colors, fontSize } = meta;

  const styles = StyleSheet.create({
    info: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: paper.space,
      marginBottom: paper.space / 3,
      alignItems: "center",
      opacity: isActive ? 1 : 0.4,
    },
    rest: {
      flex: 70,
    },
    name: {
      fontSize: fontSize.big,
    },
    role: {
      color: colors.main,
      fontSize: fontSize.large,
    },
    contactInfo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: fontSize.small,
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
      height: "auto",
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
        {photo_enabled && (
          <Image
            style={styles.image}
            source={`${process.env.REACT_APP_OBJECT_STORAGE_URL}${process.env.REACT_APP_RESUME_PHOTO_STORAGE_PATH}${photo}`}
          />
        )}
      </View>
    </View>
  );
};

export default Info;
