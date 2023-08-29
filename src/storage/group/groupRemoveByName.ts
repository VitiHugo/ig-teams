import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "../storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "../../utils/AppError";


export async function groupRemoveByName(groupDeleted: string) {
  try {
    console.log('g', groupDeleted)
    const storedGroups = await groupsGetAll();
    const groups = storedGroups.filter(g => g !== groupDeleted);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);

  } catch (err) {
    throw err;
  }
}