
import { Link } from "react-router-dom";
import { Asset } from "@/lib/api";

const formatNumber = (value: string) => {
  const num = parseFloat(value);
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
};

export const AssetCard = ({ asset }: { asset: Asset }) => {
  const priceChange = parseFloat(asset.changePercent24Hr);
  
  return (
    <Link to={`/asset/${asset.id}`}>
      <div className="neo-card p-6 cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-mono font-bold">{asset.rank}</div>
            <div>
              <h3 className="text-xl font-bold">{asset.name}</h3>
              <p className="text-sm text-muted-foreground font-mono">{asset.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-mono font-bold">{formatNumber(asset.priceUsd)}</div>
            <div className={`text-sm font-mono ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-sm font-mono text-muted-foreground">
          <span>Market Cap: {formatNumber(asset.marketCapUsd)}</span>
          <span>Volume (24h): {formatNumber(asset.volumeUsd24Hr)}</span>
        </div>
      </div>
    </Link>
  );
};
