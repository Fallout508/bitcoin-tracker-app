
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAsset, getAssetHistory } from "@/lib/api";
import { PriceChart } from "@/components/PriceChart";
import { Link } from "react-router-dom";

const Asset = () => {
  const { id } = useParams<{ id: string }>();

  const { data: asset, isLoading: assetLoading } = useQuery({
    queryKey: ["asset", id],
    queryFn: () => getAsset(id!),
    refetchInterval: 30000,
  });

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["asset-history", id],
    queryFn: () => getAssetHistory(id!),
    refetchInterval: 30000,
  });

  const isLoading = assetLoading || historyLoading;

  if (isLoading) {
    return (
      <div className="container py-8 space-y-4">
        <div className="neo-card p-6 animate-pulse">
          <div className="h-40 bg-neo-border/20 rounded" />
        </div>
        <div className="neo-card p-6 animate-pulse">
          <div className="h-[400px] bg-neo-border/20 rounded" />
        </div>
      </div>
    );
  }

  if (!asset || !history) {
    return (
      <div className="container py-8">
        <div className="neo-card p-6 text-center">
          <h2 className="text-2xl font-bold text-destructive">Asset not found</h2>
          <Link to="/" className="mt-4 text-accent hover:underline">
            Back to assets
          </Link>
        </div>
      </div>
    );
  }

  const priceChange = parseFloat(asset.changePercent24Hr);

  return (
    <div className="container py-8">
      <Link to="/" className="inline-block mb-8 text-accent hover:underline">
        ← Back to assets
      </Link>
      
      <div className="neo-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold">{asset.name}</h1>
            <p className="text-xl font-mono text-muted-foreground mt-2">{asset.symbol}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-mono font-bold">
              ${parseFloat(asset.priceUsd).toFixed(2)}
            </div>
            <div className={`text-xl font-mono ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}%
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="neo-card p-4">
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="text-lg font-mono font-bold">
              ${(parseFloat(asset.marketCapUsd) / 1e9).toFixed(2)}B
            </p>
          </div>
          <div className="neo-card p-4">
            <p className="text-sm text-muted-foreground">Volume (24h)</p>
            <p className="text-lg font-mono font-bold">
              ${(parseFloat(asset.volumeUsd24Hr) / 1e9).toFixed(2)}B
            </p>
          </div>
          <div className="neo-card p-4">
            <p className="text-sm text-muted-foreground">Supply</p>
            <p className="text-lg font-mono font-bold">
              {(parseFloat(asset.supply) / 1e6).toFixed(2)}M
            </p>
          </div>
        </div>
      </div>

      <PriceChart data={history} />
    </div>
  );
};

export default Asset;
