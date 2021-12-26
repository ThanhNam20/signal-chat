const setLocal = (key: string, value: any) => {
  localStorage.setItem(key, value);
}

const getLocal = (key: string) => {
  return localStorage.getItem(key);
}

const removeLocal = (key: string) => {
  localStorage.removeItem(key);
}

const clearLocal = () => {
  localStorage.clear();
}

export const StorageService = {
  setLocal, getLocal, removeLocal, clearLocal
}