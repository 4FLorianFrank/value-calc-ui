import { useState } from "react";
import { Header } from "@/components/Header";
import { InputForm } from "@/components/InputForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { RunningSummary } from "@/components/RunningSummary";

interface FormData {
  areaName: string;
  employees: string;
  workingHours: string;
  workingHoursUnit: string;
  grossWage: string;
  grossWageUnit: string;
  softwareCosts: string;
  licenseCosts: string;
  managedServiceCosts: string;
}

interface CalculationArea {
  areaName: string;
  netSavings: number;
}

const Index = () => {
  const [language, setLanguage] = useState("de");
  const [hasCalculated, setHasCalculated] = useState(false);
  const [currentResult, setCurrentResult] = useState<CalculationArea | null>(null);
  const [allAreas, setAllAreas] = useState<CalculationArea[]>([]);

  // Mock calculation function - would be replaced with actual logic
  const calculateSavings = (data: FormData): number => {
    // This is a simple mock calculation
    const employees = parseInt(data.employees) || 0;
    const workingHours = parseInt(data.workingHours) || 0;
    const grossWage = parseInt(data.grossWage) || 0;
    const softwareCosts = parseInt(data.softwareCosts) || 0;
    const licenseCosts = parseInt(data.licenseCosts) || 0;
    const managedServiceCosts = parseInt(data.managedServiceCosts) || 0;
    
    // Mock calculation: assume 20% efficiency gain
    const annualLaborCost = data.grossWageUnit === "perMonth" ? grossWage * 12 : grossWage;
    const totalLaborCost = employees * annualLaborCost;
    const savings = totalLaborCost * 0.2;
    const totalCosts = softwareCosts + (licenseCosts * 12) + (managedServiceCosts * 12);
    
    return Math.max(0, savings - totalCosts);
  };

  const handleCalculate = (data: FormData) => {
    const netSavings = calculateSavings(data);
    const newArea: CalculationArea = {
      areaName: data.areaName,
      netSavings: netSavings
    };
    
    setCurrentResult(newArea);
    setAllAreas(prev => [...prev, newArea]);
    setHasCalculated(true);
  };

  const handleAddAnother = () => {
    setCurrentResult(null);
  };

  const handleFinish = () => {
    // This would typically navigate to a summary page or generate a report
    console.log("Finishing calculation with areas:", allAreas);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <InputForm 
              language={language} 
              onCalculate={handleCalculate}
            />
            
            {/* Results Display - Mobile only */}
            {hasCalculated && currentResult && (
              <div className="lg:hidden">
                <ResultsDisplay
                  language={language}
                  areaName={currentResult.areaName}
                  netSavings={currentResult.netSavings}
                />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Results Display - Desktop only */}
            {hasCalculated && currentResult && (
              <div className="hidden lg:block">
                <ResultsDisplay
                  language={language}
                  areaName={currentResult.areaName}
                  netSavings={currentResult.netSavings}
                />
              </div>
            )}
            
            {/* Running Summary */}
            {hasCalculated && allAreas.length > 0 && (
              <RunningSummary
                language={language}
                areas={allAreas}
                onAddAnother={handleAddAnother}
                onFinish={handleFinish}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;