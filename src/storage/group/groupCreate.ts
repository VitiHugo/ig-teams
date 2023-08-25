import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { groupsGetAll } from "./groupsGetAll";


export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupsGetAll();
    const val = JSON.stringify([...storedGroups, newGroupName]);
    
    await AsyncStorage.setItem(GROUP_COLLECTION, val);
  } catch (err) {
    throw err;
  }
}