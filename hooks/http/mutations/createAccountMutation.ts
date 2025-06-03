import httpService from "@/utils/httpService";
import { useMutation } from "react-query";
import Urls from "../urls";

export default function createAccountMutation() {
  return useMutation({
    mutationFn: (data: any) => httpService.post(Urls.signup, data),
  });
}
