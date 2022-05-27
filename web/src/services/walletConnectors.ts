import { InjectedConnector } from "@web3-react/injected-connector";

const supportedChainIds = [
  1666600000, 1666600001, 1666600002, 1666600003, 1, 4,
];

export const metamask = new InjectedConnector({
  supportedChainIds,
});
