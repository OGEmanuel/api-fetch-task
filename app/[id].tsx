import { USER_DETAILS } from "@/constants";
import { QUERIES } from "@/lib/queries";
import { QUERY_KEYS } from "@/lib/queries/query-keys";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
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

  return (
    <>
      <Stack.Screen
        options={{
          title: userDetailsData?.username ?? "User details",
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
        <View style={styles.wrapper}>
          <Text>Here's more about {userDetailsData?.name}</Text>
          <View style={styles.itemWrapper}>
            <MaterialIcons name="alternate-email" size={24} color="black" />
            <Text>{userDetailsData?.email}</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Entypo name="location-pin" size={24} color="black" />
            <Text>
              {userDetailsData?.address.street},{" "}
              {userDetailsData?.address.suite}, {userDetailsData?.address.city}
            </Text>
          </View>
          <View style={styles.itemWrapper}>
            <Feather name="phone" size={24} color="black" />
            <Text>{userDetailsData?.phone}</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Foundation name="web" size={24} color="black" />
            <Text>{userDetailsData?.website}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    gap: 16,
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
});
