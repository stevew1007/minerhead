import { useEffect } from "react";
import { useRouter } from "next/router";
// import { api } from "~/utils/api";

const CallbackPage = () => {
  const router = useRouter();

  // const handleAuth = async (code: string) => {
  //   const url = `https://login.eveonline.com/v2/oauth/token?grant_type=authorization_code&code=${code}`;
  //   const { data } = api.esi.loginEncode.useQuery();
  //   if (!data) {
  //     return {
  //       code: 500,
  //       message: "The tRPC server is unresponsive",
  //       description: "",
  //     };
  //   }
  //   const option = {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Basic ${data.code}`,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Host: "login.eveonline.com",
  //     },
  //   };
  //   let response;
  //   try {
  //     response = await fetch(url, option);
  //   } catch (error) {
  //     response = {
  //       ok: false,
  //       status: 500,
  //       json: () => {
  //         return {
  //           code: 500,
  //           message: "The ESI server is unresponsive",
  //           description: error?.toString(),
  //         };
  //       },
  //     };
  //   }
  //   if (response.status === 200) {
  //     console.log("response.json::: ", response.json());
  //   }
  // };

  useEffect(() => {
    const { code, state } = router.query;

    if (state !== localStorage.getItem("state")) {
      return;
    }

    if (typeof code === "string") {
      // async post(url, body, options) {
      //   return this.request({method: 'POST', url, body, ...options});
      // }
      // const response = await this.post("/tokens", null, {
      //   headers: {
      //     Authorization: "Basic " + encode(username + ":" + password),
      //   },
      // });
      // Call a tRPC mutation to exchange the authorization code for an access token
      //   trpc.mutation("login", { code });
    }
  }, [router.query]);
  console.log("Receieved callback!");
  return <div>Processing OAuth2 callback...</div>;
};

export default CallbackPage;
