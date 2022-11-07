import axios from "axios";
import { BASE_URL } from "./../Constants/BASE_URL";

export const GetRequest = async (input) => {
  input.setLoading(true);
  try {
    const lotteries = await axios.get(BASE_URL + input.endpoint);
    input.setData(lotteries.data);
    input.setLoading(false);
  } catch (error) {
    input.setLoading(false);
    input.setMessageError("Something went wrong. Try later!");
  }
};
