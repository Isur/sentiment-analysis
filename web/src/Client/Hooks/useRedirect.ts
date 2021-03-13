import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

const useRedirect = () => {
  const dispatch = useDispatch();

  const redirect = (path: string) => {
    dispatch(push(`/${_lang}/${path}`));
  };

  return redirect;
};

export default useRedirect;
