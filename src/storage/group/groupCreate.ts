import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "../../utils/AppError";


export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupsGetAll();
    const val = JSON.stringify([...storedGroups, newGroupName]);

    const alreadyExists = storedGroups.includes(newGroupName);

    if(alreadyExists)
      throw new AppError('Grupo já existe!');
    
    await AsyncStorage.setItem(GROUP_COLLECTION, val);
  } catch (err) {
    throw err;
  }
}