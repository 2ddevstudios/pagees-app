import httpService from "@/utils/httpService";
import { useMutation } from "react-query";
import Urls from "../urls";

export default function createPasswordMutation() {
  return useMutation({
    mutationFn: (data: { userId: string; password: string }) =>
      httpService.post(Urls.createAccountPassword(data?.userId), {
        password: data.password,
      }),
  });
}
