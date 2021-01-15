import React from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { InfoViewer } from "../../../../typings/Info.typing";

import Data from "./parts/Data";

const Info = ({
  name,
  phone,
  link,
  email,
  cropped_photo,
  location,
  role,
  phone_enabled,
  link_enabled,
  email_enabled,
  location_enabled,
  role_enabled,
  photo_enabled,
  meta,
}: InfoViewer) => {
  const { paper, colors, fontSize, fontFamily } = meta;

  const styles = StyleSheet.create({
    info: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: paper.space,
      marginBottom: paper.space / 3,
      alignItems: "center",
    },
    rest: {
      flex: 70,
    },
    name: {
      fontSize: fontSize.big,
      fontFamily: fontFamily + "-Bold",
    },
    role: {
      color: colors.main,
      fontSize: fontSize.large,
      fontFamily: fontFamily + "-Bold",
    },
    contacts: {
      display: "flex",
      flexDirection: "row",
    },
    contactInfo: {
      display: "flex",
      fontSize: fontSize.small,
      width: "50%",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    contact: {
      marginTop: paper.space / 10,
    },
    imageFrame: {
      flex: 30,
      display: "flex",
    },
    image: {
      width: "100px",
      height: "auto",
      borderRadius: paper.space / 10,
      alignSelf: "flex-end",
    },
  });

  const contacts = [
    phone_enabled && <Data type="phone" style={styles.contact} value={phone} />,
    email_enabled && <Data type="email" style={styles.contact} value={email} />,
    link_enabled && <Data type="link" style={styles.contact} value={link} />,
    location_enabled && (
      <Data type="location" style={styles.contact} value={location} />
    ),
  ].filter((contact) => contact);

  return (
    <View style={styles.info} wrap={false}>
      <View style={styles.rest}>
        <View>
          <Text style={styles.name}>{name || "Your name"}</Text>
          {role_enabled && <Text style={styles.role}>{role}</Text>}
        </View>
        <View style={styles.contacts}>
          <View style={styles.contactInfo}>
            {contacts[0]}
            {contacts[1]}
          </View>
          <View style={styles.contactInfo}>
            {contacts[2]}
            {contacts[3]}
          </View>
        </View>
      </View>
      <View style={styles.imageFrame}>
        {photo_enabled && (
          <Image
            style={styles.image}
            source={`${process.env.REACT_APP_OBJECT_STORAGE_URL}${process.env.REACT_APP_RESUME_PHOTO_CROPS_STORAGE_PATH}${cropped_photo}`}
          />
        )}
      </View>
    </View>
  );
};

export default Info;
