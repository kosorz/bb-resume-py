import React from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { InfoViewer } from "../../../../typings/Info.typing";
import Data from "../parts/Data";

const Info = ({
  name,
  phone,
  link,
  email,
  location,
  role,
  quote,
  phone_enabled,
  link_enabled,
  email_enabled,
  location_enabled,
  role_enabled,
  quote_enabled,
  meta,
}: InfoViewer) => {
  const { paper, fontSize, colors } = meta;
  const { secondary } = colors;

  const styles = StyleSheet.create({
    info: {
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
    left: {
      paddingTop: paper.space / 10,
      paddingRight: paper.space / 3,
      flexBasis: 208,
      textTransform: "uppercase",
      textAlign: "right",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    name: {
      marginLeft: paper.space / 5,
      fontSize: name.length > 15 ? 0.6 * fontSize.big : fontSize.big,
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
    right: {
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
    data: {
      margin: paper.space / 5,
    },
    quote: {
      marginTop: 0.3 * paper.space,
      paddingLeft: 0.6 * paper.space,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    quoteDecor: {
      position: "relative",
      flexBasis: 208 - 0.6 * paper.space - paper.space / 5,
      marginRight: paper.space / 5,
    },
    quoteDecorLine: {
      borderTop: 1,
      borderStyle: "solid",
      borderColor: "#767779",
    },
    quoteDecorImage: {
      position: "absolute",
      top: -20,
      right: 5,
      height: 40,
      width: 40,
      borderRadius: 20,
      backgroundColor: secondary,
      padding: 12,
    },
    content: {
      flex: 346,
      borderLeft: 7,
      borderStyle: "solid",
      borderColor: "#767779",
      paddingLeft: paper.space / 10,
      paddingVertical: paper.space / 5,
      flexGrow: 1,
      flexShrink: 0,
    },
  });

  const contacts = [
    phone_enabled && (
      <Data style={styles.data} meta={meta} type="phone" value={phone} />
    ),
    email_enabled && (
      <Data style={styles.data} meta={meta} type="email" value={email} />
    ),
    link_enabled && (
      <Data style={styles.data} meta={meta} type="link" value={link} />
    ),
    location_enabled && (
      <Data style={styles.data} meta={meta} type="location" value={location} />
    ),
  ].filter((contact) => contact);

  return (
    <View style={styles.info}>
      <View style={styles.line} />
      <View style={styles.main}>
        <View style={styles.left}>
          <View>
            <Text style={styles.name}>{name}</Text>
          </View>
          {role_enabled && (
            <View>
              <Text style={styles.role}>{role}</Text>
            </View>
          )}
        </View>
        <View style={styles.right}>
          <View style={styles.contactInfo}>
            {contacts[0]}
            {contacts[1]}
          </View>
          {(contacts[2] || contacts[3]) && <View style={styles.verticalLine} />}
          <View style={styles.contactInfo}>
            {contacts[2]}
            {contacts[3]}
          </View>
        </View>
      </View>
      {quote_enabled && (
        <View style={styles.quote}>
          <View style={styles.quoteDecor}>
            <View style={styles.quoteDecorLine} />
            <Image
              style={styles.quoteDecorImage}
              source={"/icons/QuoteCalm.png"}
            />
          </View>
          <View style={styles.content}>
            <Text>{quote}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Info;
