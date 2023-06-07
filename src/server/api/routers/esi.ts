import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { Account } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import crypto from "crypto";
import { encode } from "js-base64";

export const esiRouter = createTRPCRouter({
  OAuthURL: publicProcedure.query(() => {
    const clientId = process.env.ESI_CLIENT_ID;
    // const secretKey = process.env.ESI_SECRET_KEY;
    const scope = process.env.ESI_SCOPE;
    const callbackURL = process.env.ESI_CALLBACK_URL;

    // Raise error if any of the above are undefined
    if (!clientId || !scope || !callbackURL) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Appication not configured correctly",
      });
    }

    const encodedCallbackURL = encodeURIComponent(callbackURL);
    console.log("encodedCallbackURL::: ", encodedCallbackURL);
    // const encodedScope = encodeURIComponent(scope);

    // Generate a unique state value
    const state = crypto.randomBytes(16).toString("hex");

    // Construct the URL
    const url = new URL("https://login.eveonline.com/v2/oauth/authorize/");
    url.searchParams.append("response_type", "code");
    url.searchParams.append("redirect_uri", callbackURL);
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("scope", scope);
    url.searchParams.append("state", state);

    return { url: url.href, state };
  }),
  loginEncode: publicProcedure.query(() => {
    const clientId = process.env.ESI_CLIENT_ID;
    const secretKey = process.env.ESI_SECRET_KEY;

    // Raise error if any of the above are undefined
    if (!clientId || !secretKey) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Appication not configured correctly",
      });
    }
    return { code: encode(clientId + ":" + secretKey) };
  }),
  new: publicProcedure
    .input(z.object({ accessToken: z.string(), refreshToken: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { accessToken, refreshToken } = input;

      const account = await ctx.prisma.account.create({
        data: {
          accessToken,
          refreshToken,
        },
      });
      return account;
    }),
});
