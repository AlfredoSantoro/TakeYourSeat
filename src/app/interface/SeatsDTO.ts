import {AssetState} from "../enum/AssetState";

export interface SeatsDTO
{
  id: bigint,
  name: string,
  state: AssetState,
  tagNfcValue: string
}
