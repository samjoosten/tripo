import { useCallback, useState } from "react";
import { View } from "react-native"
import { SearchInput } from "src/components/SearchInput"
import { useSearchUsersQuery, type UserSearchResult, useCreateGroupMutation } from "./queries";
import { debounce } from "lodash";
import { BodyText } from "src/components/Text";
import { FlatList } from "react-native-gesture-handler";
import { UserListItem } from "./UserListItem";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { FilledButton } from "src/components/buttons/FilledButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectedUserPill } from "./SelectedUserPill";

export const CreateGroupScreen = () => {
  const [search, setSearch] = useState<string>();
  const [selectedUsers, setSelectedUsers] = useState<UserSearchResult[]>([]);
  const buttonLabel = selectedUsers.length === 1 ? "1 Persoon" : `${selectedUsers.length} Personen`;
  const scrollY = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });

  const { data, isFetching } = useSearchUsersQuery({
    queryKey: ["users", search],
    enabled: !!search,
  });

  const { mutateAsync: createGroup, isPending: createGroupPending } = useCreateGroupMutation();

  const handleSearch = debounce((search: string) => {
    setSearch(search);
  }, 300);

  const onUserPress = useCallback((user: UserSearchResult) => {
    if (selectedUsers.some(x => x.id === user.id)) {
      setSelectedUsers(prevUsers => prevUsers.filter(x => x.id !== user.id));
    } else {
      setSelectedUsers(prevUsers => [...prevUsers, user]);
    }
  }, [selectedUsers]);

  const onCreateGroupPress = async () => {
    await createGroup(selectedUsers.map(user => user.id));
  }

  const renderUser = useCallback(({ item, index }: { item: UserSearchResult, index: number }) => {
    return (
      <UserListItem
        user={item}
        scrollY={scrollY}
        index={index}
        isSelected={selectedUsers.some(x => x.id === item.id)}
        onPress={onUserPress} />
    )
  }, [selectedUsers, scrollY]);

  const renderSelectedUser = useCallback(({ item }: { item: UserSearchResult }) => {
    return (
      <SelectedUserPill name={item.name} id={item.id} onRemove={id => setSelectedUsers(prevUsers => prevUsers.filter(x => x.id !== id))} />
    )
  }, []);

  return (
    <View className="mt-10 h-full">
      <SearchInput
        placeholder="Zoek naar gebruikers"
        autoFocus
        loading={isFetching}
        onChangeText={handleSearch} />
      <SafeAreaView className="flex-1 justify-between" edges={['bottom']}>
        {selectedUsers.length > 0 && <View style={{ paddingVertical: 10, justifyContent: 'center'}}>
          <FlatList
            horizontal
            data={selectedUsers}
            contentContainerStyle={{ alignSelf: 'flex-start' }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSelectedUser}
          /></View>}
        <View className="flex-1 justify-start mt-4">
          <Animated.FlatList
            data={data ?? []}
            onScroll={onScrollHandler}
            scrollEventThrottle={16}
            renderItem={renderUser}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View className="mb-10">
          <FilledButton label={`${buttonLabel} toevoegen`} onPress={onCreateGroupPress} loading={createGroupPending} />
        </View>
      </SafeAreaView>
    </View>
  )
}