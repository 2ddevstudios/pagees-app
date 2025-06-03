import httpService from "@/utils/httpService";
import { useMutation } from "react-query";
import Urls from "../urls";

export default function loginMutation() {
  return useMutation({
    mutationFn: (data: any) => httpService.post(Urls.login, data),
  });
}
