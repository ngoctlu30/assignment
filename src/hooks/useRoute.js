import {useNavigate, useLocation} from "react-router-dom";

const useRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    push: (path) => navigate(path),
    path: location.pathname
  }
}

export default useRouter;