import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../query/keys";
import { getCurrentUser } from "../../../api/supabaseData";

export const CustomHeaderCenter = () => {
  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: getCurrentUser
  });
  const nickName = userData?.user_metadata.nickName


    return (
      <div className="custom-header-center">
        {nickName&& nickName}의 북캘린더
      </div>
    );
  };
  