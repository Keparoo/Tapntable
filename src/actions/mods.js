import TapntableApi from '../api/api';
import { FETCH_MODS } from './types';

export function fetchModsFromAPI() {
  return async function(dispatch) {
    const categories = await TapntableApi.getModCats();
    const groups = await TapntableApi.getModGroups();
    const mods = await TapntableApi.getMods({ isActive: true });
    return dispatch(getMods({ categories, groups, mods }));
  };
}

function getMods(mods) {
  return {
    type: FETCH_MODS,
    mods
  };
}
