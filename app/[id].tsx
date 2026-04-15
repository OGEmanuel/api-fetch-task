import DetailsItemCard from "@/components/details-item-card";
import { USER_DETAILS } from "@/constants";
import { QUERIES } from "@/lib/queries";
import { QUERY_KEYS } from "@/lib/queries/query-keys";
import { getLineHeight } from "@/lib/utils";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const useGetUserDetails = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.users.details(id),
    queryFn: () => QUERIES.getUserDetails(id),
    enabled: !!id,
  });
};

const UserDetails = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError } = useGetUserDetails(Number(params.id));

  const queryClient = useQueryClient();

  const userDetailsData: USER_DETAILS = data?.data;

  const getLastWord = (str: string) => {
    const match = str?.trim().match(/(\S+)$/);
    return match ? match[1] : "";
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: userDetailsData
            ? getLastWord(userDetailsData?.name)
            : "User details",
        }}
      />
      {isPending ? (
        <View style={styles.tryAgainWrapper}>
          <Text>Loading...</Text>
        </View>
      ) : isError ? (
        <View style={styles.tryAgainWrapper}>
          <Text>Failed to fetch</Text>
          <Pressable
            onPress={() =>
              queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.users.details(Number(params.id)),
              })
            }
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <Text>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.wrapper}>
            <View style={styles.headerWrapper}>
              <View style={styles.avatarView} />
              <View style={styles.headerTextsWrapper}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.textSm}>{userDetailsData.username}</Text>
                  <Text style={styles.name}>{userDetailsData.name}</Text>
                </View>
                <View style={styles.emailWrapper}>
                  <MaterialIcons name="email" size={18} color="black" />
                  <Text style={styles.textSm}>{userDetailsData.email}</Text>
                </View>
              </View>
            </View>
            <Text>{userDetailsData.company.catchPhrase}</Text>
            <View style={styles.horizontalBorder} />
            <View style={styles.detailsWrapper}>
              <Text style={styles.detailsHeaderText}>Details</Text>
              <DetailsItemCard
                title="Address"
                description={`${userDetailsData.address.suite}, ${userDetailsData.address.street}, ${userDetailsData.address.city}`}
              >
                <MaterialIcons name="location-pin" size={24} color="black" />
              </DetailsItemCard>
              <DetailsItemCard
                title="Phone"
                description={userDetailsData.phone}
              >
                <MaterialIcons name="phone" size={24} color="black" />
              </DetailsItemCard>
              <DetailsItemCard
                title="Company"
                description={userDetailsData.company.name}
              >
                <FontAwesome name="building" size={24} color="black" />
              </DetailsItemCard>
              <DetailsItemCard
                title="Website"
                description={userDetailsData.website}
              >
                <Ionicons name="globe-outline" size={24} color="black" />
              </DetailsItemCard>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    gap: 24,
  },
  headerWrapper: {
    gap: 16,
  },
  headerTextsWrapper: {
    gap: 8,
  },
  nameWrapper: {
    gap: 2,
  },
  emailWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  avatarView: {
    width: 70,
    height: 70,
    borderRadius: 99,
    backgroundColor: "#d5ceb0",
  },
  itemWrapper: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  tryAgainWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  horizontalBorder: {
    borderWidth: 0.5,
  },
  textSm: {
    fontSize: 12,
    lineHeight: getLineHeight(12, 160),
  },
  name: {
    lineHeight: getLineHeight(14, 180),
    fontWeight: 600,
  },
  detailsWrapper: {
    gap: 24,
  },
  detailsHeaderText: {
    fontSize: 14,
    lineHeight: getLineHeight(14, 120),
    fontWeight: 600,
  },
});
