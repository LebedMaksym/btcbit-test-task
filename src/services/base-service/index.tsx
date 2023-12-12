import { config } from "../../utils/config";

export interface IBaseService {
  get: <Response>(route: string) => Promise<Response>;
  post: <Response>(shouldReject?: boolean) => Promise<Response>;
}

export class BaseService {
  protected baseUrl = config.baseApiUrl;

  protected get: IBaseService["get"] = async (route) => {
    const response = await fetch(`${this.baseUrl}${route}`);
    if (response.ok) return await response.json();

    throw {
      status: response.status,
      message: response.statusText,
    };
  };

  // @NOTE: fake post method
  protected post: IBaseService["post"] = async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };
}
