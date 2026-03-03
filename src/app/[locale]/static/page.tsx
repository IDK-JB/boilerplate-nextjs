import { routing } from "@/lib/i18n/routing";
import { useTranslations } from "next-intl";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Page() {
  const t = useTranslations();

  return <div>Static page</div>;
}
