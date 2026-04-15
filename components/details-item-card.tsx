import { getLineHeight } from "@/lib/utils";
import { StyleSheet, Text, View } from "react-native";

const DetailsItemCard = (props: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  const { title, description, children } = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.iconWrapper}>{children}</View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default DetailsItemCard;

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  iconWrapper: {
    width: 48,
    height: 48,
    backgroundColor: "#d5ceb0",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 12,
    lineHeight: getLineHeight(12, 160),
  },
  description: {
    lineHeight: getLineHeight(14, 160),
  },
});
