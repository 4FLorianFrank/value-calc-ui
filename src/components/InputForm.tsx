import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

interface InputFormProps {
  language: string;
  onCalculate: (data: FormData) => void;
}

const translations = {
  de: {
    title: "Berechnungsbereich eingeben",
    areaName: "Bereichsname",
    employees: "Anzahl Mitarbeiter",
    workingHours: "Arbeitszeit",
    grossWage: "Bruttolohn",
    softwareCosts: "Einmalige Software-Kosten",
    licenseCosts: "Monatliche Lizenzkosten",
    managedServiceCosts: "Monatliche Managed Service-Kosten",
    calculate: "Berechnen",
    perDay: "pro Tag",
    perWeek: "pro Woche",
    perMonth: "pro Monat",
    perYear: "pro Jahr"
  },
  en: {
    title: "Enter Calculation Area",
    areaName: "Area Name",
    employees: "Number of Employees",
    workingHours: "Working Hours",
    grossWage: "Gross Wage",
    softwareCosts: "One-time Software Costs",
    licenseCosts: "Monthly License Costs",
    managedServiceCosts: "Monthly Managed Service Costs",
    calculate: "Calculate",
    perDay: "per Day",
    perWeek: "per Week",
    perMonth: "per Month",
    perYear: "per Year"
  }
};

export const InputForm = ({ language, onCalculate }: InputFormProps) => {
  const t = translations[language as keyof typeof translations];
  
  const [formData, setFormData] = useState<FormData>({
    areaName: "",
    employees: "",
    workingHours: "",
    workingHoursUnit: "perDay",
    grossWage: "",
    grossWageUnit: "perYear",
    softwareCosts: "",
    licenseCosts: "",
    managedServiceCosts: ""
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return Object.entries(formData).every(([key, value]) => {
      if (key.includes('Unit')) return true;
      return value.trim() !== "";
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onCalculate(formData);
    }
  };

  return (
    <Card className="w-full shadow-medium">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="areaName" className="text-sm font-medium">
              {t.areaName}
            </Label>
            <Input
              id="areaName"
              type="text"
              value={formData.areaName}
              onChange={(e) => updateField("areaName", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employees" className="text-sm font-medium">
              {t.employees}
            </Label>
            <Input
              id="employees"
              type="number"
              min="1"
              value={formData.employees}
              onChange={(e) => updateField("employees", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t.workingHours}
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                value={formData.workingHours}
                onChange={(e) => updateField("workingHours", e.target.value)}
                className="flex-1"
              />
              <Select
                value={formData.workingHoursUnit}
                onValueChange={(value) => updateField("workingHoursUnit", value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perDay">{t.perDay}</SelectItem>
                  <SelectItem value="perWeek">{t.perWeek}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t.grossWage}
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="0"
                value={formData.grossWage}
                onChange={(e) => updateField("grossWage", e.target.value)}
                className="flex-1"
              />
              <Select
                value={formData.grossWageUnit}
                onValueChange={(value) => updateField("grossWageUnit", value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perMonth">{t.perMonth}</SelectItem>
                  <SelectItem value="perYear">{t.perYear}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="softwareCosts" className="text-sm font-medium">
              {t.softwareCosts}
            </Label>
            <Input
              id="softwareCosts"
              type="number"
              min="0"
              value={formData.softwareCosts}
              onChange={(e) => updateField("softwareCosts", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseCosts" className="text-sm font-medium">
              {t.licenseCosts}
            </Label>
            <Input
              id="licenseCosts"
              type="number"
              min="0"
              value={formData.licenseCosts}
              onChange={(e) => updateField("licenseCosts", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managedServiceCosts" className="text-sm font-medium">
              {t.managedServiceCosts}
            </Label>
            <Input
              id="managedServiceCosts"
              type="number"
              min="0"
              value={formData.managedServiceCosts}
              onChange={(e) => updateField("managedServiceCosts", e.target.value)}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={!isFormValid()}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {t.calculate}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};