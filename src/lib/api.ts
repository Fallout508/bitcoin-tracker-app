
const COINCAP_API_BASE = "https://api.coincap.io/v2";

export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface AssetHistory {
  priceUsd: string;
  time: number;
  date: string;
}

export const getAssets = async (): Promise<Asset[]> => {
  const response = await fetch(`${COINCAP_API_BASE}/assets`);
  if (!response.ok) throw new Error('Failed to fetch assets');
  const data = await response.json();
  return data.data;
};

export const getAsset = async (id: string): Promise<Asset> => {
  const response = await fetch(`${COINCAP_API_BASE}/assets/${id}`);
  if (!response.ok) throw new Error('Failed to fetch asset');
  const data = await response.json();
  return data.data;
};

export const getAssetHistory = async (id: string, interval: string = "d1"): Promise<AssetHistory[]> => {
  const response = await fetch(`${COINCAP_API_BASE}/assets/${id}/history?interval=${interval}`);
  if (!response.ok) throw new Error('Failed to fetch asset history');
  const data = await response.json();
  return data.data;
};
