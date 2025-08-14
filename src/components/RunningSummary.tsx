import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CalculationArea {
  areaName: string;
  netSavings: number;
}

interface RunningSummaryProps {
  language: string;
  areas: CalculationArea[];
  onAddAnother: () => void;
  onFinish: () => void;
}

const translations = {
  de: {
    title: "Gesamtzusammenfassung",
    totalSavings: "Gesamteinsparungen",
    addAnother: "Weiteren Bereich hinzufügen",
    finish: "Abschließen & Zusammenfassung anzeigen"
  },
  en: {
    title: "Overall Summary",
    totalSavings: "Total Savings",
    addAnother: "Add Another Area",
    finish: "Finish & View Summary"
  }
};

export const RunningSummary = ({ language, areas, onAddAnother, onFinish }: RunningSummaryProps) => {
  const t = translations[language as keyof typeof translations];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const totalSavings = areas.reduce((sum, area) => sum + area.netSavings, 0);

  return (
    <Card className="w-full shadow-medium">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Areas List */}
          <div className="space-y-3">
            {areas.map((area, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <span className="font-medium text-foreground">
                  {area.areaName}
                </span>
                <span className="text-primary font-semibold">
                  {formatCurrency(area.netSavings)}
                </span>
              </div>
            ))}
          </div>

          {/* Total Savings */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between p-4 bg-primary-light rounded-lg">
              <span className="text-lg font-semibold text-foreground">
                {t.totalSavings}:
              </span>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(totalSavings)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onAddAnother}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary-light"
            >
              {t.addAnother}
            </Button>
            <Button
              onClick={onFinish}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              {t.finish}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};