import {
  useAnimeAppDispatch,
  useAuthAppDispatch,
  useCollectionDispatch,
  useMangaAppDispatch,
  useReviewAppDispatch,
  useUserAppDispatch,
} from "../services/hooks";

const useLogout = () => {
  const { resetUserState } = useUserAppDispatch();
  const { resetReviewState } = useReviewAppDispatch();
  const { resetAuthState } = useAuthAppDispatch();
  const { resetCollectionState } = useCollectionDispatch();
  const { clearAllAnimeFilter } = useAnimeAppDispatch();
  const { clearAllMangaFilter } = useMangaAppDispatch();

  const logout = () => {
    resetUserState();
    resetReviewState();
    resetAuthState();
    resetCollectionState();
    clearAllAnimeFilter();
    clearAllMangaFilter();
    localStorage.clear();
  };

  return {
    logout,
  };
};

export default useLogout;
