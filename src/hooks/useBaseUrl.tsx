import { useEffect, useState } from "react";
import { getCachedBaseUrl, resolveBaseUrl } from "../services/baseUrl";

function useBaseUrl(): string {
  const [baseUrl, setBaseUrl] = useState<string>(getCachedBaseUrl);

  useEffect(() => {
    resolveBaseUrl().then(setBaseUrl).catch(() => {
      setBaseUrl(getCachedBaseUrl());
    });
  }, []);

  return baseUrl;
}

export default useBaseUrl;
