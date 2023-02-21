import { SSTConfig } from "sst";
import { SSTExpoStarterStack } from "./stacks/sstExpo";

export default {
  config(_input) {
    return {
      name: "sst-tamagui-starter",
      region: "eu-west-1",
    };
  },
  stacks(app) {app.stack(SSTExpoStarterStack)
},
} satisfies SSTConfig;
