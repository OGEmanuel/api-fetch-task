import { USER } from "@/constants";
import { QUERIES } from "@/lib/queries";
import { QUERY_KEYS } from "@/lib/queries/query-keys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const useGetUsers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.users.all,
    queryFn: () => QUERIES.getUsers(),
  });
};

export default function HomeScreen() {
  const { data, isPending, isError } = useGetUsers();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState<USER[]>([]);
  const queryClient = useQueryClient();

  const userData: USER[] = data?.data;

  const handleChange = (e: string) => {
    const query = e.trim().toLowerCase();
    setSearchInput(e);

    if (!query) {
      setSearch(userData);
      return;
    }

    const filteredUser = userData.filter((user) =>
      user.name.toLowerCase().includes(query),
    );

    setSearch(filteredUser);
  };

  const RenderUserData = (props: { users: USER }) => {
    const { users } = props;
    const router = useRouter();

    return (
      <Pressable
        onPress={() => router.push(`/${users.id}`)}
        style={({ pressed }) => [
          styles.userDetailsWrapper,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.titleText}>{users.name}</Text>
        <View style={styles.itemWrapper}>
          <Text style={styles.titleText}>Username</Text>
          <Text>{users?.username}</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.titleText}>Email</Text>
          <Text>{users?.email}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Users",
        }}
      />
      <View style={styles.mainWrapper}>
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
                  queryKey: QUERY_KEYS.users.all,
                })
              }
              style={({ pressed }) => [pressed && styles.pressed]}
            >
              <Text>Retry</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <TextInput
              placeholder="Search by name"
              onChangeText={(e) => handleChange(e)}
              style={styles.textInput}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchInput.trim() !== "" ? search : userData}
              ListEmptyComponent={
                <View style={[styles.tryAgainWrapper, styles.mainWrapper]}>
                  <Text>No user named '{searchInput}'</Text>
                </View>
              }
              renderItem={(item) => <RenderUserData users={item.item} />}
              contentContainerStyle={styles.contentContainer}
              keyExtractor={(item) => item.id.toString()}
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  itemWrapper: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  userDetailsWrapper: {
    gap: 8,
    backgroundColor: "#d5ceb0",
    padding: 8,
    borderRadius: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
  },
  contentContainer: {
    gap: 12,
    paddingBottom: 12,
  },
  pressed: {
    opacity: 0.75,
  },
  tryAgainWrapper: {
    gap: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d5ceb0",
    paddingHorizontal: 8,
  },
});
