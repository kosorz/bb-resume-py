import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { InfoViewer } from "../../../../typings/Info.typing";
import Data from "../parts/Data";

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
  meta,
}: InfoViewer) => {
  const { paper, fontSize } = meta;

  const styles = StyleSheet.create({
    info: {
      paddingTop: 1.2 * paper.space,
      marginRight: 0.6 * paper.space,
    },
    line: {
      marginLeft: 1.5 * paper.space,
      borderTop: 1,
      borderStyle: "solid",
      borderColor: "#767779",
    },
    main: {
      display: "flex",
      flexDirection: "row",
    },
    basic: {
      paddingTop: paper.space / 10,
      paddingRight: paper.space / 3,
      flexBasis: 209,
      textTransform: "uppercase",
      textAlign: "right",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    name: {
      marginLeft: paper.space / 5,
      fontSize: fontSize.big,
    },
    role: {
      marginLeft: paper.space / 10,
      paddingTop: paper.space / 10,
      fontSize: fontSize.large / 2,
      letterSpacing: 2,
    },
    verticalLine: {
      borderRight: 1,
      borderStyle: "solid",
      borderColor: "#767779",
      flexGrow: 1,
    },
    contactHolder: {
      flexBasis: 346,
      display: "flex",
      flexDirection: "row",
      alignSelf: "center",
    },
    contactInfo: {
      paddingLeft: paper.space / 5,
      marginTop: paper.space / 5,
      display: "flex",
      width: "50%",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    contact: {
      margin: paper.space / 5,
    },
  });

  const contacts = [
    phone_enabled && (
      <Data style={styles.contact} meta={meta} type="phone" value={phone} />
    ),
    email_enabled && (
      <Data style={styles.contact} meta={meta} type="email" value={email} />
    ),
    link_enabled && (
      <Data style={styles.contact} meta={meta} type="link" value={link} />
    ),
    location_enabled && (
      <Data
        style={styles.contact}
        meta={meta}
        type="location"
        value={location}
      />
    ),
  ].filter((contact) => contact);

  return (
    <View style={styles.info}>
      <View style={styles.line} />
      <View>
        <View style={styles.main}>
          <View style={styles.basic}>
            <View>
              <Text style={styles.name}>{name}</Text>
            </View>
            {role_enabled && (
              <View>
                <Text style={styles.role}>{role}</Text>
              </View>
            )}
          </View>
          <View style={styles.contactHolder}>
            <View style={styles.contactInfo}>
              {contacts[0]}
              {contacts[1]}
            </View>
            {(contacts[2] || contacts[3]) && (
              <View style={styles.verticalLine} />
            )}
            <View style={styles.contactInfo}>
              {contacts[2]}
              {contacts[3]}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Info;
