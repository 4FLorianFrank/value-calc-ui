import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsDisplayProps {
  language: string;
  areaName: string;
  netSavings: number;
}

const translations = {
  de: {
    title: "Berechnungsergebnis",
    netSavingsLabel: "Nettoeinsparungen für diesen Bereich",
    currency: "€"
  },
  en: {
    title: "Calculation Results",
    netSavingsLabel: "Net Savings for this Area",
    currency: "€"
  }
};

export const ResultsDisplay = ({ language, areaName, netSavings }: ResultsDisplayProps) => {
  const t = translations[language as keyof typeof translations];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <Card className="w-full shadow-medium border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-primary-light rounded-lg">
            <h3 className="font-medium text-foreground mb-2">
              {areaName}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {t.netSavingsLabel}:
              </span>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(netSavings)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};