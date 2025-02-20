
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "@/lib/api";
import { AssetCard } from "@/components/AssetCard";

const Index = () => {
  const { data: assets, isLoading, error } = useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="container py-8 space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="neo-card p-6 animate-pulse">
            <div className="h-20 bg-neo-border/20 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="neo-card p-6 text-center">
          <h2 className="text-2xl font-bold text-destructive">Error loading assets</h2>
          <p className="mt-2 text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Crypto Assets</h1>
      <div className="space-y-4">
        {assets?.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default Index;
