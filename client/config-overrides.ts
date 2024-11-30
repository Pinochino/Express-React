import { override, useBabelRc } from "customize-cra";

module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc()
);

